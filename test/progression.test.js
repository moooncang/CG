import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initial,migrate,act,assess} from '../game.js';
const draft={title:'밤의 도서관',genre:'판타지',prompt:'도서관을 지키는 사서는 조용하고 다정한 말투로 방문자를 맞이합니다. 잃어버린 기억을 찾는 모험을 시작합니다.',intro:'비가 내리는 밤 도서관 문이 열립니다.',guide:'사서에게 말을 걸어 잃어버린 기억을 찾아보세요.',images:2,cast:1,format:'character'};
test('complexity, fatigue, testing freshness and no length-based quality bonus',()=>{
 const s=initial();s.coins=10000;act(s,{type:'draft',...draft});const d=s.drafts[0];d.progress={concept:70,prompt:70,assets:70,packaging:70};
 const simple=assess(s,d);assert.ok(assess(s,{...d,cast:6,format:'simulation'}).stability<simple.stability);
 assert.deepEqual(assess(s,{...d,prompt:d.prompt.repeat(5)}),simple);
 act(s,{type:'test',id:d.id});act(s,{type:'work',id:d.id,stage:'prompt'});assert.throws(()=>act(s,{type:'publish',id:d.id}),/테스트/);
 act(s,{type:'test',id:d.id});act(s,{type:'publish',id:d.id});assert.equal(s.bots.length,1);assert.equal(s.bots[0].readers,0);
 act(s,{type:'rest'});assert.ok(s.report.revenue>0);const oldReaders=s.bots[0].readers;act(s,{type:'update',id:d.id,stage:'prompt'});assert.equal(s.bots[0].readers,oldReaders);assert.throws(()=>act(s,{type:'update',id:d.id,stage:'assets'}),/오늘/);
 const tired=initial();tired.coins=10000;act(tired,{type:'draft',...draft});const awake=structuredClone(tired);tired.stress=100;act(tired,{type:'work',id:tired.drafts[0].id,stage:'concept'});act(awake,{type:'work',id:awake.drafts[0].id,stage:'concept'});assert.ok(tired.drafts[0].progress.concept<awake.drafts[0].progress.concept);
});
test('legacy migration and recovery from depleted funds',()=>{
 const legacy={...initial(),bots:[{id:'old',quality:50,readers:100,revenue:400,day:1}]};delete legacy.drafts;delete legacy.stress;migrate(legacy);assert.equal(legacy.bots[0].revenue,400);assert.equal(legacy.bots[0].readers,100);assert.equal(legacy.stress,0);assert.deepEqual(legacy.drafts,[]);
 legacy.coins=0;act(legacy,{type:'gig'});assert.equal(legacy.coins,120);assert.throws(()=>act(legacy,{type:'gig'}),/오늘/);act(legacy,{type:'rest'});act(legacy,{type:'gig'});assert.ok(legacy.coins>=240);
});
