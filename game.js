// 크랙 작가 키우기 — 게임 엔진 (v3). 순수 함수 act(profile, action)으로 상태를 전이한다.
// 서버와 브라우저(브라우저 저장 모드)에서 동일하게 동작한다. 난수는 run.rngState에 저장되어 재현 가능하다.
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
const byId=(arr,id)=>arr.find(x=>x.id===id);

export const initial=()=>({version:5,theme:'dark',meta:{legacy:0,unlocks:[],endings:[],trophies:[],insights:[],runs:[],best:0,archive:[]},run:null});
export function migrate(s){
 if(!s||typeof s!=='object')return initial();
 if(s.version!==5){const fresh=initial();if(s.meta?.runs?.length||s.run)fresh.meta.legacy=Math.max(1,Number(s.meta?.legacy)||0);return fresh;}
 if(s.run){const r=s.run;r.difficulty=difficultyOf(r).id;r.feed??=[];r.contest??=null;r.contestHistory??=[];r.awards??=[];r.stats.contestWins??=0;}
 s.meta.insights??=[];s.meta.archive??=[];s.meta.trophies??=[];s.meta.endings??=[];s.meta.runs??=[];s.meta.unlocks??=[];
 return s;
}
export const difficultyOf=r=>byId(D.DIFFICULTIES,r?.difficulty)||byId(D.DIFFICULTIES,'normal');
export function has(s,unlock){return s.meta.unlocks.includes(unlock);}
export const creatorReq=s=>{const half=has(s,'creator_fast')?0.5:1;return {works:R(D.CREATOR_REQ.works*half),players:R(D.CREATOR_REQ.players*half),followers:R(D.CREATOR_REQ.followers*half),messages:R(D.CREATOR_REQ.messages*half)};};
export const creatorStageName=st=>['일반 제작자','크리에이터 미션 진행 중','크리에이터'][st];
export function repTier(f){return f>=2500?'전설':f>=1200?'네임드':f>=500?'인기 제작자':f>=150?'주목받는 신인':f>=30?'신인':'무명';}
function modMul(r,key){return (r.mods[key]||[]).reduce((a,m)=>a*m.mul,1);}
const skillNeed=lv=>80*lv;

export function derive(s){
 const r=s.run;if(!r)return null;
 const bg=byId(D.BACKGROUNDS,r.background)||D.BACKGROUNDS[0];const studio=D.STUDIOS[r.studio];const items=r.items.map(id=>byId(D.ITEMS,id)).filter(Boolean);
 const t=id=>r.traits.includes(id);const sum=k=>items.reduce((a,i)=>a+(i.effect[k]||0),0);
 const difficulty=difficultyOf(r);
 const level=Math.floor(Math.sqrt(r.xp/60))+1;
 const energyMax=bg.energy+studio.energy+sum('energy')+(t('owl')?15:0)+(r.energyBonus||0)+difficulty.energy;
 const slots=studio.slots+(t('twoslots')?1:0);
 const crit=0.06+r.inspiration/500+sum('crit')+(t('lucky')?0.05:0);
 const costMul=t('thrifty')?0.85:1;
 const genres=D.GENRES.filter(g=>has(s,'all_genres')||g.unlock<=r.skills.planning);
 const statMul={story:1+sum('storyMul'),stability:1+sum('stabilityMul')+(t('lorekeeper')?0.2:0),visual:1+sum('visualMul')+(t('visualist')?0.25:0)+(r.subs.includes('imagegen')?0.15:0),appeal:1+sum('appealMul')};
 const pointMul=difficulty.stats*(t('perfectionist')?1.15:1)*(t('prolific')?0.92:1);
 const progressMul=(t('perfectionist')?0.85:1)*(t('prolific')?1.2:1)*modMul(r,'progress');
 const trainCost=sk=>R(80000*Math.pow(r.skills[sk],1.5)*costMul);
 const helperMul=(r.studio>=3?0.8:1)*costMul*(bg.id==='illustrator'?0.5:1);
 const recover=10+studio.recover+sum('recover');
 const inspirationWeekly=5+sum('inspiration')+(t('muse')?12:0);
 const req=creatorReq(s);
 const settleRate=r.creatorStage>=2?D.SETTLE_RATE.base:0;
 return {difficulty,level,energyMax,slots,crit,costMul,genres,statMul,pointMul,progressMul,progressBonus:sum('progress'),trainCost,helperMul,recover,inspirationWeekly,studio,bg,weeksLeft:r.careerWeeks-r.week+1,repTier:repTier(r.rep),req,settleRate,canSeeTrend:r.subs.includes('trend')||r.skills.community>=4};
}

// 공개 시 능력치 계산 (예측·실제 동일, 실제는 소량 노이즈)
export function assess(s,d){
 const r=s.run;const form=byId(D.FORMS,d.form),len=byId(D.LENGTHS,d.length),mode=byId(D.MODES,d.mode),tpl=byId(D.TEMPLATES,d.template),img=byId(D.IMAGE_SOURCES,d.imageSource);
 const lore=r.traits.includes('lorekeeper');const mods=applicableModules(d);const doneOpt=mods.filter(m=>!D.MODULES[m].required&&d.modules[m]>=100).length;
 const out={};
 for(const st of Object.keys(D.STATS)){
  const skill={story:'planning',stability:'prompt',visual:'image',appeal:'direction'}[st];
  let v=14+d.points[st]*0.45+r.skills[skill]*2.5;
  if(st==='stability'){v+=form.stability*(lore?0.5:1);if(d.modules.keyword>=100)v+=8;if(tpl.id==='basic')v+=4;if(r.subs.includes('superpass'))v+=2;}
  if(st==='story'){v+=form.story+len.story;if(d.modules.stat>=100)v+=6;if(d.modules.ending>=100)v+=7;v*=mode.quality;if(tpl.id==='basic')v-=6;}
  if(st==='visual'){v=14+d.points[st]*0.45*img.visual+r.skills.image*2.5;if(d.modules.media<100)v-=8;}
  if(st==='appeal'){if(d.modules.shortcut>=100)v+=4;v+=Math.min(3,d.tags.length)*1.5;}
  out[st]=clamp(R(v),1,100);
 }
 return {stats:out,volume:doneOpt};
}
const quality=stats=>R((stats.story*1.1+stats.stability*1.1+stats.visual*0.8+stats.appeal)/4);
export function applicableModules(d){return D.MODULE_ORDER.filter(m=>!D.MODULES[m].kind||D.MODULES[m].kind===d.kind);}
export const workRisk=w=>(byId(D.IMAGE_SOURCES,w.imageSource)?.risk||0)+(byId(D.ORIGINS,w.origin)?.risk||0)+(byId(D.AUDIENCES,w.audience)?.risk||0);

function spend(s,money,energy){const r=s.run,dv=derive(s);money=R(money*dv.costMul);if(r.energy<energy)throw Error(`체력이 부족해요. (필요 ${energy}, 보유 ${r.energy})`);if(money>0&&r.money<money)throw Error(`자금이 부족해요. (필요 ${money.toLocaleString('ko-KR')}원)`);r.money-=money;r.energy-=energy;return money;}
function addStress(r,n){if(n>0)n*=difficultyOf(r).stress;if(n>0&&r.traits.includes('steel'))n*=0.7;r.stress=clamp(R(r.stress+n));}
function addFollowers(r,n){if(n>0&&r.traits.includes('social'))n*=1.3;r.followers=Math.max(0,R(r.followers+n));}
function addSkillXp(r,sk,n){r.skillXp[sk]+=n;while(r.skills[sk]<10&&r.skillXp[sk]>=skillNeed(r.skills[sk])){r.skillXp[sk]-=skillNeed(r.skills[sk]);r.skills[sk]++;log(r,`${D.SKILLS[sk].name} 역량이 Lv.${r.skills[sk]}이 되었다!`);}if(r.skills[sk]>=10)r.skillXp[sk]=0;}
function log(r,msg){r.log.unshift(`[${calendar(Math.min(r.week,r.careerWeeks))}] ${msg}`);r.log=r.log.slice(0,60);}
function notice(r,msg){r.notices.unshift({week:r.week,text:msg});r.notices=r.notices.slice(0,30);}
function feed(r,kind,text){r.feed.unshift({week:r.week,kind,text});r.feed=r.feed.slice(0,80);}
function trophy(s,id){if(!s.meta.trophies.includes(id)){s.meta.trophies.push(id);const t=byId(D.TROPHIES,id);if(s.run)log(s.run,`🏆 업적: ${t?.name||id}`);}}
function insight(s,id){if(!s.meta.insights.includes(id)){s.meta.insights.push(id);const t=byId(D.INSIGHTS,id);if(s.run)notice(s.run,`💡 독자 인사이트 발견: ${t.text}`);if(s.meta.insights.length>=10)trophy(s,'insights10');}}
const findDraft=(r,id)=>{const d=r.drafts.find(d=>d.id===id);if(!d)throw Error('제작 중인 작품을 찾을 수 없어요.');return d;};
const findWork=(r,id)=>{const w=r.works.find(w=>w.id===id);if(!w)throw Error('작품을 찾을 수 없어요.');return w;};
const gName=id=>byId(D.GENRES,id)?.name||id;

// ---------- 트렌드·라이벌 ----------
function rollTrend(r){const tags=[];while(tags.length<4){const t=pick(r,D.TAGS);if(!tags.includes(t))tags.push(t);}const gs=D.GENRES.filter(g=>g.unlock<=4);return {tags,mood:{female:pick(r,gs).id,male:pick(r,gs).id}};}
export function rivalTitle(r,arch,genre){
 const P=D.TITLE_PARTS;const k=rng(r);
 if(arch.kind==='character'||k<0.3)return rng(r)<0.5?`${pick(r,P.names)} ${pick(r,P.surnames)}`:`${pick(r,P.names)} · ${pick(r,P.taglines)}`;
 if(k<0.55)return `${pick(r,P.english)} : ${pick(r,P.subs)}`;
 if(k<0.8)return `${pick(r,P.sims)} IN ${pick(r,P.worlds)}`;
 return `${pick(r,P.taglines)}`;
}
function makeRival(r,i){const arch=D.RIVAL_ARCHETYPES[i%D.RIVAL_ARCHETYPES.length];const followers=arch.id==='newbie'?50+R(rng(r)*200):300+R(Math.pow(rng(r),2)*30000);const rv={id:'rv'+i,name:D.RIVAL_NAMES[i%D.RIVAL_NAMES.length],arch:arch.id,target:arch.target,followers,power:arch.power*noise(r,0.2),stage:followers>3000?2:followers>800?1:0,relation:0,works:[],originals:0};
 const n=arch.kind==='character'?3+R(rng(r)*6):1+R(rng(r)*3);for(let j=0;j<n;j++)rv.works.push(makeRivalWork(r,rv,arch,1-R(rng(r)*20)));return rv;}
