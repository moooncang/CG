import { randomBytes } from 'node:crypto';
export const genres=['로맨스','판타지','일상','미스터리','SF'];
export const stages={concept:{name:'기획·시작 설정',skill:'genre'},prompt:{name:'프롬프트·압축',skill:'prompt'},assets:{name:'이미지·상황 코드',skill:'image'},packaging:{name:'썸네일·소개·가이드',skill:'design'}};
const prices={genre:250,image:300,prompt:350,design:200};
const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
export const initial=()=>({version:2,day:1,coins:1200,energy:100,stress:0,xp:0,followers:0,skills:{genre:1,image:1,prompt:1,design:1},drafts:[],bots:[],theme:'violet',report:null,log:['첫 초안을 만들고, 비공개 테스트로 이야기를 다듬어 보세요.']});
export function migrate(s){s.version=2;s.drafts??=[];s.stress??=0;s.report??=null;for(const b of s.bots){b.metrics??={immersion:b.quality,stability:b.quality,visual:b.quality,appeal:b.quality};b.plays??=b.readers;b.active??=Math.round(b.readers*.2);b.retention??=Math.round(b.quality*.7);b.likes??=Math.round(b.readers*.08);b.updates??=0;b.feedback??=['기존 작품의 독자 지표를 이어받았어요.'];b.lastUpdated??=b.day;b.promotedDay??=0;}return s;}
export function assess(s,d){const p=d.progress;const load=(d.cast-1)*7+(d.format==='simulation'?12:0)+Math.max(0,d.images-s.skills.image*2)*3;return {immersion:clamp(Math.round(18+p.concept*.55+s.skills.genre*3-load*.3)),stability:clamp(Math.round(16+p.prompt*.5+s.skills.prompt*4+d.tests*4-load)),visual:clamp(Math.round(12+p.assets*.5+s.skills.image*4+Math.min(d.images,12)*1.5)),appeal:clamp(Math.round(15+p.packaging*.55+s.skills.design*4))};}
function feedback(b){const m=b.metrics;return [m.stability<55?'설정이 흔들리거나 같은 말투가 반복돼요. 프롬프트를 다듬어 주세요.':'캐릭터의 말투와 설정이 안정적이에요.',m.visual<55?'상황에 맞는 이미지가 더 있으면 좋겠어요.':'상황 이미지 덕분에 몰입하기 좋아요.',m.appeal<55?'소개에서 어떤 이야기인지 조금 더 알려 주세요.':'소개와 시작 상황이 이해하기 쉬워요.'];}
function spend(s,coins,energy){if(s.coins<coins||s.energy<energy)throw Error('코인 또는 에너지가 부족해요.');s.coins-=coins;s.energy-=energy;}
function findDraft(s,id){const d=s.drafts.find(d=>d.id===id);if(!d)throw Error('초안을 찾을 수 없어요.');return d;}
function findBot(s,id){const b=s.bots.find(b=>b.id===id);if(!b)throw Error('작품을 찾을 수 없어요.');return b;}
export function act(s,a){migrate(s);
 if(a.type==='draft'){
 const title=String(a.title||'').trim(),prompt=String(a.prompt||'').trim(),intro=String(a.intro||'').trim(),guide=String(a.guide||'').trim(),images=Number(a.images),cast=Number(a.cast),index=genres.indexOf(a.genre);
 if(s.drafts.length>=6)throw Error('초안은 최대 6개까지 보관할 수 있어요.');
 if(!title||title.length>40||prompt.length<30||prompt.length>2000||intro.length<10||intro.length>500||guide.length<10||guide.length>500)throw Error('제목 1~40자, 프롬프트 30~2,000자, 시작 설정과 가이드 각각 10~500자를 입력해 주세요.');
 if(index<0||index>=s.skills.genre+1)throw Error('장르 이해도를 높이면 열리는 장르예요.');
 if(!Number.isInteger(images)||images<1||images>s.skills.image*4||!Number.isInteger(cast)||cast<1||cast>6||!['character','simulation'].includes(a.format))throw Error('작품 규모 설정을 확인해 주세요.');
 spend(s,60,5);s.drafts.unshift({id:randomBytes(8).toString('hex'),title,prompt,intro,guide,genre:a.genre,images,cast,format:a.format,progress:{concept:0,prompt:0,assets:0,packaging:0},tests:0,testedRevision:-1,revision:0,notes:[]});s.log.unshift(`「${title}」 초안 저장 · 공개 전 제작을 시작해요.`);
 }else if(a.type==='work'){
 const d=findDraft(s,a.id);if(!Object.hasOwn(stages,a.stage))throw Error('잘못된 제작 공정이에요.');if(d.progress[a.stage]>=100)throw Error('완료한 공정이에요.');
 spend(s,a.stage==='assets'?20+d.images*8:25,15);const gain=Math.max(10,Math.round(24+s.skills[stages[a.stage].skill]*5-s.stress*.12-(a.stage==='assets'?d.images:0)));
 d.progress[a.stage]=Math.min(100,d.progress[a.stage]+gain);d.revision++;s.stress=clamp(s.stress+6);s.xp+=8;s.log.unshift(`${stages[a.stage].name} 진행 · ${d.progress[a.stage]}% (진척은 역량·규모·피로에 영향받아요)`);
 }else if(a.type==='test'){
 const d=findDraft(s,a.id);if(Object.values(d.progress).some(v=>v<25))throw Error('모든 공정을 25% 이상 준비한 뒤 테스트해 주세요.');if(d.testedRevision===d.revision)throw Error('테스트 결과를 반영해 작업한 뒤 다시 테스트해 주세요.');spend(s,40,10);d.tests++;d.testedRevision=d.revision;const m=assess(s,d);d.notes=[`설정 유지 ${m.stability}/100 · ${m.stability<55?'등장인물·규칙이 현재 역량보다 복잡해요. 프롬프트 훈련과 작업이 필요해요.':'설정 유지가 안정적이에요.'}`,`상황 이미지 ${m.visual}/100 · ${m.visual<55?'이미지·상황 코드 공정을 더 다듬어 주세요.':'이미지 준비가 양호해요.'}`,`첫인상 ${m.appeal}/100 · ${m.appeal<55?'썸네일·소개·가이드를 보완해 주세요.':'진입 안내가 잘 준비됐어요.'}`];s.log.unshift(`「${d.title}」 비공개 테스트 완료 · 보고서를 확인하세요.`);
 }else if(a.type==='publish'){
 const d=findDraft(s,a.id);if(Object.values(d.progress).some(v=>v<60)||!d.tests||d.testedRevision!==d.revision)throw Error('모든 공정 60% 이상, 마지막 작업 후 테스트가 필요해요.');spend(s,0,10);const metrics=assess(s,d),quality=Math.round(Object.values(metrics).reduce((a,b)=>a+b)/4);s.bots.unshift({...d,metrics,quality,day:s.day,lastUpdated:s.day,readers:0,plays:0,active:0,likes:0,retention:0,revenue:0,updates:0,promotedDay:0,feedback:['신작 공개! 다음 날 첫 독자 반응이 도착해요.']});s.drafts=s.drafts.filter(x=>x.id!==d.id);s.xp+=50;s.log.unshift(`「${d.title}」 공개 · 독자 반응과 정산은 다음 날 도착합니다.`);
 }else if(a.type==='promote'){
 const b=findBot(s,a.id);if(b.promotedDay===s.day)throw Error('이 작품은 오늘 이미 홍보했어요.');spend(s,60,10);b.promotedDay=s.day;s.stress=clamp(s.stress+5);s.log.unshift(`「${b.title}」 소개글 홍보 · 다음 정산 때 유입이 늘어나요.`);
 }else if(a.type==='update'){
 const b=findBot(s,a.id);if(b.updateDay===s.day)throw Error('이 작품은 오늘 이미 업데이트했어요.');if(!Object.hasOwn(stages,a.stage))throw Error('개선할 공정을 선택하세요.');const key={concept:'immersion',prompt:'stability',assets:'visual',packaging:'appeal'}[a.stage];if(b.metrics[key]>=100)throw Error('이미 충분히 다듬어진 항목이에요.');spend(s,80,20);b.metrics[key]=clamp(b.metrics[key]+6+s.skills[stages[a.stage].skill]);b.quality=Math.round(Object.values(b.metrics).reduce((a,b)=>a+b)/4);b.updates++;b.updateDay=s.day;b.lastUpdated=s.day;s.stress=clamp(s.stress+8);s.xp+=15;b.feedback=feedback(b);s.log.unshift(`「${b.title}」 ${stages[a.stage].name} 업데이트 · 기존 독자는 유지돼요.`);
 }else if(a.type==='rest'){
 const rows=[];let revenue=0,newFans=0;for(const b of s.bots){const m=b.metrics;const fresh=1/(1+Math.max(0,s.day-b.lastUpdated)*.25);const promoted=b.promotedDay===s.day;const trend=genres[(s.day-1)%genres.length]===b.genre?1.25:1;const reach=Math.round((50+Math.sqrt(s.followers)*8+(promoted?130:0))*fresh*trend);const arrivals=Math.round(reach*(.08+m.appeal/250));b.retention=clamp(Math.round(m.immersion*.43+m.stability*.47),5,90);const returning=Math.round(b.active*b.retention/100);b.active=arrivals+returning;const chats=Math.round(b.active*(1+m.immersion/25));const earned=Math.round(chats*.35);const fans=Math.round(arrivals*(m.stability+m.immersion)/1800);b.readers+=arrivals;b.plays+=chats;b.likes+=Math.round(arrivals*b.quality/1000);b.revenue+=earned;b.feedback=feedback(b);revenue+=earned;newFans+=fans;rows.push({id:b.id,title:b.title,reach,arrivals,returning,chats,earned,retention:b.retention,promoted});}
 s.coins+=revenue;s.followers+=newFans;s.report={day:s.day,revenue,newFans,rows};s.day++;s.energy=100;s.stress=Math.max(0,s.stress-22);s.log.unshift(`${s.day}일차 · 대화 정산 +${revenue} C / 새 팬 ${newFans}명 · 피로 회복`);
 }else if(a.type==='gig'){if(s.gigDay===s.day)throw Error('오늘 의뢰는 이미 완료했어요.');spend(s,0,20);s.coins+=120;s.gigDay=s.day;s.stress=clamp(s.stress+8);s.log.unshift('소규모 의뢰 완료 · 제작 자금 +120 C');
 }else if(a.type==='recover'){if(s.recoveredDay===s.day)throw Error('오늘은 이미 산책했어요.');spend(s,0,10);s.stress=Math.max(0,s.stress-25);s.recoveredDay=s.day;s.log.unshift('비교는 잠깐 내려놓고 산책했어요. 작업 피로 -25');
 }else if(a.type==='train'){if(!Object.hasOwn(prices,a.skill))throw Error('알 수 없는 역량이에요.');const level=s.skills[a.skill];if(level>=10)throw Error('최고 레벨에 도달했어요.');spend(s,prices[a.skill]*level,15);s.skills[a.skill]++;s.xp+=25;s.log.unshift('역량 훈련 완료! 제작 속도와 작품 완성도가 높아져요.');
 }else if(a.type==='theme'){if(!['violet','mint','sunset'].includes(a.theme))throw Error('잘못된 테마예요.');if(a.theme!=='violet'&&s.skills.design<2)throw Error('홈페이지 꾸미기 Lv.2에 열려요.');s.theme=a.theme;
 }else throw Error('알 수 없는 행동이에요.');
 s.log=s.log.slice(0,12);return s;
}
