import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
test('계정 영속성, 회차 진행, 인증 격리',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'crack-creator-'));const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:'3109',DATA_DIR:dir},stdio:['ignore','pipe','pipe']});
 try{
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('startup timeout')),5000);child.stdout.once('data',()=>{clearTimeout(timer);resolve();});child.once('error',reject);});
 const request=async(path,body,cookie)=>{const r=await fetch('http://127.0.0.1:3109/api/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};};
 assert.equal((await request('state')).status,401);
 const reg=await request('register',{username:'test_writer',password:'testing-password'});assert.equal(reg.status,200);const cookie=reg.cookie;assert.ok(cookie);
 assert.equal((await request('register',{username:'test_writer',password:'testing-password'})).status,409);
 assert.equal((await request('login',{username:'test_writer',password:'wrong-password'})).status,401);
 const fresh=await request('state',null,cookie);assert.equal(fresh.body.version,3);assert.equal(fresh.body.run,null);
 assert.equal((await request('action',{type:'endweek'},cookie)).status,400);
 const started=await request('action',{type:'newgame',name:'서버작가',background:'student',traits:['steel']},cookie);assert.equal(started.status,200);assert.equal(started.body.run.coins,900);
 assert.equal((await request('action',{type:'draft',title:'잠긴',genre:'horror',subject:'school',format:'single',cast:1,scale:'small',focus:'appeal'},cookie)).status,400);
 const created=await request('action',{type:'draft',title:'달빛 도서관',genre:'fantasy',subject:'academy',format:'single',cast:1,scale:'small',focus:'immersion'},cookie);assert.equal(created.status,200);const id=created.body.run.drafts[0].id;
 const worked=await request('action',{type:'work',id,stage:'concept'},cookie);assert.equal(worked.status,200);assert.ok(worked.body.run.drafts[0].progress.concept>0);
 assert.equal((await request('action',{type:'train',skill:'constructor'},cookie)).status,400);
 const ended=await request('action',{type:'endweek'},cookie);assert.equal(ended.status,200);assert.equal(ended.body.run.week,2);
 assert.equal((await request('action',{type:'theme',theme:'mint'},cookie)).body.theme,'mint');
 const second=await request('register',{username:'another_writer',password:'testing-password'});assert.equal((await request('state',null,second.cookie)).body.run,null);
 assert.equal((await request('logout',{},cookie)).status,200);assert.equal((await request('state',null,cookie)).status,401);
 const login=await request('login',{username:'test_writer',password:'testing-password'});const saved=await request('state',null,login.cookie);assert.equal(saved.body.run.drafts[0].title,'달빛 도서관');assert.equal(saved.body.theme,'mint');
 for(const p of ['/','/app.js','/game.js','/data.js','/style.css'])assert.equal((await fetch('http://127.0.0.1:3109'+p)).status,200,p);
 }finally{child.kill();await new Promise(r=>child.once('close',r));rmSync(dir,{recursive:true,force:true});}
});
