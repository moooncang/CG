import {mkdirSync,readFileSync,writeFileSync,copyFileSync,cpSync} from 'node:fs';
mkdirSync('dist',{recursive:true});
cpSync('public/fonts','dist/fonts',{recursive:true});
for(const file of ['index.html','style.css'])copyFileSync('public/'+file,'dist/'+file);
writeFileSync('dist/index.html',readFileSync('public/index.html','utf8').replace('href="/style.css"','href="./style.css"').replace('src="/app.js"','src="./app.js"'));
writeFileSync('dist/game.js',readFileSync('game.js','utf8').replace("import { randomBytes } from 'node:crypto';","const randomBytes = n => ({toString: () => Array.from(crypto.getRandomValues(new Uint8Array(n)), v => v.toString(16).padStart(2, '0')).join('')});"));
let app=readFileSync('public/app.js','utf8');
const start=app.indexOf('async function api('),end=app.indexOf('\nfunction toast',start);
app=app.slice(0,start)+`const SAVE_KEY='creator-quest-pages-v1';
async function api(path,body){
 if(path==='state'){
  const raw=localStorage.getItem(SAVE_KEY);
  if(!raw)return {username:'나의 작가',...initial()};
  try{return migrate(JSON.parse(raw));}catch{throw Error('저장 기록을 읽지 못했어요. 브라우저 저장소를 삭제하기 전에 데이터를 백업해 주세요.');}
 }
 if(path==='action'){
  const next=act(structuredClone(state),body);
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(next));}catch{throw Error('브라우저 저장 공간을 확인해 주세요. 변경 사항을 저장하지 못했어요.');}
  return next;
 }
 throw Error('GitHub Pages 체험판에는 서버 계정 기능이 없습니다.');
}
`+app.slice(end);
app="import { initial, migrate, act } from './game.js';\n"+app;
app=app.replace('href="/"','href="./"');
app=app.replace('<div class="content">','<div class="content"><div class="pages-notice" role="note"><strong>GitHub Pages · 브라우저 저장 모드</strong><span>회원가입 없이 플레이합니다. 기록은 이 브라우저에만 저장되며, 사이트 데이터 삭제 시 사라집니다. 서버 계정과 동기화되지 않습니다.</span></div>');
app=app.replace("data-action=\"${state?'logout':'auth'}\"",'data-action="local-info"');
app=app.replaceAll("${state?'로그아웃':'회원가입 / 로그인'}",'자동 저장');
app=app.replace('const a=b.dataset.action;',"const a=b.dataset.action;if(a==='local-info')toast('브라우저 저장 모드입니다. 서버 계정과 동기화되지 않습니다.');");
// No password form or misleading authentication controls in the static edition.
const dialogStart=app.indexOf('<dialog id="auth">'),dialogEnd=app.indexOf('</dialog>',dialogStart);
app=app.slice(0,dialogStart)+app.slice(dialogEnd+9);
const authStart=app.indexOf("$('#auth-form').onsubmit="),authEnd=app.indexOf("const f=$('#create-form')",authStart);
app=app.slice(0,authStart)+app.slice(authEnd);
app=app.replace("function requireAuth(){if(state)return true;$('#auth').showModal();return false;}","function requireAuth(){if(state)return true;toast('저장 기록을 불러오는 중입니다.');return false;}");
writeFileSync('dist/app.js',app);
writeFileSync('dist/.nojekyll','');
writeFileSync('dist/style.css',readFileSync('dist/style.css','utf8')+'\n.pages-notice{display:grid;gap:8px;border:1px solid var(--border);border-radius:8px;padding:14px 18px;margin-bottom:24px;background:var(--soft);font-size:12px}.pages-notice strong{color:var(--accent)}.pages-notice span{color:var(--muted);font-size:11px;line-height:1.7}\n');
console.log('GitHub Pages static build: dist/');
