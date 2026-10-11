import * as G from './game.js';
import * as D from './data.js';
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=n=>Math.round(Number(n)||0).toLocaleString('ko-KR');
const act=obj=>`data-act="${esc(JSON.stringify(obj))}"`;
const MODE=document.documentElement.dataset.mode||'server';
const LS='crack-creator-v3';
let local=MODE==='local'||localStorage.getItem('crack-mode')==='local';
let save=null,username='',page='home',busy=false,modal=null,authMode='login',setupForm={name:'',background:'student',traits:[]},draftForm=null,openWork=null;

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
function spark(values,w=160,h=40){if(!values.length)return '';const max=Math.max(1,...values),min=Math.min(...values);const pts=values.map((v,i)=>`${(i/(Math.max(1,values.length-1))*w).toFixed(1)},${(h-((v-min)/Math.max(1,max-min))*(h-4)-2).toFixed(1)}`).join(' ');return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${pts}"/></svg>`;}
const gName=id=>D.GENRES.find(g=>g.id===id)?.name||id,sName=id=>D.SUBJECTS.find(g=>g.id===id)?.name||id,fName=id=>D.FORMATS.find(f=>f.id===id)?.name||id;
const statBars=stats=>Object.entries(D.STATS).map(([k,n])=>`<div class="stat"><span>${n}</span>${bar(stats[k])}<b>${stats[k]}</b></div>`).join('');

// ---------- 메인 렌더 ----------
function render(){
 const s=profile();document.documentElement.dataset.theme=s?.theme||'violet';
 let html;
 if(!save)html=authScreen();
 else if(!s)html=slotScreen(save);
 else if(!s.run||s.run.ended)html=titleScreen(s);
 else html=playShell(s);
 $('#app').innerHTML=html+modals(s);
 document.querySelectorAll('.bar i[data-w]').forEach(i=>{i.style.width=i.dataset.w+'%';});
 drawOffice();
 const m=$('.modal-back');if(m)m.querySelector('button')?.focus();
}
function authScreen(){
 return `<div class="title-wrap"><div class="title-card"><div class="logo">크랙 작가<span>키우기</span><small>CHARACTER CHAT CREATOR LIFE</small></div><p class="lead">캐릭터 챗 제작자로 살아가는 3년. 기획하고, 프롬프트를 다듬고, 독자를 만나고, 전설이 되자.</p>
 <form id="auth-form" class="auth"><label>아이디<input name="username" required pattern="[a-zA-Z0-9_]{3,20}" placeholder="영문·숫자·밑줄 3~20자"></label><label>비밀번호<input name="password" type="password" required minlength="8" maxlength="128"></label><button class="primary big">${authMode==='register'?'회원가입하고 시작':'로그인'}</button><button type="button" class="link" data-auth-toggle>${authMode==='register'?'이미 계정이 있어요':'계정 만들기'}</button></form>
 <div class="or">또는</div><button class="secondary big" data-guest>회원가입 없이 이 브라우저에 저장하고 시작</button><p class="fine">브라우저 저장 모드는 이 기기에만 기록이 남습니다. 서버 계정과 동기화되지 않습니다.</p></div></div>`;
}
function accountLine(){return `${local?'브라우저 저장 모드':'계정: '+esc(username)} · <button class="link" data-slot-close>세이브 슬롯 선택</button> · <button class="link" data-logout>${local?'계정 모드로 전환':'로그아웃'}</button>`;}
function slotScreen(save){
 const cards=save.slots.map((p,i)=>{const sm=G.summarize(p);const summary=!sm?'<small>비어 있음</small>':sm.name?`<small>${esc(sm.name)} · ${sm.ended?'엔딩: '+esc(sm.endingName):esc(sm.calendar)} · 작품 ${sm.works} · 명성 ${num(sm.fame)}</small><small>유산 ${sm.legacy} · 완주 ${sm.runs}회 · 업적 ${sm.trophies}</small>`:`<small>회차 준비 중 · 유산 ${sm.legacy} · 완주 ${sm.runs}회</small>`;
  return `<div class="slot"><div><b>슬롯 ${i+1}</b>${summary}</div><div class="btns"><button class="primary" ${act({type:'slot',op:'select',slot:i})}>${p?'이어하기':'새로 시작'}</button>${p?`<button class="link danger" data-slot-delete="${i}">삭제</button>`:''}</div></div>`;}).join('');
 return `<div class="title-wrap"><div class="title-card"><div class="logo">크랙 작가<span>키우기</span><small>SAVE SLOTS</small></div><p class="lead">세이브 슬롯을 고르세요. 슬롯마다 유산·도감·업적이 따로 쌓입니다.</p><div class="slots">${cards}</div>
 <div class="btns end"><button class="link danger" data-reset-all>모든 슬롯 초기화</button><button class="link" data-logout>${local?'계정 모드로 전환':'로그아웃'}</button></div><p class="fine">${local?'브라우저 저장 모드: 이 기기에만 기록이 남습니다.':'계정: '+esc(username)}</p></div></div>`;
}
function titleScreen(s){
 const m=s.meta;const ended=s.run?.ended;
 const endingBlock=ended?`<section class="panel ending"><h2>엔딩 · ${esc(ended.name)}</h2><p>${esc(ended.desc)}</p><div class="ending-grid"><div><small>최종 점수</small><b>${num(ended.score)}</b></div><div><small>획득 유산</small><b>+${ended.legacy}</b></div><div><small>명성</small><b>${num(ended.ctx.fame)}</b></div><div><small>팔로워</small><b>${num(ended.ctx.followers)}</b></div><div><small>작품 / 명예의 전당</small><b>${ended.ctx.works} / ${ended.ctx.hof}</b></div><div><small>코인</small><b>${num(ended.ctx.coins)} C</b></div></div><p class="fine">유산 포인트로 아래에서 새 배경·특성·시작 보너스를 해금하고 다음 회차를 시작하세요.</p></section>`:'';
 const maxTraits=G.has(s,'two_traits')?2:1;
 const bgCards=D.BACKGROUNDS.map(b=>{const locked=b.legacy>0&&!G.has(s,'bg_'+b.id);return `<button type="button" class="choice ${setupForm.background===b.id?'selected':''} ${locked?'locked':''}" data-bg="${b.id}" ${locked?'disabled':''}><b>${b.name}</b><small>${esc(b.desc)}</small>${locked?'<em>유산 상점에서 해금</em>':''}</button>`;}).join('');
 const trCards=D.TRAITS.map(t=>{const locked=t.legacy>0&&!G.has(s,'tr_'+t.id);const on=setupForm.traits.includes(t.id);return `<button type="button" class="choice ${on?'selected':''} ${locked?'locked':''}" data-trait="${t.id}" ${locked?'disabled':''}><b>${t.name}</b><small>${esc(t.desc)}</small>${locked?'<em>유산 상점에서 해금</em>':''}</button>`;}).join('');
 const legacyShop=D.LEGACY_SHOP.map(i=>{const owned=G.has(s,i.id);return `<div class="shop-row ${owned?'owned':''}"><div><b>${i.name}</b><small>${esc(i.desc)}</small></div>${owned?'<span class="tag">해금됨</span>':`<button class="secondary" ${act({type:'legacy',id:i.id})} ${m.legacy<i.cost?'disabled':''}>${i.cost} 유산</button>`}</div>`;}).join('');
 const runs=m.runs.length?`<table class="table"><tr><th>작가</th><th>엔딩</th><th>점수</th><th>작품</th><th>명전</th><th>팔로워</th></tr>${m.runs.slice().reverse().map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.ending)}</td><td>${num(r.score)}</td><td>${r.works}</td><td>${r.hof}</td><td>${num(r.followers)}</td></tr>`).join('')}</table>`:'<p class="fine">아직 완주한 회차가 없어요.</p>';
 return `<div class="title-wrap wide"><div class="logo">크랙 작가<span>키우기</span><small>CHARACTER CHAT CREATOR LIFE · ${m.runs.length+1}회차</small></div>${endingBlock}
 <section class="panel"><h2>새 회차 시작</h2><label class="field">작가 이름<input id="setup-name" maxlength="12" value="${esc(setupForm.name)}" placeholder="예: 달빛공방"></label>
 <h3>배경</h3><div class="choices">${bgCards}</div><h3>특성 <small>(${setupForm.traits.length}/${maxTraits})</small></h3><div class="choices">${trCards}</div>
 <div class="start-row"><button class="primary big" data-start>작가 인생 시작!</button></div>
 <p class="fine">시작 보너스: ${['start_coins','start_skill','start_fans','long_career','all_genres','world_format'].filter(k=>G.has(s,k)).map(k=>D.LEGACY_SHOP.find(i=>i.id===k).name).join(', ')||'없음'}</p></section>
 <section class="panel"><h2>유산 상점 <span class="tag">보유 유산 ${m.legacy}</span></h2><p class="fine">회차를 끝내면 점수에 따라 유산을 얻어요. 유산은 회차를 넘어 영구히 쌓입니다.</p><div class="shop">${legacyShop}</div></section>
 <div class="two"><section class="panel"><h2>엔딩 컬렉션 ${m.endings.length}/${D.ENDINGS.length}</h2><ul class="plain">${D.ENDINGS.map(e=>`<li class="${m.endings.includes(e.id)?'':'dim'}">${m.endings.includes(e.id)?'★ '+e.name+' — '+esc(e.desc):'？ ???'}</li>`).join('')}</ul></section>
 <section class="panel"><h2>회차 기록 <span class="tag">최고 ${num(m.best)}</span></h2>${runs}</section></div>
 ${trophyPanel(s)}${comboPanel(s)}
 <p class="fine center">${accountLine()} · 테마 ${['violet','mint','sunset'].map(t=>`<button class="link" ${act({type:'theme',theme:t})}>${{violet:'라벤더',mint:'민트',sunset:'선셋'}[t]}</button>`).join(' ')}</p></div>`;
}
function trophyPanel(s){return `<section class="panel"><h2>업적 ${s.meta.trophies.length}/${D.TROPHIES.length}</h2><div class="trophies">${D.TROPHIES.map(t=>`<div class="trophy ${s.meta.trophies.includes(t.id)?'on':''}"><b>${s.meta.trophies.includes(t.id)?'🏆':'🔒'} ${t.name}</b><small>${esc(t.desc)}</small></div>`).join('')}</div></section>`;}
function comboPanel(s){const c=s.meta.combos;const found=Object.keys(c).length;return `<section class="panel"><h2>궁합 도감 <span class="tag">${found}/${D.GENRES.length*D.SUBJECTS.length} 발견</span></h2><p class="fine">장르×소재 궁합은 작품을 공개해야 밝혀져요. 도감은 회차를 넘어 유지됩니다. ★2 ○1 △0 ▽-1 ✕-2</p><div class="combo-scroll"><table class="combo"><tr><th></th>${D.SUBJECTS.map(x=>`<th>${x.name}</th>`).join('')}</tr>${D.GENRES.map(g=>`<tr><th>${g.name}</th>${D.SUBJECTS.map(x=>{const v=c[g.id+':'+x.id];return `<td class="c${v??'u'}">${v===undefined?'·':{2:'★',1:'○',0:'△','-1':'▽','-2':'✕'}[v]}</td>`;}).join('')}</tr>`).join('')}</table></div></section>`;}

function playShell(s){
 const r=s.run,dv=G.derive(s);
 const pages={home:['⌂','작업실'],make:['✎','제작'],works:['▤','작품'],rank:['▲','랭킹'],grow:['★','성장'],life:['☕','생활'],record:['▦','기록']};
 const body={home:homePage,make:makePage,works:worksPage,rank:rankPage,grow:growPage,life:lifePage,record:recordPage}[page](s,r,dv);
 return `<div class="shell"><header class="hud"><div class="hud-main"><b>${G.calendar(r.week)}</b><small>${esc(r.name)} · ${dv.fameTier} · Lv.${dv.level} · 남은 ${dv.weeksLeft}주</small></div>
 <div class="hud-cells"><div class="cell"><small>코인</small><b class="${r.coins<0?'neg':''}">${num(r.coins)} C</b></div><div class="cell"><small>체력</small><b>${r.energy}/${dv.energyMax}</b>${bar(r.energy,dv.energyMax,'e')}</div><div class="cell"><small>스트레스</small><b>${r.stress}</b>${bar(r.stress,100,r.stress>=70?'bad':'s')}</div><div class="cell"><small>영감</small><b>${r.inspiration}</b>${bar(r.inspiration,100,'i')}</div><div class="cell"><small>팔로워</small><b>${num(r.followers)}</b></div><div class="cell"><small>명성</small><b>${num(r.fame)}</b></div></div></header>
 <main class="content">${body}</main>
 <nav class="menu">${Object.entries(pages).map(([id,[icon,label]])=>`<button class="${page===id?'on':''}" data-page="${id}"><i>${icon}</i>${label}${id==='make'&&r.drafts.length?`<em>${r.drafts.length}</em>`:''}</button>`).join('')}</nav></div>`;
}

// ---------- 페이지 ----------
function homePage(s,r,dv){
 const d=r.drafts[0];const rep=r.report;
 const bubble=r.stress>=80?'...너무 지쳤어. 조금만 쉬자.':d?`「${d.title}」 작업 중! ${Object.values(d.progress).every(v=>v>=100)?'완성됐다. 공개하자!':'오늘도 한 장면씩.'}`:r.works.length?'다음 작품은 뭘 만들까?':'첫 작품을 기획해 보자!';
 const trend=`<div class="trend"><b>이달의 유행</b> ${gName(r.trend.genre)} × ${sName(r.trend.subject)}${r.trendBoost>1?' <span class="tag hot">붐!</span>':''}${(r.subs.includes('trend')||r.skills.marketing>=4)?`<small>다음 달: ${gName(r.nextTrend.genre)} × ${sName(r.nextTrend.subject)}</small>`:'<small>다음 달 예보: 홍보 Lv.4 또는 트렌드 리포트 구독</small>'}</div>`;
 const drafts=r.drafts.map(d=>`<div class="mini-draft"><b>${esc(d.title)}</b><div class="stages">${Object.entries(D.STAGES).map(([k,st])=>`<button class="stage ${d.progress[k]>=100?'done':''}" ${act({type:'work',id:d.id,stage:k})} ${d.progress[k]>=100?'disabled':''}><span>${st.icon} ${st.name}</span>${bar(d.progress[k])}<small>${d.progress[k]}%</small></button>`).join('')}</div>${Object.values(d.progress).every(v=>v>=100)?`<button class="primary" ${act({type:'publish',id:d.id})}>★ 공개하기</button>`:''}</div>`).join('')||`<p class="fine">제작 중인 초안이 없어요. <button class="link" data-page="make">제작 탭에서 기획하기 →</button></p>`;
 const summary=rep?`<div class="report-mini"><b>지난주 정산</b><span>+${num(rep.revenue)} C</span><span>팔로워 +${num(rep.fans)}</span><span>대화 ${num(rep.chats)}</span>${rep.rows.length?`<span>최고 ${Math.min(...rep.rows.map(x=>x.rank))}위</span>`:''}<button class="link" data-modal="report">자세히</button></div>`:'';
 return `<section class="office"><div class="office-title"><span>${esc(dv.studio.name)}</span><span>작품 ${r.works.length} · 제작 ${r.drafts.length}/${dv.slots}</span></div><div class="scene"><canvas id="office" width="480" height="260" role="img" aria-label="도트 작업실"></canvas><div class="bubble">${esc(bubble)}</div></div>
 <button class="endweek" ${act({type:'endweek'})}>주 마감 ▶<small>정산 · 랭킹 · 체력 회복</small></button></section>
 ${trend}${summary}<section class="panel"><h2>이번 주 작업 <small>작업 1회 = 체력 15</small></h2>${drafts}</section>
 <section class="panel log"><h2>작가 일지</h2><ul>${r.log.slice(0,10).map(l=>`<li>${esc(l)}</li>`).join('')}</ul></section>`;
}

function makePage(s,r,dv){
 draftForm??={title:'',genre:dv.genres[0].id,subject:dv.subjects[0].id,format:'single',cast:1,scale:'medium',focus:'immersion'};
 const f=draftForm;const fmt=D.FORMATS.find(x=>x.id===f.format)||D.FORMATS[0];f.cast=Math.min(fmt.maxCast,Math.max(fmt.minCast,f.cast));
 const known=s.meta.combos[f.genre+':'+f.subject];const scale=D.SCALES.find(x=>x.id===f.scale);
 const form=`<section class="panel"><h2>새 작품 기획 <span class="tag">슬롯 ${r.drafts.length}/${dv.slots}</span></h2>
 <form id="draft-form" class="draft-form"><label>제목<input name="title" maxlength="30" required value="${esc(f.title)}" placeholder="예: 달빛 도서관의 마지막 사서"></label>
 <div class="grid2"><label>장르<select name="genre">${D.GENRES.map(g=>`<option value="${g.id}" ${g.id===f.genre?'selected':''} ${dv.genres.includes(g)?'':'disabled'}>${g.name}${dv.genres.includes(g)?'':' (기획 Lv.'+g.unlock+')'}</option>`).join('')}</select></label>
 <label>소재<select name="subject">${D.SUBJECTS.map(x=>`<option value="${x.id}" ${x.id===f.subject?'selected':''} ${dv.subjects.includes(x)?'':'disabled'}>${x.name}${dv.subjects.includes(x)?'':' (기획 Lv.'+x.unlock+')'}</option>`).join('')}</select></label></div>
 <div class="combo-hint">궁합: ${known!==undefined?`<b class="c${known}">${G.comboLabel(known)}</b>`:'<b>미발견 — 공개하면 도감에 기록돼요</b>'} <small>${esc(D.GENRES.find(g=>g.id===f.genre)?.desc||'')}</small></div>
 <div class="grid2"><label>형태<select name="format">${D.FORMATS.map(x=>`<option value="${x.id}" ${x.id===f.format?'selected':''} ${dv.formats.includes(x)?'':'disabled'}>${x.name}${dv.formats.includes(x)?'':' (잠김)'}</option>`).join('')}</select><small>${esc(fmt.desc)}</small></label>
 <label>등장인물 ${f.cast}명<input type="range" name="cast" min="${fmt.minCast}" max="${fmt.maxCast}" value="${f.cast}"><small>인물이 많을수록 설정 유지가 어려워요.</small></label></div>
 <div class="grid2"><label>규모<select name="scale">${D.SCALES.map(x=>`<option value="${x.id}" ${x.id===f.scale?'selected':''}>${x.name} · ${x.cost} C</option>`).join('')}</select><small>${esc(scale.desc)}</small></label>
 <label>집중 포인트<select name="focus">${Object.entries(D.STATS).map(([k,n])=>`<option value="${k}" ${k===f.focus?'selected':''}>${n}</option>`).join('')}</select><small>해당 능력치 포인트 +30%</small></label></div>
 <button class="primary big" ${r.drafts.length>=dv.slots?'disabled':''}>기획 시작 · ${Math.round(scale.cost*dv.costMul)} C · 체력 10 · 영감 20</button></form></section>`;
 const cards=r.drafts.map(d=>draftCard(s,r,dv,d)).join('');
 return form+(cards||'')+`<section class="panel"><h2>제작 가이드</h2><ul class="plain tips"><li>각 공정 작업마다 진행률과 능력치 포인트가 쌓여요. 영감이 높을수록 <b>영감 폭발</b>(포인트 ×2.2) 확률이 올라가요.</li><li>공정 50%에서 방향 선택이 나와요. 선택에 따라 능력치가 달라집니다.</li><li>외주는 초안당 각 1회. 비공개 테스트는 설정 유지 +5와 약점 진단.</li><li>평가단 합계 32/40 이상이면 <b>명예의 전당</b>. 명성 +100.</li></ul></section>`;
}
function draftCard(s,r,dv,d){
 const est=G.assess(s,d);const done=Object.values(d.progress).every(v=>v>=100);const canTest=Object.values(d.progress).every(v=>v>=30);
 return `<section class="panel draft"><div class="row-head"><h2>${esc(d.title)}</h2><span class="tag">${gName(d.genre)} × ${sName(d.subject)} · ${fName(d.format)} ${d.cast}명 · ${D.SCALES.find(x=>x.id===d.scale).name}</span></div>
 <div class="stages">${Object.entries(D.STAGES).map(([k,st])=>`<button class="stage ${d.progress[k]>=100?'done':''}" ${act({type:'work',id:d.id,stage:k})} ${d.progress[k]>=100?'disabled':''}><span>${st.icon} ${st.name}</span>${bar(d.progress[k])}<small>${d.progress[k]}% · ${k==='assets'&&!r.subs.includes('imagegen')&&!r.weekActions.freeAssets?'25 C + ':''}체력 15</small></button>`).join('')}</div>
 <div class="two"><div><h3>예상 능력치 <small>영감 폭발 ${d.crits}회</small></h3>${statBars(est)}</div><div><h3>외주 · 테스트</h3><div class="btns">${D.HELPERS.map(h=>`<button class="secondary" ${act({type:'hire',id:d.id,helper:h.id})} ${d.helpers.includes(h.id)?'disabled':''} title="${esc(h.desc)}">${h.name} · ${Math.round(h.price*dv.helperMul)} C</button>`).join('')}<button class="secondary" ${act({type:'test',id:d.id})} ${canTest?'':'disabled'}>비공개 테스트 · ${r.subs.includes('model')?30:60} C</button></div>${d.testNote?`<p class="note">${esc(d.testNote.text)}</p>`:''}</div></div>
 <div class="btns end"><button class="link danger" ${act({type:'scrap',id:d.id})}>초안 폐기</button><button class="primary" ${act({type:'publish',id:d.id})} ${done?'':'disabled'}>${done?'★ 공개하기 · 체력 10':'모든 공정 100% 필요'}</button></div></section>`;
}

function worksPage(s,r,dv){
 const active=r.works.filter(w=>w.status==='active'),archived=r.works.filter(w=>w.status!=='active');
 if(!r.works.length)return `<section class="panel empty"><h2>아직 공개한 작품이 없어요</h2><p>제작 탭에서 첫 작품을 만들어 보세요.</p></section>`;
 return `<section class="panel"><h2>연재 중 ${active.length}</h2>${active.map(w=>workCard(s,r,dv,w)).join('')||'<p class="fine">연재 중인 작품이 없어요.</p>'}</section>${archived.length?`<section class="panel"><h2>완결 ${archived.length}</h2>${archived.map(w=>workCard(s,r,dv,w,true)).join('')}</section>`:''}`;
}
function workCard(s,r,dv,w,arch){
 const open=openWork===w.id;const promos=r.weekActions.promos[w.id]||[];
 const chart=spark(w.weekly.slice(-24).map(x=>x.chats));
 return `<article class="work ${w.hof?'hof':''}"><button class="work-head" data-open="${w.id}"><div><b>${esc(w.title)}</b><small>${gName(w.genre)} × ${sName(w.subject)} · ${fName(w.format)} · ${G.comboLabel(w.combo)}</small></div><div class="score">${w.reviewTotal}<small>/40</small>${w.hof?'<em>★ 명예의 전당</em>':''}</div></button>
 <div class="work-meta"><span>대화 ${num(w.totalChats)}</span><span>수익 ${num(w.totalRevenue)} C</span><span>독자 ${num(w.totalReaders)}</span><span>♥ ${num(w.likes)}</span><span>최고 ${w.bestRank===999?'-':w.bestRank+'위'}</span><span>${G.calendar(w.releasedWeek)} 공개${w.seasons?` · 시즌 ${w.seasons+1}`:''}</span></div>${chart}
 ${open?`<div class="work-body"><div class="two"><div><h3>능력치 (완성도 ${w.quality})</h3>${statBars(w.stats)}</div><div><h3>평가단</h3><ul class="plain reviews">${w.reviews.map(v=>`<li><b>${v.score}</b> ${esc(v.name)} — ${esc(v.line)}</li>`).join('')}</ul></div></div>
 ${arch?`<p class="fine">완결 작품. 시즌 2로 부활시킬 수 있어요.</p><div class="btns"><button class="secondary" ${act({type:'season',id:w.id})}>시즌 2 공개 · 600 C · 체력 30</button></div>`:`<h3>홍보 <small>작품당 주 1회씩</small></h3><div class="btns">${D.PROMOS.map(p=>`<button class="secondary" ${act({type:'promote',id:w.id,kind:p.id})} ${promos.includes(p.id)?'disabled':''} title="${p.desc}">${p.name} · ${Math.round(p.coins*dv.costMul)} C / 체력 ${p.energy}${promos.includes(p.id)?' ✓':''}</button>`).join('')}</div>
 <h3>업데이트 <small>주 1회 · 120 C · 체력 20 · 신선도 회복</small></h3><div class="btns">${Object.entries(D.STAGES).map(([k,st])=>`<button class="secondary" ${act({type:'update',id:w.id,stage:k})} ${r.weekActions.updates[w.id]||w.stats[st.stat]>=100?'disabled':''}>${st.name} → ${D.STATS[st.stat]}</button>`).join('')}</div>
 <div class="btns end"><button class="link" ${act({type:'archive',id:w.id})}>완결 처리</button><button class="secondary" ${act({type:'season',id:w.id})} ${r.week-w.releasedWeek<8?'disabled':''}>시즌 2 · 600 C · 체력 30 ${r.week-w.releasedWeek<8?'(공개 8주 후)':''}</button></div>`}</div>`:''}</article>`;
}

function rankPage(s,r,dv){
 const board=r.ranking.length?`<table class="table"><tr><th>#</th><th>작품</th><th>작가</th><th>주간 대화</th></tr>${r.ranking.map(b=>`<tr class="${b.rival?'':'mine'}"><td>${b.rank}</td><td>${esc(b.title)}</td><td>${esc(b.author)}</td><td>${num(b.chats)}</td></tr>`).join('')}</table>`:'<p class="fine">첫 주를 마감하면 랭킹이 집계돼요.</p>';
 const monthly=r.monthly?`<table class="table"><tr><th>#</th><th>작품</th><th>작가</th><th>월간 대화</th></tr>${r.monthly.top.map((b,i)=>`<tr class="${b.rival?'':'mine'}"><td>${i+1}</td><td>${esc(b.title)}</td><td>${esc(b.author)}</td><td>${num(b.chats)}</td></tr>`).join('')}</table>`:'<p class="fine">월말에 집계돼요.</p>';
 const rivals=r.rivals.slice().sort((a,b)=>b.power-a.power).map(rv=>`<li><b>${esc(rv.name)}</b> <small>${gName(rv.style)} 전문 · 세력 ${'★'.repeat(Math.min(5,Math.ceil(rv.power/60)))} · 연재 ${rv.works.length}</small></li>`).join('');
 return `<section class="panel"><h2>주간 인기 랭킹 <span class="tag">${r.report?r.report.calendar:'-'}</span></h2>${board}</section>
 <div class="two"><section class="panel"><h2>월간 TOP 5${r.monthly?` <span class="tag">${r.monthly.year}년차 ${r.monthly.month}월</span>`:''}</h2>${monthly}</section>
 <section class="panel"><h2>나의 기록</h2><ul class="plain"><li>최고 순위 ${r.stats.bestRank===999?'-':r.stats.bestRank+'위'}</li><li>주간 1위 ${r.stats.weekly1}회 · 월간 1위 ${r.stats.monthly1}회</li><li>명예의 전당 ${r.stats.hof}작품</li><li>수상 ${r.awards.length}회</li></ul><h3>팔로워 추이</h3>${spark(r.history.followers.slice(-48),200,46)}<h3>명성 추이</h3>${spark(r.history.fame.slice(-48),200,46)}</section></div>
 <section class="panel"><h2>라이벌 작가들</h2><ul class="plain rivals">${rivals}</ul></section>`;
}