function makeRivalWork(r,rv,arch,week){const genre=pick(r,arch.genres);return {title:rivalTitle(r,arch,genre),genre,target:arch.target,releasedWeek:week,msgs:0,plays:0,badge:rv.stage>=2&&rng(r)<0.3?(rng(r)<0.4?'original':'only'):null,adult:!!arch.adult&&rng(r)<0.7};}

// ---------- 회차 시작 ----------
export function startRun(s,a){
 const name=String(a.name||'').trim();if(!name||name.length>12)throw Error('작가 이름은 1~12자로 입력해 주세요.');
 const bg=byId(D.BACKGROUNDS,a.background);if(!bg)throw Error('배경을 선택해 주세요.');if(bg.legacy>0&&!has(s,'bg_'+bg.id))throw Error('유산으로 해금해야 하는 배경이에요.');
 const traits=[...new Set((Array.isArray(a.traits)?a.traits:[a.traits]).filter(Boolean))];const maxTraits=has(s,'two_traits')?2:1;
 if(traits.length<1||traits.length>maxTraits)throw Error(`특성을 ${maxTraits}개 선택해 주세요.`);
 for(const id of traits){const t=byId(D.TRAITS,id);if(!t)throw Error('알 수 없는 특성이에요.');if(t.legacy>0&&!has(s,'tr_'+id))throw Error(`${t.name}은(는) 유산으로 해금해야 해요.`);}
 const difficulty=byId(D.DIFFICULTIES,a.difficulty??'normal');if(!difficulty)throw Error('올바른 난이도를 선택해 주세요.');
 const seed=typeof a.seed==='number'?a.seed|0:(hash(name+Date.now())|0);
 const r={name,difficulty:difficulty.id,background:bg.id,traits,week:1,careerWeeks:D.WEEKS_PER_YEAR*(has(s,'long_career')?5:D.CAREER_YEARS),rngState:seed,
  money:R(bg.money*difficulty.startMoney)+(has(s,'start_money')?2000000:0),pendingCash:0,settledTotal:0,energy:0,stress:10,inspiration:50,followers:(bg.followers||0)+(has(s,'start_fans')?500:0),rep:bg.rep||0,xp:0,energyBonus:0,
  skills:{planning:1,prompt:1,image:1,direction:1,community:1},skillXp:{planning:0,prompt:0,image:0,direction:0,community:0},
  studio:bg.studio||0,ownedStudios:[0,...(bg.studio?[bg.studio]:[])],items:[],subs:[],drafts:[],works:[],rivals:[],
  creatorStage:0,totals:{players:0,messages:0,publicWorks:0,crackers:0},trend:null,nextTrend:null,contestMonth:0,sanctions:0,
  mods:{},queue:[],report:null,ranking:{all:[],female:[],male:[]},monthly:null,statements:[],history:{followers:[],money:[],rep:[],messages:[]},
  weekActions:{promos:{},jobs:{},nap:false,updates:{}},stats:{works:0,originals:0,only:0,burnouts:0,stressSum:0,weekly1:0,monthly1:0,bestRank:999,genres:[],hot:0,counters:{},contestWins:0},flags:{},log:[],notices:[],feed:[],contest:null,contestHistory:[],awards:[],ended:null};
 for(const [k,v] of Object.entries(bg.skills||{}))r.skills[k]=v;if(has(s,'start_skill'))for(const k in r.skills)r.skills[k]=Math.min(10,r.skills[k]+1);
 r.rivals=Array.from({length:16},(_,i)=>makeRival(r,i));
 r.trend=rollTrend(r);r.nextTrend=rollTrend(r);r.energy=derive({...s,run:r}).energyMax;
 s.run=r;openContest(s);log(r,`${name} 작가의 ${r.careerWeeks/D.WEEKS_PER_YEAR}년 도전이 시작됐다. 첫 작품을 만들어 보자!`);notice(r,'크리에이터가 되려면: 전체 공개 작품 10개 · 누적 대화 유저 1,000명 · 팔로워 500명을 채운 뒤 미션(누적 발화 10만)을 달성해야 해요. 그 전까진 선물(70%)과 부업이 수입이에요.');
 return s;
}
function requireRun(s){if(!s.run)throw Error('진행 중인 회차가 없어요. 새 회차를 시작해 주세요.');if(s.run.ended)throw Error('이 회차는 끝났어요. 새 회차를 시작해 주세요.');return s.run;}
function requireFree(r){if(r.queue.length)throw Error('먼저 눈앞의 선택지를 골라 주세요.');}

const MILESTONES={
 profile:[{label:'얼굴이 보이는 썸네일',effects:{appeal:12},log:'눈이 마주치는 프로필.'},{label:'분위기 있는 전신 일러스트',effects:{visual:8,appeal:5},log:'분위기로 승부.'},{label:'한 줄 소개에 떡밥',effects:{appeal:8,story:5},log:'궁금하게 만드는 소개.'}],
 prompt:[{label:'예시 대사 대량 투입',effects:{story:9,stability:-5},log:'생생한 대사가 늘었다.'},{label:'규칙 중심으로 압축',effects:{stability:13,story:-3},log:'토큰을 아끼고 규칙을 세웠다.'},{label:'말투 샘플 정제',effects:{stability:7,appeal:5},log:'말투가 또렷해졌다.'}],
 start:[{label:'사건 한가운데서 시작',effects:{story:14,stability:-3},log:'첫 장면부터 긴장감.'},{label:'관계 설명부터 차분히',effects:{stability:8,story:4},log:'독자가 길을 잃지 않는다.'},{label:'선택지를 주며 시작',effects:{story:8,appeal:6},log:'첫 메시지에 선택지.'}],
 media:[{label:'표정 차분 추가 (-15만원)',effects:{visual:14,money:-150000},log:'다양한 표정이 생겼다.'},{label:'배경 톤 통일',effects:{visual:7,appeal:5},log:'작품 톤이 일관돼졌다.'},{label:'이미지 코드 자동화',effects:{stability:7,visual:4},log:'상황에 맞는 이미지가 자동으로.'}],
 keyword:[{label:'고유명사 전부 등록',effects:{stability:12},log:'설정집이 두꺼워졌다.'},{label:'관계도만 핵심적으로',effects:{stability:6,story:6},log:'관계가 또렷해졌다.'}],
 shortcut:[{label:'행동 버튼 8개',effects:{appeal:8},log:'터치 한 번으로 행동.'},{label:'분위기 전환 버튼',effects:{story:6,appeal:4},log:'흐름을 바꾸는 버튼.'}],
 stat:[{label:'호감도·신뢰도 2축',effects:{story:10,stability:3},log:'관계가 수치로 보인다.'},{label:'생존·자원 시스템',effects:{story:14,stability:-4},log:'시뮬 맛이 난다.'}],
 ending:[{label:'엔딩 3종 분기',effects:{story:12},log:'회차를 돌리고 싶어진다.'},{label:'히든 엔딩 하나',effects:{story:8,appeal:8},log:'커뮤니티에 공략글이 올라올 것 같다.'}],
 register:[{label:'메타 태그에 맞춘다',effects:{appeal:10},log:'검색에 잘 걸리는 태그.'},{label:'상세 설명 1,000자 꽉 채우기',effects:{appeal:6,story:5},log:'친절한 설명.'},{label:'권장 모드·길이 세팅 안내',effects:{stability:6,appeal:4},log:'독자가 설정을 덜 헤맨다.'}],
};

