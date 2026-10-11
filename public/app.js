import * as G from './game.js';
import * as D from './data.js';
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=n=>Math.round(Number(n)||0).toLocaleString('ko-KR');
const won=n=>num(n)+'원';
const short=n=>{n=Number(n)||0;return n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':String(Math.round(n));};
const act=obj=>`data-act="${esc(JSON.stringify(obj))}"`;
const MODE=document.documentElement.dataset.mode||'server';
const LS='crack-creator-v3';
let local=MODE==='local'||localStorage.getItem('crack-mode')==='local';
let save=null,username='',page='home',busy=false,modal=null,authMode='login',setupForm={name:'',background:'student',traits:[]},draftForm=null,openWork=null,rankTab='all',workFilter='all';

// ---------- 저장소 ----------
const profile=()=>save&&save.current!==null?save.slots[save.current]:null;
function loadLocal(){try{const raw=localStorage.getItem(LS);return raw?G.migrateSave(JSON.parse(raw)):G.newSave();}catch{return G.newSave();}}
function saveLocal(s){try{localStorage.setItem(LS,JSON.stringify(s));}catch{toast('브라우저 저장 공간이 부족해 저장하지 못했어요.');}}
async function apiLoad(){if(local){username='나';return loadLocal();}const r=await fetch('/api/state');if(r.status===401)return null;const j=await r.json();if(!r.ok)throw Error(j.error);username=j.username;delete j.username;return G.migrateSave(j);}
async function apiAct(body){if(local){const next=G.actSave(structuredClone(save),body);saveLocal(next);return next;}const r=await fetch('/api/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();if(!r.ok)throw Error(j.error);delete j.username;return G.migrateSave(j);}
async function post(path,body){const r=await fetch('/api/'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();if(!r.ok)throw Error(j.error);return j;}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200);}
async function dispatch(body,after){if(busy)return;busy=true;try{const before=profile()?.run?.log?.[0];save=await apiAct(body);if(after)after();render();const first=profile()?.run?.log?.[0];if(first&&first!==before&&!['choose','endweek','newgame','slot','theme'].includes(body.type))toast(first.replace(/^\[[^\]]*\]\s*/,''));if(body.type==='theme')toast('테마를 바꿨어요.');}catch(e){toast(e.message);}finally{busy=false;}}

// ---------- 공용 위젯 ----------
const bar=(v,max=100,cls='')=>`<span class="bar ${cls}"><i data-w="${Math.max(0,Math.min(100,v/max*100)).toFixed(1)}"></i></span>`;
function spark(values,w=160,h=40){if(values.length<2)return '';const max=Math.max(1,...values),min=Math.min(...values);const pts=values.map((v,i)=>`${(i/(values.length-1)*w).toFixed(1)},${(h-((v-min)/Math.max(1,max-min))*(h-4)-2).toFixed(1)}`).join(' ');return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${pts}"/></svg>`;}
const gName=id=>D.GENRES.find(g=>g.id===id)?.name||id,tName=id=>D.TARGETS.find(g=>g.id===id)?.name||id,fName=id=>D.FORMS.find(f=>f.id===id)?.name||id,kName=id=>D.KINDS.find(k=>k.id===id)?.name||id;
const statBars=stats=>Object.entries(D.STATS).map(([k,n])=>`<div class="stat"><span>${n}</span>${bar(stats[k])}<b>${stats[k]}</b></div>`).join('');
const hue=str=>{let h=0;for(const c of str)h=(h*31+c.charCodeAt(0))%360;return h;};
function cover(w,cls=''){const h=hue(w.title);const badge=w.badges?.original?'<em class="bd orig">ORIGINAL</em>':(w.badges?.only&&w.badges.only>=(profile()?.run?.week||0))?'<em class="bd only">ONLY</em>':'';const txt=w.title.replace(/\s.*$/,'').slice(0,4);return `<div class="cover ${cls}" data-h="${h}"><span>${esc(txt)}</span>${badge}${w.audience==='adult'?'<i class="adult" title="성인">19</i>':''}</div>`;}
function tagsLine(w){return `<span class="chip ${w.visibility==='public'?'pub':''}">${{public:'공개',link:'링크 공개',private:'비공개'}[w.visibility]||'제작 중'}</span><span class="chip">${kName(w.kind)}</span>`;}

// ---------- 메인 렌더 ----------
function render(){
 const s=profile();document.documentElement.dataset.theme=s?.theme||'dark';
 let html;
 if(!save)html=authScreen();
 else if(!s)html=slotScreen(save);
 else if(!s.run||s.run.ended)html=titleScreen(s);
 else html=playShell(s);
 $('#app').innerHTML=html+modals(s);
 document.querySelectorAll('.bar i[data-w]').forEach(i=>{i.style.width=i.dataset.w+'%';});
 document.querySelectorAll('.cover[data-h]').forEach(c=>{const h=Number(c.dataset.h);c.style.background=`linear-gradient(135deg,hsl(${h} 45% 30%),hsl(${(h+40)%360} 55% 14%))`;});
 const m=$('.modal-back');if(m)m.querySelector('button')?.focus();
}
function authScreen(){
 return `<div class="title-wrap"><div class="card"><div class="logo"><b>CRACK</b> 작가 키우기<small>캐릭터 챗 제작자 인생 시뮬레이션</small></div><p class="lead">일반 제작자에서 크리에이터, 온리, 오리지널까지. 3년 동안 크랙 제작자로 살아남아 보자.</p>
 <form id="auth-form" class="auth"><label>아이디<input name="username" required pattern="[a-zA-Z0-9_]{3,20}" placeholder="영문·숫자·밑줄 3~20자"></label><label>비밀번호<input name="password" type="password" required minlength="8" maxlength="128"></label><button class="primary big">${authMode==='register'?'회원가입하고 시작':'로그인'}</button><button type="button" class="link" data-auth-toggle>${authMode==='register'?'이미 계정이 있어요':'계정 만들기'}</button></form>
 <div class="or">또는</div><button class="secondary big" data-guest>회원가입 없이 이 브라우저에 저장하고 시작</button><p class="fine">브라우저 저장 모드는 이 기기에만 기록이 남습니다.</p></div></div>`;
}
function accountLine(){return `${local?'브라우저 저장 모드':'계정: '+esc(username)} · <button class="link" data-slot-close>세이브 슬롯</button> · <button class="link" data-logout>${local?'계정 모드로 전환':'로그아웃'}</button>`;}
function slotScreen(save){
 const cards=save.slots.map((p,i)=>{const sm=G.summarize(p);const summary=!sm?'<small>비어 있음</small>':sm.name?`<small>${esc(sm.name)} · ${sm.ended?'엔딩: '+esc(sm.endingName):esc(sm.calendar)+' · '+esc(sm.stage)} · 작품 ${sm.works}</small><small>유산 ${sm.legacy} · 완주 ${sm.runs}회 · 업적 ${sm.trophies}</small>`:`<small>회차 준비 중 · 유산 ${sm.legacy} · 완주 ${sm.runs}회</small>`;
  return `<div class="slot"><div><b>슬롯 ${i+1}</b>${summary}</div><div class="btns"><button class="primary" ${act({type:'slot',op:'select',slot:i})}>${p?'이어하기':'새로 시작'}</button>${p?`<button class="link danger" data-slot-delete="${i}">삭제</button>`:''}</div></div>`;}).join('');
 return `<div class="title-wrap"><div class="card"><div class="logo"><b>CRACK</b> 작가 키우기<small>SAVE SLOTS</small></div><p class="lead">세이브 슬롯을 고르세요. 슬롯마다 유산·인사이트·업적이 따로 쌓입니다.</p><div class="slots">${cards}</div>
 <div class="btns end"><button class="link danger" data-reset-all>모든 슬롯 초기화</button><button class="link" data-logout>${local?'계정 모드로 전환':'로그아웃'}</button></div><p class="fine">${local?'브라우저 저장 모드: 이 기기에만 기록이 남습니다.':'계정: '+esc(username)}</p></div></div>`;
}
function titleScreen(s){
 const m=s.meta;const ended=s.run?.ended;
 const endingBlock=ended?`<section class="card ending"><h2>엔딩 · ${esc(ended.name)}</h2><p>${esc(ended.desc)}</p><div class="kv"><div><small>최종 점수</small><b>${num(ended.score)}</b></div><div><small>획득 유산</small><b>+${ended.legacy}</b></div><div><small>인지도</small><b>${num(ended.ctx.rep)}</b></div><div><small>팔로워</small><b>${num(ended.ctx.followers)}</b></div><div><small>작품 / 오리지널</small><b>${ended.ctx.works} / ${ended.ctx.originals}</b></div><div><small>누적 정산</small><b>${won(ended.ctx.settled)}</b></div></div></section>`:'';
 const maxTraits=G.has(s,'two_traits')?2:1;
 const bgCards=D.BACKGROUNDS.map(b=>{const locked=b.legacy>0&&!G.has(s,'bg_'+b.id);return `<button type="button" class="choice ${setupForm.background===b.id?'selected':''} ${locked?'locked':''}" data-bg="${b.id}" ${locked?'disabled':''}><b>${b.name}</b><small>${esc(b.desc)}</small>${locked?'<em>유산 상점에서 해금</em>':''}</button>`;}).join('');
 const trCards=D.TRAITS.map(t=>{const locked=t.legacy>0&&!G.has(s,'tr_'+t.id);const on=setupForm.traits.includes(t.id);return `<button type="button" class="choice ${on?'selected':''} ${locked?'locked':''}" data-trait="${t.id}" ${locked?'disabled':''}><b>${t.name}</b><small>${esc(t.desc)}</small>${locked?'<em>유산 상점에서 해금</em>':''}</button>`;}).join('');
 const legacyShop=D.LEGACY_SHOP.map(i=>{const owned=G.has(s,i.id);return `<div class="row ${owned?'owned':''}"><div><b>${i.name}</b><small>${esc(i.desc)}</small></div>${owned?'<span class="chip">해금됨</span>':`<button class="secondary" ${act({type:'legacy',id:i.id})} ${m.legacy<i.cost?'disabled':''}>${i.cost} 유산</button>`}</div>`;}).join('');
 const runs=m.runs.length?`<table class="table"><tr><th>작가</th><th>엔딩</th><th>점수</th><th>작품</th><th>오리지널</th><th>누적 정산</th></tr>${m.runs.slice().reverse().map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.ending)}</td><td>${num(r.score)}</td><td>${r.works}</td><td>${r.originals}</td><td>${won(r.settled)}</td></tr>`).join('')}</table>`:'<p class="fine">아직 완주한 회차가 없어요.</p>';
 return `<div class="title-wrap wide"><div class="logo"><b>CRACK</b> 작가 키우기<small>${m.runs.length+1}회차</small></div>${endingBlock}
 <section class="card"><h2>새 회차 시작</h2><label class="field">작가 이름<input id="setup-name" maxlength="12" value="${esc(setupForm.name)}" placeholder="예: 달빛공방"></label>
 <h3>배경</h3><div class="choices">${bgCards}</div><h3>특성 <small>(${setupForm.traits.length}/${maxTraits})</small></h3><div class="choices">${trCards}</div>
 <button class="primary big" data-start>제작자 인생 시작!</button>
 <p class="fine">시작 보너스: ${['start_money','start_skill','start_fans','long_career','all_genres','creator_fast'].filter(k=>G.has(s,k)).map(k=>D.LEGACY_SHOP.find(i=>i.id===k).name).join(', ')||'없음'}</p></section>
 <section class="card"><h2>유산 상점 <span class="chip">보유 유산 ${m.legacy}</span></h2><p class="fine">회차를 끝내면 점수에 따라 유산을 얻어요. 유산은 회차를 넘어 영구히 쌓입니다.</p><div class="list">${legacyShop}</div></section>
 <div class="two"><section class="card"><h2>엔딩 컬렉션 ${m.endings.length}/${D.ENDINGS.length}</h2><ul class="plain">${D.ENDINGS.map(e=>`<li class="${m.endings.includes(e.id)?'':'dim'}">${m.endings.includes(e.id)?'★ '+e.name+' — '+esc(e.desc):'？ ???'}</li>`).join('')}</ul></section>
 <section class="card"><h2>회차 기록 <span class="chip">최고 ${num(m.best)}</span></h2>${runs}</section></div>
 ${trophyPanel(s)}${insightPanel(s)}${archivePanel(s)}
 <p class="fine center">${accountLine()}</p></div>`;
}
function trophyPanel(s){return `<section class="card"><h2>업적 ${s.meta.trophies.length}/${D.TROPHIES.length}</h2><div class="trophies">${D.TROPHIES.map(t=>`<div class="trophy ${s.meta.trophies.includes(t.id)?'on':''}"><b>${s.meta.trophies.includes(t.id)?'🏆':'🔒'} ${t.name}</b><small>${esc(t.desc)}</small></div>`).join('')}</div></section>`;}
function insightPanel(s){return `<section class="card"><h2>독자 인사이트 <span class="chip">${s.meta.insights.length}/${D.INSIGHTS.length}</span></h2><p class="fine">플레이하며 발견한 플랫폼의 숨은 규칙. 회차를 넘어 유지됩니다.</p><ul class="plain">${D.INSIGHTS.map(i=>`<li class="${s.meta.insights.includes(i.id)?'':'dim'}">${s.meta.insights.includes(i.id)?'💡 '+esc(i.text):'？ 아직 발견하지 못한 인사이트'}</li>`).join('')}</ul></section>`;}
function archivePanel(s){if(!s.meta.archive.length)return '';return `<section class="card"><h2>명작 아카이브</h2><div class="worklist">${s.meta.archive.map(a=>`<div class="workrow">${cover({title:a.title,badges:{original:a.original}})}<div><b>${esc(a.title)}</b><small>${esc(a.author)} · ${gName(a.genre)} · 발화 ${short(a.messages)} · 완성도 ${a.quality}</small></div></div>`).join('')}</div></section>`;}

// ---------- 작가 스튜디오 씬 (원본 벡터, 디자인 교체 용이) ----------
function studioScene(s,r,dv){
 const h=hue(r.name);const mood=r.stress>=80?'exhausted':r.stress>=55?'tired':r.inspiration>=70?'inspired':'calm';
 const line=r.stress>=80?'...오늘은 손이 안 움직여.':r.drafts.length?(G.requiredDone(r.drafts[0])?`「${r.drafts[0].title}」 등록만 남았다!`:`「${r.drafts[0].title}」 ${D.MODULES[G.applicableModules(r.drafts[0]).find(m=>r.drafts[0].modules[m]<100)]?.name||''} 작업 중...`):r.works.some(w=>w.visibility==='public')?'다음 작품은 뭘 만들까?':'첫 작품을 만들어 보자!';
 const items=r.items;const eyes=mood==='exhausted'?'<path d="M-9 -2 l5 3 M-4 1 l-5 3" class="ln"/><path d="M4 1 l5 -3 M9 1 l-5 3" class="ln"/>':mood==='tired'?'<path d="M-10 0 h7 M3 0 h7" class="ln"/>':mood==='inspired'?'<circle cx="-6" cy="-1" r="2.6" class="eye"/><circle cx="6" cy="-1" r="2.6" class="eye"/><circle cx="-5" cy="-2" r="1" fill="#fff"/><circle cx="7" cy="-2" r="1" fill="#fff"/>':'<circle cx="-6" cy="-1" r="2.2" class="eye"/><circle cx="6" cy="-1" r="2.2" class="eye"/>';
 const mouth=mood==='exhausted'?'<path d="M-4 9 q4 -3 8 0" class="ln"/>':mood==='inspired'?'<path d="M-5 7 q5 6 10 0" class="ln"/>':'<path d="M-3 8 h6" class="ln"/>';
 const tier=dv.studio.id;
 return `<div class="scene mood-${mood}"><svg viewBox="0 0 480 190" class="room" aria-label="작가의 작업실">
 <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h} 25% 22%)"/><stop offset="1" stop-color="hsl(${h} 20% 14%)"/></linearGradient></defs>
 <rect width="480" height="190" fill="url(#wall)"/><rect y="130" width="480" height="60" fill="hsl(${h} 15% 10%)"/>
 <rect x="40" y="26" width="${tier>=2?120:80}" height="60" rx="4" fill="#2b3f5c" stroke="#111" stroke-width="2"/><rect x="44" y="30" width="${tier>=2?112:72}" height="52" fill="#4b6e9c" opacity=".7"/><circle cx="${tier>=2?130:95}" cy="42" r="7" fill="#ffe9a8"/>
 ${tier>=1?'<rect x="330" y="30" width="110" height="70" rx="3" fill="#3a2f2a" stroke="#111" stroke-width="2"/><rect x="336" y="36" width="98" height="16" fill="#8a6a4a"/><rect x="336" y="58" width="98" height="16" fill="#8a6a4a"/><rect x="336" y="80" width="98" height="14" fill="#8a6a4a"/>'+[0,1,2,3,4,5].map(i=>`<rect x="${340+i*16}" y="${34+(i%2)*22}" width="10" height="14" fill="hsl(${(h+i*50)%360} 60% 55%)"/>`).join(''):''}
 ${items.includes('plant')?'<rect x="20" y="104" width="22" height="26" fill="#8b5a3c"/><circle cx="31" cy="92" r="16" fill="#3f8f4a"/><circle cx="20" cy="100" r="9" fill="#4aa355"/><circle cx="43" cy="98" r="10" fill="#357f41"/>':''}
 ${items.includes('bed')?'<rect x="380" y="112" width="90" height="26" rx="6" fill="#5b4a7a"/><rect x="384" y="104" width="30" height="14" rx="4" fill="#7b6a9a"/>':''}
 ${items.includes('coffee')?'<rect x="300" y="110" width="16" height="22" fill="#222"/><rect x="304" y="106" width="8" height="4" fill="#999"/>':''}
 ${items.includes('lamp')?'<rect x="286" y="90" width="4" height="40" fill="#444"/><circle cx="288" cy="86" r="8" fill="#ffd27a" opacity=".9"/>':''}
 <rect x="150" y="118" width="190" height="10" fill="#6b4a32"/><rect x="156" y="128" width="8" height="40" fill="#4a3324"/><rect x="326" y="128" width="8" height="40" fill="#4a3324"/>
 <rect x="200" y="78" width="${items.includes('monitor')?120:70}" height="42" rx="3" fill="#111" stroke="#333"/><rect x="204" y="82" width="${items.includes('monitor')?112:62}" height="34" fill="${mood==='exhausted'?'#2a2a2a':'#2f6f8f'}"/>${items.includes('monitor')?'<rect x="258" y="82" width="2" height="34" fill="#111"/>':''}
 ${items.includes('tablet')?'<rect x="290" y="108" width="34" height="8" rx="2" fill="#555"/>':''}${items.includes('keyboard')?'<rect x="214" y="110" width="40" height="6" rx="2" fill="#c44"/>':''}
 ${items.includes('cat')?'<ellipse cx="400" cy="150" rx="16" ry="8" fill="#e8b45a"/><circle cx="414" cy="144" r="7" fill="#e8b45a"/><path d="M409 139 l2 -6 l3 5 M416 139 l2 -6 l2 5" fill="#e8b45a"/>':''}
 <g transform="translate(176 118)"><rect x="-22" y="-2" width="44" height="40" rx="8" fill="hsl(${h} 50% 48%)"/><rect x="-26" y="-42" width="52" height="52" rx="18" fill="#f1d3b3"/><path d="M-27 -22 q27 -40 54 0 v-8 q-27 -30 -54 0z" fill="hsl(${(h+180)%360} 40% 30%)"/><g transform="translate(0 -18)">${eyes}${mouth}</g>${items.includes('chair')?'<rect x="-30" y="30" width="60" height="10" rx="4" fill="#333"/>':''}</g>
 ${items.includes('booth')?'<rect x="120" y="20" width="12" height="150" fill="#2a2a30" opacity=".8"/>':''}
 ${items.includes('pc')?'<rect x="140" y="130" width="14" height="36" fill="#222" stroke="#0ff" stroke-width="1"/>':''}
 ${r.awards.length||r.stats.contestWins?`<g transform="translate(${tier>=1?440:300} ${tier>=1?92:40})">${Array.from({length:Math.min(5,r.awards.length+r.stats.contestWins)},(_,i)=>`<path transform="translate(${-i*14} 0)" d="M0 0 h8 v6 q0 6 -4 7 q-4 -1 -4 -7z" fill="#e9b949"/>`).join('')}</g>`:''}
 </svg><div class="bubble">${esc(line)}</div><div class="scene-tag">${esc(dv.studio.name)} · ${{calm:'평온',tired:'피곤',exhausted:'탈진',inspired:'영감 충만'}[mood]}</div></div>`;
}
function feedCard(r,limit=8){
 const icon={rival:'📝',post:'💬',me:'⭐',contest:'📣',notice:'🔔'};
 return `<section class="card feed"><h2>갤러리 피드</h2><ul class="plain">${r.feed.slice(0,limit).map(f=>`<li class="f-${f.kind}"><span>${icon[f.kind]||'•'}</span><div>${esc(f.text)}<small>${G.calendar(f.week)}</small></div></li>`).join('')||'<li class="fine">아직 소식이 없어요.</li>'}</ul></section>`;
}
function contestCard(s,r){
 const c=r.contest;
 if(!c)return `<section class="card contest"><h2>대회</h2><p class="fine">지금은 진행 중인 대회가 없어요. 홀수 달 초에 공모전이 열리고, 2년차부터 11월에 집중 매입 대회가 열려요.</p></section>`;
 const left=c.endWeek-r.week+1;const eligible=r.works.filter(w=>!G.contestEligible(r,c,w)&&!c.entries.includes(w.id));
 return `<section class="card contest"><h2>🏆 ${esc(c.name)} <span class="chip warn">마감 D-${left}주</span></h2><p>${esc(c.desc)}</p><p class="fine">상금 대상 ${won(c.prize[0])} · 최우수 ${won(c.prize[1])} · 우수 ${won(c.prize[2])} · 입선 ${won(c.prize[3])} · 참가 ${c.entries.length}/2</p>
 ${c.entries.length?`<p>참가작: ${c.entries.map(id=>'「'+esc(r.works.find(w=>w.id===id)?.title||'')+'」').join(', ')}</p>`:''}
 <div class="btns">${eligible.slice(0,4).map(w=>`<button class="secondary" ${act({type:'enter',id:w.id})}>「${esc(w.title)}」 참가</button>`).join('')||'<span class="fine">참가 가능한 작품이 없어요. 조건에 맞는 작품을 전체 공개하세요.</span>'}</div></section>`;
}
function playShell(s){
 const r=s.run,dv=G.derive(s);
 const pages={home:'홈',make:'제작',works:'내 작품',rank:'랭킹·갤러리',grow:'성장',life:'생활',record:'기록'};
 const body={home:homePage,make:makePage,works:worksPage,rank:rankPage,grow:growPage,life:lifePage,record:recordPage}[page](s,r,dv);
 const stage=r.creatorStage;
 return `<div class="shell"><header class="top"><div class="brand"><b>CRACK</b><span>studio</span></div><div class="who"><b>${esc(r.name)}${stage>=2?' <em class="bd creator">CREATOR</em>':''}</b><small>${G.calendar(r.week)} · ${dv.repTier} · 남은 ${dv.weeksLeft}주</small></div>
 <div class="cells"><div class="cell"><small>자금</small><b class="${r.money<0?'neg':''}">${won(r.money)}</b></div><div class="cell"><small>이달 정산 예정</small><b>${won(r.pendingCash)}</b></div><div class="cell"><small>팔로워</small><b>${num(r.followers)}</b></div><div class="cell"><small>인지도</small><b>${num(r.rep)}</b></div><div class="cell meter"><small>체력 ${r.energy}/${dv.energyMax}</small>${bar(r.energy,dv.energyMax,'e')}</div><div class="cell meter"><small>스트레스 ${r.stress}</small>${bar(r.stress,100,r.stress>=70?'bad':'s')}</div><div class="cell meter"><small>영감 ${r.inspiration}</small>${bar(r.inspiration,100,'i')}</div></div></header>
 <nav class="tabs">${Object.entries(pages).map(([id,label])=>`<button class="${page===id?'on':''}" data-page="${id}">${label}${id==='make'&&r.drafts.length?`<em>${r.drafts.length}</em>`:''}${id==='home'&&r.notices.length&&r.notices[0].week>=r.week-1?'<em class="dot"></em>':''}</button>`).join('')}</nav>
 <main class="content">${body}</main>
 <button class="endweek" ${act({type:'endweek'})}>주 마감 ▶ <small>집계 · 랭킹 · 체력 회복</small></button></div>`;
}

// ---------- 페이지 ----------
function missionBox(s,r,dv){
 const req=dv.req;const st=r.creatorStage;
 if(st>=2)return `<div class="mission done"><b>크리에이터</b><span>크래커 사용액의 ${(D.SETTLE_RATE.base*100).toFixed(1)}% 정산 · 선물 90% · 온리·오리지널 신청 가능</span></div>`;
 if(st===1)return `<div class="mission"><b>크리에이터 미션 진행 중</b><div class="stat"><span>누적 발화</span>${bar(r.totals.messages,req.messages,'x')}<b>${short(r.totals.messages)}/${short(req.messages)}</b></div></div>`;
 return `<div class="mission"><b>크리에이터 미션 참여 조건</b><div class="stat"><span>전체 공개 작품</span>${bar(r.totals.publicWorks,req.works,'x')}<b>${r.totals.publicWorks}/${req.works}</b></div><div class="stat"><span>누적 대화 유저</span>${bar(r.totals.players,req.players,'x')}<b>${short(r.totals.players)}/${short(req.players)}</b></div><div class="stat"><span>팔로워</span>${bar(r.followers,req.followers,'x')}<b>${num(r.followers)}/${num(req.followers)}</b></div><small>조건 달성 후 누적 발화 ${short(req.messages)}을 채우면 정식 크리에이터. 그 전까지 대화 정산은 없고 선물(70%)만 들어와요.</small></div>`;
}
function homePage(s,r,dv){
 const rep=r.report;
 const trend=`<section class="card trend"><div><b>이달의 메타 태그</b> ${r.trend.tags.map(t=>`<span class="chip hot">#${t}</span>`).join(' ')}</div><div><b>타겟별 선호 장르</b> 여성향 ${gName(r.trend.mood.female)} · 남성향 ${gName(r.trend.mood.male)}</div>${dv.canSeeTrend?`<div class="fine">다음 달: ${r.nextTrend.tags.map(t=>'#'+t).join(' ')} · 여성향 ${gName(r.nextTrend.mood.female)} · 남성향 ${gName(r.nextTrend.mood.male)}</div>`:'<div class="fine">다음 달 예보: 커뮤니티 Lv.4 또는 트렌드 리포트 구독</div>'}</section>`;
 const summary=rep?`<div class="card"><h2>지난주 집계 <small>${esc(rep.calendar)}</small><button class="link" data-modal="report">자세히</button></h2><div class="kv"><div><small>발화</small><b>${num(rep.msgs)}</b></div><div><small>신규 플레이</small><b>${num(rep.players)}</b></div><div><small>정산 예정 +</small><b>${won(rep.cash+rep.gift)}</b></div><div><small>팔로워</small><b>+${num(rep.fans)}</b></div>${rep.rows.length?`<div><small>최고 순위</small><b>${Math.min(...rep.rows.map(x=>x.rank))}위</b></div>`:''}</div>${rep.events.length?`<ul class="plain">${rep.events.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}</div>`:'';
 const drafts=r.drafts.map(d=>`<div class="draft-mini"><b>${esc(d.title)}</b> <small>${kName(d.kind)} · ${gName(d.genre)}</small><div class="modbar">${G.applicableModules(d).map(m=>`<button class="mod ${d.modules[m]>=100?'done':''}" ${act({type:'work',id:d.id,module:m})} ${d.modules[m]>=100?'disabled':''} title="${D.MODULES[m].desc}">${D.MODULES[m].name}${D.MODULES[m].required?'<i>*</i>':''}<small>${d.modules[m]}%</small></button>`).join('')}</div>${G.requiredDone(d)?`<button class="primary" data-register="${d.id}">등록하기</button>`:''}</div>`).join('')||`<p class="fine">제작 중인 작품이 없어요. <button class="link" data-page="make">제작 탭에서 만들기 →</button></p>`;
 const notices=r.notices.slice(0,6).map(n=>`<li><small>${G.calendar(n.week)}</small> ${esc(n.text)}</li>`).join('');
 return `${studioScene(s,r,dv)}${missionBox(s,r,dv)}<div class="two">${contestCard(s,r)}${trend}</div>${summary}<section class="card"><h2>이번 주 작업 <small>탭 작업 1회 = 체력 15</small></h2>${drafts}</section>
 <div class="two">${feedCard(r)}<section class="card"><h2>알림</h2><ul class="plain notices">${notices||'<li class="fine">아직 알림이 없어요.</li>'}</ul><h3>작가 일지</h3><ul class="plain log">${r.log.slice(0,6).map(l=>`<li>${esc(l)}</li>`).join('')}</ul></section></div>`;
}