function growPage(s,r,dv){
 const skills=Object.entries(D.SKILLS).map(([k,sk])=>`<div class="skill"><div><b>${sk.icon} ${sk.name} Lv.${r.skills[k]}</b><small>${esc(sk.desc)}</small>${bar(r.skillXp[k],80*r.skills[k],'x')}<small>경험치 ${r.skillXp[k]}/${80*r.skills[k]}</small></div><button class="secondary" ${act({type:'train',skill:k})} ${r.skills[k]>=10?'disabled':''}>${r.skills[k]>=10?'MAX':`훈련 · ${num(dv.trainCost(k))} C / 체력 20`}</button></div>`).join('');
 const items=D.ITEMS.map(i=>`<div class="shop-row ${r.items.includes(i.id)?'owned':''}"><div><b>${i.name}</b><small>${esc(i.desc)}</small></div>${r.items.includes(i.id)?'<span class="tag">보유</span>':`<button class="secondary" ${act({type:'buy',id:i.id})}>${num(i.price*dv.costMul)} C</button>`}</div>`).join('');
 const subs=D.SUBSCRIPTIONS.map(x=>`<div class="shop-row ${r.subs.includes(x.id)?'owned':''}"><div><b>${x.name}</b><small>${esc(x.desc)} · 월 ${x.monthly} C</small></div><button class="secondary" ${act({type:'subscribe',id:x.id})}>${r.subs.includes(x.id)?'해지':'구독'}</button></div>`).join('');
 const studios=D.STUDIOS.map(st=>`<div class="shop-row ${r.studio===st.id?'owned':''}"><div><b>${st.name}</b><small>${esc(st.desc)} · 슬롯 ${st.slots} · 체력 +${st.energy} · 회복 +${st.recover} · 주 ${st.rent} C${r.ownedStudios.includes(st.id)?' · 계약 완료':' · 보증금 '+num(st.deposit*dv.costMul)+' C'}</small></div>${r.studio===st.id?'<span class="tag">거주 중</span>':`<button class="secondary" ${act({type:'move',studio:st.id})}>이사</button>`}</div>`).join('');
 return `<section class="panel"><h2>역량 훈련</h2><div class="skills">${skills}</div></section><section class="panel"><h2>작업실 <span class="tag">${esc(dv.studio.name)}</span></h2><div class="shop">${studios}</div></section><div class="two"><section class="panel"><h2>장비</h2><div class="shop">${items}</div></section><section class="panel"><h2>구독 <small>월초 자동 결제</small></h2><div class="shop">${subs}</div></section></div>`;
}