export function act(s,a){
 migrate(s);if(!a||typeof a!=='object')throw Error('잘못된 요청이에요.');
 const type=a.type;
 if(type==='theme'){if(!['dark','light'].includes(a.theme))throw Error('잘못된 테마예요.');s.theme=a.theme;return s;}
 if(type==='legacy'){const item=byId(D.LEGACY_SHOP,a.id);if(!item)throw Error('알 수 없는 유산 항목이에요.');if(has(s,item.id))throw Error('이미 해금했어요.');if(s.meta.legacy<item.cost)throw Error(`유산 포인트가 부족해요. (필요 ${item.cost})`);s.meta.legacy-=item.cost;s.meta.unlocks.push(item.id);return s;}
 if(type==='newgame'){if(s.run&&!s.run.ended&&!a.confirm)throw Error('진행 중인 회차가 있어요. 포기하려면 확인이 필요해요.');return startRun(s,a);}
 const r=requireRun(s);
 if(type==='choose')return choose(s,a);
 requireFree(r);
 const dv=derive(s);
 switch(type){
  case 'draft':return createDraft(s,a,dv);
  case 'work':return work(s,a,dv);
  case 'hire':{const d=findDraft(r,a.id);const h=byId(D.HELPERS,a.helper);if(!h)throw Error('알 수 없는 외주예요.');if(d.helpers.includes(h.id))throw Error('이미 의뢰한 외주예요.');if(!applicableModules(d).includes(h.module))throw Error('이 작품 유형에는 해당 없는 외주예요.');spend(s,h.price*dv.helperMul/dv.costMul,5);d.helpers.push(h.id);d.modules[h.module]=Math.min(100,d.modules[h.module]+h.progress);d.points[h.stat]+=h.points;checkMilestone(r,d,h.module);log(r,`「${d.title}」 ${h.name} 완료.`);break;}
  case 'test':{const d=findDraft(r,a.id);if(['profile','prompt','start'].some(m=>d.modules[m]<30))throw Error('필수 탭을 30% 이상 채운 뒤 비공개 테스트할 수 있어요.');const cost=byId(D.MODES,d.mode).crackers*40*D.WON_PER_CRACKER*(r.subs.includes('superpass')?0.5:1);spend(s,cost,10);d.tests++;d.points.stability+=5+(r.subs.includes('superpass')?3:0);const {stats}=assess(s,d);const weak=Object.entries(stats).sort((a,b)=>a[1]-b[1])[0][0];d.testNote={week:r.week,stats,weak,text:`비공개 테스트 #${d.tests} (크래커 ${byId(D.MODES,d.mode).crackers*40}개 소모): ${{story:'전개가 늘어진다. 시작 설정과 스탯·엔딩으로 사건을 만들자.',stability:'말투가 흔들리고 이름을 잊는다. 프롬프트 압축과 키워드북이 필요하다.',visual:'상황 이미지가 비어 보인다. 미디어 탭을 채우자.',appeal:'소개·태그가 작품을 설명하지 못한다. 등록 탭을 다듬자.'}[weak]} 안정성 포인트 +${5+(r.subs.includes('superpass')?3:0)}.`};addSkillXp(r,'prompt',6);log(r,`「${d.title}」 비공개 테스트 완료.`);break;}
  case 'scrap':{const d=findDraft(r,a.id);r.drafts=r.drafts.filter(x=>x.id!==d.id);addStress(r,-5);log(r,`「${d.title}」 제작을 접었다. 다음엔 더 잘할 수 있다.`);break;}
  case 'register':return register(s,a,dv);
  case 'visibility':{const w=findWork(r,a.id);if(w.status==='blocked')throw Error('차단된 작품이에요.');if(w.badges.original)throw Error('오리지널 작품은 비공개·링크 공개로 바꿀 수 없어요. (저작권 귀속)');if(w.originalReview)throw Error('오리지널 심사 중에는 공개 상태를 바꿀 수 없어요.');if(!['public','link','private'].includes(a.visibility))throw Error('잘못된 공개 설정이에요.');if(w.visibility===a.visibility)throw Error('이미 그 상태예요.');w.visibility=a.visibility;if(a.visibility==='public'){if(!w.everPublic){w.everPublic=true;w.releasedWeek=r.week;r.totals.publicWorks++;r.stats.works++;if(!r.stats.genres.includes(w.genre))r.stats.genres.push(w.genre);trophy(s,'first');if(r.stats.works>=10)trophy(s,'ten');if(r.stats.genres.length>=7)trophy(s,'allgenre');}w.lastUpdated=r.week;w.status='active';log(r,`「${w.title}」 전체 공개! 신작 탭에 2주간 노출된다.`);}else log(r,`「${w.title}」 ${a.visibility==='link'?'링크 공개':'비공개'}로 전환.`);break;}
  case 'promote':{const w=findWork(r,a.id);const p=byId(D.PROMOS,a.kind);if(!p)throw Error('알 수 없는 홍보예요.');if(w.visibility!=='public'||w.status!=='active')throw Error('전체 공개 중인 작품만 홍보할 수 있어요.');if(p.rep&&r.rep<p.rep)throw Error(`인지도 ${p.rep} 이상이 필요해요.`);const used=r.weekActions.promos[w.id]??=[];if(used.includes(p.id))throw Error('이번 주에 이미 실행한 홍보예요.');spend(s,p.money,p.energy);used.push(p.id);if(p.followers)addFollowers(r,p.followers);addStress(r,p.stress);addSkillXp(r,'community',8);if(p.id==='gallery')bump(s,'gallery');log(r,`「${w.title}」 ${p.name} 실행.`);break;}
  case 'update':{const w=findWork(r,a.id);const m=Object.hasOwn(D.MODULES,a.module)?D.MODULES[a.module]:null;if(!m)throw Error('수정할 탭을 선택하세요.');if(w.status!=='active'||w.visibility!=='public')throw Error('전체 공개 중인 작품만 업데이트할 수 있어요.');if(r.weekActions.updates[w.id])throw Error('이번 주에 이미 업데이트했어요.');if(!applicableModules(w).includes(a.module))throw Error('이 작품 유형에 없는 탭이에요.');if(w.stats[m.stat]>=100)throw Error('이미 완벽한 항목이에요.');spend(s,50000,20);w.stats[m.stat]=clamp(w.stats[m.stat]+6+R(r.skills[m.skill]*0.7));w.quality=quality(w.stats);w.lastUpdated=r.week;w.updates++;r.weekActions.updates[w.id]=true;addStress(r,5);addSkillXp(r,m.skill,8);r.xp+=6;bump(s,'updates');log(r,`「${w.title}」 ${m.name} 업데이트. ${D.STATS[m.stat]} ${w.stats[m.stat]}. 팔로워에게 알림이 간다.`);break;}
  case 'comments':{const w=findWork(r,a.id);w.commentsClosed=!w.commentsClosed;log(r,`「${w.title}」 댓글 기능 ${w.commentsClosed?'닫음':'열림'}.`);break;}
  case 'only':{const w=findWork(r,a.id);if(r.creatorStage<2)throw Error('크랙 온리는 크리에이터만 등록할 수 있어요.');if(w.origin!=='original')throw Error('2차 창작은 온리 등록이 불가능해요.');if(w.badges.original)throw Error('오리지널 작품은 이미 전용 정산이 적용돼요.');if(w.badges.only&&w.badges.only>=r.week)throw Error('이미 온리 기간이에요.');if(w.visibility!=='public')throw Error('전체 공개 작품만 온리 등록할 수 있어요.');w.badges.only=r.week+24;r.stats.only++;bump(s,'only');trophy(s,'only');insight(s,'only_rate');log(r,`「${w.title}」 크랙 온리 등록 (24주). 정산 비율 1.5% → 2.5%, 해외 서비스 소개 대상.`);break;}
  case 'applyOriginal':{const w=findWork(r,a.id);if(r.creatorStage<2)throw Error('오리지널 심사는 크리에이터만 신청할 수 있어요.');if(w.kind!=='story')throw Error('오리지널 심사는 스토리 유형만 가능해요.');if(w.everPublic)throw Error('한 번이라도 전체 공개된 작품은 신청할 수 없어요.');if(w.origin!=='original')throw Error('2차 창작은 신청할 수 없어요.');if(w.originalReview)throw Error('이미 심사 중이에요.');if(w.badges.original)throw Error('이미 오리지널 작품이에요.');w.originalReview={appliedWeek:r.week,resultWeek:r.week+3,contest:r.contestMonth===monthKey(r.week)};bump(s,'original_apply');insight(s,'original_private');log(r,`「${w.title}」 크랙 오리지널 심사 신청. 결과는 3주 뒤.`);break;}
  case 'sequel':{const w=findWork(r,a.id);if(!w.badges.original)throw Error('오리지널 작품만 후속작 시리즈를 신청할 수 있어요.');if(r.drafts.length>=dv.slots)throw Error('제작 슬롯이 가득 찼어요.');if(r.works.some(x=>x.sequelOf===w.id&&x.originalReview)||r.drafts.some(x=>x.sequelOf===w.id))throw Error('이미 후속작을 준비 중이에요.');spend(s,120000,10);const d={...structuredClone(w),id:uid(),title:w.title+' S',sequelOf:w.id,modules:Object.fromEntries(applicableModules(w).map(m=>[m,m==='profile'||m==='keyword'?60:0])),points:{story:10,stability:15,visual:10,appeal:10},helpers:[],tests:0,testNote:null,milestones:[],crits:0,createdWeek:r.week};for(const k of ['stats','quality','volume','visibility','everPublic','releasedWeek','lastUpdated','status','badges','originalReview','plays','messages','likes','comments','commentCount','gifts','crackersTotal','settledTotal','active','retention','weekly','updates','bestRank','hotUntil','boostUntil','seasons'])delete d[k];r.drafts.push(d);log(r,`「${d.title}」 후속작 기획 시작. 완성 후 시리즈 심사를 받는다.`);break;}
  case 'enter':{const w=findWork(r,a.id);const c=r.contest;if(!c)throw Error('진행 중인 대회가 없어요.');if(c.entries.includes(w.id))throw Error('이미 참가한 작품이에요.');if(c.entries.length>=2)throw Error('대회당 최대 2작품까지 참가할 수 있어요.');const why=contestEligible(r,c,w);if(why)throw Error(why);c.entries.push(w.id);log(r,`「${w.title}」 ${c.name} 참가!`);break;}
  case 'archive':{const w=findWork(r,a.id);if(w.badges.original)throw Error('오리지널 작품은 삭제·완결 처리할 수 없어요. (저작권 귀속)');if(w.status!=='active')throw Error('이미 완결한 작품이에요.');w.status='archived';log(r,`「${w.title}」 완결 처리. 기록은 남는다.`);break;}
  case 'train':{if(!Object.hasOwn(D.SKILLS,a.skill))throw Error('알 수 없는 역량이에요.');if(r.skills[a.skill]>=10)throw Error('이미 최고 레벨이에요.');spend(s,dv.trainCost(a.skill)/dv.costMul,20);addSkillXp(r,a.skill,60);addStress(r,4);r.xp+=5;log(r,`${D.SKILLS[a.skill].name} 훈련 완료. 경험치 +60.`);break;}
  case 'buy':{const it=byId(D.ITEMS,a.id);if(!it)throw Error('알 수 없는 장비예요.');if(r.items.includes(it.id))throw Error('이미 보유한 장비예요.');spend(s,it.price,0);r.items.push(it.id);log(r,`${it.name} 구매. ${it.desc}`);break;}
  case 'subscribe':{const sub=byId(D.SUBSCRIPTIONS,a.id);if(!sub)throw Error('알 수 없는 구독이에요.');if(r.subs.includes(sub.id)){r.subs=r.subs.filter(x=>x!==sub.id);log(r,`${sub.name} 구독 해지.`);}else{spend(s,sub.monthly,0);r.subs.push(sub.id);log(r,`${sub.name} 구독 시작. 매월 ${sub.monthly.toLocaleString('ko-KR')}원.`);}break;}
  case 'move':{const st=D.STUDIOS.find(x=>x.id===Number(a.studio));if(!st)throw Error('알 수 없는 작업실이에요.');if(r.studio===st.id)throw Error('이미 여기 살고 있어요.');if(!r.ownedStudios.includes(st.id)){spend(s,st.deposit,0);r.ownedStudios.push(st.id);}r.studio=st.id;if(st.id===4)trophy(s,'studio4');log(r,`${st.name}(으)로 이사했다. 주당 임대료 ${st.rent.toLocaleString('ko-KR')}원.`);break;}
  case 'job':{const j=byId(D.JOBS,a.id);if(!j)throw Error('알 수 없는 일이에요.');if(r.rep<j.rep)throw Error(`인지도 ${j.rep} 이상이 필요해요.`);if(r.weekActions.jobs[j.id])throw Error('이번 주에 이미 한 일이에요.');spend(s,0,j.energy);r.weekActions.jobs[j.id]=true;r.money+=j.money;addStress(r,j.stress);if(j.followers)addFollowers(r,j.followers);if(j.xp)addSkillXp(r,j.xp,20);log(r,`${j.name} 완료. +${j.money.toLocaleString('ko-KR')}원`);break;}
  case 'life':{const l=byId(D.LIFE,a.id);if(!l)throw Error('알 수 없는 활동이에요.');if(l.id==='nap'){if(r.weekActions.nap)throw Error('이번 주는 이미 푹 쉬었어요.');r.weekActions.nap=true;r.energy=Math.max(0,r.energy-20);}else spend(s,0,l.energy);addStress(r,l.stress);r.inspiration=clamp(r.inspiration+l.inspiration);if(l.energyMax&&rng(r)<0.25){r.energyBonus=(r.energyBonus||0)+1;log(r,'꾸준한 운동으로 최대 체력 +1!');}log(r,`${l.name}. ${l.desc}`);break;}
  case 'endweek':return endWeek(s,dv);
  case 'retire':{if(r.week<D.WEEKS_PER_YEAR)throw Error('1년차를 마친 뒤부터 조기 은퇴할 수 있어요.');finishRun(s,true);break;}
  default:throw Error('알 수 없는 행동이에요.');
 }
 return s;
}
const monthKey=w=>monthOf(w)+yearOf(w)*100;
function bump(s,key,n=1){const c=s.run.stats.counters;c[key]=(c[key]||0)+n;}