function makePage(s,r,dv){
 draftForm??={title:'',kind:'character',genre:dv.genres[0].id,tags:[],target:'female',form:'one',mode:'super',length:1,audience:'all',imageSource:'gen',origin:'original',template:'custom'};
 const f=draftForm;const kind=D.KINDS.find(k=>k.id===f.kind);
 const sel=(name,list,cur,labelFn)=>`<select name="${name}">${list.map(x=>`<option value="${x.id}" ${String(x.id)===String(cur)?'selected':''} ${x.disabled?'disabled':''}>${labelFn(x)}</option>`).join('')}</select>`;
 const form=`<section class="card"><h2>작품 만들기 <span class="chip">슬롯 ${r.drafts.length}/${dv.slots}</span></h2>
 <form id="draft-form" class="form">
 <div class="kinds">${D.KINDS.map(k=>`<label class="kind ${f.kind===k.id?'on':''}"><input type="radio" name="kind" value="${k.id}" ${f.kind===k.id?'checked':''}><b>${k.name}</b><small>${esc(k.desc)}</small></label>`).join('')}</div>
 <h3>프로필</h3><label>이름 <small>2~30자</small><input name="title" minlength="2" maxlength="30" required value="${esc(f.title)}" placeholder="예: FULL DIVE : ILEON"></label>
 <h3>등록 정보</h3><div class="grid3">
 <label>장르${sel('genre',D.GENRES.map(g=>({...g,disabled:!dv.genres.includes(g)})),f.genre,g=>g.name+(g.disabled?' (기획 Lv.'+g.unlock+')':''))}</label>
 <label>타겟 <small>주 소비층</small>${sel('target',D.TARGETS,f.target,x=>x.name)}<small>${esc(D.TARGETS.find(t=>t.id===f.target).desc)}</small></label>
 <label>대화 형태${sel('form',D.FORMS,f.form,x=>x.name)}<small>${esc(D.FORMS.find(x=>x.id===f.form).desc)}</small></label>
 <label>권장 모드${sel('mode',D.MODES,f.mode,x=>x.name+' · 크래커 '+x.crackers)}<small>${esc(D.MODES.find(x=>x.id===f.mode).desc)}</small></label>
 <label>권장 최대 답변 길이${sel('length',D.LENGTHS,f.length,x=>x.name)}<small>길수록 크래커 소모(정산)↑, 가벼운 독자 이탈↑</small></label>
 <label>이용자 층${sel('audience',D.AUDIENCES,f.audience,x=>x.name)}<small>${f.audience==='adult'?'성인 인증 독자만. 유입 좁고 크래커 소비 1.7배. 갤러리 홍보 효과↑':'모두에게 노출. 민감 표현 시 운영자가 상태를 바꿀 수 있어요.'}</small></label>
 <label>이미지 소스${sel('imageSource',D.IMAGE_SOURCES,f.imageSource,x=>x.name+(x.cost?' · 장당 '+won(x.cost):''))}<small>${esc(D.IMAGE_SOURCES.find(x=>x.id===f.imageSource).desc)}</small></label>
 <label>원작${sel('origin',D.ORIGINS,f.origin,x=>x.name)}<small>${esc(D.ORIGINS.find(x=>x.id===f.origin).desc)}</small></label>
 <label>프롬프트 템플릿${sel('template',D.TEMPLATES,f.template,x=>x.name)}<small>${esc(D.TEMPLATES.find(x=>x.id===f.template).desc)}</small></label></div>
 <h3>해시태그 <small>최대 3개 · 이달의 메타: ${r.trend.tags.map(t=>'#'+t).join(' ')}</small></h3><div class="tags">${D.TAGS.map(t=>`<label class="tag ${f.tags.includes(t)?'on':''} ${r.trend.tags.includes(t)?'meta':''}"><input type="checkbox" name="tags" value="${t}" ${f.tags.includes(t)?'checked':''} ${!f.tags.includes(t)&&f.tags.length>=3?'disabled':''}>#${t}</label>`).join('')}</div>
 <button class="primary big" ${r.drafts.length>=dv.slots?'disabled':''}>제작 시작 · ${won((kind.id==='story'?120000:60000)*dv.costMul)} · 체력 10 · 영감 20</button></form></section>`;
 const cards=r.drafts.map(d=>draftCard(s,r,dv,d)).join('');
 return form+cards+`<section class="card"><h2>제작 가이드</h2><ul class="plain tips"><li>탭(모듈)마다 작업하면 진행률과 능력치 포인트가 쌓여요. 필수 탭(*)을 모두 100% 채우면 등록할 수 있고, 선택 탭은 분량(볼륨)과 완성도를 올려요.</li><li>탭 50%에서 방향 선택이 나와요. 키워드북은 안정성, 스탯·엔딩(스토리)은 서사를 크게 올려요.</li><li>등록 시 공개 여부를 고르세요. <b>오리지널 심사</b>는 한 번도 전체 공개된 적 없는 스토리만 신청할 수 있어요.</li><li>크리에이터가 되기 전엔 대화 정산이 없어요. 작품 수·대화 유저·팔로워를 채우세요.</li></ul></section>`;
}
function draftCard(s,r,dv,d){
 const {stats,volume}=G.assess(s,d);const ready=G.requiredDone(d);const canTest=['profile','prompt','start'].every(m=>d.modules[m]>=30);const mods=G.applicableModules(d);
 const testCost=D.MODES.find(m=>m.id===d.mode).crackers*40*D.WON_PER_CRACKER*(r.subs.includes('superpass')?0.5:1);
 return `<section class="card draft"><div class="row-head"><div>${cover(d,'sm')}</div><div class="grow"><h2>${esc(d.title)}${d.sequelOf?' <span class="chip">후속작</span>':''}</h2><small>${kName(d.kind)} · ${gName(d.genre)} · ${tName(d.target)} · ${fName(d.form)} · ${D.MODES.find(m=>m.id===d.mode).name} · ${D.AUDIENCES.find(a=>a.id===d.audience).short} · ${d.tags.map(t=>'#'+t).join(' ')}</small></div></div>
 <div class="modbar">${mods.map(m=>`<button class="mod ${d.modules[m]>=100?'done':''}" ${act({type:'work',id:d.id,module:m})} ${d.modules[m]>=100?'disabled':''} title="${D.MODULES[m].desc}">${D.MODULES[m].name}${D.MODULES[m].required?'<i>*</i>':''}${bar(d.modules[m])}<small>${d.modules[m]}%${(m==='media'||m==='profile')&&D.IMAGE_SOURCES.find(x=>x.id===d.imageSource).cost&&!(r.subs.includes('imagegen')&&d.imageSource==='gen')?' · '+won(D.IMAGE_SOURCES.find(x=>x.id===d.imageSource).cost*(m==='profile'?1:2)):''}</small></button>`).join('')}</div>
 <div class="two"><div><h3>예상 능력치 <small>볼륨 ${volume} · 영감 폭발 ${d.crits}회</small></h3>${statBars(stats)}</div><div><h3>외주 · 테스트</h3><div class="btns">${D.HELPERS.filter(h=>mods.includes(h.module)).map(h=>`<button class="secondary" ${act({type:'hire',id:d.id,helper:h.id})} ${d.helpers.includes(h.id)?'disabled':''} title="${esc(h.desc)}">${h.name} · ${won(h.price*dv.helperMul)}</button>`).join('')}<button class="secondary" ${act({type:'test',id:d.id})} ${canTest?'':'disabled'}>비공개 테스트 · ${won(testCost)}</button></div>${d.testNote?`<p class="note">${esc(d.testNote.text)}</p>`:''}</div></div>
 <div class="btns end"><button class="link danger" ${act({type:'scrap',id:d.id})}>제작 취소</button><button class="primary" data-register="${d.id}" ${ready?'':'disabled'}>${ready?'등록하기':'필수 탭 100% 필요'}</button></div></section>`;
}

function worksPage(s,r,dv){
 const list=r.works.filter(w=>workFilter==='all'||(workFilter==='public'?w.visibility==='public':workFilter==='story'?w.kind==='story':workFilter==='character'?w.kind==='character':w.status!=='active'));
 const filters=[['all','전체'],['story','스토리'],['character','캐릭터'],['public','공개 중'],['done','완결·차단']].map(([id,l])=>`<button class="pill ${workFilter===id?'on':''}" data-filter="${id}">${l}</button>`).join('');
 if(!r.works.length)return `<section class="card empty"><h2>아직 등록한 작품이 없어요</h2><p>제작 탭에서 첫 작품을 만들어 보세요.</p></section>`;
 return `<section class="card"><div class="row-head"><h2>내 작품 <small>전체 ${r.works.length}건</small></h2><div class="pills">${filters}</div></div><div class="worklist">${list.map(w=>workRow(s,r,dv,w)).join('')||'<p class="fine">해당하는 작품이 없어요.</p>'}</div></section>`;
}
function workRow(s,r,dv,w){
 const open=openWork===w.id;const promos=r.weekActions.promos[w.id]||[];const age=r.week-w.releasedWeek;
 const status=(w.award?`<span class="chip gold">🏆 ${esc(w.award)}</span>`:'')+(w.status==='blocked'?'<span class="chip bad">차단</span>':w.status==='archived'?'<span class="chip">완결</span>':w.originalReview?`<span class="chip warn">${w.originalReview.sequel?'후속작 심사 중':'오리지널 심사 중'}</span>`:w.hotUntil>=r.week?'<span class="chip hot">🔥 반응 뜨거운 신작</span>':'');
 return `<article class="workrow ${open?'open':''}"><button class="workhead" data-open="${w.id}">${cover(w)}<div class="grow"><div class="chips">${tagsLine(w)}${status}</div><b>${esc(w.title)}</b><small class="meta"><span>▶ ${short(w.plays)}</span><span>♥ ${short(w.likes)}</span><span>💬 ${short(w.commentCount)}</span><span>발화 ${short(w.messages)}</span>${w.settledTotal?`<span>정산 ${won(w.settledTotal)}</span>`:''}<span>최고 ${w.bestRank===999?'-':w.bestRank+'위'}</span>${w.lastRank?`<span class="${w.prevRank&&w.lastRank<w.prevRank?'up':w.prevRank&&w.lastRank>w.prevRank?'down':''}">현재 ${w.lastRank}위${w.prevRank?(w.lastRank<w.prevRank?' ▲'+(w.prevRank-w.lastRank):w.lastRank>w.prevRank?' ▼'+(w.lastRank-w.prevRank):' -'):''}</span>`:''}</small></div></button>
 ${open?`<div class="workbody">${spark(w.weekly.slice(-24).map(x=>x.msgs),240,46)}<div class="two"><div><h3>능력치 <small>완성도 ${w.quality} · 볼륨 ${w.volume}</small></h3>${statBars(w.stats)}<p class="fine">${gName(w.genre)} · ${tName(w.target)} · ${fName(w.form)} · ${D.MODES.find(m=>m.id===w.mode).name} · 답변 ${D.LENGTHS.find(l=>l.id===w.length).name} · ${D.AUDIENCES.find(a=>a.id===w.audience).short} · ${D.ORIGINS.find(o=>o.id===w.origin).name} · ${w.tags.map(t=>'#'+t).join(' ')} · ${G.calendar(w.releasedWeek)} 등록${w.badges.only&&w.badges.only>=r.week?` · ONLY ~${G.calendar(w.badges.only)}`:''}</p></div>
 <div><h3>댓글 ${num(w.commentCount)} <button class="link" ${act({type:'comments',id:w.id})}>${w.commentsClosed?'댓글 열기':'댓글 닫기'}</button></h3><ul class="plain comments">${w.comments.slice(0,6).map(c=>`<li class="${c.troll?'troll':''}">${esc(c.text)}</li>`).join('')||'<li class="fine">아직 댓글이 없어요.</li>'}</ul></div></div>
 ${w.status==='blocked'?'<p class="note">운영 정책 위반으로 차단된 작품이에요. 미션 집계에서 제외됩니다.':''}
 <h3>공개 설정</h3><div class="btns">${['public','link','private'].map(v=>`<button class="secondary ${w.visibility===v?'on':''}" ${act({type:'visibility',id:w.id,visibility:v})} ${w.visibility===v||w.status==='blocked'||w.badges.original||w.originalReview?'disabled':''}>${{public:'전체 공개',link:'링크 공개',private:'비공개'}[v]}</button>`).join('')}${w.kind==='story'&&!w.everPublic&&!w.badges.original&&!w.originalReview?`<button class="primary" ${act({type:'applyOriginal',id:w.id})} ${r.creatorStage>=2&&w.origin==='original'?'':'disabled'}>크랙 오리지널 신청${r.creatorStage<2?' (크리에이터 전용)':w.origin!=='original'?' (2차 창작 불가)':''}</button>`:''}${w.visibility==='public'&&!w.badges.original&&!(w.badges.only&&w.badges.only>=r.week)?`<button class="secondary" ${act({type:'only',id:w.id})} ${r.creatorStage>=2&&w.origin==='original'?'':'disabled'}>크랙 온리 등록 (24주, 정산 2.5%)</button>`:''}${w.badges.original?`<button class="secondary" ${act({type:'sequel',id:w.id})}>후속작 시리즈 제작</button>`:''}${r.contest&&!r.contest.entries.includes(w.id)&&!G.contestEligible(r,r.contest,w)?`<button class="primary" ${act({type:'enter',id:w.id})}>🏆 ${esc(r.contest.name)} 참가</button>`:''}</div>
 ${w.visibility==='public'&&w.status==='active'?`<h3>홍보 <small>종류별 주 1회</small></h3><div class="btns">${D.PROMOS.map(p=>`<button class="secondary" ${act({type:'promote',id:w.id,kind:p.id})} ${promos.includes(p.id)||(p.rep&&r.rep<p.rep)?'disabled':''} title="${esc(p.desc)}">${p.name}${p.money?' · '+won(p.money):''} · 체력 ${p.energy}${promos.includes(p.id)?' ✓':''}</button>`).join('')}</div>
 <h3>업데이트 <small>주 1회 · 5만원 · 체력 20 · 팔로워 알림</small></h3><div class="btns">${G.applicableModules(w).filter(m=>m!=='register').map(m=>`<button class="secondary" ${act({type:'update',id:w.id,module:m})} ${r.weekActions.updates[w.id]||w.stats[D.MODULES[m].stat]>=100?'disabled':''}>${D.MODULES[m].name} → ${D.STATS[D.MODULES[m].stat]}</button>`).join('')}</div>`:''}
 <div class="btns end">${w.status==='active'&&!w.badges.original?`<button class="link" ${act({type:'archive',id:w.id})}>완결 처리</button>`:''}</div></div>`:''}</article>`;
}

function rankPage(s,r,dv){
 const board=r.ranking[rankTab]||[];
 const table=board.length?`<table class="table"><tr><th>#</th><th>작품</th><th>제작자</th><th>주간 발화</th></tr>${board.map(b=>`<tr class="${b.rival?'':'mine'}"><td>${b.rank}</td><td>${esc(b.title)} ${b.badge==='original'?'<em class="bd orig">ORIGINAL</em>':b.badge==='only'?'<em class="bd only">ONLY</em>':''}${b.adult?' <i class="adult sm">19</i>':''}</td><td>${esc(b.author)}</td><td>${num(b.msgs)}</td></tr>`).join('')}</table>`:'<p class="fine">첫 주를 마감하면 랭킹이 집계돼요.</p>';
 const monthly=r.monthly?`<table class="table"><tr><th>#</th><th>작품</th><th>제작자</th><th>월간 발화</th></tr>${r.monthly.top.map((b,i)=>`<tr class="${b.rival?'':'mine'}"><td>${i+1}</td><td>${esc(b.title)}</td><td>${esc(b.author)}</td><td>${num(b.msgs)}</td></tr>`).join('')}</table>`:'<p class="fine">월말에 집계돼요.</p>';
 const rivals=r.rivals.slice().sort((a,b)=>b.followers-a.followers).map(rv=>{const arch=D.RIVAL_ARCHETYPES.find(a=>a.id===rv.arch);const rel=rv.relation>=30?'우호':rv.relation<=-30?'적대':'중립';return `<li><b>${esc(rv.name)}</b>${rv.stage>=2?' <em class="bd creator">CREATOR</em>':''} <small>${arch.name} · ${tName(rv.target)} · 팔로워 ${short(rv.followers)} · 연재 ${rv.works.length} · 관계 ${rel}</small><small class="fine">${rv.works.slice(-2).map(x=>esc(x.title)).join(' · ')}</small></li>`;}).join('');
 return `<section class="card"><div class="row-head"><h2>주간 랭킹 <small>${r.report?esc(r.report.calendar):'-'}</small></h2><div class="pills">${[['all','전체'],['female','여성향'],['male','남성향']].map(([id,l])=>`<button class="pill ${rankTab===id?'on':''}" data-rank="${id}">${l}</button>`).join('')}</div></div>${table}</section>
 <div class="two"><section class="card"><h2>월간 TOP 5${r.monthly?` <small>${r.monthly.year}년차 ${r.monthly.month}월</small>`:''}</h2>${monthly}</section>
 <section class="card"><h2>나의 기록</h2><ul class="plain"><li>최고 순위 ${r.stats.bestRank===999?'-':r.stats.bestRank+'위'}</li><li>주간 1위 ${r.stats.weekly1}회 · 월간 1위 ${r.stats.monthly1}회</li><li>반응 뜨거운 신작 ${r.stats.hot}회</li><li>온리 ${r.stats.only} · 오리지널 ${r.stats.originals}</li><li>제재 ${r.sanctions}회</li></ul><h3>팔로워 추이</h3>${spark(r.history.followers.slice(-48),200,46)}<h3>주간 발화 추이</h3>${spark(r.history.messages.slice(-48),200,46)}</section></div>
 ${contestCard(s,r)}<div class="two"><section class="card"><h2>대회 기록</h2>${r.contestHistory.length?r.contestHistory.slice(0,4).map(h=>`<div class="hist"><b>${esc(h.name)}</b> <small>${G.calendar(h.week)}</small><ul class="plain">${h.board.slice(0,3).map((b,i)=>`<li class="${b.rival?'':'mine'}">${['🥇','🥈','🥉'][i]} ${esc(b.title)} <small>${esc(b.author)} · ${b.score}점</small></li>`).join('')}${h.mine.map(m=>`<li class="mine">내 작품 「${esc(m.title)}」 ${m.rank}위 ${m.award?'· '+m.award:''}</li>`).join('')}</ul></div>`).join(''):'<p class="fine">아직 대회 기록이 없어요.</p>'}</section>
 <section class="card"><h2>수상 선반</h2>${r.awards.length?`<ul class="plain">${r.awards.map(a=>`<li>🏅 ${a.year}년차 ${esc(a.name)} — ${esc(a.work)}</li>`).join('')}</ul>`:'<p class="fine">연말 크랙 크리에이터 어워드: 올해의 스토리·캐릭터, 신인상, 타겟별 독자 선정, 댓글 폭발상, 선물왕, 꾸준함상.</p>'}${r.works.filter(w=>w.award).length?`<h3>공모전 수상작</h3><ul class="plain">${r.works.filter(w=>w.award).map(w=>`<li>🏆 ${esc(w.award)} — 「${esc(w.title)}」</li>`).join('')}</ul>`:''}</section></div>
 ${feedCard(r,12)}<section class="card"><h2>갤러리의 제작자들</h2><ul class="plain rivals">${rivals}</ul></section>`;
}

