import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
const {initial,migrate,act,derive,assess,scoreOf,applicableModules,requiredDone,data:D}=G;

const start=(seed=7,extra={})=>{const s=initial();act(s,{type:'newgame',name:'테스트',background:'dreamer',traits:['muse'],seed,...extra});return s;};
const clear=s=>{while(s.run.queue.length)act(s,{type:'choose',option:0});};
const base={title:'FULL DIVE : TEST',kind:'character',genre:'romance',tags:['북부대공','집착'],target:'female',form:'one',mode:'super',length:1,audience:'all',imageSource:'gen',origin:'original',template:'custom'};
const draft=(s,o={})=>act(s,{type:'draft',...base,...o});
function finish(s,d){let guard=0;while(!applicableModules(d).every(m=>d.modules[m]>=100)&&guard++<300){clear(s);const m=applicableModules(d).find(k=>d.modules[k]<100);if(s.run.energy<15){clear(s);act(s,{type:'endweek'});clear(s);continue;}if(s.run.money<100000)s.run.money=1000000;act(s,{type:'work',id:d.id,module:m});}clear(s);}

test('새 회차 검증과 초기 상태',()=>{
 const s=initial();assert.throws(()=>act(s,{type:'newgame',name:'',background:'dreamer',traits:['muse']}),/이름/);
 assert.throws(()=>act(s,{type:'newgame',name:'a',background:'rich',traits:['muse']}),/유산/);
 assert.throws(()=>act(s,{type:'newgame',name:'a',background:'dreamer',traits:['muse','steel']}),/특성/);
 const r=start().run;assert.equal(r.week,1);assert.equal(r.money,1600000);assert.equal(r.creatorStage,0);assert.equal(r.rivals.length,16);assert.equal(r.trend.tags.length,4);
 assert.throws(()=>act(initial(),{type:'endweek'}),/회차/);
});
test('작품 만들기 검증: 슬롯·장르·태그·영감',()=>{
 const s=start();assert.throws(()=>draft(s,{genre:'murim'}),/장르/);assert.throws(()=>draft(s,{title:'a'}),/이름/);
 draft(s,{tags:['북부대공','집착','회귀','빙의','없는태그']});const d=s.run.drafts[0];assert.deepEqual(d.tags,['북부대공','집착','회귀']);assert.equal(s.run.money,1540000);assert.equal(s.run.inspiration,30);
 assert.deepEqual(Object.keys(d.modules),['profile','prompt','start','media','keyword','shortcut','register']);
 assert.throws(()=>draft(s,{title:'둘째'}),/슬롯/);
 s.run.drafts=[];draft(s,{kind:'story',title:'스토리'});assert.ok('stat' in s.run.drafts[0].modules&&'ending' in s.run.drafts[0].modules);
 s.run.inspiration=5;s.run.drafts=[];assert.throws(()=>draft(s),/영감/);
});
test('탭 작업 → 방향 선택 → 등록 → 주간 집계·댓글',()=>{
 const s=start(3);draft(s);const d=s.run.drafts[0];
 act(s,{type:'work',id:d.id,module:'prompt'});assert.ok(d.modules.prompt>0);assert.ok(d.points.stability>0);assert.equal(s.run.energy,75);
 assert.throws(()=>act(s,{type:'register',id:d.id,visibility:'public'}),/필수/);assert.throws(()=>act(s,{type:'work',id:d.id,module:'stat'}),/탭/);
 finish(s,d);assert.ok(requiredDone(d));assert.ok(d.milestones.length>=4);
 act(s,{type:'hire',id:d.id,helper:'beta'});assert.throws(()=>act(s,{type:'hire',id:d.id,helper:'beta'}),/이미/);act(s,{type:'test',id:d.id});assert.ok(d.testNote.text.includes('테스트'));
 const {stats,volume}=assess(s,d);assert.ok(stats.story>=1&&stats.story<=100);assert.ok(volume>=3);
 act(s,{type:'register',id:d.id,visibility:'public'});const w=s.run.works[0];assert.equal(s.run.drafts.length,0);assert.equal(w.visibility,'public');assert.ok(w.everPublic);assert.equal(s.run.totals.publicWorks,1);assert.ok(s.meta.trophies.includes('first'));
 assert.equal(s.run.queue[0].kind,'release');clear(s);
 act(s,{type:'endweek'});const rep=s.run.report;assert.ok(rep.rows[0].arrivals>0);assert.ok(rep.msgs>0);assert.equal(rep.cash,0,'비크리에이터는 대화 정산 없음');assert.ok(rep.gift>=0);assert.equal(s.run.ranking.all.length,10);assert.ok(w.plays>0);
 clear(s);act(s,{type:'promote',id:w.id,kind:'gallery'});assert.throws(()=>act(s,{type:'promote',id:w.id,kind:'gallery'}),/이미/);assert.throws(()=>act(s,{type:'promote',id:w.id,kind:'discord'}),/인지도/);
 act(s,{type:'update',id:w.id,module:'prompt'});assert.throws(()=>act(s,{type:'update',id:w.id,module:'media'}),/이미/);
 act(s,{type:'comments',id:w.id});assert.ok(w.commentsClosed);
 for(let i=0;i<6;i++){clear(s);act(s,{type:'endweek'});}assert.ok(w.weekly.length>=7);
});
test('공개 여부와 오리지널 자격',()=>{
 const s=start(4);draft(s,{kind:'story',title:'비공개 스토리'});const d=s.run.drafts[0];finish(s,d);act(s,{type:'register',id:d.id,visibility:'private'});clear(s);const w=s.run.works[0];
 assert.equal(w.everPublic,false);assert.throws(()=>act(s,{type:'applyOriginal',id:w.id}),/크리에이터/);
 s.run.creatorStage=2;act(s,{type:'applyOriginal',id:w.id});assert.ok(w.originalReview);assert.throws(()=>act(s,{type:'visibility',id:w.id,visibility:'public'}),/심사/);
 for(let i=0;i<4;i++){clear(s);act(s,{type:'endweek'});}clear(s);assert.equal(w.originalReview,null);
 if(w.badges.original){assert.equal(w.visibility,'public');assert.throws(()=>act(s,{type:'archive',id:w.id}),/저작권/);assert.throws(()=>act(s,{type:'visibility',id:w.id,visibility:'private'}),/저작권/);act(s,{type:'sequel',id:w.id});assert.ok(s.run.drafts[0].title.endsWith(' S'));}
 else{act(s,{type:'visibility',id:w.id,visibility:'public'});assert.ok(w.everPublic);assert.throws(()=>act(s,{type:'applyOriginal',id:w.id}),/공개/);}
 s.run.drafts=[];clear(s);draft(s,{title:'팬픽',origin:'fanwork'});const f=s.run.drafts.at(-1);finish(s,f);act(s,{type:'register',id:f.id,visibility:'public'});clear(s);assert.throws(()=>act(s,{type:'only',id:s.run.works[0].id}),/2차/);
});
test('크리에이터 사다리와 월 정산·온리',()=>{
 const s=start(5);const r=s.run;r.creatorStage=0;r.totals.publicWorks=10;r.totals.players=1000;r.followers=500;clear(s);act(s,{type:'endweek'});assert.equal(r.creatorStage,1);
 r.totals.messages=100000;clear(s);act(s,{type:'endweek'});assert.equal(r.creatorStage,2);assert.ok(s.meta.trophies.includes('creator'));
 clear(s);draft(s);const d=r.drafts[0];finish(s,d);act(s,{type:'register',id:d.id,visibility:'public'});clear(s);const w=r.works[0];
 act(s,{type:'only',id:w.id});assert.equal(w.badges.only,r.week+24);assert.throws(()=>act(s,{type:'only',id:w.id}),/이미/);
 const before=r.pendingCash;clear(s);act(s,{type:'endweek'});assert.ok(r.report.cash>0,'크리에이터는 대화 정산 발생');assert.ok(r.pendingCash>before);
 r.pendingCash=200000;const money=r.money;while(G.weekOfMonth(r.week)!==1){clear(s);act(s,{type:'endweek'});}
 const st=r.statements[0];assert.ok(st.gross>=200000);assert.equal(st.paid,st.gross-st.tax);assert.equal(r.pendingCash,0);assert.ok(r.money>money-10000000);
});
test('선택지 대기 중엔 다른 행동이 막힌다',()=>{const s=start(5);draft(s);const d=s.run.drafts[0];for(let i=0;i<4&&!s.run.queue.length;i++)act(s,{type:'work',id:d.id,module:'start'});if(s.run.queue.length){assert.throws(()=>act(s,{type:'work',id:d.id,module:'start'}),/선택지/);assert.throws(()=>act(s,{type:'choose',option:9}),/잘못/);act(s,{type:'choose',option:0});assert.ok(d.points.story>=14);}});
test('주 마감: 구독 결제·트렌드 교체·번아웃·제한',()=>{
 const s=start(11);const r=s.run;act(s,{type:'subscribe',id:'trend'});assert.equal(r.money,1570000);const next=r.nextTrend;
 for(let i=0;i<4;i++){clear(s);act(s,{type:'endweek'});}assert.equal(r.week,5);assert.deepEqual(r.trend,next);assert.ok(r.report.events.some(e=>e.includes('구독료')));assert.ok(r.monthly);assert.ok(r.statements.length===1);
 clear(s);r.stress=99;act(s,{type:'endweek'});assert.equal(r.stats.burnouts,1);assert.equal(r.energy,50);clear(s);
 assert.throws(()=>act(s,{type:'job',id:'lecture'}),/인지도/);act(s,{type:'job',id:'store'});assert.throws(()=>act(s,{type:'job',id:'store'}),/이미/);act(s,{type:'life',id:'nap'});assert.throws(()=>act(s,{type:'life',id:'nap'}),/이미/);
});
test('훈련·장비·작업실·구독',()=>{
 const s=start(4);const r=s.run;r.money=50000000;
 act(s,{type:'train',skill:'prompt'});assert.equal(r.skillXp.prompt,60);act(s,{type:'train',skill:'prompt'});assert.equal(r.skills.prompt,2);assert.throws(()=>act(s,{type:'train',skill:'constructor'}),/역량/);
 act(s,{type:'buy',id:'chair'});assert.throws(()=>act(s,{type:'buy',id:'chair'}),/이미/);assert.equal(derive(s).energyMax,110);
 act(s,{type:'move',studio:2});assert.equal(derive(s).slots,3);assert.throws(()=>act(s,{type:'move',studio:9}),/작업실/);
 act(s,{type:'subscribe',id:'imagegen'});assert.ok(r.subs.includes('imagegen'));act(s,{type:'subscribe',id:'imagegen'});assert.ok(!r.subs.includes('imagegen'));
});
test('제재 누적은 즉시 엔딩',()=>{const s=start(8);const r=s.run;r.week=10;r.sanctions=3;r.queue.push({kind:'event',eventId:'ripped_caught',title:'x',text:'x',options:[{label:'a'},{label:'b'}]});act(s,{type:'choose',option:1});assert.ok(r.ended);assert.equal(r.ended.ending,'banned');});
test('조기 은퇴 엔딩과 유산, 다회차 해금',()=>{
 const s=start(9);const r=s.run;assert.throws(()=>act(s,{type:'retire'}),/1년차/);
 r.week=D.WEEKS_PER_YEAR+1;r.rep=100;act(s,{type:'retire'});assert.ok(r.ended);assert.ok(r.ended.legacy>=1);assert.equal(s.meta.runs.length,1);
 assert.throws(()=>act(s,{type:'endweek'}),/끝났/);
 s.meta.legacy=10;act(s,{type:'legacy',id:'two_traits'});act(s,{type:'legacy',id:'tr_thrifty'});assert.throws(()=>act(s,{type:'legacy',id:'tr_thrifty'}),/이미/);
 act(s,{type:'newgame',name:'2회차',background:'dreamer',traits:['thrifty','muse'],seed:1});assert.equal(s.run.traits.length,2);assert.equal(derive(s).costMul,0.85);assert.ok(scoreOf(s.run).score>=0);
});
test('풀 런: 자동 플레이 3년 완주',()=>{
 const s=start(21);const r=s.run;let guard=0,n=0;
 while(!r.ended&&guard++<400){clear(s);if(r.money<500000)try{act(s,{type:'job',id:'store'});}catch{}if(r.inspiration<25)act(s,{type:'life',id:'read'});if(r.stress>65)act(s,{type:'life',id:'friends'});
  if(!r.drafts.length&&r.inspiration>=20&&r.money>=200000)draft(s,{title:'작품'+(++n),kind:n%3?'character':'story',tags:r.trend.tags.slice(0,3)});
  let g=0;while(r.energy>=15&&g++<30){clear(s);const d=r.drafts[0];if(!d)break;const m=applicableModules(d).find(k=>d.modules[k]<100&&(D.MODULES[k].required||k==='keyword'));if(!m){act(s,{type:'register',id:d.id,visibility:'public'});continue;}try{act(s,{type:'work',id:d.id,module:m});}catch{break;}}
  clear(s);act(s,{type:'endweek'});}
 assert.ok(r.ended,'엔딩 도달');assert.equal(r.week,D.WEEKS_PER_YEAR*3+1);assert.ok(r.works.length>=10);assert.equal(r.creatorStage,2,'3년이면 크리에이터 달성');assert.ok(r.settledTotal>0);assert.ok(s.meta.insights.length>=3);assert.ok(s.meta.archive.length===1);
 const copy=JSON.parse(JSON.stringify(s));migrate(copy);assert.equal(copy.run.ended.ending,r.ended.ending);
});
test('구버전 저장은 새 메타로 이전된다',()=>{const legacy={version:3,theme:'mint',meta:{legacy:4,runs:[{}]},run:{}};const s=migrate(legacy);assert.equal(s.version,5);assert.equal(s.meta.legacy,4);assert.equal(s.run,null);});
test('세이브 슬롯: 선택·삭제·초기화·이전',()=>{
 const {newSave,actSave,migrateSave,summarize,SLOT_COUNT}=G;
 const save=newSave();assert.equal(save.current,null);assert.equal(save.slots.length,SLOT_COUNT);
 assert.throws(()=>actSave(save,{type:'newgame',name:'x',background:'student',traits:['steel']}),/슬롯/);
 actSave(save,{type:'slot',op:'select',slot:1});actSave(save,{type:'newgame',name:'슬롯둘',background:'student',traits:['steel']});assert.equal(summarize(save.slots[1]).name,'슬롯둘');assert.equal(summarize(save.slots[0]),null);
 actSave(save,{type:'slot',op:'close'});assert.equal(save.current,null);assert.throws(()=>actSave(save,{type:'slot',op:'delete',slot:1}),/확인/);actSave(save,{type:'slot',op:'delete',slot:1,confirm:true});assert.equal(save.slots[1],null);
 actSave(save,{type:'slot',op:'select',slot:0});actSave(save,{type:'slot',op:'reset',confirm:true});assert.ok(save.slots.every(x=>x===null));
 const old=initial();act(old,{type:'newgame',name:'옛날',background:'student',traits:['steel']});assert.equal(migrateSave(JSON.parse(JSON.stringify(old))).slots[0].run.name,'옛날');
});