function createDraft(s,a,dv){
 const r=s.run;const title=String(a.title||'').trim();
 if(r.drafts.length>=dv.slots)throw Error(`제작 슬롯이 가득 찼어요. (최대 ${dv.slots}개) 작업실을 넓히거나 작품을 완성하세요.`);
 if(title.length<2||title.length>30)throw Error('이름은 2~30자로 입력해 주세요.');
 const kind=byId(D.KINDS,a.kind),genre=dv.genres.find(g=>g.id===a.genre),target=byId(D.TARGETS,a.target),form=byId(D.FORMS,a.form),mode=byId(D.MODES,a.mode),len=byId(D.LENGTHS,Number(a.length)),aud=byId(D.AUDIENCES,a.audience),img=byId(D.IMAGE_SOURCES,a.imageSource),origin=byId(D.ORIGINS,a.origin),tpl=byId(D.TEMPLATES,a.template);
 if(!kind)throw Error('작품 유형을 선택해 주세요.');if(!genre)throw Error('아직 열리지 않은 장르예요.');if(!target||!form||!mode||!len||!aud||!img||!origin||!tpl)throw Error('등록 정보를 모두 선택해 주세요.');
 const tags=[...new Set((Array.isArray(a.tags)?a.tags:[]).map(String))].filter(t=>D.TAGS.includes(t)).slice(0,3);
 if(r.inspiration<20)throw Error('영감이 부족해요. (20 필요) 산책이나 다른 작품 플레이로 영감을 채워 보세요.');
 const cost=kind.id==='story'?120000:60000;spend(s,cost,10);r.inspiration-=20;
 const d={id:uid(),title,kind:kind.id,genre:genre.id,tags,target:target.id,form:form.id,mode:mode.id,length:len.id,audience:aud.id,imageSource:img.id,origin:origin.id,template:tpl.id,modules:{},points:{story:0,stability:0,visual:0,appeal:0},helpers:[],tests:0,testNote:null,milestones:[],crits:0,createdWeek:r.week,sequelOf:null};
 for(const m of applicableModules(d))d.modules[m]=0;
 r.drafts.push(d);
 if(aud.id==='adult')bump(s,'adult');if(len.id>=3)bump(s,'length3');if(origin.id==='fanwork'){bump(s,'fanwork');insight(s,'fanwork');}if(target.id==='female')bump(s,'target_female');if(target.id==='male')bump(s,'target_male');
 log(r,`「${title}」 ${kind.name} 제작 시작. ${genre.name} · ${target.name} · ${form.name}`);
 return s;
}
function work(s,a,dv){
 const r=s.run;const d=findDraft(r,a.id);const m=Object.hasOwn(D.MODULES,a.module)?D.MODULES[a.module]:null;if(!m||!applicableModules(d).includes(a.module))throw Error('잘못된 탭이에요.');if(d.modules[a.module]>=100)throw Error('이미 완료한 탭이에요.');
 const tpl=byId(D.TEMPLATES,d.template),img=byId(D.IMAGE_SOURCES,d.imageSource);
 const imgCost=a.module==='media'||a.module==='profile'?(r.subs.includes('imagegen')&&img.id==='gen'?0:img.cost*(a.module==='profile'?1:2)):0;
 spend(s,imgCost,15);
 const skill=r.skills[m.skill];
 const gain=Math.max(8,R((30+skill*2+dv.progressBonus)*tpl.progress/m.cost*dv.progressMul*(r.stress>=70?0.7:1)*noise(r,0.15)));
 let pts=(5+skill*1.6)*tpl.points*dv.pointMul*dv.statMul[m.stat]*noise(r,0.2);
 const crit=rng(r)<dv.crit;if(crit){pts*=2.2;d.crits++;}
 pts=R(pts*10)/10;d.points[m.stat]+=pts;const others=Object.keys(D.STATS).filter(k=>k!==m.stat);d.points[pick(r,others)]+=R(pts*0.25*10)/10;
 d.modules[a.module]=Math.min(100,d.modules[a.module]+gain);
 addStress(r,4+(r.traits.includes('owl')?1:0));r.inspiration=clamp(r.inspiration-2);r.xp+=4;addSkillXp(r,m.skill,6);
 log(r,`${crit?'✦ 영감 폭발! ':''}「${d.title}」 ${m.name} +${gain}% (${d.modules[a.module]}%) · ${D.STATS[m.stat]} +${pts}`);
 checkMilestone(r,d,a.module);
 if(a.module==='keyword'&&d.modules.keyword>=100){bump(s,'keyword');if((r.stats.counters.keyword||0)>=2)insight(s,'keyword_stab');}
 return s;
}
function checkMilestone(r,d,m){if(d.modules[m]>=50&&!d.milestones.includes(m)){d.milestones.push(m);r.queue.push({kind:'milestone',draftId:d.id,module:m,title:`「${d.title}」 ${D.MODULES[m].name} 방향`,text:`${D.MODULES[m].name} 탭이 절반을 넘었다. 어디에 힘을 줄까?`,options:MILESTONES[m].map(o=>({label:o.label}))});}}
export const requiredDone=d=>applicableModules(d).filter(m=>D.MODULES[m].required).every(m=>d.modules[m]>=100);

function register(s,a,dv){
 const r=s.run;const d=findDraft(r,a.id);
 if(!requiredDone(d))throw Error('필수 탭(프로필·스토리 설정·시작 설정·등록)을 100% 완료해야 등록할 수 있어요.');
 if(!['public','link','private'].includes(a.visibility))throw Error('공개 여부를 선택해 주세요.');
 spend(s,0,10);
 const {stats,volume}=assess(s,d);for(const k in stats)stats[k]=clamp(R(stats[k]*noise(r,0.05)),1,100);
 const w={...d,stats,quality:quality(stats),volume,visibility:a.visibility,everPublic:false,releasedWeek:r.week,lastUpdated:r.week,status:'active',badges:{only:null,original:false},originalReview:null,hotUntil:0,boostUntil:0,plays:0,messages:0,likes:0,comments:[],commentCount:0,commentsClosed:false,gifts:0,crackersTotal:0,settledTotal:0,active:0,retention:0,weekly:[],updates:0,bestRank:999,seasons:0};
 r.works.unshift(w);r.drafts=r.drafts.filter(x=>x.id!==d.id);r.xp+=40;addStress(r,-6);
 if(d.sequelOf){w.originalReview={appliedWeek:r.week,resultWeek:r.week+2,sequel:true,contest:false};w.visibility='private';log(r,`「${w.title}」 후속작 시리즈 심사 중. 결과는 2주 뒤.`);return s;}
 if(a.visibility==='public'){w.everPublic=true;r.totals.publicWorks++;r.stats.works++;if(!r.stats.genres.includes(w.genre))r.stats.genres.push(w.genre);trophy(s,'first');if(r.stats.works>=10)trophy(s,'ten');if(r.stats.genres.length>=7)trophy(s,'allgenre');if(w.tags.some(t=>r.trend.tags.includes(t)))bump(s,'tagmeta');}
 r.queue.push({kind:'release',title:`「${w.title}」 ${a.visibility==='public'?'전체 공개':a.visibility==='link'?'링크 공개':'비공개 등록'}`,text:a.visibility==='public'?'신작 탭에 2주간 노출된다. 첫 주 좋아요 비율이 높으면 "반응 뜨거운 신작"으로 더 오래 노출된다.':a.visibility==='link'?'링크를 아는 사람만 플레이. 커뮤니티 홍보와 테스트에 쓰인다. 전체 공개 전까지 오리지널 신청 자격이 유지된다.':'나만 플레이할 수 있다. 오리지널 심사 신청 자격이 유지된다.',stats,volume,workId:w.id,options:[{label:'확인'}]});
 log(r,`「${w.title}」 등록 완료 (${a.visibility}). 완성도 ${w.quality}.`);
 return s;
}

