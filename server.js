import { newSave, actSave, migrateSave } from './game.js';
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
mkdirSync(process.env.DATA_DIR || root+'data',{recursive:true});
const db=new DatabaseSync((process.env.DATA_DIR || root+'data')+'/game.db');
db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT UNIQUE,password TEXT,state TEXT); CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id INTEGER,expires INTEGER);`);
const failures=new Map();
const server=http.createServer(async(req,res)=>{
 const send=(code,value)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'");
 try{
 const path=new URL(req.url,'http://localhost').pathname;
 if(!path.startsWith('/api/')){if(!['GET','HEAD'].includes(req.method))return send(405,{error:'허용되지 않은 요청'});const files={'/':['public/index.html','text/html'],'/app.js':['public/app.js','text/javascript'],'/game.js':['game.js','text/javascript'],'/data.js':['data.js','text/javascript'],'/style.css':['public/style.css','text/css'],'/fonts/DungGeunMo.woff':['public/fonts/DungGeunMo.woff','font/woff']};if(!files[path])return send(404,{error:'Not found'});res.setHeader('Content-Type',files[path][1]+'; charset=utf-8');res.setHeader('Cache-Control',path==='/'?'no-cache':'public, max-age=300');return res.end(readFileSync(root+files[path][0]));}
 if(req.method==='POST'&&req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host)return send(403,{error:'허용되지 않은 출처예요.'});
 let body={};if(req.method==='POST'){if(!req.headers['content-type']?.includes('application/json'))return send(415,{error:'JSON 요청이 필요해요.'});let chunks=[],size=0;for await(const c of req){size+=c.length;if(size>16384)return send(413,{error:'요청이 너무 커요.'});chunks.push(c);}try{body=JSON.parse(Buffer.concat(chunks).toString()||'{}');if(!body||typeof body!=='object')throw Error();}catch{return send(400,{error:'잘못된 요청이에요.'});}}
 if(['/api/register','/api/login'].includes(path)&&req.method==='POST'){
 const key=req.socket.remoteAddress,now=Date.now();let rate=failures.get(key);if(!rate||now-rate.at>60000){rate={at:now,n:0};failures.set(key,rate);}if(++rate.n>15)return send(429,{error:'잠시 후 다시 시도해 주세요.'});
 const username=String(body.username||'').trim().toLowerCase(),password=String(body.password||'');if(!/^[a-z0-9_]{3,20}$/.test(username)||password.length<8||password.length>128)return send(400,{error:'아이디는 영문·숫자·밑줄 3~20자, 비밀번호는 8~128자로 입력해 주세요.'});
 let user=db.prepare('SELECT * FROM users WHERE username=?').get(username);
 if(path==='/api/register'){if(user)return send(409,{error:'이미 사용 중인 아이디예요.'});const salt=randomBytes(16).toString('hex');const hash=scryptSync(password,salt,64).toString('hex');const result=db.prepare('INSERT INTO users(username,password,state) VALUES(?,?,?)').run(username,salt+':'+hash,JSON.stringify(newSave()));user={id:result.lastInsertRowid,username};}
 else {const [salt,hash]=(user?.password||('0'.repeat(32)+':'+'0'.repeat(128))).split(':');const valid=timingEqual(password,salt,hash);if(!user||!valid)return send(401,{error:'아이디 또는 비밀번호를 확인해 주세요.'});}
 const token=randomBytes(32).toString('hex');db.prepare('DELETE FROM sessions WHERE expires < ?').run(now);db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(token,user.id,now+7*86400000);res.setHeader('Set-Cookie',`session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${process.env.COOKIE_SECURE==='1'?'; Secure':''}`);return send(200,{username});
 }
 const token=req.headers.cookie?.match(/(?:^|;\s*)session=([a-f0-9]{64})(?:;|$)/)?.[1];const user=token&&db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=? AND expires>?').get(token,Date.now());if(!user)return send(401,{error:'로그인이 필요해요.'});
 if(path==='/api/logout'&&req.method==='POST'){db.prepare('DELETE FROM sessions WHERE token=?').run(token);res.setHeader('Set-Cookie','session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');return send(200,{ok:true});}
 if(path==='/api/state'&&req.method==='GET')return send(200,{username:user.username,...migrateSave(JSON.parse(user.state))});
 if(path==='/api/action'&&req.method==='POST'){let state;try{state=actSave(JSON.parse(user.state),body);}catch(e){return send(400,{error:e.message});}db.prepare('UPDATE users SET state=? WHERE id=?').run(JSON.stringify(state),user.id);return send(200,{username:user.username,...state});}
 send(404,{error:'Not found'});
 }catch(e){console.error(e);send(500,{error:'서버 오류가 발생했어요.'});}
});
function timingEqual(password,salt,hash){return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(hash,'hex'));}
server.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('크랙 작가 키우기 listening on '+(process.env.PORT||3000)));
