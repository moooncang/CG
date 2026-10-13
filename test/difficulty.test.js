import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
const start=(difficulty,seed=7)=>{const s=G.initial();s.meta.unlocks.push('nightmare_unlock');return G.act(s,{type:'newgame',name:'난이도',background:'student',traits:['muse'],seed,...(difficulty?{difficulty}:{})});};
const clear=s=>{while(s.run.queue.length)G.act(s,{type:'choose',option:0});};
const draft={type:'draft',title:'테스트',kind:'character',genre:'romance',tags:[],target:'female',form:'one',mode:'super',length:1,audience:'all',imageSource:'free',origin:'original',template:'custom'};
test('기존 저장과 미지정 난이도는 보통, 잘못된 선택은 거부',()=>{
 const s=start();assert.equal(s.run.difficulty,'normal');assert.equal(s.run.money,900000);
 delete s.run.difficulty;G.migrate(s);assert.equal(s.run.difficulty,'normal');assert.throws(()=>start('invalid'),/난이도/);
 const save=G.newSave();save.slots[0]=start('nightmare');save.current=0;
 assert.equal(G.migrateSave(JSON.parse(JSON.stringify(save))).slots[0].run.difficulty,'nightmare');
});
test('난이도별 시작 자금·체력·스트레스·지출·미션 조건은 단조 증가/감소',()=>{
 const rows=G.data.DIFFICULTIES.map(d=>{const s=start(d.id),r=s.run;const dv=G.derive(s);G.act(s,{type:'job',id:'store'});return {money:dv.bg.money*d.money,energy:dv.energyMax,stress:r.stress,cost:dv.costMul,req:dv.req.works,legacy:d.legacyMul};});
 for(let i=1;i<rows.length;i++){assert.ok(rows[i-1].money>rows[i].money);assert.ok(rows[i-1].energy>rows[i].energy);assert.ok(rows[i-1].stress<=rows[i].stress);assert.ok(rows[i-1].cost<rows[i].cost);assert.ok(rows[i-1].req<=rows[i].req);assert.ok(rows[i-1].legacy<rows[i].legacy);}
});
test('동일 작품의 신규 유입·수입 감소와 라이벌 경쟁 증가 (8개 시드)',()=>{
 for(let seed=1;seed<=8;seed++){
  const rows=G.data.DIFFICULTIES.map(d=>{const s=start(d.id,seed),r=s.run;G.act(s,draft);const w=r.drafts[0];for(const key of G.applicableModules(w))w.modules[key]=100;G.act(s,{type:'register',id:w.id,visibility:'public'});clear(s);r.creatorStage=2;G.act(s,{type:'endweek'});return {plays:r.report.players,cash:r.report.cash,rival:r.rivals.reduce((sum,rv)=>sum+rv.works.reduce((a,x)=>a+x.msgs,0),0)};});
  for(let i=1;i<rows.length;i++){assert.ok(rows[i-1].plays>=rows[i].plays);assert.ok(rows[i-1].cash>=rows[i].cash);assert.ok(rows[i-1].rival<rows[i].rival);}
 }
});
test('난이도 전용 이벤트: 6주차부터 12주 간격, 전용 풀, 랜덤 풀에서 제외',()=>{
 for(const d of G.data.DIFFICULTIES){
  const s=start(d.id),seen=[];
  while(s.run.week<19){clear(s);G.act(s,{type:'endweek'});for(const q of s.run.queue.filter(q=>q.difficulty)){assert.equal(q.difficulty,d.id);assert.ok([6,18].includes(s.run.week));seen.push(q.eventId);}}
  assert.equal(seen.length,2);assert.equal(new Set(seen).size,2);
  assert.ok(G.data.EVENTS.filter(e=>e.difficulty===d.id).length>=2);
 }
});