function choose(s,a){
 const r=s.run;const q=r.queue[0];if(!q)throw Error('고를 선택지가 없어요.');const i=Number(a.option);if(!Number.isInteger(i)||i<0||i>=q.options.length)throw Error('잘못된 선택이에요.');
 r.queue.shift();
 if(q.kind==='milestone'){const d=r.drafts.find(d=>d.id===q.draftId);const o=MILESTONES[q.module][i];if(d){for(const [k,v] of Object.entries(o.effects)){if(k==='money')r.money+=v;else d.points[k]+=v>0?R(v*difficultyOf(r).stats*10)/10:v;}log(r,`「${d.title}」 ${o.label}: ${o.log}`);}}
 else if(q.kind==='event'){const ev=byId(D.EVENTS,q.eventId);if(ev){const o=ev.options[i];applyEffects(s,o.effects,q);log(r,`${q.title} → ${o.label}. ${o.log}`);}}
 return s;
}
function applyEffects(s,e,q){
 const r=s.run;const newest=r.works.find(w=>w.visibility==='public'&&w.status==='active');
 if(e.money)r.money+=e.money;if(e.stress)addStress(r,e.stress);if(e.inspiration)r.inspiration=clamp(r.inspiration+e.inspiration);
 if(e.followers)addFollowers(r,e.followers);if(e.rep)r.rep=Math.max(0,r.rep+e.rep);if(e.energy)r.energy=Math.max(0,r.energy+e.energy);
 if(e.skillXp)for(const [k,v] of Object.entries(e.skillXp))addSkillXp(r,k,v);
 for(const key of ['reach','progress','pay','promo']){const m=e[key+'Mod'];if(m)(r.mods[key]??=[]).push({mul:m.mul,weeks:m.weeks});}
 if(e.contestMonth)r.contestMonth=monthKey(r.week);
 if(e.draftPoints&&r.drafts[0])for(const [k,v] of Object.entries(e.draftPoints))r.drafts[0].points[k]+=v;
 if(e.workPoints)for(const w of r.works)for(const [k,v] of Object.entries(e.workPoints)){w.stats[k]=clamp(w.stats[k]+v);w.quality=quality(w.stats);}
 if(e.trophy)trophy(s,e.trophy);if(e.flag)r.flags[e.flag]=true;if(e.gift){r.pendingCash+=R(e.gift*D.WON_PER_CRACKER*D.GIFT_RATE.creator);}
 if(e.relation&&q?.rivalId){const rv=r.rivals.find(x=>x.id===q.rivalId);if(rv)rv.relation=clamp(rv.relation+e.relation,-100,100);}
 if(e.closeComments&&newest)newest.commentsClosed=true;
 if(e.convertAdult){const w=r.works.find(w=>w.visibility==='public'&&w.audience==='all');if(w){w.audience='adult';log(r,`「${w.title}」 성인 작품으로 전환됐다.`);}}
 if(e.archiveFanwork){const w=r.works.find(w=>w.origin==='fanwork'&&w.visibility==='public');if(w)w.visibility='private';}
 if(e.replaceRipped){for(const w of r.works)if(w.imageSource==='ripped')w.imageSource='free';bump(s,'ripped_caught');insight(s,'ripped_risk');}
 if(e.riskAll){for(const w of r.works)w.riskMod=(w.riskMod||0)+e.riskAll;}
 if(e.sanction){sanction(s,e.sanction,q);}
 if(e.hackRisk&&rng(r)<0.35){const loss=Math.min(r.money,300000);r.money-=loss;log(r,`계정이 털렸다. 크래커 결제 피해 ${loss.toLocaleString('ko-KR')}원.`);addStress(r,15);}
 if(e.relationRandom){const rv=pick(r,r.rivals);rv.relation=clamp(rv.relation+e.relationRandom,-100,100);}
 if(e.cashPct)r.pendingCash=Math.max(0,R(r.pendingCash*(1+e.cashPct)));if(e.delaySettle)r.flags.delaySettle=true;
 if(e.reviewDelay)for(const w of r.works)if(w.originalReview)w.originalReview.resultWeek+=e.reviewDelay;
 if(e.adultMod)(r.mods.adult??=[]).push({mul:e.adultMod.mul,weeks:e.adultMod.weeks});
}
function sanction(s,n,q){const r=s.run;r.sanctions+=n;const level=r.sanctions;
 if(q?.eventId==='ripped_caught'){const w=r.works.find(w=>w.imageSource==='ripped'&&w.visibility==='public');if(w&&n>=2){w.status='blocked';w.visibility='private';}for(const w of r.works)if(w.imageSource==='ripped')w.imageSource='free';bump(s,'ripped_caught');insight(s,'ripped_risk');}
 if(q?.eventId==='ip_report'){const w=r.works.find(w=>w.origin==='fanwork'&&w.visibility==='public');if(w){w.status='blocked';w.visibility='private';}}
 const msg=level>=4?'누적 제재로 크리에이터 권한이 박탈됐다.':level===3?'7일 이용 제한. 다음 주 노출이 막힌다.':level===2?'3일 이용 제한. 다음 주 체력 -30.':'경고 1회. 다음부터는 이용 제한이다.';
 notice(r,`⚠ 운영 정책 위반 제재 ${level}단계: ${msg}`);log(r,`⚠ 제재 ${level}단계: ${msg}`);
 if(level===3)(r.mods.reach??=[]).push({mul:0.15,weeks:1});if(level===2)r.flags.energyPenalty=30;
 if(level>=4){r.creatorStage=0;finishRun(s,true);}
}

function freshness(r,w){const age=r.week-w.releasedWeek;const eff=Math.min(age,r.week-w.lastUpdated+2);if(eff<=0)return 1.8;if(eff===1)return 1.4;if(eff===2)return 1.1;return Math.max(0.06,1/(1+(eff-2)*0.22));}
function appetite(r,w){const g=byId(D.GENRES,w.genre);const tg=byId(D.TARGETS,w.target);let a;if(w.target==='all')a=(g.aud.female+g.aud.male)/2*(r.trend.mood.female===w.genre||r.trend.mood.male===w.genre?1.15:1);else a=g.aud[w.target]*(r.trend.mood[w.target]===w.genre?1.3:1);return a*tg.pool;}
function addComment(r,w,text,troll){w.comments.unshift({text,week:r.week,troll:!!troll});w.comments=w.comments.slice(0,12);}
function genComments(s,r,w,n){
 const C=D.COMMENTS;const sorted=Object.entries(w.stats).sort((a,b)=>b[1]-a[1]);const strong=sorted[0][0],weak=sorted[3][0];
 for(let i=0;i<Math.min(2,n);i++){
  const k=rng(r);let text,troll=false;
  if(k<0.12){text=pick(r,C.troll);troll=true;addStress(r,r.traits.includes('steel')?1:3);}
  else if(k<0.4)text=pick(r,C[strong+'_hi']);
  else if(k<0.6&&w.stats[weak]<55)text=pick(r,C[weak+'_lo']);
  else if(k<0.75&&w.target!=='all')text=pick(r,C[w.target]);
  else if(k<0.82&&w.audience==='adult')text=pick(r,C.adult);
  else if(k<0.86&&w.form==='simul')text=pick(r,C.sim);else if(k<0.86&&w.form==='narr')text=pick(r,C.narr);
  else if(k<0.89&&w.length>=3)text=pick(r,C.long);else if(k<0.89&&w.mode==='light')text=pick(r,C.light);else if(k<0.89&&w.mode==='hyper')text=pick(r,C.hyper);
  else if(k<0.92&&r.week-w.lastUpdated<=1&&w.updates)text=pick(r,C.update);
  else if(k<0.94&&w.award)text=pick(r,C.award);else if(k<0.94&&w.sequelOf)text=pick(r,C.sequel);else if(k<0.94&&w.badges.original)text=pick(r,C.original);
  else if(k<0.96&&r.rivals.some(x=>x.relation>=30)){const rv=r.rivals.find(x=>x.relation>=30);text=pick(r,C.rival).replace('{rival}',rv.name);}
  else text=pick(r,C.generic);
  addComment(r,w,text,troll);
 }
}