function growPage(s,r,dv){
 const skills=Object.entries(D.SKILLS).map(([k,sk])=>`<div class="row"><div><b>${sk.name} Lv.${r.skills[k]}</b><small>${esc(sk.desc)}</small>${bar(r.skillXp[k],80*r.skills[k],'x')}<small>경험치 ${r.skillXp[k]}/${80*r.skills[k]}</small></div><button class="secondary" ${act({type:'train',skill:k})} ${r.skills[k]>=10?'disabled':''}>${r.skills[k]>=10?'MAX':`훈련 · ${won(dv.trainCost(k))} / 체력 20`}</button></div>`).join('');
 const items=D.ITEMS.map(i=>`<div class="row ${r.items.includes(i.id)?'owned':''}"><div><b>${i.name}</b><small>${esc(i.desc)}</small></div>${r.items.includes(i.id)?'<span class="chip">보유</span>':`<button class="secondary" ${act({type:'buy',id:i.id})}>${won(i.price*dv.costMul)}</button>`}</div>`).join('');
 const subs=D.SUBSCRIPTIONS.map(x=>`<div class="row ${r.subs.includes(x.id)?'owned':''}"><div><b>${x.name}</b><small>${esc(x.desc)} · 월 ${won(x.monthly)}</small></div><button class="secondary" ${act({type:'subscribe',id:x.id})}>${r.subs.includes(x.id)?'해지':'구독'}</button></div>`).join('');
 const studios=D.STUDIOS.map(st=>`<div class="row ${r.studio===st.id?'owned':''}"><div><b>${st.name}</b><small>${esc(st.desc)} · 슬롯 ${st.slots} · 체력 +${st.energy} · 회복 +${st.recover} · 주 ${won(st.rent)}${r.ownedStudios.includes(st.id)?' · 계약 완료':' · 보증금 '+won(st.deposit*dv.costMul)}</small></div>${r.studio===st.id?'<span class="chip">거주 중</span>':`<button class="secondary" ${act({type:'move',studio:st.id})}>이사</button>`}</div>`).join('');
 return `<section class="card"><h2>역량 훈련</h2><div class="list">${skills}</div></section><section class="card"><h2>작업실 <span class="chip">${esc(dv.studio.name)}</span></h2><div class="list">${studios}</div></section><div class="two"><section class="card"><h2>장비</h2><div class="list">${items}</div></section><section class="card"><h2>구독 <small>월초 자동 결제</small></h2><div class="list">${subs}</div></section></div>`;
}
function lifePage(s,r,dv){
 const life=D.LIFE.map(l=>`<button class="card-btn" ${act({type:'life',id:l.id})} ${l.id==='nap'&&r.weekActions.nap?'disabled':''}><b>${l.name}</b><small>${esc(l.desc)}</small><em>체력 ${l.id==='nap'?'-20':l.energy}</em></button>`).join('');
 const jobs=D.JOBS.map(j=>{const locked=r.rep<j.rep;return `<button class="card-btn ${locked?'locked':''}" ${act({type:'job',id:j.id})} ${locked||r.weekActions.jobs[j.id]?'disabled':''}><b>${j.name}</b><small>${esc(j.desc)}</small><em>+${won(j.money)} · 체력 ${j.energy} · 스트레스 +${j.stress}${r.weekActions.jobs[j.id]?' · 완료':''}</em></button>`;}).join('');
 return `<section class="card"><h2>컨디션</h2><div class="cond"><div><b>스트레스 ${r.stress}</b>${bar(r.stress,100,r.stress>=70?'bad':'s')}<small>70 이상이면 작업 속도 -30%. 95 이상으로 주를 넘기면 번아웃.</small></div><div><b>영감 ${r.inspiration}</b>${bar(r.inspiration,100,'i')}<small>제작 시작에 20 필요. 영감 폭발 확률 ${Math.round(dv.crit*100)}%</small></div><div><b>주간 회복</b><small>스트레스 -${dv.recover}, 영감 +${dv.inspirationWeekly}${dv.bg.salary?`, 월급 +${won(dv.bg.salary)}`:''}, 임대료 -${won(dv.studio.rent)}</small></div></div></section>
 <section class="card"><h2>휴식·취미</h2><div class="cards">${life}</div></section><section class="card"><h2>부업 <small>종류별 주 1회</small></h2><div class="cards">${jobs}</div></section>`;
}
function recordPage(s,r,dv){
 const sc=G.scoreOf(r);
 const statements=r.statements.length?`<table class="table"><tr><th>월</th><th>발화</th><th>캐시</th><th>세금</th><th>입금</th></tr>${r.statements.slice(0,12).map(x=>`<tr><td>${esc(x.label)}${x.creator?'':' <small>(비크리에이터)</small>'}</td><td>${num(x.msgs)}</td><td>${won(x.gross)}</td><td>${won(x.tax)}</td><td>${x.paid?won(x.paid):'이월'}</td></tr>`).join('')}</table>`:'<p class="fine">첫 월말에 정산 내역서가 생겨요.</p>';
 return `<section class="card"><h2>이번 회차 현황</h2><div class="kv"><div><small>현재 점수</small><b>${num(sc.score)}</b></div><div><small>예상 유산</small><b>+${Math.max(1,Math.floor(sc.score/1200))}</b></div><div><small>누적 정산</small><b>${won(r.settledTotal)}</b></div><div><small>평균 완성도</small><b>${sc.avgQ}</b></div><div><small>번아웃 / 제재</small><b>${r.stats.burnouts} / ${r.sanctions}</b></div><div><small>특성</small><b>${r.traits.map(t=>D.TRAITS.find(x=>x.id===t)?.name).join(', ')}</b></div></div>
 <p class="fine">엔딩(예): 오리지널 간판 작가 = 오리지널 3·인지도 1,500 / 전업 = 크리에이터·누적 정산 6,000만 / 네임드 = 팔로워 20,000 / 갤러리의 전설 = 인지도 2,500 / 아는 사람은 아는 작가 = 평균 완성도 78·작품 8 / 취미 = 평균 스트레스 30 이하</p>
 <div class="btns end"><button class="link danger" ${act({type:'retire'})} ${r.week<D.WEEKS_PER_YEAR?'disabled':''}>조기 은퇴 (엔딩 보기)${r.week<D.WEEKS_PER_YEAR?' · 1년차 이후':''}</button></div></section>
 <section class="card"><h2>월 정산 내역서</h2>${statements}</section>${trophyPanel(s)}${insightPanel(s)}
 <section class="card"><h2>작가 일지 전체</h2><ul class="plain log">${r.log.map(l=>`<li>${esc(l)}</li>`).join('')}</ul></section>
 <p class="fine center">${accountLine()} · 테마 <button class="link" ${act({type:'theme',theme:s.theme==='dark'?'light':'dark'})}>${s.theme==='dark'?'라이트':'다크'}로</button></p>`;
}

