import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
test('account persistence, game progression and authorization',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creator-quest-'));const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:'3109',DATA_DIR:dir},stdio:['ignore','pipe','pipe']});
 try{
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('startup timeout')),5000);child.stdout.once('data',()=>{clearTimeout(timer);resolve();});child.once('error',reject);});
 const request=async(path,body,cookie)=>{const r=await fetch('http://127.0.0.1:3109/api/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};};
 assert.equal((await request('state')).status,401);
 const reg=await request('register',{username:'test_writer',password:'testing-password'});assert.equal(reg.status,200);const cookie=reg.cookie;assert.ok(cookie);
 assert.equal((await request('register',{username:'test_writer',password:'testing-password'})).status,409);
 assert.equal((await request('login',{username:'test_writer',password:'wrong-password'})).status,401);
 assert.equal((await request('action',{type:'train',skill:'constructor'},cookie)).status,400);
 assert.equal((await request('action',{type:'publish',title:'잠긴 장르',genre:'SF',images:1,prompt:'길고 충분한 설정을 가진 캐릭터와 함께 새로운 이야기를 만들어 갑니다.'},cookie)).status,400);
 const trained=await request('action',{type:'train',skill:'design'},cookie);assert.equal(trained.body.skills.design,2);assert.equal(trained.body.coins,1000);
 assert.equal((await request('action',{type:'theme',theme:'mint'},cookie)).body.theme,'mint');
 const created=await request('action',{type:'draft',title:'달빛 도서관',genre:'판타지',images:2,cast:1,format:'character',intro:'도서관에 처음 찾아온 방문자를 환영합니다.',guide:'사서에게 원하는 책과 기억에 대해 물어보세요.',prompt:'당신은 달빛 도서관의 사서입니다. 조용하고 다정한 말투로 독자와 대화하며 사라진 기억의 책을 찾는 모험을 시작합니다.'},cookie);assert.equal(created.status,200);const id=created.body.drafts[0].id;
 assert.equal((await request('action',{type:'publish',id},cookie)).status,400);
 for(const stage of ['concept','prompt','assets','packaging']){
  let done=false;while(!done){let current=(await request('state',null,cookie)).body;if(current.energy<25){await request('action',{type:'rest'},cookie);}
   const worked=await request('action',{type:'work',id,stage},cookie);assert.equal(worked.status,200);done=worked.body.drafts[0].progress[stage]>=60;
  }
 }
 await request('action',{type:'rest'},cookie);
 assert.equal((await request('action',{type:'test',id},cookie)).status,200);
 assert.equal((await request('action',{type:'test',id},cookie)).status,400);
 const published=await request('action',{type:'publish',id},cookie);assert.equal(published.status,200);assert.equal(published.body.bots.length,1);assert.equal(published.body.drafts.length,0);assert.equal(published.body.bots[0].revenue,0);
 assert.equal((await request('action',{type:'promote',id},cookie)).status,200);
 assert.equal((await request('action',{type:'promote',id},cookie)).status,400);
 const rested=await request('action',{type:'rest'},cookie);assert.equal(rested.body.energy,100);assert.ok(rested.body.report.revenue>0);assert.ok(rested.body.report.rows[0].arrivals>0);
 const second=await request('register',{username:'another_writer',password:'testing-password'});assert.equal((await request('state',null,second.cookie)).body.bots.length,0);
 assert.equal((await request('logout',{},cookie)).status,200);assert.equal((await request('state',null,cookie)).status,401);
 const login=await request('login',{username:'test_writer',password:'testing-password'});const saved=await request('state',null,login.cookie);assert.equal(saved.body.bots[0].title,'달빛 도서관');assert.equal(saved.body.theme,'mint');
 assert.equal((await fetch('http://127.0.0.1:3109/')).status,200);
 }finally{child.kill();await new Promise(r=>child.once('close',r));rmSync(dir,{recursive:true,force:true});}
});
