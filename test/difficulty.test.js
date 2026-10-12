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
test('작업 및 방향 선택의 스탯 성장, 기존 작품은 소급 변경하지 않음',()=>{
 const points=[];
 for(const d of G.data.DIFFICULTIES){
  const s=start(d.id);G.act(s,draft);const w=s.run.drafts[0];
  G.act(s,{type:'work',id:w.id,module:'start'});points.push(w.points.story);
  s.run.queue=[{kind:'milestone',draftId:w.id,module:'start',options:[{},{}]}];
  const before=w.points.story;G.act(s,{type:'choose',option:0});
  assert.equal(Math.round((w.points.story-before)*10)/10,Math.round(14*d.stats*10)/10);
  assert.equal(w.points.stability,-3,'선택의 부작용은 그대로');
  for(const key of G.applicableModules(w))w.modules[key]=100;
  G.act(s,{type:'register',id:w.id,visibility:'private'});
  const stats=structuredClone(s.run.works[0].stats);G.migrate(s);assert.deepEqual(s.run.works[0].stats,stats);
 }
 for(let i=1;i<points.length;i++)assert.ok(points[i-1]>points[i]);
});
test('공모전 동일 출품작의 순위와 경쟁 점수는 난이도 순 (24개 시드)',()=>{
 let rankChanges=0;
 for(let seed=1;seed<=24;seed++){
  const base=start('normal',seed);G.act(base,draft);const w=base.run.drafts[0];for(const key of G.applicableModules(w))w.modules[key]=100;
  G.act(base,{type:'register',id:w.id,visibility:'private'});clear(base);
  const work=base.run.works[0];work.quality=90;work.weekly=[{week:1,msgs:100000}];
  base.run.contest.endWeek=1;base.run.contest.entries=[work.id];
  const results=G.data.DIFFICULTIES.map(d=>{const s=structuredClone(base);s.run.difficulty=d.id;G.act(s,{type:'endweek'});return s.run.contestHistory[0];});
  for(let i=1;i<results.length;i++){
   assert.ok(results[i-1].mine[0].rank<=results[i].mine[0].rank);
   if(results[i-1].mine[0].rank<results[i].mine[0].rank)rankChanges++;
   const prev=results[i-1].board.filter(x=>x.rival).map(x=>x.score),next=results[i].board.filter(x=>x.rival).map(x=>x.score);
   for(let j=0;j<Math.min(prev.length,next.length);j++)assert.ok(prev[j]<=next[j]);
  }
 }
 assert.ok(rankChanges>0,'심사 점수뿐 아니라 실제 순위에도 차이가 있어야 함');
});
test('난이도별 이벤트 2종: 주기, 전용 풀, 저장 복원과 양쪽 선택',()=>{
 for(const d of G.data.DIFFICULTIES){
  const s=start(d.id),seen=[];
  while(s.run.week<19){
   clear(s);G.act(s,{type:'endweek'});
   for(const q of s.run.queue.filter(q=>q.difficulty)){
    assert.equal(q.difficulty,d.id);assert.ok([6,18].includes(s.run.week));seen.push(q.eventId);
    const ev=G.data.EVENTS.find(e=>e.id===q.eventId);
    for(let option=0;option<2;option++){
     const copy=G.migrate(JSON.parse(JSON.stringify(s)));copy.run.queue=[structuredClone(q)];
     const before=copy.run.money;G.act(copy,{type:'choose',option});assert.equal(copy.run.queue.length,0);
     assert.equal(copy.run.money,before+(ev.options[option].effects.money||0));assert.ok(copy.run.log[0].includes(ev.options[option].log));
     for(const key of ['reach','progress']){const mod=ev.options[option].effects[key+'Mod'];if(mod)assert.deepEqual(copy.run.mods[key].at(-1),mod);}
    }
   }
  }
  assert.equal(seen.length,2);assert.equal(new Set(seen).size,2);
 }
});