function endWeek(s,dv){
 const r=s.run;const social=r.traits.includes('social');const merchant=r.traits.includes('merchant')?1.12:1;
 const newest=r.works.find(w=>w.visibility==='public'&&w.status==='active');if(r.subs.includes('manager')&&newest){const used=r.weekActions.promos[newest.id]??=[];if(!used.includes('sns'))used.push('sns');}
 const reachMod=modMul(r,'reach'),payMod=modMul(r,'pay'),promoMod=modMul(r,'promo');
 const rows=[];let cashWeek=0,giftWeek=0,fans=0,msgsTotal=0,playersTotal=0;
 for(const w of r.works){
  if(w.visibility!=='public'||w.status!=='active')continue;
  const age=r.week-w.releasedWeek;const fresh=freshness(r,w);
  const newTab=age<=1?1.6:(w.hotUntil>=r.week?1.5:1);const boost=w.boostUntil>=r.week?1.6:1;
  const promoMul=(r.weekActions.promos[w.id]||[]).reduce((m,id)=>{const p=byId(D.PROMOS,id);let mul=p.mul;if(id==='gallery'&&w.audience==='adult')mul=2.2;return m*(1+(mul-1)*promoMod*(social?1.1:1));},1);
  const tagHits=w.tags.filter(t=>r.trend.tags.includes(t)).length;const tagMul=1+0.18*tagHits;
  const aud=byId(D.AUDIENCES,w.audience),origin=byId(D.ORIGINS,w.origin),len=byId(D.LENGTHS,w.length),form=byId(D.FORMS,w.form),mode=byId(D.MODES,w.mode);
  const base=40+6*Math.sqrt(r.rep)+(w.badges.only?8:0)+(w.badges.original?25:0);
  const exposure=dv.difficulty.reach*base*fresh*newTab*boost*appetite(r,w)*tagMul*promoMul*reachMod*aud.pool*origin.boost*(1+r.skills.community*0.03)*(mode.id==='hyper'?0.8:mode.id==='light'?1.15:1)*(r.studio===4?1.05:1)*(w.audience==='adult'?modMul(r,'adult'):1)*(w.award?1.1:1)*noise(r,0.15);
  const followerArr=r.followers*(age===0?0.12:age===1?0.05:(r.week-w.lastUpdated<=1&&w.updates?0.04:0.004))*(w.target==='all'?1:1.05);
  const arrivals=R(exposure*(0.06+w.stats.appeal/220)+followerArr);
  w.retention=clamp((w.stats.story*0.5+w.stats.stability*0.5)/100*0.8*len.retention,0.05,0.7);
  const returning=R(w.active*w.retention);w.active=arrivals+returning;
  const msgs=R(w.active*(14+w.stats.story/6)*form.msgs*noise(r,0.1));
  const paying=0.22*aud.pay*payMod*(mode.id==='hyper'?0.9:mode.id==='light'?0.5:1);
  const crackers=R(msgs*paying*mode.crackers*len.cracker);
  const rate=w.badges.original?D.SETTLE_RATE.original:(w.badges.only&&w.badges.only>=r.week)?D.SETTLE_RATE.only:D.SETTLE_RATE.base;
  const settled=r.creatorStage>=2?R(crackers*D.WON_PER_CRACKER*rate*merchant):0;
  const giftCr=R(msgs*0.03*(w.quality/80)*noise(r,0.5));const giftWon=R(giftCr*D.WON_PER_CRACKER*(r.creatorStage>=2?D.GIFT_RATE.creator:D.GIFT_RATE.normal)*merchant);
  const likes=R(arrivals*(w.quality/100)*0.08);const likeRatio=arrivals?likes/arrivals:0;
  const newFans=R(arrivals*(w.quality/100)*0.12);
  w.plays+=arrivals;w.messages+=msgs;w.likes+=likes;w.crackersTotal+=crackers;w.settledTotal+=settled;w.gifts+=giftCr;
  if(!w.commentsClosed){const n=R(arrivals*0.025*noise(r,0.5));w.commentCount+=n;if(n>0)genComments(s,r,w,n);if(w.commentCount>=100)trophy(s,'comments100');}
  w.weekly.push({week:r.week,arrivals,msgs,settled,crackers});if(w.weekly.length>60)w.weekly.shift();
  if(age===1&&likeRatio>=0.06&&rng(r)<0.35+(r.traits.includes('lucky')?0.25:0)+(likeRatio-0.06)*4){w.hotUntil=r.week+2;r.stats.hot++;trophy(s,'hot');feed(r,'me',D.FEED_TEMPLATES.hot[0].replace('{title}',w.title));insight(s,'newtab');log(r,`🔥 「${w.title}」 반응 뜨거운 신작 선정! 2주 추가 노출.`);}
  cashWeek+=settled;giftWeek+=giftWon;fans+=newFans;msgsTotal+=msgs;playersTotal+=arrivals;
  rows.push({id:w.id,title:w.title,arrivals,returning,msgs,crackers,settled,gift:giftWon,likes,fans:newFans,promoted:promoMul>1,tagHits,rank:0,target:w.target});
  if(age>12&&msgs<80&&!w.badges.original){w.status='archived';log(r,`「${w.title}」 독자가 거의 떠났다. 자연 완결.`);}
 }
 // 라이벌
 const board=[];
 for(const rv of r.rivals){
  const arch=byId(D.RIVAL_ARCHETYPES,rv.arch);
  if(rng(r)<arch.rate){const nw=makeRivalWork(r,rv,arch,r.week);rv.works.push(nw);if(rng(r)<0.5)feed(r,'rival',pick(r,D.FEED_TEMPLATES.rival_new).replace('{rival}',rv.name).replace('{title}',nw.title));if(nw.badge==='original'){rv.originals++;feed(r,'rival',D.FEED_TEMPLATES.rival_original[0].replace('{rival}',rv.name).replace('{title}',nw.title));}else if(nw.badge==='only'&&rng(r)<0.5)feed(r,'rival',D.FEED_TEMPLATES.rival_only[0].replace('{rival}',rv.name).replace('{title}',nw.title));}
  rv.works=rv.works.filter(x=>r.week-x.releasedWeek<40);
  for(const x of rv.works){const age=r.week-x.releasedWeek;const f=age<=0?1.8:age===1?1.4:age===2?1.1:Math.max(0.12,1/(1+(age-2)*0.22));x.msgs=R(dv.difficulty.rival*rv.power*(200+25*Math.sqrt(rv.followers))*f*10*noise(r,0.35)*(x.badge?1.3:1)*(r.trend.mood[rv.target]===x.genre?1.3:1));x.plays+=R(x.msgs/20);board.push({title:x.title,author:rv.name,msgs:x.msgs,rival:true,target:x.target,badge:x.badge,adult:x.adult});}
  rv.followers=R(rv.followers*(1+(arch.grow?0.012:0.004)+rng(r)*0.004));if(rv.followers>3000&&rv.stage<2)rv.stage=2;else if(rv.followers>800&&rv.stage<1)rv.stage=1;
 }
 for(const row of rows)board.push({title:row.title,author:r.name,msgs:row.msgs,rival:false,id:row.id,target:row.target});
 board.sort((a,b)=>b.msgs-a.msgs);
 let repGiven=false;board.forEach((b,i)=>{if(!b.rival){const row=rows.find(x=>x.id===b.id);row.rank=i+1;const w=r.works.find(w=>w.id===b.id);if(w){w.prevRank=w.lastRank||0;w.lastRank=i+1;if(i+1<w.bestRank)w.bestRank=i+1;}if(i<10&&!repGiven){r.rep+=[8,6,5,4,3,2,2,1,1,1][i];repGiven=true;}if(i===0){r.stats.weekly1++;trophy(s,'weekly1');}if(i+1<r.stats.bestRank)r.stats.bestRank=i+1;}});
 r.ranking={all:board.slice(0,10).map((b,i)=>({rank:i+1,...b})),female:board.filter(b=>b.target==='female').slice(0,10).map((b,i)=>({rank:i+1,...b})),male:board.filter(b=>b.target==='male').slice(0,10).map((b,i)=>({rank:i+1,...b}))};
 if(rng(r)<0.6){const rv=pick(r,r.rivals);feed(r,'post',pick(r,D.FEED_TEMPLATES.rival_post).replace('{rival}',rv.name).replace('{tag}',r.trend.tags[0]));}
 // 경제·회복
 r.pendingCash+=cashWeek+giftWeek;r.totals.messages+=msgsTotal;r.totals.players+=playersTotal;r.totals.crackers+=rows.reduce((a,b)=>a+b.crackers,0);
 r.money-=dv.studio.rent;if(dv.bg.salary)r.money+=dv.bg.salary;addFollowers(r,fans);if(r.studio===4)r.rep+=3;
 let burnout=false;if(r.stress>=95){burnout=true;r.stats.burnouts++;r.stress=55;}
 r.stress=clamp(r.stress-dv.recover);r.inspiration=clamp(r.inspiration+dv.inspirationWeekly);r.stats.stressSum+=r.stress;
 for(const key in r.mods)r.mods[key]=r.mods[key].map(m=>({...m,weeks:m.weeks-1})).filter(m=>m.weeks>0);
 if(r.followers>=1000)trophy(s,'fans1k');if(r.followers>=10000)trophy(s,'fans10k');if(r.followers>=300)insight(s,'followers_notify');
 r.report={week:r.week,calendar:calendar(r.week),cash:cashWeek,gift:giftWeek,rent:dv.studio.rent,salary:dv.bg.salary||0,fans,msgs:msgsTotal,players:playersTotal,rows,ranking:r.ranking.all,events:[],pendingCash:r.pendingCash};
 r.history.followers.push(r.followers);r.history.money.push(r.money);r.history.rep.push(r.rep);r.history.messages.push(msgsTotal);
 // 크리에이터 사다리
 creatorLadder(s);
 // 오리지널 심사 결과
 for(const w of r.works){if(w.originalReview&&w.originalReview.resultWeek<=r.week)resolveReview(s,w);}
 // 월말·연말
 const monthEnd=weekOfMonth(r.week)===D.WEEKS_PER_MONTH;const yearEnd=r.week%D.WEEKS_PER_YEAR===0;
 if(r.contest&&r.contest.endWeek<=r.week)resolveContest(s);
 if(monthEnd)monthClose(s,dv);
 if(yearEnd){if(r.sanctions===0)trophy(s,'clean');yearAwards(s);}
 r.week++;
 if(weekOfMonth(r.week)===1&&!r.contest&&(monthOf(r.week)%2===1||(monthOf(r.week)===11&&yearOf(r.week)>=2)))openContest(s);
 if(weekOfMonth(r.week)===1&&r.week>1){let fee=0;for(const id of r.subs)fee+=byId(D.SUBSCRIPTIONS,id).monthly;if(fee){r.money-=R(fee*dv.costMul);r.report.events.push(`구독료 ${R(fee*dv.costMul).toLocaleString('ko-KR')}원 결제`);}r.trend=r.nextTrend;r.nextTrend=rollTrend(r);}
 if(burnout){r.queue.push({kind:'event',eventId:'__burnout',title:'번아웃',text:'몸과 마음이 멈췄다. 이번 주는 절반의 체력으로 시작한다. 쉬어가자.',options:[{label:'...쉬자'}]});r.report.events.push('번아웃! 체력 절반으로 시작');}
 if(rng(r)<0.5){const ev=rollEvent(s);if(ev){const rv=ev.need==='relationGood'?(r.rivals.find(x=>x.relation>=30)||pick(r,r.rivals)):pick(r,r.rivals);const tier=r.rep>=1200?'상위권':r.rep>=300?'중위권':'"기타"';r.queue.push({kind:'event',eventId:ev.id,rivalId:rv.id,title:ev.title.replace('{rival}',rv.name),text:ev.text.replace('{rival}',rv.name).replace('{tier}',tier),options:ev.options.map(o=>({label:o.label}))});if(ev.once)(r.flags.seen??=[]).push(ev.id);}}
 // 난이도 이벤트는 일반 이벤트와 별도로 분기마다 1회. 새 주에 적용하여 기간을 온전히 보장한다.
 if(r.week<=r.careerWeeks&&r.week%12===6){const pool=D.EVENTS.filter(e=>e.difficulty===difficultyOf(r).id);const ev=pool[Math.floor((r.week-6)/12)%pool.length];if(ev)r.queue.push({kind:'event',eventId:ev.id,difficulty:ev.difficulty,symbol:ev.symbol,title:ev.title,text:ev.text+(ev.options.some(o=>o.effects.stress>0)?' 스트레스 표시는 난이도 반영값이며, 강철 멘탈 특성이 있으면 더 줄어듭니다.':''),options:ev.options.map(o=>({label:o.label}))});}
 r.energy=burnout?R(dv.energyMax/2):dv.energyMax;if(r.flags.energyPenalty){r.energy=Math.max(10,r.energy-r.flags.energyPenalty);delete r.flags.energyPenalty;}
 r.weekActions={promos:{},jobs:{},nap:false,updates:{}};
 if(r.week-1>=8)insight(s,'creator_gate');if((r.stats.counters.gallery||0)>=3)insight(s,'gallery_adult');if((r.stats.counters.tagmeta||0)>=1)insight(s,'tags_meta');if((r.stats.counters.updates||0)>=3)insight(s,'fresh_update');if((r.stats.counters.adult||0)>=1&&r.works.some(w=>w.audience==='adult'&&w.plays>0))insight(s,'adult_pay');if((r.stats.counters.length3||0)>=1)insight(s,'length_tradeoff');if((r.stats.counters.target_female||0)>=2)insight(s,'female_story');if((r.stats.counters.target_male||0)>=2)insight(s,'male_sim');
 log(r,`주간 집계 · 발화 ${msgsTotal.toLocaleString('ko-KR')} · 정산 예정 +${(cashWeek+giftWeek).toLocaleString('ko-KR')}원 · 팔로워 +${fans}${rows.length?` · 최고 ${Math.min(...rows.map(x=>x.rank))}위`:''}`);
 if(!r.ended&&r.week>r.careerWeeks)finishRun(s,false);
 return s;
}
function creatorLadder(s){
 const r=s.run,req=creatorReq(s);
 if(r.creatorStage===0&&r.totals.publicWorks>=req.works&&r.totals.players>=req.players&&r.followers>=req.followers){r.creatorStage=1;trophy(s,'mission');notice(r,`🎯 크리에이터 미션 참여 조건 달성! 이제 누적 발화 ${req.messages.toLocaleString('ko-KR')}을 채우면 정식 크리에이터가 된다.`);log(r,'크리에이터 미션 시작!');}
 if(r.creatorStage===1&&r.totals.messages>=req.messages){r.creatorStage=2;trophy(s,'creator');notice(r,'🏅 정식 크리에이터 등록! 프로필에 크리에이터 배지가 붙고, 이제부터 크래커 사용량의 1.5%가 매월 캐시로 정산된다. 선물 정산 90%. 크랙 온리·오리지널 신청이 열린다.');log(r,'정식 크리에이터가 되었다!');}
}
function resolveReview(s,w){
 const r=s.run;const rv=w.originalReview;w.originalReview=null;
 let chance=rv.sequel?0.8:clamp((w.quality-55)/40+w.volume*0.05+(rv.contest?0.15:0),0.05,0.9);
 if(rng(r)<chance){
  w.badges.original=true;w.visibility='public';if(!w.everPublic){w.everPublic=true;r.totals.publicWorks++;r.stats.works++;if(!r.stats.genres.includes(w.genre))r.stats.genres.push(w.genre);}w.releasedWeek=r.week;w.lastUpdated=r.week;w.boostUntil=r.week+4;w.status='active';
  const buyout=rv.sequel?R(300000+w.quality*w.quality*150):R(500000+w.quality*w.quality*400+(rv.contest?3000000:0));r.money+=buyout;r.rep+=rv.sequel?60:150;r.stats.originals++;bump(s,'original');
  trophy(s,rv.sequel?'sequel':'original');if(r.stats.burnouts)trophy(s,'survivor');
  r.queue.push({kind:'event',eventId:'__original',title:rv.sequel?`「${w.title}」 후속작 시리즈 승인`:`「${w.title}」 크랙 오리지널 선정!`,text:`구매금 ${buyout.toLocaleString('ko-KR')}원이 입금됐다 (제세공과금 공제). 저작권은 플랫폼에 귀속되며 삭제·비공개는 불가. 크래커 수익의 2.5%가 캐시로 정산되고 4주간 공식 추천에 노출된다.`,options:[{label:'계약서에 서명한다'}]});
  log(r,`★ 「${w.title}」 오리지널 ${rv.sequel?'후속작 승인':'선정'}! 구매금 ${buyout.toLocaleString('ko-KR')}원.`);
 }else{
  r.queue.push({kind:'event',eventId:'__reject',title:`「${w.title}」 심사 결과: 미선정`,text:`아쉽게도 선정되지 않았다. (통과 확률 ${R(chance*100)}%) 작품은 그대로 남아 있다. 전체 공개로 돌리거나, 보강 후 다시 신청할 수 있다.`,options:[{label:'다음을 기약한다'}]});
  addStress(r,8);log(r,`「${w.title}」 오리지널 심사 미선정.`);
 }
}
function rollEvent(s){
 const r=s.run;const lucky=r.traits.includes('lucky');const pub=r.works.filter(w=>w.visibility==='public'&&w.status==='active');
 const ok=e=>{if(e.once&&(r.flags.seen||[]).includes(e.id))return false;switch(e.need){case undefined:return true;case 'published':return pub.length>0;case 'published_all':return pub.some(w=>w.audience==='all');case 'stress60':return r.stress>=60;case 'stress50':return r.stress>=50;case 'rep150':return r.rep>=150;case 'rep300':return r.rep>=300;case 'rep800':return r.rep>=800&&!r.flags.publisher;case 'fans500':return r.followers>=500;case 'fans1000':return r.followers>=1000;case 'fans2000':return r.followers>=2000;case 'rich':return r.settledTotal>=5000000;case 'cat':return r.items.includes('cat');case 'creator':return r.creatorStage>=2;case 'only':return pub.some(w=>w.badges.only&&w.badges.only>=r.week);case 'fanwork':return pub.some(w=>w.origin==='fanwork');case 'ripped':return pub.some(w=>w.imageSource==='ripped');case 'hit':return pub.some(w=>w.messages>50000);case 'rep500':return r.rep>=500;case 'reviewing':return r.works.some(w=>w.originalReview);case 'relationGood':return r.rivals.some(x=>x.relation>=30);case 'hasAdult':return pub.some(w=>w.audience==='adult');case 'poor':return r.money<300000;default:return false;}};
 const pool=D.EVENTS.filter(e=>!e.difficulty&&ok(e));if(!pool.length)return null;
 const bad=new Set(['troll','price_up','maintenance','laptop','plagiarism','model_update','cold','censorship_drama','status_changed','tax','gallery_rank','hacked','prompt_leak','refund_wave','settle_delay','comment_raid','algo_drop','fee_up','release_rush','usernote_abuse','review_delay','false_report','theft','fan_leave','ill','rival_diss','ad_policy','bug_week']);
 const weights=pool.map(e=>e.weight*(lucky&&bad.has(e.id)?0.5:1));const total=weights.reduce((a,b)=>a+b,0);let x=rng(r)*total;
 for(let i=0;i<pool.length;i++){x-=weights[i];if(x<=0)return pool[i];}return pool[pool.length-1];
}
function monthClose(s,dv){
 const r=s.run;const from=r.week-D.WEEKS_PER_MONTH+1;
 // 월간 랭킹
 const mine=r.works.map(w=>({title:w.title,author:r.name,msgs:w.weekly.filter(x=>x.week>=from).reduce((a,b)=>a+b.msgs,0),rival:false})).filter(x=>x.msgs>0);
 const theirs=[];for(const rv of r.rivals)for(const x of rv.works)theirs.push({title:x.title,author:rv.name,msgs:R(x.msgs*(2.6+rng(r))),rival:true});
 const all=[...mine,...theirs].sort((a,b)=>b.msgs-a.msgs).slice(0,5);
 r.monthly={month:monthOf(r.week),year:yearOf(r.week),top:all};
 if(all[0]&&!all[0].rival){r.stats.monthly1++;r.rep+=60;trophy(s,'monthly1');r.report.events.push(`🥇 월간 랭킹 1위! 「${all[0].title}」`);}
 else if(all.some(x=>!x.rival)){r.rep+=20;r.report.events.push('월간 랭킹 TOP 5 진입. 인지도 +20');}
 // 월 정산(현금 전환). 최소 1만원, 세금 3.3% 원천징수
 const gross=r.pendingCash;let paid=0,tax=0;
 if(r.flags.delaySettle){delete r.flags.delaySettle;r.report.events.push('정산 지연: 이번 달 캐시는 다음 달로 이월');}
 else if(gross>=D.CASHOUT_MIN){tax=R(gross*0.033);paid=gross-tax;r.money+=paid;r.settledTotal+=gross;r.pendingCash=0;}
 r.statements.unshift({week:r.week,label:`${yearOf(r.week)}년차 ${monthOf(r.week)}월`,gross,tax,paid,creator:r.creatorStage>=2,msgs:r.history.messages.slice(-4).reduce((a,b)=>a+b,0)});r.statements=r.statements.slice(0,36);
 r.report.events.push(gross>=D.CASHOUT_MIN?`💰 월 정산: 캐시 ${gross.toLocaleString('ko-KR')}원 → 세금 ${tax.toLocaleString('ko-KR')}원 공제 후 ${paid.toLocaleString('ko-KR')}원 입금`:`월 정산: 캐시 ${gross.toLocaleString('ko-KR')}원 (최소 전환 1만원 미만, 이월)`);
 if(gross>=1000000)trophy(s,'settle1m');if(gross>=10000000)trophy(s,'settle10m');
 // 온리 만료
 for(const w of r.works)if(w.badges.only&&w.badges.only<r.week){w.badges.only=null;log(r,`「${w.title}」 크랙 온리 기간 종료.`);}
}
export function contestEligible(r,c,w){
 if(w.visibility!=='public'||w.status!=='active')return '전체 공개 중인 작품만 참가할 수 있어요.';
 if(w.releasedWeek<c.startWeek-8)return '대회 공고 8주 이내에 공개한 작품만 참가할 수 있어요.';
 if(w.award)return '이미 수상한 작품은 참가할 수 없어요.';
 const t=c.theme;
 if(t.kind==='tag'&&!w.tags.includes(t.value))return `#${t.value} 태그가 있는 작품만 참가할 수 있어요.`;
 if(t.kind==='genre'&&w.genre!==t.value)return `${gName(t.value)} 장르 작품만 참가할 수 있어요.`;
 if(t.kind==='target'&&w.target!==t.value)return `${byId(D.TARGETS,t.value).name} 작품만 참가할 수 있어요.`;
 if((t.kind==='story'||t.kind==='buyout')&&w.kind!=='story')return '스토리 유형만 참가할 수 있어요.';
 if(t.kind==='buyout'&&(w.origin!=='original'||w.badges.original))return '오리지널 창작이며 아직 오리지널이 아닌 스토리만 참가할 수 있어요.';
 if(t.kind==='rookie'&&r.rep>=300)return '인지도 300 미만 제작자만 참가할 수 있어요.';
 return null;
}
function openContest(s){
 const r=s.run;const buyout=monthOf(r.week)===11&&yearOf(r.week)>=2;
 const pool=buyout?D.CONTESTS.filter(c=>c.id==='buyout'):D.CONTESTS.filter(c=>c.id!=='buyout'&&(c.id!=='rookie'||r.rep<300));
 const def=pick(r,pool);let theme,name=def.name;
 if(def.id==='tag'){theme={kind:'tag',value:r.trend.tags[0]};name=name.replace('{tag}',theme.value);}
 else if(def.id==='genre'){theme={kind:'genre',value:pick(r,D.GENRES.filter(g=>g.unlock<=r.skills.planning)).id};name=name.replace('{genre}',gName(theme.value));}
 else if(def.id==='target'){theme={kind:'target',value:pick(r,['female','male'])};name=name.replace('{target}',byId(D.TARGETS,theme.value).name);}
 else theme={kind:def.id};
 r.contest={id:def.id,name,desc:def.desc,theme,startWeek:r.week,endWeek:r.week+D.WEEKS_PER_MONTH-1,entries:[],prize:def.prize,rep:def.rep};
 notice(r,`📣 ${name} 접수 시작! ${def.desc} 마감: ${calendar(r.contest.endWeek)}`);feed(r,'contest',D.FEED_TEMPLATES.contest_open[0].replace('{name}',name).replace('{desc}',def.desc));
}
function resolveContest(s){
 const r=s.run;const c=r.contest;r.contest=null;
 const from=c.startWeek;const yr=yearOf(r.week);
 const entries=c.entries.map(id=>r.works.find(w=>w.id===id)).filter(Boolean).map(w=>{const msgs=w.weekly.filter(x=>x.week>=from).reduce((a,b)=>a+b.msgs,0);const fit=c.theme.kind==='tag'?w.tags.filter(t=>r.trend.tags.includes(t)).length*3:c.theme.kind==='story'||c.theme.kind==='buyout'?w.volume*3:5;return {id:w.id,title:w.title,author:r.name,score:R(w.quality*0.7+Math.log10(msgs+1)*9+fit+(rng(r)*16-8)),rival:false};});
 const n=c.id==='rookie'?6:10;const rivalPool=r.rivals.filter(rv=>c.id!=='rookie'||rv.followers<1500);
 const used=new Set();const rivalEntries=Array.from({length:n},()=>{let rv=pick(r,rivalPool);for(let k=0;k<5&&used.has(rv.id);k++)rv=pick(r,rivalPool);used.add(rv.id);const x=rv.works[rv.works.length-1];const base=c.id==='rookie'?45:55;return {title:x?x.title:rivalTitle(r,byId(D.RIVAL_ARCHETYPES,rv.arch)),author:rv.name,score:R((base+rv.power*14+Math.log10(rv.followers+1)*4+yr*2+(rng(r)*20-10))*difficultyOf(r).contest),rival:true};});
 const all=[...entries,...rivalEntries].sort((a,b)=>b.score-a.score);
 const result={name:c.name,week:r.week,board:all.slice(0,10),mine:[]};
 all.forEach((e,i)=>{if(e.rival)return;const rank=i+1;const bucket=rank===1?0:rank<=3?1:rank<=6?2:rank<=10?3:-1;const w=r.works.find(w=>w.id===e.id);
  if(bucket>=0){const prize=c.prize[bucket],rep=c.rep[bucket];r.money+=prize;r.rep+=rep;w.award=D.CONTEST_RANKS[bucket];w.lastUpdated=r.week;r.stats.contestWins++;addFollowers(r,[150,80,40,15][bucket]);
   if(c.id==='buyout'&&bucket<=1&&!w.badges.original){w.badges.original=true;r.stats.originals++;w.boostUntil=r.week+4;trophy(s,'original');}
   result.mine.push({title:w.title,rank,award:D.CONTEST_RANKS[bucket],prize});feed(r,'me',`🏆 「${w.title}」 ${c.name} ${D.CONTEST_RANKS[bucket]}!`);log(r,`🏆 「${w.title}」 ${c.name} ${D.CONTEST_RANKS[bucket]} · 상금 ${prize.toLocaleString('ko-KR')}원`);}
  else{result.mine.push({title:w.title,rank,award:null,prize:0});log(r,`「${w.title}」 ${c.name} ${rank}위. 입상 실패.`);}});
 if(result.mine.some(m=>m.award)){trophy(s,'contest');if(result.mine.some(m=>m.rank===1))trophy(s,'grandprix');}
 r.contestHistory.unshift(result);r.contestHistory=r.contestHistory.slice(0,12);
 if(c.entries.length)r.queue.push({kind:'contest',title:`${c.name} 결과 발표`,text:result.mine.map(m=>`「${m.title}」 ${m.rank}위${m.award?' · '+m.award+' · 상금 '+m.prize.toLocaleString('ko-KR')+'원':''}`).join(' / '),board:result.board,options:[{label:'확인'}]});
 else feed(r,'contest',`${c.name} 결과: 대상 「${all[0].title}」 (${all[0].author})`);
}
function yearAwards(s){
 const r=s.run;const year=yearOf(r.week);const from=r.week-D.WEEKS_PER_YEAR+1;
 const yearly=w=>w.weekly.filter(x=>x.week>=from).reduce((a,b)=>a+b.msgs,0);
 const rivalBest=f=>Math.max(0,...r.rivals.flatMap(rv=>rv.works.filter(f).map(x=>x.msgs*18)));
 const got=[];
 const best=f=>r.works.filter(f).map(w=>({w,v:yearly(w)})).sort((a,b)=>b.v-a.v)[0];
 const story=best(w=>w.kind==='story');if(story&&story.v>rivalBest(x=>true)*0.9)got.push({id:'story',work:story.w.title});
 const ch=best(w=>w.kind==='character');if(ch&&ch.v>rivalBest(x=>true)*0.7)got.push({id:'character',work:ch.w.title});
 if(year===1&&r.creatorStage>=1&&r.works.length>=5)got.push({id:'rookie',work:r.name});
 for(const t of ['female','male']){const b=best(w=>w.target===t);if(b&&b.v>rivalBest(x=>x.target===t)*0.8)got.push({id:t,work:b.w.title});}
 const cm=r.works.slice().sort((a,b)=>b.commentCount-a.commentCount)[0];if(cm&&cm.commentCount>=150)got.push({id:'comments',work:cm.w?.title||cm.title});
 const gifts=r.works.reduce((a,w)=>a+w.gifts,0);if(gifts>=20000)got.push({id:'gift',work:`선물 ${gifts.toLocaleString('ko-KR')} 크래커`});
 const released=r.works.filter(w=>w.everPublic&&w.releasedWeek>=from).length;if(released>=8)got.push({id:'steady',work:`${released}작품 공개`});
 for(const g of got){const def=byId(D.YEAR_AWARDS,g.id);r.awards.push({year,name:def.name,work:g.work});r.rep+=150;r.money+=1000000;feed(r,'me',`🏅 ${year}년차 크랙 크리에이터 어워드 ${def.name} — ${g.work}`);}
 if(got.length)trophy(s,'award');
 r.queue.push({kind:'awards',title:`${year}년차 크랙 크리에이터 어워드`,text:got.length?`${got.length}개 부문 수상! 인지도 +${150*got.length}, 상금 ${(1000000*got.length).toLocaleString('ko-KR')}원`:'올해는 수상하지 못했다. 후보 명단엔 올랐지만 라이벌들이 강했다. 내년을 노리자.',awards:got.map(g=>({name:byId(D.YEAR_AWARDS,g.id).name,work:g.work})),options:[{label:'확인'}]});
}
export function scoreOf(r){const avgQ=r.works.length?R(r.works.reduce((a,w)=>a+w.quality,0)/r.works.length):0;return {avgQ,score:R(r.rep+r.followers/5+r.settledTotal/20000+r.stats.originals*500+r.stats.works*40+(r.creatorStage>=2?300:0)+avgQ*5+r.awards.length*200+r.stats.contestWins*100)};}
function finishRun(s,early){
 const r=s.run;if(r.ended)return;const {avgQ,score}=scoreOf(r);const weeks=Math.max(1,r.week-1);
 const ctx={rep:r.rep,originals:r.stats.originals,followers:r.followers,settled:r.settledTotal,creator:r.creatorStage>=2?1:0,avgQuality:avgQ,works:r.works.length,burnouts:r.stats.burnouts,avgStress:r.stats.stressSum/weeks,sanctions:r.sanctions,money:r.money};
 const ending=D.ENDINGS.find(e=>evalCond(e.cond,ctx))||D.ENDINGS.at(-1);
 const legacy=Math.max(1,Math.floor(score/1200));
 r.ended={ending:ending.id,name:ending.name,desc:ending.desc,score,legacy,early,ctx};
 s.meta.legacy+=legacy;if(!s.meta.endings.includes(ending.id))s.meta.endings.push(ending.id);if(s.meta.endings.length>=3)trophy(s,'endings3');
 s.meta.best=Math.max(s.meta.best,score);s.meta.runs.push({name:r.name,difficulty:difficultyOf(r).id,ending:ending.name,score,weeks,works:r.works.length,originals:r.stats.originals,rep:r.rep,followers:r.followers,settled:r.settledTotal});
 const best=r.works.slice().sort((a,b)=>b.messages-a.messages)[0];if(best)s.meta.archive.unshift({title:best.title,author:r.name,genre:best.genre,messages:best.messages,quality:best.quality,original:best.badges.original});s.meta.archive=s.meta.archive.slice(0,20);
 r.queue=[];log(r,`엔딩: ${ending.name} · 점수 ${score} · 유산 +${legacy}`);
}
function evalCond(cond,c){return cond.split('&&').every(part=>{if(part==='true')return true;const m=part.match(/^(\w+)(>=|<=)(\d+)$/);if(!m)return false;const v=c[m[1]];return m[2]==='>='?v>=+m[3]:v<=+m[3];});}
export const data=D;

