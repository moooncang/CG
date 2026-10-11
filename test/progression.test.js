import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initial,migrate,act,derive,assess,comboValue,scoreOf,data as D} from '../game.js';
import * as G from '../game.js';

const start=(seed=7,extra={})=>{const s=initial();act(s,{type:'newgame',name:'테스트',background:'dreamer',traits:['muse'],seed,...extra});return s;};
const clear=s=>{while(s.run.queue.length)act(s,{type:'choose',option:0});};
const draft=(s,o={})=>act(s,{type:'draft',title:'밤의 도서관',genre:'romance',subject:'school',format:'single',cast:1,scale:'medium',focus:'immersion',...o});
function finishDraft(s){const d=s.run.drafts[0];let guard=0;while(Object.values(d.progress).some(v=>v<100)&&guard++<200){clear(s);const stage=Object.keys(d.progress).find(k=>d.progress[k]<100);if(s.run.energy<15){clear(s);act(s,{type:'endweek'});clear(s);continue;}act(s,{type:'work',id:d.id,stage});}clear(s);return d;}

test('새 회차 검증과 초기 상태',()=>{
 const s=initial();assert.throws(()=>act(s,{type:'newgame',name:'',background:'dreamer',traits:['muse']}),/이름/);
 assert.throws(()=>act(s,{type:'newgame',name:'a',background:'rich',traits:['muse']}),/유산/);
 assert.throws(()=>act(s,{type:'newgame',name:'a',background:'dreamer',traits:['muse','steel']}),/특성/);
 assert.throws(()=>act(s,{type:'newgame',name:'a',background:'dreamer',traits:['thrifty']}),/유산/);
 const r=start().run;assert.equal(r.week,1);assert.equal(r.coins,1600);assert.equal(r.energy,100);assert.equal(r.rivals.length,14);assert.ok(r.trend.genre);
 assert.throws(()=>act({...initial()},{type:'endweek'}),/회차/);
});
test('기획 검증: 슬롯, 잠긴 장르, 인물 수, 영감',()=>{
 const s=start();assert.throws(()=>draft(s,{genre:'sf'}),/열리지/);assert.throws(()=>draft(s,{format:'multi',cast:1}),/등장인물/);assert.throws(()=>draft(s,{format:'sim'}),/형태/);
 draft(s);assert.equal(s.run.drafts.length,1);assert.equal(s.run.coins,1480);assert.equal(s.run.inspiration,30);
 assert.throws(()=>draft(s,{title:'둘'}),/슬롯/);
 s.run.inspiration=5;s.run.drafts=[];assert.throws(()=>draft(s),/영감/);
});
test('작업 → 방향 선택 → 완성 → 공개 → 평가',()=>{
 const s=start(3);draft(s);const d=s.run.drafts[0];
 act(s,{type:'work',id:d.id,stage:'concept'});assert.ok(d.progress.concept>0);assert.ok(d.points.immersion>0);assert.equal(s.run.energy,75);
 assert.throws(()=>act(s,{type:'publish',id:d.id}),/100%/);
 finishDraft(s);assert.ok(Object.values(d.progress).every(v=>v>=100));assert.equal(d.milestones.length,4);
 assert.throws(()=>act(s,{type:'hire',id:d.id,helper:'nope'}),/외주/);act(s,{type:'hire',id:d.id,helper:'beta'});assert.throws(()=>act(s,{type:'hire',id:d.id,helper:'beta'}),/이미/);
 act(s,{type:'test',id:d.id});assert.ok(d.testNote.text.includes('테스트'));
 const est=assess(s,d);assert.ok(est.immersion>=1&&est.immersion<=100);
 act(s,{type:'publish',id:d.id});const w=s.run.works[0];assert.equal(s.run.drafts.length,0);assert.equal(w.reviews.length,4);assert.ok(w.reviewTotal>=4&&w.reviewTotal<=40);assert.equal(s.meta.combos['romance:school'],2);assert.ok(s.meta.trophies.includes('first'));
 assert.equal(s.run.queue[0].kind,'release');clear(s);
 act(s,{type:'endweek'});const rep=s.run.report;assert.ok(rep.rows[0].arrivals>0);assert.ok(rep.revenue>0);assert.ok(rep.rows[0].rank>=1);assert.equal(s.run.ranking.length,10);assert.ok(w.weekly.length===1);
 const beforeCoins=s.run.coins;clear(s);assert.throws(()=>act(s,{type:'promote',id:w.id,kind:'x'}),/홍보/);act(s,{type:'promote',id:w.id,kind:'sns'});assert.throws(()=>act(s,{type:'promote',id:w.id,kind:'sns'}),/이미/);assert.equal(s.run.coins,beforeCoins-80);
 act(s,{type:'update',id:w.id,stage:'prompt'});assert.throws(()=>act(s,{type:'update',id:w.id,stage:'assets'}),/이미/);assert.throws(()=>act(s,{type:'season',id:w.id}),/8주/);
});
test('궁합은 결정적이고 명시 조합이 우선한다',()=>{assert.equal(comboValue('horror','haunted'),2);assert.equal(comboValue('daily','zombie'),-2);const v=comboValue('comedy','palace');assert.equal(v,comboValue('comedy','palace'));assert.ok(v>=-1&&v<=1);});
test('선택지가 열려 있으면 다른 행동은 막힌다',()=>{const s=start(5);draft(s);const d=s.run.drafts[0];for(let i=0;i<4&&!s.run.queue.length;i++)act(s,{type:'work',id:d.id,stage:'concept'});if(s.run.queue.length){assert.throws(()=>act(s,{type:'work',id:d.id,stage:'concept'}),/선택지/);assert.throws(()=>act(s,{type:'choose',option:9}),/잘못/);act(s,{type:'choose',option:1});assert.ok(d.points.consistency>=9);}});
test('주 마감: 경제, 회복, 월초 구독 결제, 트렌드 교체',()=>{
 const s=start(11);const r=s.run;act(s,{type:'subscribe',id:'trend'});assert.equal(r.coins,1300);const next=r.nextTrend;r.stress=50;
 for(let i=0;i<4;i++){clear(s);act(s,{type:'endweek'});}
 assert.equal(r.week,5);assert.deepEqual(r.trend,next);assert.ok(r.report.events.some(e=>e.includes('구독료')));assert.ok(r.stress<50);assert.equal(r.energy,derive(s).energyMax);assert.ok(r.monthly);
});
test('번아웃과 생활·부업 제한',()=>{
 const s=start(2);const r=s.run;r.stress=99;clear(s);act(s,{type:'endweek'});assert.equal(r.stats.burnouts,1);assert.ok(r.queue.some(q=>q.eventId==='__burnout'));assert.equal(r.energy,50);clear(s);
 assert.throws(()=>act(s,{type:'job',id:'lecture'}),/명성/);act(s,{type:'job',id:'store'});assert.throws(()=>act(s,{type:'job',id:'store'}),/이미/);
 act(s,{type:'life',id:'nap'});assert.throws(()=>act(s,{type:'life',id:'nap'}),/이미/);
});
test('훈련·장비·작업실·구독',()=>{
 const s=start(4);const r=s.run;r.coins=50000;
 act(s,{type:'train',skill:'prompt'});assert.equal(r.skillXp.prompt,60);act(s,{type:'train',skill:'prompt'});assert.equal(r.skills.prompt,2);
 act(s,{type:'buy',id:'chair'});assert.throws(()=>act(s,{type:'buy',id:'chair'}),/이미/);assert.equal(derive(s).energyMax,110);
 act(s,{type:'move',studio:2});assert.equal(derive(s).slots,3);assert.throws(()=>act(s,{type:'move',studio:2}),/이미/);
 act(s,{type:'subscribe',id:'imagegen'});assert.ok(r.subs.includes('imagegen'));act(s,{type:'subscribe',id:'imagegen'});assert.ok(!r.subs.includes('imagegen'));
 assert.throws(()=>act(s,{type:'move',studio:9}),/작업실/);
});
test('조기 은퇴 엔딩과 유산, 다회차 해금',()=>{
 const s=start(9);const r=s.run;assert.throws(()=>act(s,{type:'retire'}),/1년차/);
 r.week=D.WEEKS_PER_YEAR+1;r.fame=100;act(s,{type:'retire'});assert.ok(r.ended);assert.ok(r.ended.legacy>=1);assert.equal(s.meta.runs.length,1);assert.ok(s.meta.endings.length===1);
 assert.throws(()=>act(s,{type:'endweek'}),/끝났/);
 s.meta.legacy=10;act(s,{type:'legacy',id:'two_traits'});act(s,{type:'legacy',id:'tr_thrifty'});assert.throws(()=>act(s,{type:'legacy',id:'tr_thrifty'}),/이미/);assert.equal(s.meta.legacy,4);
 act(s,{type:'newgame',name:'2회차',background:'dreamer',traits:['thrifty','muse'],seed:1});assert.equal(s.run.traits.length,2);assert.equal(s.meta.runs.length,1);assert.equal(derive(s).costMul,0.85);
 assert.equal(scoreOf(s.run).score>=0,true);
});
test('풀 런: 자동 플레이로 3년 완주하면 엔딩이 나온다',()=>{
 const s=start(21);const r=s.run;let guard=0;
 while(!r.ended&&guard++<400){clear(s);if(r.inspiration<25)act(s,{type:'life',id:'read'});if(r.stress>65)act(s,{type:'life',id:'friends'});
  if(!r.drafts.length&&r.inspiration>=20&&r.coins>=120)draft(s,{title:'작품'+r.works.length});
  let g=0;while(r.energy>=15&&g++<20){clear(s);const d=r.drafts[0];if(!d)break;const st=Object.keys(d.progress).find(k=>d.progress[k]<100);if(!st){act(s,{type:'publish',id:d.id});continue;}try{act(s,{type:'work',id:d.id,stage:st});}catch{break;}}
  clear(s);act(s,{type:'endweek'});}
 assert.ok(r.ended,'엔딩 도달');assert.equal(r.week,D.WEEKS_PER_YEAR*3+1);assert.ok(r.works.length>=5);assert.ok(r.awards.length>=0);assert.ok(s.meta.legacy>=1);assert.ok(r.history.coins.length===D.WEEKS_PER_YEAR*3);
 const copy=JSON.parse(JSON.stringify(s));migrate(copy);assert.equal(copy.run.ended.ending,r.ended.ending);
});
test('구버전 저장은 새 메타로 이전된다',()=>{const legacy={version:2,theme:'mint',bots:[{id:'old'}],drafts:[]};const s=migrate(legacy);assert.equal(s.version,3);assert.equal(s.theme,'mint');assert.equal(s.meta.legacy,1);assert.equal(s.run,null);});
test('세이브 슬롯: 선택·삭제·초기화·구버전 이전',()=>{
 const {newSave,actSave,migrateSave,summarize,SLOT_COUNT}=await_import();
 const save=newSave();assert.equal(save.current,null);assert.equal(save.slots.length,SLOT_COUNT);
 assert.throws(()=>actSave(save,{type:'newgame',name:'x',background:'student',traits:['steel']}),/슬롯/);
 assert.throws(()=>actSave(save,{type:'slot',op:'select',slot:9}),/슬롯/);
 actSave(save,{type:'slot',op:'select',slot:1});assert.equal(save.current,1);assert.ok(save.slots[1].meta);
 actSave(save,{type:'newgame',name:'슬롯둘',background:'student',traits:['steel']});assert.equal(save.slots[1].run.name,'슬롯둘');assert.equal(summarize(save.slots[1]).name,'슬롯둘');assert.equal(summarize(save.slots[0]),null);
 actSave(save,{type:'slot',op:'close'});assert.equal(save.current,null);assert.ok(save.slots[1].run);
 assert.throws(()=>actSave(save,{type:'slot',op:'delete',slot:1}),/확인/);actSave(save,{type:'slot',op:'delete',slot:1,confirm:true});assert.equal(save.slots[1],null);
 actSave(save,{type:'slot',op:'select',slot:0});actSave(save,{type:'slot',op:'reset',confirm:true});assert.equal(save.current,null);assert.ok(save.slots.every(x=>x===null));
 const old=initial();act(old,{type:'newgame',name:'옛날',background:'student',traits:['steel']});const migrated=migrateSave(JSON.parse(JSON.stringify(old)));assert.equal(migrated.current,0);assert.equal(migrated.slots[0].run.name,'옛날');
 assert.equal(migrateSave({version:2,bots:[{id:'x'}]}).current,0);assert.equal(migrateSave({version:2,bots:[]}).current,null);assert.equal(migrateSave(initial()).current,null);
});
function await_import(){return G;}
