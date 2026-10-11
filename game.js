// 크랙 작가 키우기 — 게임 엔진. 순수 함수 act(state, action)으로 상태를 전이한다.
// 서버와 브라우저(GitHub Pages 저장 모드)에서 동일하게 동작한다. 난수는 run.rngState에 저장되어 재현 가능하다.
import * as D from './data.js';

const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
const R=n=>Math.round(n);
const pick=(run,arr)=>arr[Math.floor(rng(run)*arr.length)];
export function rng(run){let t=run.rngState=(run.rngState+0x6D2B79F5)|0;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;}
const noise=(run,spread)=>1+(rng(run)*2-1)*spread;
const uid=()=>{const c=globalThis.crypto;if(c?.randomUUID)return c.randomUUID().slice(0,8);return Math.random().toString(16).slice(2,10);};
const hash=str=>{let h=2166136261;for(const ch of str){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
export const yearOf=w=>Math.floor((w-1)/D.WEEKS_PER_YEAR)+1;
export const monthOf=w=>Math.floor(((w-1)%D.WEEKS_PER_YEAR)/D.WEEKS_PER_MONTH)+1;
export const weekOfMonth=w=>((w-1)%D.WEEKS_PER_MONTH)+1;
export const calendar=w=>`${yearOf(w)}년차 ${monthOf(w)}월 ${weekOfMonth(w)}주`;

export function comboValue(genre,subject){const key=genre+':'+subject;if(Object.hasOwn(D.COMBO_OVERRIDES,key))return D.COMBO_OVERRIDES[key];return (hash(key)%3)-1;}
export const comboLabel=v=>({2:'★ 최고 궁합',1:'○ 좋은 궁합',0:'△ 보통','-1':'▽ 어긋남','-2':'✕ 최악'})[v];

export const initial=()=>({version:3,theme:'violet',meta:{legacy:0,unlocks:[],endings:[],trophies:[],combos:{},runs:[],best:0},run:null});
export function migrate(s){
 if(!s||typeof s!=='object')return initial();
 if(s.version!==3){const fresh=initial();fresh.theme=['violet','mint','sunset'].includes(s.theme)?s.theme:'violet';if(s.bots?.length||s.drafts?.length)fresh.meta.legacy=1;return fresh;}
 s.meta??=initial().meta;s.meta.combos??={};s.meta.unlocks??=[];s.meta.endings??=[];s.meta.trophies??=[];s.meta.runs??=[];s.meta.best??=0;s.meta.legacy??=0;
 if(s.run){const r=s.run;r.queue??=[];r.mods??={};r.history??={followers:[],coins:[],fame:[]};r.weekActions??={promos:{},jobs:{},nap:false,updates:{}};r.stats??={};r.flags??={};r.awards??=[];r.ownedStudios??=[0];}
 return s;
}

export function has(s,unlock){return s.meta.unlocks.includes(unlock);}
export function derive(s){
 const r=s.run;if(!r)return null;
 const bg=D.BACKGROUNDS.find(b=>b.id===r.background)||D.BACKGROUNDS[0];const studio=D.STUDIOS[r.studio];const items=r.items.map(id=>D.ITEMS.find(i=>i.id===id)).filter(Boolean);
 const t=id=>r.traits.includes(id);const sum=k=>items.reduce((a,i)=>a+(i.effect[k]||0),0);
 const level=Math.floor(Math.sqrt(r.xp/60))+1;
 const energyMax=bg.energy+studio.energy+sum('energy')+(t('owl')?15:0)+(r.energyBonus||0);
 const slots=studio.slots+(t('prolific')?1:0);
 const crit=0.06+r.inspiration/500+sum('crit')+(t('lucky')?0.1:0);
 const costMul=t('thrifty')?0.85:1;
 const genres=D.GENRES.filter(g=>has(s,'all_genres')||g.unlock<=r.skills.planning);
 const subjects=D.SUBJECTS.filter(g=>has(s,'all_genres')||g.unlock<=r.skills.planning);
 const formats=D.FORMATS.filter(f=>f.unlock<=level||(f.id==='world'&&has(s,'world_format')));
 const statMul={immersion:1+sum('immersionMul'),consistency:1+sum('consistencyMul')+(t('lorekeeper')?0.2:0),visual:1+sum('visualMul')+(t('visualist')?0.25:0)+(r.subs.includes('imagegen')?0.15:0),appeal:1+sum('appealMul')};
 const pointMul=(t('perfectionist')?1.15:1)*(t('speedster')?0.9:1);
 const progressMul=(t('perfectionist')?0.85:1)*(t('speedster')?1.25:1)*modMul(r,'progress');
 const trainCost=sk=>R(200*Math.pow(r.skills[sk],1.5)*costMul);
 const helperMul=(r.studio>=3?0.8:1)*costMul;
 const recover=10+studio.recover+sum('recover');
 const inspirationWeekly=5+sum('inspiration')+(t('muse')?12:0);
 return {level,energyMax,slots,crit,costMul,genres,subjects,formats,statMul,pointMul,progressMul,progressBonus:sum('progress'),trainCost,helperMul,recover,inspirationWeekly,studio,bg,weeksLeft:r.careerWeeks-r.week+1,fameTier:fameTier(r.fame)};
}
export function fameTier(f){return f>=2500?'전설':f>=1200?'스타':f>=500?'인기 작가':f>=150?'주목받는 신인':f>=30?'신인':'무명';}
function modMul(r,key){return (r.mods[key]||[]).reduce((a,m)=>a*m.mul,1);}
function skillNeed(lv){return 80*lv;}

// 제작 중 초안의 예상 능력치 (공개 시 실제 계산과 동일하되 노이즈 없음)
export function assess(s,d){
 const r=s.run,dv=derive(s);const out={};const combo=comboValue(d.genre,d.subject);const lore=r.traits.includes('lorekeeper');
 for(const [stage,st] of Object.entries(D.STAGES)){
  let v=18+d.points[st.stat]*0.5+r.skills[st.skill]*2.5+combo*3;
  if(st.stat==='consistency'){v-=(d.cast-1)*(lore?2:4);if(d.format==='sim')v-=6;if(d.format==='world')v-=12;if(r.subs.includes('model'))v+=6;}
  if(st.stat==='immersion'){if(d.format==='multi')v+=5;if(d.format==='sim')v+=6;if(d.format==='world')v+=12;}
  if(st.stat==='appeal'&&d.format==='world')v+=4;
  out[st.stat]=clamp(R(v),1,100);
 }
 return out;
}
const quality=stats=>R(Object.values(stats).reduce((a,b)=>a+b)/4);

function spend(s,coins,energy){const r=s.run,dv=derive(s);coins=R(coins*dv.costMul);if(r.energy<energy)throw Error(`체력이 부족해요. (필요 ${energy}, 보유 ${r.energy})`);if(r.coins<coins)throw Error(`코인이 부족해요. (필요 ${coins} C)`);r.coins-=coins;r.energy-=energy;return coins;}
function addStress(r,n){if(n>0&&r.traits.includes('steel'))n*=0.7;r.stress=clamp(R(r.stress+n));}
function addFollowers(r,n){if(n>0&&r.traits.includes('social'))n*=1.3;r.followers=Math.max(0,R(r.followers+n));}
function addSkillXp(r,sk,n){r.skillXp[sk]+=n;while(r.skills[sk]<10&&r.skillXp[sk]>=skillNeed(r.skills[sk])){r.skillXp[sk]-=skillNeed(r.skills[sk]);r.skills[sk]++;log(r,`${D.SKILLS[sk].name} 역량이 Lv.${r.skills[sk]}이 되었다!`);}if(r.skills[sk]>=10)r.skillXp[sk]=0;}
function log(r,msg){r.log.unshift(`[${calendar(r.week)}] ${msg}`);r.log=r.log.slice(0,40);}
function trophy(s,id){if(!s.meta.trophies.includes(id)){s.meta.trophies.push(id);const t=D.TROPHIES.find(x=>x.id===id);if(s.run)log(s.run,`🏆 업적 달성: ${t?.name||id}`);}}
const findDraft=(r,id)=>{const d=r.drafts.find(d=>d.id===id);if(!d)throw Error('초안을 찾을 수 없어요.');return d;};
const findWork=(r,id)=>{const w=r.works.find(w=>w.id===id);if(!w)throw Error('작품을 찾을 수 없어요.');return w;};

function rollTrend(r){const gs=D.GENRES.filter(g=>g.unlock<=Math.max(3,r.skills.planning+1));return {genre:pick(r,gs).id,subject:pick(r,D.SUBJECTS).id};}
function makeRival(r,i){return {id:'rv'+i,name:D.RIVAL_NAMES[i%D.RIVAL_NAMES.length],power:60+R(rng(r)*160),style:pick(r,D.GENRES).id,works:[]};}
function rivalTitle(r){return `${pick(r,D.TITLE_ADJ)} ${pick(r,D.TITLE_NOUN)}${pick(r,D.TITLE_TAIL)}`;}

export function startRun(s,a){
 const name=String(a.name||'').trim();if(!name||name.length>12)throw Error('작가 이름은 1~12자로 입력해 주세요.');
 const bg=D.BACKGROUNDS.find(b=>b.id===a.background);if(!bg)throw Error('배경을 선택해 주세요.');if(bg.legacy>0&&!has(s,'bg_'+bg.id))throw Error('유산으로 해금해야 하는 배경이에요.');
 const traits=[...new Set((Array.isArray(a.traits)?a.traits:[a.traits]).filter(Boolean))];const maxTraits=has(s,'two_traits')?2:1;
 if(traits.length<1||traits.length>maxTraits)throw Error(`특성을 ${maxTraits}개 선택해 주세요.`);
 for(const id of traits){const t=D.TRAITS.find(t=>t.id===id);if(!t)throw Error('알 수 없는 특성이에요.');if(t.legacy>0&&!has(s,'tr_'+id))throw Error(`${t.name}은(는) 유산으로 해금해야 해요.`);}
 const seed=typeof a.seed==='number'?a.seed|0:(hash(name+Date.now())|0);
 const r={name,background:bg.id,traits,week:1,careerWeeks:D.WEEKS_PER_YEAR*(has(s,'long_career')?5:D.CAREER_YEARS),rngState:seed,
  coins:bg.coins+(has(s,'start_coins')?2000:0),energy:0,stress:10,inspiration:50,followers:(bg.followers||0)+(has(s,'start_fans')?500:0),fame:0,xp:0,energyBonus:0,
  skills:{planning:1,prompt:1,image:1,design:1,marketing:1},skillXp:{planning:0,prompt:0,image:0,design:0,marketing:0},
  studio:bg.studio||0,ownedStudios:[0,...(bg.studio?[bg.studio]:[])],items:[],subs:[],drafts:[],works:[],rivals:[],trend:null,nextTrend:null,trendBoost:1,contestMonth:0,
  mods:{},queue:[],report:null,ranking:[],monthly:null,history:{followers:[],coins:[],fame:[]},weekActions:{promos:{},jobs:{},nap:false,updates:{},freeAssets:false},
  stats:{works:0,hof:0,burnouts:0,stressSum:0,weekly1:0,monthly1:0,bestRank:999,genres:[],zero:false},flags:{},awards:[],log:[],ended:null};
 for(const [k,v] of Object.entries(bg.skills||{}))r.skills[k]=v;if(has(s,'start_skill'))for(const k in r.skills)r.skills[k]=Math.min(10,r.skills[k]+1);
 r.rivals=Array.from({length:14},(_,i)=>makeRival(r,i));for(const rv of r.rivals)if(rng(r)<0.7)rv.works.push({title:rivalTitle(r),releasedWeek:1-R(rng(r)*6),chats:0});
 r.trend=rollTrend(r);r.nextTrend=rollTrend(r);r.energy=derive({...s,run:r}).energyMax;
 s.run=r;log(r,`${name} 작가의 크랙 데뷔 ${r.careerWeeks/D.WEEKS_PER_YEAR}년 도전이 시작됐다. 첫 작품을 기획해 보자!`);
 return s;
}

function requireRun(s){if(!s.run)throw Error('진행 중인 회차가 없어요. 새 회차를 시작해 주세요.');if(s.run.ended)throw Error('이 회차는 끝났어요. 새 회차를 시작해 주세요.');return s.run;}
function requireFree(r){if(r.queue.length)throw Error('먼저 눈앞의 선택지를 골라 주세요.');}

const MILESTONES={
 concept:[{label:'세계관 디테일 강화',effects:{immersion:12,progress:-10},log:'세계관을 더 깊게 팠다.'},{label:'핵심만 간결하게',effects:{consistency:9},log:'불필요한 설정을 덜어냈다.'},{label:'반전 요소 추가',effects:{immersion:18,consistency:-6},log:'충격적인 반전을 심었다.'}],
 prompt:[{label:'예시 대사 대량 투입',effects:{immersion:9,consistency:-5},log:'생생한 대사가 늘었다.'},{label:'규칙 중심으로 압축',effects:{consistency:13,immersion:-3},log:'토큰을 아끼고 규칙을 세웠다.'},{label:'말투 샘플 정제',effects:{consistency:7,appeal:5},log:'말투가 또렷해졌다.'}],
 assets:[{label:'표정 차분 추가 (-150 C)',effects:{visual:14,coins:-150},log:'다양한 표정이 생겼다.'},{label:'분위기 배경 통일',effects:{visual:7,appeal:5},log:'작품 톤이 일관돼졌다.'},{label:'상황 코드 자동화',effects:{consistency:7,visual:4},log:'상황에 맞는 이미지가 자동으로.'}],
 packaging:[{label:'썸네일에 올인',effects:{appeal:15,immersion:-2},log:'눈길을 끄는 썸네일!'},{label:'소개글에 떡밥 심기',effects:{appeal:9,immersion:7},log:'궁금증을 유발하는 소개.'},{label:'플레이 가이드 상세화',effects:{consistency:7,appeal:7},log:'독자가 길을 잃지 않는다.'}],
};

export function act(s,a){
 migrate(s);if(!a||typeof a!=='object')throw Error('잘못된 요청이에요.');
 const type=a.type;
 if(type==='theme'){if(!['violet','mint','sunset'].includes(a.theme))throw Error('잘못된 테마예요.');s.theme=a.theme;return s;}
 if(type==='legacy'){const item=D.LEGACY_SHOP.find(i=>i.id===a.id);if(!item)throw Error('알 수 없는 유산 항목이에요.');if(has(s,item.id))throw Error('이미 해금했어요.');if(s.meta.legacy<item.cost)throw Error(`유산 포인트가 부족해요. (필요 ${item.cost})`);s.meta.legacy-=item.cost;s.meta.unlocks.push(item.id);return s;}
 if(type==='newgame'){if(s.run&&!s.run.ended&&!a.confirm)throw Error('진행 중인 회차가 있어요. 포기하려면 확인이 필요해요.');return startRun(s,a);}
 const r=requireRun(s);
 if(type==='choose')return choose(s,a);
 requireFree(r);
 const dv=derive(s);
 switch(type){
  case 'draft':return createDraft(s,a,dv);
  case 'work':return work(s,a,dv);
  case 'hire':{const d=findDraft(r,a.id);const h=D.HELPERS.find(h=>h.id===a.helper);if(!h)throw Error('알 수 없는 외주예요.');if(d.helpers.includes(h.id))throw Error('이미 의뢰한 외주예요.');spend(s,h.price*dv.helperMul/dv.costMul,5);d.helpers.push(h.id);d.progress[h.stage]=Math.min(100,d.progress[h.stage]+h.progress);d.points[h.stat]+=h.points;checkMilestone(r,d,h.stage);log(r,`「${d.title}」 ${h.name} 완료.`);break;}
  case 'test':{const d=findDraft(r,a.id);if(Object.values(d.progress).some(v=>v<30))throw Error('모든 공정을 30% 이상 진행한 뒤 테스트할 수 있어요.');spend(s,r.subs.includes('model')?30:60,10);d.tests++;d.points.consistency+=5;const est=assess(s,d);const weak=Object.entries(est).sort((a,b)=>a[1]-b[1])[0][0];d.testNote={week:r.week,est,weak,text:`비공개 테스트 #${d.tests}: ${D.WEAK_LINES[weak]} 설정 유지 포인트 +5.`};addSkillXp(r,'prompt',6);log(r,`「${d.title}」 비공개 테스트 완료.`);break;}
  case 'scrap':{const d=findDraft(r,a.id);r.drafts=r.drafts.filter(x=>x.id!==d.id);addStress(r,-5);log(r,`「${d.title}」 초안을 폐기했다. 다음엔 더 잘할 수 있다.`);break;}
  case 'publish':return publish(s,a,dv);
  case 'promote':{const w=findWork(r,a.id);const p=D.PROMOS.find(p=>p.id===a.kind);if(!p)throw Error('알 수 없는 홍보예요.');if(w.status!=='active')throw Error('연재 중인 작품만 홍보할 수 있어요.');const used=r.weekActions.promos[w.id]??=[];if(used.includes(p.id))throw Error('이번 주에 이미 실행한 홍보예요.');spend(s,p.coins,p.energy);used.push(p.id);if(p.followers)addFollowers(r,p.followers);addStress(r,3);addSkillXp(r,'marketing',8);log(r,`「${w.title}」 ${p.name} 실행. 이번 주 유입 ×${p.mul}.`);break;}
  case 'update':{const w=findWork(r,a.id);const st=Object.hasOwn(D.STAGES,a.stage)?D.STAGES[a.stage]:null;if(!st)throw Error('개선할 공정을 선택하세요.');if(w.status!=='active')throw Error('연재 중인 작품만 업데이트할 수 있어요.');if(r.weekActions.updates[w.id])throw Error('이번 주에 이미 업데이트했어요.');if(w.stats[st.stat]>=100)throw Error('이미 완벽한 항목이에요.');spend(s,120,20);w.stats[st.stat]=clamp(w.stats[st.stat]+6+R(r.skills[st.skill]*0.7));w.quality=quality(w.stats);w.lastUpdated=r.week;w.updates++;r.weekActions.updates[w.id]=true;addStress(r,5);addSkillXp(r,st.skill,8);r.xp+=6;log(r,`「${w.title}」 ${st.name} 업데이트. ${D.STATS[st.stat]} ${w.stats[st.stat]}.`);break;}
  case 'season':{const w=findWork(r,a.id);if(r.week-w.releasedWeek<8)throw Error('공개 8주 뒤부터 시즌 2를 낼 수 있어요.');if(r.week-w.lastUpdated<4&&w.seasons)throw Error('최근에 시즌을 냈어요.');spend(s,600,30);for(const k in w.stats)w.stats[k]=clamp(w.stats[k]+12);w.quality=quality(w.stats);w.seasons++;w.lastUpdated=r.week;w.status='active';addStress(r,10);r.xp+=30;trophy(s,'season');log(r,`「${w.title}」 시즌 ${w.seasons+1} 공개! 작품이 다시 살아난다.`);break;}
  case 'archive':{const w=findWork(r,a.id);if(w.status!=='active')throw Error('이미 완결한 작품이에요.');w.status='archived';log(r,`「${w.title}」 완결 처리. 기록은 남는다.`);break;}
  case 'train':{if(!Object.hasOwn(D.SKILLS,a.skill))throw Error('알 수 없는 역량이에요.');if(r.skills[a.skill]>=10)throw Error('이미 최고 레벨이에요.');spend(s,dv.trainCost(a.skill)/dv.costMul,20);addSkillXp(r,a.skill,60);addStress(r,4);r.xp+=5;log(r,`${D.SKILLS[a.skill].name} 훈련 완료. 경험치 +60.`);break;}
  case 'buy':{const it=D.ITEMS.find(i=>i.id===a.id);if(!it)throw Error('알 수 없는 장비예요.');if(r.items.includes(it.id))throw Error('이미 보유한 장비예요.');spend(s,it.price,0);r.items.push(it.id);log(r,`${it.name} 구매. ${it.desc}`);break;}
  case 'subscribe':{const sub=D.SUBSCRIPTIONS.find(x=>x.id===a.id);if(!sub)throw Error('알 수 없는 구독이에요.');if(r.subs.includes(sub.id)){r.subs=r.subs.filter(x=>x!==sub.id);log(r,`${sub.name} 구독 해지.`);}else{spend(s,sub.monthly,0);r.subs.push(sub.id);log(r,`${sub.name} 구독 시작. 매월 ${sub.monthly} C.`);}break;}
  case 'move':{const st=D.STUDIOS.find(x=>x.id===Number(a.studio));if(!st)throw Error('알 수 없는 작업실이에요.');if(r.studio===st.id)throw Error('이미 여기 살고 있어요.');if(!r.ownedStudios.includes(st.id)){spend(s,st.deposit,0);r.ownedStudios.push(st.id);}r.studio=st.id;if(st.id===4)trophy(s,'studio4');log(r,`${st.name}(으)로 이사했다. 주당 임대료 ${st.rent} C.`);break;}
  case 'job':{const j=D.JOBS.find(j=>j.id===a.id);if(!j)throw Error('알 수 없는 일이에요.');if(r.fame<j.fame)throw Error(`명성 ${j.fame} 이상이 필요해요.`);if(r.weekActions.jobs[j.id])throw Error('이번 주에 이미 한 일이에요.');spend(s,0,j.energy);r.weekActions.jobs[j.id]=true;r.coins+=R(j.coins*(r.traits.includes('merchant')?1.15:1));addStress(r,j.stress);if(j.followers)addFollowers(r,j.followers);if(j.xp)addSkillXp(r,j.xp,20);log(r,`${j.name} 완료. +${j.coins} C`);break;}
  case 'life':{const l=D.LIFE.find(l=>l.id===a.id);if(!l)throw Error('알 수 없는 활동이에요.');if(l.id==='nap'){if(r.weekActions.nap)throw Error('이번 주는 이미 푹 쉬었어요.');r.weekActions.nap=true;r.energy=Math.max(0,r.energy-20);}else spend(s,0,l.energy);addStress(r,l.stress);r.inspiration=clamp(r.inspiration+l.inspiration);if(l.energyMax&&rng(r)<0.25){r.energyBonus=(r.energyBonus||0)+1;log(r,'꾸준한 운동으로 최대 체력 +1!');}log(r,`${l.name}. ${l.desc}`);break;}
  case 'endweek':return endWeek(s,dv);
  case 'retire':{if(r.week<D.WEEKS_PER_YEAR)throw Error('1년차를 마친 뒤부터 조기 은퇴할 수 있어요.');finishRun(s,true);break;}
  default:throw Error('알 수 없는 행동이에요.');
 }
 return s;
}

function createDraft(s,a,dv){
 const r=s.run;const title=String(a.title||'').trim();
 if(r.drafts.length>=dv.slots)throw Error(`제작 슬롯이 가득 찼어요. (최대 ${dv.slots}개) 작업실을 넓히거나 초안을 완성하세요.`);
 if(!title||title.length>30)throw Error('제목은 1~30자로 입력해 주세요.');
 const genre=dv.genres.find(g=>g.id===a.genre);const subject=dv.subjects.find(g=>g.id===a.subject);const format=dv.formats.find(f=>f.id===a.format);const scale=D.SCALES.find(x=>x.id===a.scale);
 if(!genre||!subject)throw Error('아직 열리지 않은 장르·소재예요.');if(!format)throw Error('아직 열리지 않은 형태예요.');if(!scale)throw Error('규모를 선택해 주세요.');
 const cast=Number(a.cast);if(!Number.isInteger(cast)||cast<format.minCast||cast>format.maxCast)throw Error(`${format.name}의 등장인물은 ${format.minCast}~${format.maxCast}명이에요.`);
 if(!Object.hasOwn(D.STATS,a.focus))throw Error('집중 포인트를 선택해 주세요.');
 if(r.inspiration<20)throw Error('영감이 부족해요. (20 필요) 산책이나 독서로 영감을 채워 보세요.');
 spend(s,scale.cost,10);r.inspiration-=20;
 r.drafts.push({id:uid(),title,genre:genre.id,subject:subject.id,format:format.id,cast,scale:scale.id,focus:a.focus,progress:{concept:0,prompt:0,assets:0,packaging:0},points:{immersion:0,consistency:0,visual:0,appeal:0},helpers:[],tests:0,testNote:null,milestones:[],createdWeek:r.week,crits:0});
 log(r,`「${title}」 기획 시작! ${genre.name} × ${subject.name} · ${format.name} · ${scale.name}`);
 return s;
}

function work(s,a,dv){
 const r=s.run;const d=findDraft(r,a.id);const st=Object.hasOwn(D.STAGES,a.stage)?D.STAGES[a.stage]:null;if(!st)throw Error('잘못된 공정이에요.');if(d.progress[a.stage]>=100)throw Error('이미 완료한 공정이에요.');
 const scale=D.SCALES.find(x=>x.id===d.scale);
 const assetCost=a.stage==='assets'&&!r.subs.includes('imagegen')&&!r.weekActions.freeAssets?25:0;
 spend(s,assetCost,15);
 const skill=r.skills[st.skill];
 const gain=Math.max(6,R((18+skill*1.2+dv.progressBonus)*scale.progressMul*dv.progressMul*(r.stress>=70?0.7:1)*noise(r,0.15)));
 let pts=(5+skill*1.6)*scale.pointMul*dv.pointMul*dv.statMul[st.stat]*(d.focus===st.stat?1.3:0.95)*noise(r,0.2);
 const crit=rng(r)<dv.crit;if(crit){pts*=2.2;d.crits++;}
 pts=R(pts*10)/10;d.points[st.stat]+=pts;
 const others=Object.keys(D.STATS).filter(k=>k!==st.stat);d.points[pick(r,others)]+=R(pts*0.25*10)/10;
 d.progress[a.stage]=Math.min(100,d.progress[a.stage]+gain);
 addStress(r,4+(r.traits.includes('owl')?1:0));r.inspiration=clamp(r.inspiration-2);r.xp+=4;addSkillXp(r,st.skill,6);
 log(r,`${crit?'✦ 영감 폭발! ':''}「${d.title}」 ${st.name} +${gain}% (${d.progress[a.stage]}%) · ${D.STATS[st.stat]} +${pts}`);
 checkMilestone(r,d,a.stage);
 if(Object.values(d.progress).every(v=>v>=100)&&!d.done){d.done=true;log(r,`「${d.title}」 모든 공정 완료! 테스트 후 공개하자.`);}
 return s;
}
function checkMilestone(r,d,stage){
 if(d.progress[stage]>=50&&!d.milestones.includes(stage)){d.milestones.push(stage);r.queue.push({kind:'milestone',draftId:d.id,stage,title:`「${d.title}」 ${D.STAGES[stage].name} 방향 결정`,text:`${D.STAGES[stage].name} 공정이 절반을 넘었다. 어디에 힘을 줄까?`,options:MILESTONES[stage].map(o=>({label:o.label}))});}
}

function publish(s,a,dv){
 const r=s.run;const d=findDraft(r,a.id);
 if(Object.values(d.progress).some(v=>v<100))throw Error('모든 공정을 100% 완료해야 공개할 수 있어요.');
 spend(s,0,10);
 const stats=assess(s,d);for(const k in stats)stats[k]=clamp(R(stats[k]*noise(r,0.05)),1,100);
 const combo=comboValue(d.genre,d.subject);s.meta.combos[d.genre+':'+d.subject]=combo;
 const reviews=D.REVIEWERS.map(rv=>{const v=Object.entries(rv.weight).reduce((acc,[k,w])=>acc+stats[k]*w,0);const score=clamp(R(v/10-0.3+(rng(r)*1.6-0.8)),1,10);const weak=Object.entries(stats).sort((a,b)=>a[1]-b[1])[0][0];const line=score<=5&&rng(r)<0.5?D.WEAK_LINES[weak]:pick(r,D.REVIEW_LINES[score]);return {name:rv.name,score,line};});
 const total=reviews.reduce((a,b)=>a+b.score,0);const hof=total>=32;
 const w={id:d.id,title:d.title,genre:d.genre,subject:d.subject,format:d.format,cast:d.cast,scale:d.scale,combo,stats,quality:quality(stats),reviews,reviewTotal:total,hof,releasedWeek:r.week,lastUpdated:r.week,active:0,retention:0,totalChats:0,totalRevenue:0,totalReaders:0,likes:0,weekly:[],updates:0,seasons:0,status:'active',bestRank:999,tests:d.tests,crits:d.crits};
 r.works.unshift(w);r.drafts=r.drafts.filter(x=>x.id!==d.id);
 r.stats.works++;if(!r.stats.genres.includes(d.genre))r.stats.genres.push(d.genre);r.xp+=60;r.fame+=10+(hof?100:0);if(hof){r.stats.hof++;trophy(s,'hof');if(r.stats.burnouts)trophy(s,'survivor');}if(total>=40)trophy(s,'perfect');
 trophy(s,'first');if(r.stats.works>=10)trophy(s,'works10');if(r.stats.genres.length>=7)trophy(s,'allgenre');if(Object.values(s.meta.combos).filter(v=>v===2).length>=5)trophy(s,'combos5');
 addStress(r,-6);
 r.queue.push({kind:'release',title:`「${w.title}」 공개 · 평가단 점수 ${total}/40${hof?' · ★ 명예의 전당!':''}`,text:`${comboLabel(combo)} (${D.GENRES.find(g=>g.id===w.genre).name} × ${D.SUBJECTS.find(x=>x.id===w.subject).name})`,reviews,stats,workId:w.id,options:[{label:'확인'}]});
 log(r,`「${w.title}」 공개! 평가단 합계 ${total}/40.${hof?' 명예의 전당 입성!':''}`);
 return s;
}

function choose(s,a){
 const r=s.run;const q=r.queue[0];if(!q)throw Error('고를 선택지가 없어요.');const i=Number(a.option);if(!Number.isInteger(i)||i<0||i>=q.options.length)throw Error('잘못된 선택이에요.');
 r.queue.shift();
 if(q.kind==='milestone'){const d=r.drafts.find(d=>d.id===q.draftId);const o=MILESTONES[q.stage][i];if(d){for(const [k,v] of Object.entries(o.effects)){if(k==='progress')d.progress[q.stage]=clamp(d.progress[q.stage]+v);else if(k==='coins')r.coins+=v;else d.points[k]+=v;}log(r,`「${d.title}」 ${o.label}: ${o.log}`);}}
 else if(q.kind==='event'){const ev=D.EVENTS.find(e=>e.id===q.eventId);if(ev){const o=ev.options[i];applyEffects(s,o.effects);log(r,`${ev.title} → ${o.label}. ${o.log}`);}}
 else if(q.kind==='ending'){ /* 확인만 */ }
 return s;
}
function applyEffects(s,e){
 const r=s.run;
 if(e.coins)r.coins+=e.coins;if(e.coinsPct)r.coins+=R(r.coins*e.coinsPct);if(e.stress)addStress(r,e.stress);if(e.inspiration)r.inspiration=clamp(r.inspiration+e.inspiration);
 if(e.followers)addFollowers(r,e.followers);if(e.fame)r.fame=Math.max(0,r.fame+e.fame);if(e.energy)r.energy=Math.max(0,r.energy+e.energy);
 if(e.skillXp)for(const [k,v] of Object.entries(e.skillXp))addSkillXp(r,k,v);
 for(const key of ['rate','reach','progress']){const m=e[key+'Mod'];if(m){(r.mods[key]??=[]).push({mul:m.mul,weeks:m.weeks});}}
 if(e.trendBoost)r.trendBoost=e.trendBoost;if(e.contest)r.contestMonth=monthOf(r.week)+yearOf(r.week)*100;
 if(e.draftPoints&&r.drafts[0])for(const [k,v] of Object.entries(e.draftPoints))r.drafts[0].points[k]+=v;
 if(e.workPoints)for(const w of r.works)for(const [k,v] of Object.entries(e.workPoints)){w.stats[k]=clamp(w.stats[k]+v);w.quality=quality(w.stats);}
 if(e.trophy)trophy(s,e.trophy);if(e.flag)r.flags[e.flag]=true;if(e.reroll){r.trend=rollTrend(r);}if(e.freeAssets)r.weekActions.freeAssets=true;if(e.guild)r.flags.guild=true;
}

function freshness(r,w){const age=r.week-w.releasedWeek;const eff=Math.min(age,r.week-w.lastUpdated+2);if(eff<=0)return 1.8;if(eff===1)return 1.4;if(eff===2)return 1.1;return Math.max(0.06,1/(1+(eff-2)*0.22));}

function endWeek(s,dv){
 const r=s.run;const social=r.traits.includes('social');const merchant=r.traits.includes('merchant');
 // SNS 매니저 자동 홍보
 const newest=r.works.find(w=>w.status==='active');if(r.subs.includes('sns')&&newest){const used=r.weekActions.promos[newest.id]??=[];if(!used.includes('sns'))used.push('sns');}
 const rateMod=modMul(r,'rate'),reachMod=modMul(r,'reach');
 const contest=r.contestMonth===monthOf(r.week)+yearOf(r.week)*100;
 const rows=[];let revenue=0,fans=0,chatsTotal=0;
 for(const w of r.works){
  if(w.status!=='active')continue;
  const fresh=freshness(r,w);const promoMul=(r.weekActions.promos[w.id]||[]).reduce((m,id)=>m*(D.PROMOS.find(p=>p.id===id).mul*(social?1.1:1)),1);
  const trendMul=Math.pow((r.trend.genre===w.genre?1.3:1)*(r.trend.subject===w.subject?1.2:1),r.trendBoost);
  const base=60+8*Math.sqrt(r.fame)+3*Math.sqrt(r.followers);
  const reach=base*fresh*(1+w.combo*0.08)*trendMul*promoMul*reachMod*(1+r.skills.marketing*0.04)*(contest&&monthOf(w.releasedWeek)===monthOf(r.week)&&yearOf(w.releasedWeek)===yearOf(r.week)?1.4:1)*(r.studio===4?1.05:1)*noise(r,0.15);
  const arrivals=R(reach*(0.06+w.stats.appeal/220));
  w.retention=clamp((w.stats.immersion*0.5+w.stats.consistency*0.5)/100*0.8,0.05,0.65);
  const returning=R(w.active*w.retention);w.active=arrivals+returning;
  const chats=R(w.active*(1.5+w.stats.immersion/30));const earned=R(chats*0.4*rateMod*(merchant?1.15:1));
  const newFans=R(arrivals*(w.quality/100)*0.18);
  w.totalChats+=chats;w.totalRevenue+=earned;w.totalReaders+=arrivals;w.likes+=R(arrivals*w.quality/300);
  w.weekly.push({week:r.week,chats,arrivals,revenue:earned});if(w.weekly.length>60)w.weekly.shift();
  revenue+=earned;fans+=newFans;chatsTotal+=chats;
  rows.push({id:w.id,title:w.title,arrivals,returning,chats,earned,fans:newFans,promoted:promoMul>1,trend:trendMul>1,rank:0});
  if(r.week-w.releasedWeek>12&&chats<15){w.status='archived';log(r,`「${w.title}」 독자가 거의 떠났다. 자연 완결 처리.`);}
 }
 // 라이벌 작품
 const board=[];
 for(const rv of r.rivals){
  if(rng(r)<0.12)rv.works.push({title:rivalTitle(r),releasedWeek:r.week,chats:0});
  rv.works=rv.works.filter(x=>r.week-x.releasedWeek<30);
  for(const x of rv.works){const age=r.week-x.releasedWeek;const f=age<=0?1.8:age===1?1.4:age===2?1.1:Math.max(0.15,1/(1+(age-2)*0.22));x.chats=R(rv.power*10*f*noise(r,0.4)*(r.trend.genre===rv.style?1.3:1));x.yearChats=(x.yearChats||0)+x.chats;board.push({title:x.title,author:rv.name,chats:x.chats,rival:true});}
  if(weekOfMonth(r.week)===D.WEEKS_PER_MONTH)rv.power=R(rv.power*1.025);
 }
 for(const row of rows)board.push({title:row.title,author:r.name,chats:row.chats,rival:false,id:row.id});
 board.sort((a,b)=>b.chats-a.chats);
 r._fameGiven=false;board.forEach((b,i)=>{if(!b.rival){const row=rows.find(x=>x.id===b.id);row.rank=i+1;const w=r.works.find(w=>w.id===b.id);if(w&&i+1<w.bestRank)w.bestRank=i+1;if(i<10&&!r._fameGiven){r.fame+=[8,6,5,4,3,2,2,1,1,1][i];r._fameGiven=true;}if(i===0){r.stats.weekly1++;trophy(s,'weekly1');}if(i+1<r.stats.bestRank)r.stats.bestRank=i+1;}});
 delete r._fameGiven;r.ranking=board.slice(0,10).map((b,i)=>({rank:i+1,...b}));
 // 경제·회복
 const rent=dv.studio.rent;r.coins+=revenue-rent;if(dv.bg.salary)r.coins+=dv.bg.salary;addFollowers(r,fans);
 if(r.studio===4)r.fame+=3;
 let burnout=false;if(r.stress>=95){burnout=true;r.stats.burnouts++;r.stress=55;}
 r.stress=clamp(r.stress-dv.recover);r.inspiration=clamp(r.inspiration+dv.inspirationWeekly);r.stats.stressSum+=r.stress;
 for(const key in r.mods){r.mods[key]=r.mods[key].map(m=>({...m,weeks:m.weeks-1})).filter(m=>m.weeks>0);}
 if(r.coins<=0)r.stats.zero=true;if(r.stats.zero&&r.coins>=1000)trophy(s,'zero');if(r.coins>=50000)trophy(s,'rich');if(r.followers>=1000)trophy(s,'fans1k');if(r.followers>=10000)trophy(s,'fans10k');
 r.report={week:r.week,calendar:calendar(r.week),revenue,rent,salary:dv.bg.salary||0,fans,chats:chatsTotal,rows,ranking:r.ranking,events:[]};
 r.history.followers.push(r.followers);r.history.coins.push(r.coins);r.history.fame.push(r.fame);
 // 월말·연말
 const monthEnd=weekOfMonth(r.week)===D.WEEKS_PER_MONTH;const yearEnd=r.week%D.WEEKS_PER_YEAR===0;
 if(monthEnd)monthClose(s);
 if(yearEnd)yearClose(s);
 r.week++;
 // 월초 구독 결제·트렌드
 if(weekOfMonth(r.week)===1&&r.week>1){let fee=0;for(const id of r.subs)fee+=D.SUBSCRIPTIONS.find(x=>x.id===id).monthly;if(fee){r.coins-=R(fee*dv.costMul);r.report.events.push(`구독료 ${R(fee*dv.costMul)} C 결제`);}r.trend=r.nextTrend;r.nextTrend=rollTrend(r);r.trendBoost=1;}
 // 번아웃
 if(burnout){r.queue.push({kind:'event',eventId:'__burnout',title:'번아웃',text:'몸과 마음이 멈췄다. 이번 주는 절반의 체력으로 시작한다. 쉬어가자.',options:[{label:'...쉬자'}]});r.report.events.push('번아웃! 체력 절반으로 시작');}
 // 랜덤 이벤트
 if(rng(r)<0.45){const ev=rollEvent(s);if(ev){const rival=pick(r,r.rivals).name;const tg=D.GENRES.find(g=>g.id===r.trend.genre).name;r.queue.push({kind:'event',eventId:ev.id,title:ev.title,text:ev.text.replace('{rival}',rival).replace('{trendGenre}',tg),options:ev.options.map(o=>({label:o.label}))});}}
 // 새 주 준비
 r.energy=burnout?R(dv.energyMax/2):dv.energyMax;
 r.weekActions={promos:{},jobs:{},nap:false,updates:{},freeAssets:false};
 log(r,`주간 정산 +${revenue} C · 팔로워 +${fans} · 랭킹 ${rows.length?Math.min(...rows.map(x=>x.rank)):'-'}위`);
 if(r.week>r.careerWeeks)finishRun(s,false);
 return s;
}
function rollEvent(s){
 const r=s.run;const lucky=r.traits.includes('lucky');
 const ok=e=>{switch(e.need){case undefined:return true;case 'published':return r.works.length>0;case 'stress60':return r.stress>=60;case 'fame150':return r.fame>=150;case 'fame300':return r.fame>=300;case 'fame800':return r.fame>=800&&!r.flags.publisher;case 'fans500':return r.followers>=500;case 'fans1000':return r.followers>=1000;case 'fans2000':return r.followers>=2000;case 'rich':return r.coins>=5000;case 'cat':return r.items.includes('cat');default:return false;}};
 const pool=D.EVENTS.filter(ok).filter(e=>!(e.id==='rival_collab'&&s.meta.trophies.includes('collab')&&r.flags.collabDone));
 if(!pool.length)return null;
 const bad=new Set(['troll','policy_down','maintenance','laptop','plagiarism','bad_update','cold','copycat','moving_pain','tax']);
 const weights=pool.map(e=>e.weight*(lucky&&bad.has(e.id)?0.5:1));const total=weights.reduce((a,b)=>a+b,0);let x=rng(r)*total;
 for(let i=0;i<pool.length;i++){x-=weights[i];if(x<=0)return pool[i];}return pool[pool.length-1];
}
function monthClose(s){
 const r=s.run;const from=r.week-D.WEEKS_PER_MONTH+1;
 const mine=r.works.map(w=>({title:w.title,author:r.name,chats:w.weekly.filter(x=>x.week>=from).reduce((a,b)=>a+b.chats,0),rival:false})).filter(x=>x.chats>0);
 const theirs=[];for(const rv of r.rivals)for(const x of rv.works)theirs.push({title:x.title,author:rv.name,chats:R(x.chats*(2.6+rng(r))),rival:true});
 const all=[...mine,...theirs].sort((a,b)=>b.chats-a.chats).slice(0,5);
 r.monthly={month:monthOf(r.week),year:yearOf(r.week),top:all};
 if(all[0]&&!all[0].rival){r.stats.monthly1++;r.fame+=60;r.coins+=1000;trophy(s,'monthly1');r.report.events.push(`🥇 월간 랭킹 1위! 「${all[0].title}」 상금 1,000 C`);}
 else if(all.some(x=>!x.rival)){r.fame+=20;r.report.events.push('월간 랭킹 TOP 5 진입. 명성 +20');}
 if(r.contestMonth===monthOf(r.week)+yearOf(r.week)*100){const best=mine.sort((a,b)=>b.chats-a.chats)[0];const rivalBest=theirs.filter(x=>r.week-D.WEEKS_PER_MONTH<=r.week).sort((a,b)=>b.chats-a.chats)[0];if(best&&(!rivalBest||best.chats>rivalBest.chats*0.5)){r.coins+=3000;r.fame+=80;r.report.events.push(`🏅 신작 공모전 우승! 상금 3,000 C`);}else r.report.events.push('공모전은 아쉽게 입상하지 못했다.');}
}
function yearClose(s){
 const r=s.run;const year=yearOf(r.week);const from=r.week-D.WEEKS_PER_YEAR+1;
 const yearly=w=>w.weekly.filter(x=>x.week>=from).reduce((a,b)=>a+b.chats,0);
 const mine=r.works.map(w=>({w,chats:yearly(w)})).sort((a,b)=>b.chats-a.chats);
 const rivalTop=Math.max(0,...r.rivals.flatMap(rv=>rv.works.map(x=>x.yearChats||0)));
 const got=[];
 if(mine[0]&&mine[0].chats>rivalTop)got.push({name:'올해의 작품',work:mine[0].w.title});
 else if(mine[0]&&mine[0].chats>rivalTop*0.5)got.push({name:'우수 작품상',work:mine[0].w.title});
 const released=r.works.filter(w=>w.releasedWeek>=from);
 if(year===1&&released.some(w=>w.hof))got.push({name:'신인상',work:released.find(w=>w.hof).title});
 const vis=released.filter(w=>w.stats.visual>=88)[0];if(vis)got.push({name:'베스트 비주얼',work:vis.title});
 const sto=released.filter(w=>w.stats.immersion>=88)[0];if(sto)got.push({name:'스토리텔링상',work:sto.title});
 if(released.length>=6)got.push({name:'다작상',work:`${released.length}작품`});
 if(r.stats.weekly1>=8&&!r.awards.some(a=>a.name==='차트의 지배자'))got.push({name:'차트의 지배자',work:`주간 1위 ${r.stats.weekly1}회`});
 for(const g of got){r.awards.push({year,...g});r.fame+=100;r.coins+=1500;}
 for(const rv of r.rivals)for(const x of rv.works)x.yearChats=0;
 if(got.length)trophy(s,'award');
 r.queue.push({kind:'awards',title:`${year}년차 크랙 어워드`,text:got.length?`수상 ${got.length}개! 명성 +${100*got.length}, 상금 ${1500*got.length} C`:'올해는 수상하지 못했다. 내년을 노리자.',awards:got,options:[{label:'확인'}]});
}
export function scoreOf(r){const avgQ=r.works.length?R(r.works.reduce((a,w)=>a+w.quality,0)/r.works.length):0;return {avgQ,score:R(r.fame+r.followers/5+Math.max(0,r.coins)/20+r.stats.hof*300+r.stats.works*50+r.awards.length*200+avgQ*5)};}
function finishRun(s,early){
 const r=s.run;const {avgQ,score}=scoreOf(r);const weeks=Math.max(1,r.week-1);const ctx={fame:r.fame,hof:r.stats.hof,followers:r.followers,coins:r.coins,avgQuality:avgQ,works:r.works.length,burnouts:r.stats.burnouts,avgStress:r.stats.stressSum/weeks};
 const ending=D.ENDINGS.find(e=>evalCond(e.cond,ctx))||D.ENDINGS.at(-1);
 const legacy=Math.max(1,Math.floor(score/600));
 r.ended={ending:ending.id,name:ending.name,desc:ending.desc,score,legacy,early,ctx};
 s.meta.legacy+=legacy;if(!s.meta.endings.includes(ending.id))s.meta.endings.push(ending.id);if(s.meta.endings.length>=3)trophy(s,'endings3');
 s.meta.best=Math.max(s.meta.best,score);s.meta.runs.push({name:r.name,ending:ending.name,score,weeks,works:r.works.length,hof:r.stats.hof,fame:r.fame,followers:r.followers});
 r.queue=[];log(r,`엔딩: ${ending.name} · 점수 ${score} · 유산 +${legacy}`);
}
function evalCond(cond,c){return cond.split('&&').every(part=>{if(part==='true')return true;const m=part.match(/^(\w+)(>=|<=)(\d+)$/);if(!m)return false;const v=c[m[1]];return m[2]==='>='?v>=+m[3]:v<=+m[3];});}

export const data=D;