function lifePage(s,r,dv){
 const life=D.LIFE.map(l=>`<button class="card-btn" ${act({type:'life',id:l.id})} ${l.id==='nap'&&r.weekActions.nap?'disabled':''}><b>${l.name}</b><small>${esc(l.desc)}</small><em>체력 ${l.id==='nap'?'-20':l.energy}</em></button>`).join('');
 const jobs=D.JOBS.map(j=>{const locked=r.fame<j.fame;return `<button class="card-btn ${locked?'locked':''}" ${act({type:'job',id:j.id})} ${locked||r.weekActions.jobs[j.id]?'disabled':''}><b>${j.name}</b><small>${esc(j.desc)}</small><em>+${num(j.coins)} C · 체력 ${j.energy} · 스트레스 +${j.stress}${r.weekActions.jobs[j.id]?' · 완료':''}</em></button>`;}).join('');
 return `<section class="panel"><h2>컨디션</h2><div class="cond"><div><b>스트레스 ${r.stress}</b>${bar(r.stress,100,r.stress>=70?'bad':'s')}<small>70 이상이면 작업 속도 -30%. 95 이상으로 주를 넘기면 번아웃.</small></div><div><b>영감 ${r.inspiration}</b>${bar(r.inspiration,100,'i')}<small>기획에 20 필요. 높을수록 영감 폭발 확률 ↑ (현재 ${Math.round(dv.crit*100)}%)</small></div><div><b>주간 회복</b><small>스트레스 -${dv.recover}, 영감 +${dv.inspirationWeekly}${dv.bg.salary?`, 월급 +${dv.bg.salary} C`:''}, 임대료 -${dv.studio.rent} C</small></div></div></section>
 <section class="panel"><h2>휴식·취미</h2><div class="cards">${life}</div></section><section class="panel"><h2>부업 <small>종류별 주 1회</small></h2><div class="cards">${jobs}</div></section>`;
}