// ---------- 세이브 파일(슬롯) ----------
export const SLOT_COUNT=3;
export const newSave=()=>({version:4,current:null,slots:Array.from({length:SLOT_COUNT},()=>null)});
export function migrateSave(raw){
 if(!raw||typeof raw!=='object')return newSave();
 if(raw.version===4){raw.slots=Array.from({length:SLOT_COUNT},(_,i)=>raw.slots?.[i]?migrate(raw.slots[i]):null);if(!Number.isInteger(raw.current)||raw.current<0||raw.current>=SLOT_COUNT||!raw.slots[raw.current])raw.current=null;return raw;}
 const save=newSave();const profile=migrate(raw);if(profile.run||profile.meta.runs.length||profile.meta.legacy){save.slots[0]=profile;save.current=0;}return save;
}
export function summarize(profile){
 if(!profile)return null;const r=profile.run;const m=profile.meta;
 return {name:r?.name||null,calendar:r?calendar(Math.min(r.week,r.careerWeeks)):null,ended:!!r?.ended,endingName:r?.ended?.name||null,works:r?.works.length||0,rep:r?.rep||0,stage:r?creatorStageName(r.creatorStage):null,legacy:m.legacy,runs:m.runs.length,trophies:m.trophies.length,theme:profile.theme};
}
export function actSave(save,a){
 migrateSave(save);if(!a||typeof a!=='object')throw Error('잘못된 요청이에요.');
 if(a.type==='slot'){
  const i=Number(a.slot);const valid=Number.isInteger(i)&&i>=0&&i<SLOT_COUNT;
  switch(a.op){
   case 'select':if(!valid)throw Error('잘못된 슬롯이에요.');save.slots[i]??=initial();save.current=i;return save;
   case 'close':save.current=null;return save;
   case 'delete':if(!valid)throw Error('잘못된 슬롯이에요.');if(!a.confirm)throw Error('삭제 확인이 필요해요.');save.slots[i]=null;if(save.current===i)save.current=null;return save;
   case 'reset':if(!a.confirm)throw Error('초기화 확인이 필요해요.');{const fresh=newSave();save.current=fresh.current;save.slots=fresh.slots;return save;}
   default:throw Error('알 수 없는 슬롯 작업이에요.');
  }
 }
 if(save.current===null)throw Error('먼저 세이브 슬롯을 선택해 주세요.');
 save.slots[save.current]=act(save.slots[save.current],a);return save;
}