// ---------- 모달 ----------
function modals(s){
 const r=s?.run;
 if(r&&!r.ended&&r.queue?.length){const q=r.queue[0];let extra='';
  if(q.kind==='release')extra=`<div>${statBars(q.stats)}<p class="fine">볼륨 ${q.volume}</p></div>`;
  if(q.kind==='contest')extra=`<ol class="plain">${q.board.map((b,i)=>`<li class="${b.rival?'':'mine'}">${i<3?['🥇','🥈','🥉'][i]:(i+1)+'.'} ${esc(b.title)} <small>${esc(b.author)} · ${b.score}점</small></li>`).join('')}</ol>`;
  if(q.kind==='awards')extra=q.awards.length?`<ul class="plain awards">${q.awards.map(a=>`<li>🏅 <b>${esc(a.name)}</b> — ${esc(a.work)}</li>`).join('')}</ul>`:'';
  return `<div class="modal-back"><div class="modal ${q.kind}"><span class="chip">${{event:'이벤트',milestone:'제작 방향',release:'등록 완료',contest:'대회 결과',awards:'연말 어워드'}[q.kind]}</span><h2>${esc(q.title)}</h2><p>${esc(q.text)}</p>${extra}<div class="options">${q.options.map((o,i)=>`<button class="${i===0?'primary':'secondary'}" ${act({type:'choose',option:i})}>${esc(o.label)}</button>`).join('')}</div></div></div>`;}
 if(modal==='report'&&r?.report){const rep=r.report;const best=rep.rows.length?Math.min(...rep.rows.map(x=>x.rank)):null;const grade=best===null?'':best<=3?'S':best<=10?'A':best<=30?'B':best<=60?'C':'D';return `<div class="modal-back"><div class="modal report"><div class="result-head"><div><span class="chip">WEEK RESULT</span><h2>${esc(rep.calendar)}</h2></div>${grade?`<div class="grade g-${grade}">${grade}<small>최고 ${best}위</small></div>`:''}</div><div class="kv"><div><small>발화</small><b>${num(rep.msgs)}</b></div><div><small>신규 플레이</small><b>${num(rep.players)}</b></div><div><small>정산 캐시 +</small><b>${won(rep.cash)}</b></div><div><small>선물 +</small><b>${won(rep.gift)}</b></div><div><small>임대료</small><b>-${won(rep.rent)}</b></div>${rep.salary?`<div><small>월급</small><b>+${won(rep.salary)}</b></div>`:''}<div><small>새 팔로워</small><b>+${num(rep.fans)}</b></div></div>
  ${rep.rows.length?`<table class="table"><tr><th>작품</th><th>신규</th><th>재방문</th><th>발화</th><th>크래커</th><th>캐시</th><th>순위</th></tr>${rep.rows.map(x=>`<tr><td>${esc(x.title)}${x.promoted?' 📣':''}${x.tagHits?' #'+x.tagHits:''}</td><td>${num(x.arrivals)}</td><td>${num(x.returning)}</td><td>${num(x.msgs)}</td><td>${num(x.crackers)}</td><td>${num(x.settled+x.gift)}</td><td>${x.rank}위${(()=>{const w=r.works.find(w=>w.id===x.id);return w&&w.prevRank?(w.lastRank<w.prevRank?`<i class="up"> ▲${w.prevRank-w.lastRank}</i>`:w.lastRank>w.prevRank?`<i class="down"> ▼${w.lastRank-w.prevRank}</i>`:''):'';})()}</td></tr>`).join('')}</table>`:'<p class="fine">공개 중인 작품이 없어 집계가 없었어요.</p>'}
  ${rep.events.length?`<ul class="plain">${rep.events.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}<h3>주간 TOP 5</h3><ol class="plain">${rep.ranking.slice(0,5).map(b=>`<li class="${b.rival?'':'mine'}">${b.rank}. ${esc(b.title)} <small>${esc(b.author)} · ${num(b.msgs)}</small></li>`).join('')}</ol><div class="options"><button class="primary" data-close>확인</button></div></div></div>`;}
 if(modal?.startsWith('register:')&&r){const d=r.drafts.find(x=>x.id===modal.slice(9));if(!d)return '';const canOrig=d.kind==='story'&&d.origin==='original';return `<div class="modal-back"><div class="modal"><span class="chip">등록</span><h2>「${esc(d.title)}」 공개 여부</h2><p>${d.sequelOf?'후속작은 등록 즉시 시리즈 심사(2주)에 들어가요.':'이용자 층과 공개 여부는 나중에 바꿀 수 있지만, 한 번 전체 공개한 작품은 오리지널 심사를 신청할 수 없어요.'}</p><div class="options">
  <button class="primary" ${act({type:'register',id:d.id,visibility:'public'})}>전체 공개 <small>누구나 플레이 · 신작 탭 노출 · 미션 집계</small></button>
  <button class="secondary" ${act({type:'register',id:d.id,visibility:'link'})}>링크 공개 <small>링크를 가진 사용자만 · 커뮤니티 홍보용${canOrig?' · 오리지널 신청 자격 유지':''}</small></button>
  <button class="secondary" ${act({type:'register',id:d.id,visibility:'private'})}>비공개 <small>나만 플레이${canOrig?' · 오리지널 심사 신청 가능':''}</small></button>
  <button class="link" data-close>취소</button></div></div></div>`;}
 return '';
}

// ---------- 이벤트 바인딩 ----------
document.addEventListener('click',async e=>{
 const b=e.target.closest('button,[data-page]');if(!b)return;
 if(b.dataset.act){const a=JSON.parse(b.dataset.act);if(a.type==='slot'){page='home';draftForm=null;openWork=null;}if(a.type==='endweek'){dispatch(a,()=>{modal='report';});return;}if(a.type==='register'){dispatch(a,()=>{modal=null;});return;}if(a.type==='retire'&&!confirm('정말 조기 은퇴할까요? 지금까지의 성과로 엔딩이 결정돼요.'))return;if(a.type==='scrap'&&!confirm('제작을 취소할까요?'))return;if(a.type==='archive'&&!confirm('완결 처리하면 더 이상 집계되지 않아요. 진행할까요?'))return;dispatch(a);return;}
 if(b.dataset.page){page=b.dataset.page;modal=null;render();window.scrollTo(0,0);return;}
 if(b.dataset.open!==undefined){openWork=openWork===b.dataset.open?null:b.dataset.open;render();return;}
 if(b.dataset.filter){workFilter=b.dataset.filter;render();return;}
 if(b.dataset.rank){rankTab=b.dataset.rank;render();return;}
 if(b.dataset.register){modal='register:'+b.dataset.register;render();return;}
 if(b.dataset.modal){modal=b.dataset.modal;render();return;}
 if(b.hasAttribute('data-close')){modal=null;render();return;}
 if(b.dataset.bg){setupForm.background=b.dataset.bg;setupForm.name=$('#setup-name')?.value||setupForm.name;render();return;}
 if(b.dataset.trait){const max=G.has(profile(),'two_traits')?2:1;const t=b.dataset.trait;setupForm.name=$('#setup-name')?.value||setupForm.name;if(setupForm.traits.includes(t))setupForm.traits=setupForm.traits.filter(x=>x!==t);else{setupForm.traits.push(t);if(setupForm.traits.length>max)setupForm.traits.shift();}render();return;}
 if(b.hasAttribute('data-start')){setupForm.name=$('#setup-name')?.value.trim()||'';if(!setupForm.name)return toast('작가 이름을 입력해 주세요.');page='home';draftForm=null;dispatch({type:'newgame',name:setupForm.name,background:setupForm.background,traits:setupForm.traits,confirm:true});return;}
 if(b.hasAttribute('data-auth-toggle')){authMode=authMode==='register'?'login':'register';render();return;}
 if(b.hasAttribute('data-guest')){local=true;localStorage.setItem('crack-mode','local');save=await apiLoad();render();return;}
 if(b.hasAttribute('data-slot-close')){page='home';dispatch({type:'slot',op:'close'});return;}
 if(b.dataset.slotDelete!==undefined){if(!confirm(`슬롯 ${Number(b.dataset.slotDelete)+1}의 모든 기록(유산·인사이트·업적 포함)을 삭제할까요?`))return;dispatch({type:'slot',op:'delete',slot:Number(b.dataset.slotDelete),confirm:true});return;}
 if(b.hasAttribute('data-reset-all')){if(!confirm('모든 슬롯을 지우고 처음부터 시작할까요?')||!confirm('정말로요? 되돌릴 수 없어요.'))return;dispatch({type:'slot',op:'reset',confirm:true});return;}
 if(b.hasAttribute('data-logout')){if(local){localStorage.removeItem('crack-mode');local=MODE==='local';if(local)return;save=null;render();return;}try{await post('logout',{});}catch{}save=null;render();return;}
});
function readDraftForm(f){const fd=new FormData(f);return {title:fd.get('title')||'',kind:fd.get('kind'),genre:fd.get('genre'),tags:fd.getAll('tags'),target:fd.get('target'),form:fd.get('form'),mode:fd.get('mode'),length:Number(fd.get('length')),audience:fd.get('audience'),imageSource:fd.get('imageSource'),origin:fd.get('origin'),template:fd.get('template')};}
document.addEventListener('submit',async e=>{
 if(e.target.id==='auth-form'){e.preventDefault();const fd=new FormData(e.target);try{await post(authMode,{username:fd.get('username'),password:fd.get('password')});save=await apiLoad();render();}catch(err){toast(err.message);}return;}
 if(e.target.id==='draft-form'){e.preventDefault();dispatch({type:'draft',...readDraftForm(e.target)},()=>{draftForm=null;});return;}
});
document.addEventListener('input',e=>{const f=e.target.closest('#draft-form');if(!f||!draftForm)return;draftForm=readDraftForm(f);if(e.target.name!=='title')render();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){modal=null;render();}});

(async()=>{try{save=await apiLoad();}catch(e){toast(e.message);}render();})();