function recordPage(s,r,dv){
 const awards=r.awards.length?`<ul class="plain">${r.awards.map(a=>`<li>🏅 ${a.year}년차 ${esc(a.name)} — ${esc(a.work)}</li>`).join('')}</ul>`:'<p class="fine">연말 시상식에서 수상하면 여기에 기록돼요.</p>';
 const sc=G.scoreOf(r);
 return `<section class="panel"><h2>이번 회차 현황</h2><div class="ending-grid"><div><small>현재 점수</small><b>${num(sc.score)}</b></div><div><small>예상 유산</small><b>+${Math.max(1,Math.floor(sc.score/600))}</b></div><div><small>작품 평균 완성도</small><b>${sc.avgQ}</b></div><div><small>번아웃</small><b>${r.stats.burnouts}회</b></div><div><small>특성</small><b>${r.traits.map(t=>D.TRAITS.find(x=>x.id===t)?.name).join(', ')}</b></div><div><small>배경</small><b>${dv.bg.name}</b></div></div>
 <p class="fine">엔딩 조건(예): 전설 = 명성 4,000·명예의 전당 5 / 스타 = 팔로워 25,000 / 전업 = 코인 150,000 / 숨은 명장 = 평균 완성도 78·작품 6 / 취미 작가 = 평균 스트레스 30 이하</p>
 <div class="btns end"><button class="link danger" ${act({type:'retire'})} ${r.week<D.WEEKS_PER_YEAR?'disabled':''}>조기 은퇴 (엔딩 보기)${r.week<D.WEEKS_PER_YEAR?' · 1년차 이후':''}</button></div></section>
 <section class="panel"><h2>수상 기록</h2>${awards}</section>${trophyPanel(s)}${comboPanel(s)}
 <section class="panel"><h2>작가 일지 전체</h2><ul class="plain log-list">${r.log.map(l=>`<li>${esc(l)}</li>`).join('')}</ul></section>
 <p class="fine center">${accountLine()} · 테마 ${['violet','mint','sunset'].map(t=>`<button class="link" ${act({type:'theme',theme:t})}>${{violet:'라벤더',mint:'민트',sunset:'선셋'}[t]}</button>`).join(' ')}</p>`;
}

