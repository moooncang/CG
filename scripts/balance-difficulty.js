// 재현 가능한 밸런스 비교: 대학생·영감형, 무료 이미지, 동일한 운영 정책, 난이도별 8개 시드.
// 한 가지 자동 전략의 비교이며 사람의 승률이나 최적 플레이를 뜻하지 않는다.
import * as G from '../game.js';
const clear=s=>{while(s.run.queue.length)G.act(s,{type:'choose',option:0});};
for(const difficulty of G.data.DIFFICULTIES){const out=[];
for(let seed=1;seed<=8;seed++){
 const s=G.act(G.initial(),{type:'newgame',name:'밸런스',background:'student',traits:['muse'],difficulty:difficulty.id,seed});const r=s.run;let n=0;
 while(!r.ended){clear(s);
 if(r.money<400000&&r.energy>=30)G.act(s,{type:'job',id:'store'});
 if(r.inspiration<25&&r.energy>=15)G.act(s,{type:'life',id:'read'});
 if(r.stress>55&&r.energy>=20)G.act(s,{type:'life',id:'friends'});
 if(!r.drafts.length&&r.inspiration>=20&&r.money>=200000&&r.energy>=10)G.act(s,{type:'draft',title:'작품'+(++n),kind:'character',genre:'romance',tags:r.trend.tags.slice(0,3),target:'female',form:'one',mode:'super',length:1,audience:'all',imageSource:'free',origin:'original',template:'custom'});
 for(let i=0;i<30&&r.energy>=15;i++){clear(s);const d=r.drafts[0];if(!d)break;const m=G.applicableModules(d).find(k=>d.modules[k]<100&&(G.data.MODULES[k].required||k==='keyword'));if(!m){G.act(s,{type:'register',id:d.id,visibility:'public'});continue;}G.act(s,{type:'work',id:d.id,module:m});}
 clear(s);G.act(s,{type:'endweek'});
 }
 out.push({works:r.works.length,stage:r.creatorStage,score:r.ended.score,burnouts:r.stats.burnouts,weeks:r.week});
}
const mean=key=>Math.round(out.reduce((sum,r)=>sum+r[key],0)/out.length*10)/10;console.log(difficulty.name,JSON.stringify({runs:out.length,completed:out.filter(r=>r.weeks===145).length,creators:out.filter(r=>r.stage===2).length,works:mean('works'),score:mean('score'),burnouts:mean('burnouts')}));}
