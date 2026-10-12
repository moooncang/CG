import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
const start=(difficulty,seed=7)=>G.act(G.initial(),{type:'newgame',name:'난이도',background:'student',traits:['muse'],seed,...(difficulty?{difficulty}:{})});
const clear=s=>{while(s.run.queue.length)G.act(s,{type:'choose',option:0});};
const draft={type:'draft',title:'테스트',kind:'character',genre:'romance',tags:[],target:'female',form:'one',mode:'super',length:1,audience:'all',imageSource:'free',origin:'original',template:'custom'};
test('기존 저장과 미지정 난이도는 보통, 잘못된 선택은 거부',()=>{
 const s=start();assert.equal(s.run.difficulty,'normal');assert.equal(s.run.money,900000);
 delete s.run.difficulty;G.migrate(s);assert.equal(s.run.difficulty,'normal');
 assert.deepEqual(s,start('normal'));assert.throws(()=>start('invalid'),/난이도/);
 const save=G.newSave();save.slots[0]=start('legend');save.current=0;
 assert.equal(G.migrateSave(JSON.parse(JSON.stringify(save))).slots[0].run.difficulty,'legend');
 assert.throws(()=>G.act(save.slots[0],{type:'difficulty',difficulty:'easy'}),/알 수 없는/);
});
test('난이도별 운영 부담, 휴식 효과, 품질 판정 및 유산 자금',()=>{
 const stats=[];
 for(const d of G.data.DIFFICULTIES){
  const s=start(d.id),r=s.run;const money=r.money,energy=r.energy;
  G.act(s,{type:'job',id:'store'});const stress=r.stress;
  G.act(s,{type:'life',id:'nap'});assert.equal(r.stress,Math.max(0,stress+G.data.LIFE.find(x=>x.id==='nap').stress));
  G.act(s,draft);stats.push({money,energy,stress,quality:G.assess(s,r.drafts[0])});
  const bonus=G.initial();bonus.meta.unlocks.push('start_money');G.act(bonus,{type:'newgame',name:'유산',background:'student',traits:['muse'],difficulty:d.id});assert.equal(bonus.run.money,money+2000000);
 }
 for(let i=1;i<stats.length;i++){assert.ok(stats[i-1].money>stats[i].money);assert.ok(stats[i-1].energy>stats[i].energy);assert.ok(stats[i-1].stress<stats[i].stress);assert.deepEqual(stats[i].quality,stats[0].quality);}
});
test('동일 작품의 신규 유입·수입 감소와 라이벌 경쟁 증가 (12개 시드)',()=>{
 for(let seed=1;seed<=12;seed++){
  const rows=[];
  for(const d of G.data.DIFFICULTIES){
   const s=start(d.id,seed),r=s.run;G.act(s,draft);const w=r.drafts[0];
   for(const key of G.applicableModules(w))w.modules[key]=100;
   G.act(s,{type:'register',id:w.id,visibility:'public'});clear(s);r.creatorStage=2;
   G.act(s,{type:'endweek'});rows.push({plays:r.report.players,cash:r.report.cash,rival:r.rivals.reduce((sum,rv)=>sum+rv.works.reduce((sum,w)=>sum+w.msgs,0),0)});
  }
  for(let i=1;i<rows.length;i++){assert.ok(rows[i-1].plays>=rows[i].plays);assert.ok(rows[i-1].cash>=rows[i].cash);assert.ok(rows[i-1].rival<rows[i].rival);}
 }
});