// ---------- 모달 ----------
function modals(s){
 const r=s?.run;
 if(r&&!r.ended&&r.queue?.length){const q=r.queue[0];let extra='';
  if(q.kind==='release')extra=`<div class="two"><div>${statBars(q.stats)}</div><ul class="plain reviews">${q.reviews.map(v=>`<li><b>${v.score}</b> ${esc(v.name)} — ${esc(v.line)}</li>`).join('')}</ul></div>`;
  if(q.kind==='awards')extra=q.awards.length?`<ul class="plain">${q.awards.map(a=>`<li>🏅 ${esc(a.name)} — ${esc(a.work)}</li>`).join('')}</ul>`:'';
  return `<div class="modal-back"><div class="modal ${q.kind}"><span class="tag">${{event:'이벤트',milestone:'제작 방향',release:'작품 공개',awards:'시상식'}[q.kind]}</span><h2>${esc(q.title)}</h2><p>${esc(q.text)}</p>${extra}<div class="options">${q.options.map((o,i)=>`<button class="${i===0?'primary':'secondary'}" ${act({type:'choose',option:i})}>${esc(o.label)}</button>`).join('')}</div></div></div>`;}
 if(modal==='report'&&r?.report){const rep=r.report;return `<div class="modal-back"><div class="modal report"><span class="tag">주간 리포트</span><h2>${esc(rep.calendar)}</h2><div class="ending-grid"><div><small>정산</small><b>+${num(rep.revenue)} C</b></div><div><small>임대료</small><b>-${num(rep.rent)} C</b></div>${rep.salary?`<div><small>월급</small><b>+${num(rep.salary)} C</b></div>`:''}<div><small>새 팔로워</small><b>+${num(rep.fans)}</b></div><div><small>총 대화</small><b>${num(rep.chats)}</b></div></div>
  ${rep.rows.length?`<table class="table"><tr><th>작품</th><th>신규</th><th>재방문</th><th>대화</th><th>수익</th><th>순위</th></tr>${rep.rows.map(x=>`<tr><td>${esc(x.title)}${x.promoted?' 📣':''}${x.trend?' 🔥':''}</td><td>${num(x.arrivals)}</td><td>${num(x.returning)}</td><td>${num(x.chats)}</td><td>${num(x.earned)}</td><td>${x.rank}위</td></tr>`).join('')}</table>`:'<p class="fine">연재 중인 작품이 없어 정산이 없었어요.</p>'}
  ${rep.events.length?`<ul class="plain">${rep.events.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}<h3>주간 TOP 5</h3><ol class="plain">${rep.ranking.slice(0,5).map(b=>`<li class="${b.rival?'':'mine'}">${b.rank}. ${esc(b.title)} <small>${esc(b.author)} · ${num(b.chats)}</small></li>`).join('')}</ol><div class="options"><button class="primary" data-close>확인</button></div></div></div>`;}
 return '';
}

// ---------- 이벤트 바인딩 ----------
document.addEventListener('click',async e=>{
 const b=e.target.closest('button,[data-page]');if(!b)return;
 if(b.dataset.act){const a=JSON.parse(b.dataset.act);if(a.type==='slot'){page='home';draftForm=null;openWork=null;}if(a.type==='endweek'){dispatch(a,()=>{modal='report';});return;}if(a.type==='retire'&&!confirm('정말 조기 은퇴할까요? 지금까지의 성과로 엔딩이 결정돼요.'))return;if(a.type==='scrap'&&!confirm('초안을 폐기할까요?'))return;dispatch(a);return;}
 if(b.dataset.page){page=b.dataset.page;modal=null;render();window.scrollTo(0,0);return;}
 if(b.dataset.open!==undefined){openWork=openWork===b.dataset.open?null:b.dataset.open;render();return;}
 if(b.dataset.modal){modal=b.dataset.modal;render();return;}
 if(b.hasAttribute('data-close')){modal=null;render();return;}
 if(b.dataset.bg){setupForm.background=b.dataset.bg;setupForm.name=$('#setup-name')?.value||setupForm.name;render();return;}
 if(b.dataset.trait){const max=G.has(profile(),'two_traits')?2:1;const t=b.dataset.trait;setupForm.name=$('#setup-name')?.value||setupForm.name;if(setupForm.traits.includes(t))setupForm.traits=setupForm.traits.filter(x=>x!==t);else{setupForm.traits.push(t);if(setupForm.traits.length>max)setupForm.traits.shift();}render();return;}
 if(b.hasAttribute('data-start')){setupForm.name=$('#setup-name')?.value.trim()||'';if(!setupForm.name)return toast('작가 이름을 입력해 주세요.');page='home';draftForm=null;dispatch({type:'newgame',name:setupForm.name,background:setupForm.background,traits:setupForm.traits,confirm:true});return;}
 if(b.hasAttribute('data-auth-toggle')){authMode=authMode==='register'?'login':'register';render();return;}
 if(b.hasAttribute('data-guest')){local=true;localStorage.setItem('crack-mode','local');save=await apiLoad();render();return;}
 if(b.hasAttribute('data-slot-close')){page='home';dispatch({type:'slot',op:'close'});return;}
 if(b.dataset.slotDelete!==undefined){if(!confirm(`슬롯 ${Number(b.dataset.slotDelete)+1}의 모든 기록(유산·도감·업적 포함)을 삭제할까요?`))return;dispatch({type:'slot',op:'delete',slot:Number(b.dataset.slotDelete),confirm:true});return;}
 if(b.hasAttribute('data-reset-all')){if(!confirm('모든 슬롯을 지우고 처음부터 시작할까요?')||!confirm('정말로요? 되돌릴 수 없어요.'))return;dispatch({type:'slot',op:'reset',confirm:true});return;}
 if(b.hasAttribute('data-logout')){if(local){localStorage.removeItem('crack-mode');local=MODE==='local';if(local)return;save=null;render();return;}try{await post('logout',{});}catch{}save=null;render();return;}
});
document.addEventListener('submit',async e=>{
 if(e.target.id==='auth-form'){e.preventDefault();const fd=new FormData(e.target);try{await post(authMode,{username:fd.get('username'),password:fd.get('password')});save=await apiLoad();render();}catch(err){toast(err.message);}return;}
 if(e.target.id==='draft-form'){e.preventDefault();const fd=new FormData(e.target);const a={type:'draft',title:fd.get('title'),genre:fd.get('genre'),subject:fd.get('subject'),format:fd.get('format'),cast:Number(fd.get('cast')),scale:fd.get('scale'),focus:fd.get('focus')};dispatch(a,()=>{draftForm=null;});return;}
});
document.addEventListener('input',e=>{const f=e.target.closest('#draft-form');if(!f||!draftForm)return;const fd=new FormData(f);draftForm={title:fd.get('title'),genre:fd.get('genre'),subject:fd.get('subject'),format:fd.get('format'),cast:Number(fd.get('cast')),scale:fd.get('scale'),focus:fd.get('focus')};if(e.target.name!=='title')render();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){modal=null;render();}});

// ---------- 도트 작업실 ----------
function drawOffice(){
 const canvas=$('#office');const s=profile();if(!canvas||!s?.run)return;const r=s.run;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
 const rect=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h);};
 const poly=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
 const pal=[['#8ecfc2','#7dbdaf','#d0a879','#ebd4ab'],['#b9c6e6','#a7b5d8','#c9b7a0','#e9dfcc'],['#c9d6b2','#b7c7a0','#d3b58c','#efe2c0'],['#d9c4ea','#c8b0dc','#cfb8a4','#f0e4d4'],['#f0d2b0','#e2c09b','#b3a08a','#e6dbd0']][r.studio];
 rect(0,0,480,260,pal[0]);for(let y=0;y<260;y+=12)for(let x=0;x<480;x+=12)rect(x+(y%24?6:0),y,2,2,pal[1]);
 poly([[30,112],[254,26],[456,109],[234,227]],'#486f5c');poly([[30,112],[234,204],[234,228],[30,136]],'#9c7150');poly([[234,204],[456,109],[456,133],[234,228]],'#b98c58');
 poly([[35,101],[252,16],[252,63],[35,152]],pal[2]);poly([[252,16],[449,95],[449,147],[252,63]],pal[3]);
 poly([[35,149],[252,62],[449,145],[231,239]],'#b99165');
 for(let row=0;row<10;row++)for(let col=0;col<10;col++){const x=252+(col-row)*20,y=66+(row+col)*8;poly([[x,y],[x+19,y+8],[x,y+16],[x-19,y+8]],(row+col)%2?'#e1c597':'#ebd4ab');}
 poly([[63,103],[129,77],[129,109],[63,137]],'#84664e');poly([[67,104],[125,82],[125,107],[67,131]],'#b9e5e5');poly([[91,94],[95,92],[95,120],[91,122]],'#fff4ce');
 if(r.studio>=1){poly([[286,42],[346,67],[346,95],[286,71]],'#85674e');poly([[291,49],[340,69],[340,89],[291,69]],'#b4dcdf');}
 const shelf=(x,y)=>{rect(x,y,35,35,'#765b43');rect(x+3,y+3,29,12,'#ad855d');rect(x+3,y+19,29,12,'#ad855d');['#88a47b','#d17969','#f3d489','#7caeb6','#9b91b1'].forEach((col,i)=>{rect(x+5+i*5,y+5,4,10,col);rect(x+4+i*5,y+21,4,9,col);});};shelf(190,52);if(r.studio>=2)shelf(365,101);
 const plant=(x,y)=>{rect(x-4,y,10,10,'#a95d49');rect(x,y-18,3,20,'#477c50');rect(x-9,y-15,9,7,'#5e9b61');rect(x+2,y-22,8,9,'#6caa67');rect(x-6,y-24,8,8,'#83b878');};
 if(r.items.includes('plant')||r.studio>=1)plant(53,156);if(r.studio>=2)plant(420,149);
 const person=(x,y,col,hair)=>{rect(x-5,y+17,5,5,'#514d4e');rect(x+3,y+17,5,5,'#514d4e');rect(x-6,y+3,14,15,col);rect(x-9,y+6,3,8,'#e8b98a');rect(x+8,y+6,3,8,'#e8b98a');rect(x-6,y-9,14,13,'#f5d1a0');rect(x-7,y-12,16,6,hair);rect(x-7,y-7,3,8,hair);rect(x+6,y-7,3,4,hair);rect(x-1,y-3,2,2,'#493d38');rect(x+5,y-3,2,2,'#493d38');rect(x+1,y+1,3,1,'#bc7968');};
 const desk=(x,y,col,hair,on)=>{poly([[x-26,y],[x+3,y-12],[x+34,y+1],[x+4,y+15]],'#876043');poly([[x-26,y-3],[x+3,y-15],[x+34,y-2],[x+4,y+12]],'#c9935c');rect(x-22,y+1,4,18,'#745842');rect(x+27,y+3,4,18,'#745842');rect(x-6,y-25,24,19,'#535c62');rect(x-3,y-22,18,12,on?'#a4d9b7':'#2f3a40');if(on){rect(x,y-20,10,2,'#e1f0c0');rect(x,y-16,13,2,'#5c9d91');}rect(x+4,y-6,4,5,'#6c7474');if(r.items.includes('monitor'))rect(x+14,y-27,12,14,'#535c62');person(x+3,y+18,col,hair);};
 const spots=[[164,118],[258,110],[133,165],[229,159],[320,150]];const dv=G.derive(s);const cols=[['#809bb6','#514249'],['#d18b65','#76513c'],['#a4ad6c','#654735'],['#b89bb5','#494451'],['#c98c9c','#3c3331']];
 for(let i=0;i<Math.min(5,dv.slots);i++)desk(spots[i][0],spots[i][1],cols[i][0],cols[i][1],!!r.drafts[i]);
 if(r.items.includes('cat')){rect(372,189,15,8,'#e7bc7c');rect(382,182,10,10,'#e7bc7c');rect(382,179,3,5,'#b3855d');rect(389,179,3,5,'#b3855d');rect(384,186,2,2,'#4c5545');rect(389,186,2,2,'#4c5545');rect(366,187,7,3,'#e7bc7c');}
 if(r.items.includes('bed')){poly([[325,160],[361,144],[388,155],[352,173]],'#7b9d81');poly([[325,160],[352,173],[352,184],[325,171]],'#547561');poly([[352,173],[388,155],[388,167],[352,184]],'#658e6f');}
 if(r.items.includes('coffee')){rect(300,120,10,14,'#4a4a52');rect(302,118,6,3,'#c9c9d1');rect(303,126,4,4,'#d9a066');}
 for(let i=0;i<Math.min(6,r.awards.length);i++){rect(150+i*8,70,5,8,'#f3d489');rect(151+i*8,78,3,2,'#b08b3a');}
 const stars=r.stats.hof;for(let i=0;i<Math.min(8,stars);i++)rect(380+(i%4)*10,50+Math.floor(i/4)*10,4,4,'#fff2a8');
}

// ---------- 시작 ----------
(async()=>{try{save=await apiLoad();}catch(e){toast(e.message);}render();})();
