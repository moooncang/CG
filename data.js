// 크랙 작가 키우기 — 게임 콘텐츠 데이터. 브라우저와 Node 양쪽에서 import 됩니다.
// 모든 수치·인물·플랫폼 반응은 게임용 시뮬레이션이며 실제 서비스 정책을 재현하지 않습니다.

export const WEEKS_PER_YEAR=48, WEEKS_PER_MONTH=4, CAREER_YEARS=3;

export const GENRES=[
 {id:'romance',name:'로맨스',icon:'♡',unlock:0,desc:'설렘과 관계의 진전이 핵심. 가장 넓은 독자층.'},
 {id:'fantasy',name:'판타지',icon:'☾',unlock:0,desc:'마법과 세계관. 설정이 탄탄할수록 빛난다.'},
 {id:'daily',name:'일상',icon:'☕',unlock:0,desc:'잔잔한 대화와 공감. 재방문율이 높다.'},
 {id:'comedy',name:'코미디',icon:'★',unlock:0,desc:'한 번 웃기면 공유가 터진다.'},
 {id:'mystery',name:'미스터리',icon:'?',unlock:0,desc:'단서와 추리. 몰입도가 높지만 설정 유지가 어렵다.'},
 {id:'sf',name:'SF',icon:'◈',unlock:3,desc:'기술과 미래. 기획 Lv.3에 해금.'},
 {id:'horror',name:'공포',icon:'☠',unlock:4,desc:'긴장과 공포. 기획 Lv.4에 해금.'},
 {id:'action',name:'액션',icon:'⚔',unlock:5,desc:'전투와 모험. 기획 Lv.5에 해금.'},
 {id:'drama',name:'드라마',icon:'♪',unlock:6,desc:'깊은 감정선. 기획 Lv.6에 해금.'},
 {id:'history',name:'역사',icon:'卍',unlock:7,desc:'고증과 서사. 기획 Lv.7에 해금.'},
];
export const SUBJECTS=[
 {id:'school',name:'학원',unlock:0},{id:'office',name:'직장',unlock:0},{id:'cafe',name:'카페',unlock:0},{id:'childhood',name:'소꿉친구',unlock:0},{id:'roommate',name:'동거',unlock:0},
 {id:'regression',name:'회귀',unlock:0},{id:'academy',name:'마법 아카데미',unlock:0},{id:'dungeon',name:'던전',unlock:2},{id:'space',name:'우주',unlock:2},{id:'zombie',name:'좀비',unlock:2},
 {id:'haunted',name:'폐가',unlock:3},{id:'palace',name:'왕궁',unlock:3},{id:'detective',name:'탐정 사무소',unlock:3},{id:'idol',name:'아이돌',unlock:3},{id:'gameworld',name:'게임 세계',unlock:4},
 {id:'villainess',name:'악역 영애',unlock:4},{id:'hunter',name:'헌터',unlock:5},{id:'murim',name:'무림',unlock:5},{id:'hospital',name:'병원',unlock:6},{id:'countryside',name:'시골',unlock:6},
];
// 장르×소재 궁합. 명시되지 않은 조합은 해시 기반 -1~+1. 발견하면 도감에 기록된다.
export const COMBO_OVERRIDES={
 'romance:school':2,'romance:childhood':2,'romance:office':1,'romance:villainess':2,'romance:zombie':-2,'romance:dungeon':-1,
 'fantasy:regression':2,'fantasy:academy':2,'fantasy:dungeon':2,'fantasy:hunter':1,'fantasy:office':-2,'fantasy:hospital':-1,
 'daily:cafe':2,'daily:roommate':2,'daily:countryside':2,'daily:zombie':-2,'daily:space':-1,'daily:murim':-2,
 'comedy:office':2,'comedy:idol':1,'comedy:gameworld':2,'comedy:haunted':1,'comedy:hospital':-2,
 'mystery:detective':2,'mystery:haunted':2,'mystery:palace':1,'mystery:cafe':-1,'mystery:idol':-2,
 'sf:space':2,'sf:gameworld':2,'sf:zombie':1,'sf:countryside':-2,'sf:murim':-2,'sf:palace':-1,
 'horror:haunted':2,'horror:zombie':2,'horror:hospital':2,'horror:cafe':-2,'horror:idol':-1,
 'action:hunter':2,'action:murim':2,'action:dungeon':2,'action:cafe':-2,'action:roommate':-2,
 'drama:hospital':2,'drama:idol':2,'drama:countryside':1,'drama:gameworld':-2,'drama:dungeon':-1,
 'history:palace':2,'history:murim':2,'history:countryside':1,'history:space':-2,'history:gameworld':-2,'history:idol':-2,
};
export const FORMATS=[
 {id:'single',name:'단일 캐릭터',desc:'한 명의 캐릭터와 깊은 대화. 설정 유지가 쉽다.',minCast:1,maxCast:1,unlock:0},
 {id:'multi',name:'다중 캐릭터',desc:'여러 인물이 등장. 몰입은 높지만 설정 유지가 어렵다.',minCast:2,maxCast:6,unlock:0},
 {id:'sim',name:'시뮬레이션',desc:'규칙과 상태가 있는 체험형. 작가 Lv.3에 해금.',minCast:1,maxCast:6,unlock:3},
 {id:'world',name:'세계관 시뮬',desc:'거대한 세계를 통째로. 작가 Lv.6 또는 유산 해금.',minCast:2,maxCast:8,unlock:6},
];
export const SCALES=[
 {id:'small',name:'소규모',desc:'빠르게 완성. 상한이 낮다.',progressMul:1.5,pointMul:0.85,cost:60},
 {id:'medium',name:'중규모',desc:'균형 잡힌 제작.',progressMul:1,pointMul:1,cost:120},
 {id:'large',name:'대규모',desc:'오래 걸리지만 걸작의 가능성.',progressMul:0.68,pointMul:1.25,cost:260},
];
export const STATS={immersion:'몰입',consistency:'설정 유지',visual:'비주얼',appeal:'매력'};
export const STAGES={
 concept:{name:'기획·서사',skill:'planning',stat:'immersion',icon:'✎'},
 prompt:{name:'프롬프트',skill:'prompt',stat:'consistency',icon:'⌘'},
 assets:{name:'이미지·연출',skill:'image',stat:'visual',icon:'▧'},
 packaging:{name:'소개·썸네일',skill:'design',stat:'appeal',icon:'▦'},
};
export const SKILLS={
 planning:{name:'기획',icon:'✎',desc:'서사와 세계관 설계. 장르·소재 해금.'},
 prompt:{name:'프롬프트',icon:'⌘',desc:'캐릭터의 말투와 설정 유지.'},
 image:{name:'이미지',icon:'▧',desc:'캐릭터 일러스트와 상황 연출.'},
 design:{name:'연출',icon:'▦',desc:'썸네일·소개·플레이 가이드.'},
 marketing:{name:'홍보',icon:'◎',desc:'유입 효율과 트렌드 감각.'},
};
export const BACKGROUNDS=[
 {id:'student',name:'대학생',desc:'시간은 많고 돈은 없다. 체력 110, 코인 900.',coins:900,energy:110,legacy:0},
 {id:'worker',name:'직장인 투잡',desc:'매주 월급 +260 C. 대신 체력 75.',coins:2600,energy:75,salary:260,legacy:0},
 {id:'dreamer',name:'전업 지망생',desc:'모든 것을 걸었다. 코인 1,600, 체력 100.',coins:1600,energy:100,legacy:0},
 {id:'illustrator',name:'프리랜서 일러스트레이터',desc:'이미지 Lv.3으로 시작. 코인 1,200.',coins:1200,energy:95,skills:{image:3},legacy:0},
 {id:'novelist',name:'전직 웹소설 작가',desc:'기획 Lv.3, 프롬프트 Lv.2, 팔로워 300. [유산 해금]',coins:1400,energy:95,skills:{planning:3,prompt:2},followers:300,legacy:3},
 {id:'rich',name:'금수저',desc:'코인 12,000과 오피스텔로 시작. [유산 해금]',coins:12000,energy:90,studio:2,legacy:5},
];
export const TRAITS=[
 {id:'owl',name:'야행성',desc:'최대 체력 +15. 작업 피로 +1.',legacy:0},
 {id:'steel',name:'멘탈갑',desc:'스트레스 증가량 -30%.',legacy:0},
 {id:'muse',name:'영감 체질',desc:'매주 영감 +12.',legacy:0},
 {id:'merchant',name:'상술꾼',desc:'정산 수익 +15%.',legacy:0},
 {id:'perfectionist',name:'완벽주의',desc:'작품 포인트 +15%, 진행 속도 -15%.',legacy:0},
 {id:'social',name:'인싸',desc:'팔로워 증가 +30%, 홍보 효과 +10%.',legacy:0},
 {id:'thrifty',name:'절약왕',desc:'모든 지출 -15%.',legacy:2},
 {id:'speedster',name:'속필',desc:'진행 속도 +25%, 포인트 -10%.',legacy:2},
 {id:'visualist',name:'비주얼 장인',desc:'비주얼 포인트 +25%.',legacy:2},
 {id:'lorekeeper',name:'설정 덕후',desc:'설정 유지 포인트 +20%, 다중 캐릭터 패널티 절반.',legacy:3},
 {id:'lucky',name:'럭키',desc:'영감 폭발 확률 +10%, 좋은 이벤트 확률 상승.',legacy:3},
 {id:'prolific',name:'다작왕',desc:'동시 제작 슬롯 +1.',legacy:4},
];
export const STUDIOS=[
 {id:0,name:'본가 내 방',rent:0,deposit:0,slots:1,energy:0,recover:0,desc:'시작은 여기서.'},
 {id:1,name:'원룸 작업실',rent:140,deposit:1500,slots:2,energy:5,recover:4,desc:'드디어 나만의 공간.'},
 {id:2,name:'오피스텔',rent:420,deposit:6000,slots:3,energy:12,recover:8,desc:'넓은 책상과 좋은 채광.'},
 {id:3,name:'크리에이터 스튜디오',rent:950,deposit:22000,slots:4,energy:22,recover:12,desc:'외주 비용 -20%.'},
 {id:4,name:'펜트하우스 스튜디오',rent:2200,deposit:80000,slots:5,energy:35,recover:18,desc:'명성 +3/주.'},
];
export const ITEMS=[
 {id:'chair',name:'인체공학 의자',price:1200,desc:'최대 체력 +10',effect:{energy:10}},
 {id:'coffee',name:'커피머신',price:1500,desc:'최대 체력 +8, 영감 +2/주',effect:{energy:8,inspiration:2}},
 {id:'monitor',name:'듀얼 모니터',price:2500,desc:'작업 진행 +3',effect:{progress:3}},
 {id:'tablet',name:'드로잉 태블릿',price:3000,desc:'비주얼 포인트 +25%',effect:{visualMul:0.25}},
 {id:'keyboard',name:'기계식 키보드',price:1800,desc:'설정 유지 포인트 +20%',effect:{consistencyMul:0.2}},
 {id:'notebook',name:'필사 노트',price:800,desc:'몰입 포인트 +20%',effect:{immersionMul:0.2}},
 {id:'plant',name:'몬스테라 화분',price:400,desc:'영감 +3/주',effect:{inspiration:3}},
 {id:'cat',name:'고양이 "치즈"',price:900,desc:'스트레스 회복 +6/주. 귀엽다.',effect:{recover:6}},
 {id:'booth',name:'방음 부스',price:4000,desc:'영감 폭발 확률 +6%',effect:{crit:0.06}},
 {id:'pc',name:'고성능 PC',price:6000,desc:'작업 진행 +5, 비주얼 포인트 +10%',effect:{progress:5,visualMul:0.1}},
 {id:'lamp',name:'무드 조명',price:600,desc:'매력 포인트 +15%',effect:{appealMul:0.15}},
 {id:'bed',name:'낮잠용 소파',price:2200,desc:'스트레스 회복 +8/주',effect:{recover:8}},
];
export const SUBSCRIPTIONS=[
 {id:'imagegen',name:'이미지 생성 툴 Pro',monthly:600,desc:'이미지 작업 비용 0, 비주얼 포인트 +15%'},
 {id:'model',name:'프리미엄 모델 패스',monthly:900,desc:'테스트 비용 절반, 공개 시 설정 유지 +6'},
 {id:'sns',name:'SNS 매니저',monthly:500,desc:'매주 최신작 SNS 홍보 자동 실행'},
 {id:'trend',name:'트렌드 리포트',monthly:300,desc:'다음 달 유행 장르·소재 미리 보기'},
];
export const HELPERS=[
 {id:'illust',name:'일러스트 외주',price:600,desc:'이미지·연출 진행 +40, 비주얼 포인트 +30',stage:'assets',progress:40,stat:'visual',points:30},
 {id:'beta',name:'베타 테스터 그룹',price:300,desc:'설정 유지 포인트 +18',stage:'prompt',progress:10,stat:'consistency',points:18},
 {id:'editor',name:'편집자 리뷰',price:400,desc:'소개·썸네일 진행 +40, 매력 포인트 +16',stage:'packaging',progress:40,stat:'appeal',points:16},
 {id:'consultant',name:'서사 컨설팅',price:500,desc:'기획 진행 +30, 몰입 포인트 +22',stage:'concept',progress:30,stat:'immersion',points:22},
];
export const JOBS=[
 {id:'store',name:'편의점 알바',energy:30,coins:180,stress:10,fame:0,desc:'확실한 수입. 체력 30.'},
 {id:'commission',name:'캐릭터 커미션',energy:25,coins:420,stress:8,fame:40,desc:'명성 40 필요. 이미지 경험치 +.',xp:'image'},
 {id:'promptjob',name:'프롬프트 외주',energy:25,coins:620,stress:9,fame:120,desc:'명성 120 필요. 프롬프트 경험치 +.',xp:'prompt'},
 {id:'lecture',name:'제작 강의',energy:20,coins:950,stress:6,fame:320,followers:40,desc:'명성 320 필요. 팔로워 +40.'},
 {id:'collab',name:'브랜드 콜라보',energy:30,coins:2400,stress:12,fame:800,followers:120,desc:'명성 800 필요. 팔로워 +120.'},
];
export const LIFE=[
 {id:'walk',name:'산책',energy:10,stress:-12,inspiration:12,desc:'비교는 잠시 내려두고. 스트레스 -12, 영감 +12'},
 {id:'read',name:'독서·감상',energy:12,stress:-4,inspiration:22,desc:'다른 작품에서 배운다. 영감 +22'},
 {id:'friends',name:'친구와 수다',energy:12,stress:-22,inspiration:4,desc:'스트레스 -22'},
 {id:'gym',name:'운동',energy:18,stress:-10,inspiration:4,energyMax:1,desc:'스트레스 -10, 가끔 최대 체력 +1'},
 {id:'nap',name:'푹 쉬기',energy:0,stress:-16,inspiration:0,desc:'체력 20을 쉬는 데 쓴다. 스트레스 -16'},
];
export const PROMOS=[
 {id:'sns',name:'SNS 홍보',coins:80,energy:8,mul:1.5,followers:0,desc:'유입 ×1.5'},
 {id:'event',name:'독자 이벤트',coins:250,energy:15,mul:1.8,followers:25,desc:'유입 ×1.8, 팔로워 +'},
 {id:'ad',name:'유료 광고',coins:450,energy:5,mul:2.3,followers:0,desc:'유입 ×2.3'},
];
export const REVIEWERS=[
 {id:'curator',name:'크랙 큐레이터 팀',weight:{immersion:.3,consistency:.3,visual:.2,appeal:.2}},
 {id:'guild',name:'프롬프트 장인 길드',weight:{immersion:.2,consistency:.55,visual:.05,appeal:.2}},
 {id:'readers',name:'독자 100인 투표',weight:{immersion:.35,consistency:.15,visual:.2,appeal:.3}},
 {id:'magazine',name:'월간 캐챗 매거진',weight:{immersion:.2,consistency:.15,visual:.4,appeal:.25}},
];
export const REVIEW_LINES={
 10:['역대급. 이 작품 하나로 플랫폼의 기준이 바뀌었다.','완벽에 가깝다. 다음 작품이 벌써 두렵다.'],
 9:['올해 최고의 캐릭터 중 하나.','대화를 멈출 수 없었다. 강력 추천.'],
 8:['탄탄하고 매력적이다. 팬이 될 수밖에.','몇 가지 아쉬움은 있지만 분명한 수작.'],
 7:['좋은 작품. 설정과 매력 모두 평균 이상.','편하게 추천할 수 있는 완성도.'],
 6:['무난하다. 특별한 한 방이 아쉽다.','나쁘지 않지만 기억에 남을지는 의문.'],
 5:['장점과 단점이 반반.','기본기는 있는데 다듬어지지 않았다.'],
 4:['설정이 자주 흔들린다. 업데이트가 필요하다.','썸네일을 보고 들어왔다가 금방 나갔다.'],
 3:['아직 공개할 단계가 아니었던 것 같다.','의욕은 보이지만 결과물이 따라오지 못했다.'],
 2:['같은 말만 반복한다. 다시 만들자.','5분을 넘기기 어려웠다.'],
 1:['이건... 테스트는 해보셨나요?','독자에게 사과해야 할 수준.'],
};
export const WEAK_LINES={immersion:'이야기에 끌어들이는 힘이 부족하다.',consistency:'캐릭터가 설정을 자꾸 잊는다.',visual:'상황 이미지와 연출이 밋밋하다.',appeal:'소개와 썸네일이 작품을 제대로 보여주지 못한다.'};
export const RIVAL_NAMES=['달빛공방','새벽연구소','코코넛스튜디오','밤하늘작가','민트라떼','솜사탕랩','구름제작소','벚꽃문학관','오로라팀','초코파이','은하수공방','레몬사탕','보라도마뱀','유리구슬','잿빛늑대','흰고래','딸기우유','검은고양이','파도소리','종이비행기','루나틱','설탕별','밀크티','모래시계','안개숲','네온사인'];
export const TITLE_ADJ=['차가운','달콤한','비밀스러운','마지막','첫 번째','잊혀진','붉은','푸른','수상한','다정한','불친절한','무뚝뚝한','위험한','조용한','반짝이는','고장 난','어둠의','황금빛','유일한','웃기는'];
export const TITLE_NOUN=['사서','기사단장','룸메이트','전학생','악당','탐정','우주선','마법사','카페 사장','선배','집사','의사','용병','영애','아이돌','회귀자','좀비','후배','황태자','상사'];
export const TITLE_TAIL=['','','','와의 동거','의 고백','을(를) 길들이는 법','과 보내는 여름','의 비밀','에게 고용되다','와 떠나는 여행','의 마지막 부탁'];

export const ENDINGS=[
 {id:'legend',name:'전설의 크리에이터',desc:'플랫폼 역사에 이름을 남겼다. 당신의 작품은 교과서가 되었다.',cond:'fame>=4000&&hof>=5'},
 {id:'star',name:'스타 작가',desc:'팔로워들이 당신의 다음 작품을 기다린다. 당신은 이제 브랜드다.',cond:'followers>=25000'},
 {id:'pro',name:'전업 창작자',desc:'창작만으로 먹고사는 데 성공했다. 통장이 그 증거다.',cond:'coins>=150000'},
 {id:'artisan',name:'숨은 명장',desc:'유명하진 않지만 아는 사람은 다 안다. 완성도가 당신의 서명이다.',cond:'avgQuality>=78&&works>=6'},
 {id:'burnout',name:'불꽃처럼',desc:'모든 것을 태웠다. 쉬어야 할 때다. 다음엔 조금 더 자신을 아끼자.',cond:'burnouts>=3'},
 {id:'hobbyist',name:'행복한 취미 작가',desc:'큰 성공은 없었지만 스트레스 없이 이야기를 즐겼다. 그걸로 충분하다.',cond:'avgStress<=30&&works>=4'},
 {id:'rookie',name:'아직 끝나지 않은 이야기',desc:'기록은 남았고 경험도 쌓였다. 다음 회차가 진짜 시작이다.',cond:'true'},
];
export const LEGACY_SHOP=[
 {id:'bg_novelist',name:'배경: 전직 웹소설 작가',cost:3,desc:'기획 Lv.3·프롬프트 Lv.2·팔로워 300으로 시작'},
 {id:'bg_rich',name:'배경: 금수저',cost:5,desc:'코인 12,000·오피스텔로 시작'},
 {id:'tr_thrifty',name:'특성: 절약왕',cost:2,desc:'모든 지출 -15%'},
 {id:'tr_speedster',name:'특성: 속필',cost:2,desc:'진행 속도 +25%'},
 {id:'tr_visualist',name:'특성: 비주얼 장인',cost:2,desc:'비주얼 포인트 +25%'},
 {id:'tr_lorekeeper',name:'특성: 설정 덕후',cost:3,desc:'설정 유지 포인트 +20%'},
 {id:'tr_lucky',name:'특성: 럭키',cost:3,desc:'영감 폭발 +10%'},
 {id:'tr_prolific',name:'특성: 다작왕',cost:4,desc:'제작 슬롯 +1'},
 {id:'two_traits',name:'특성 2개 선택',cost:4,desc:'새 회차에서 특성을 2개 고를 수 있다'},
 {id:'start_coins',name:'선배의 통장',cost:2,desc:'매 회차 시작 코인 +2,000'},
 {id:'start_skill',name:'선배의 노트',cost:3,desc:'매 회차 모든 역량 +1'},
 {id:'start_fans',name:'팬클럽 계승',cost:3,desc:'매 회차 팔로워 +500'},
 {id:'world_format',name:'세계관 시뮬 조기 해금',cost:3,desc:'레벨 조건 없이 세계관 시뮬 제작'},
 {id:'all_genres',name:'장르 올패스',cost:4,desc:'모든 장르·소재를 처음부터 사용'},
 {id:'long_career',name:'경력 연장',cost:5,desc:'회차 길이 3년 → 5년'},
];
export const TROPHIES=[
 {id:'first',name:'데뷔',desc:'첫 작품 공개'},
 {id:'hof',name:'명예의 전당',desc:'평가 합계 32점 이상 작품'},
 {id:'perfect',name:'만점의 전설',desc:'평가 합계 40점'},
 {id:'works10',name:'다작가',desc:'작품 10개 공개'},
 {id:'fans1k',name:'천 명의 팬',desc:'팔로워 1,000명'},
 {id:'fans10k',name:'만 명의 팬',desc:'팔로워 10,000명'},
 {id:'weekly1',name:'주간 1위',desc:'주간 랭킹 1위'},
 {id:'monthly1',name:'이달의 작가',desc:'월간 랭킹 1위'},
 {id:'award',name:'트로피 수집가',desc:'연말 시상식 수상'},
 {id:'rich',name:'부자 작가',desc:'코인 50,000 보유'},
 {id:'combos5',name:'궁합 탐험가',desc:'최고 궁합 조합 5개 발견'},
 {id:'allgenre',name:'장르 올라운더',desc:'7개 이상 장르로 작품 공개'},
 {id:'survivor',name:'번아웃 생존자',desc:'번아웃 후에도 명예의 전당 입성'},
 {id:'season',name:'시즌 2',desc:'리메이크로 작품 부활'},
 {id:'studio4',name:'펜트하우스',desc:'최고 작업실 입주'},
 {id:'endings3',name:'다회차 작가',desc:'엔딩 3종 수집'},
 {id:'zero',name:'파산 위기',desc:'코인 0 이하 경험 후 회복'},
 {id:'collab',name:'협업의 달인',desc:'라이벌과 콜라보 성공'},
];

// 이벤트: cond는 (run)=>boolean 문자열 대신 간단한 태그로. weight 높을수록 자주.
export const EVENTS=[
 {id:'fanart',title:'팬아트가 도착했다',text:'한 독자가 당신의 캐릭터를 그려 보냈다. 눈물 날 정도로 예쁘다.',weight:3,need:'published',options:[
  {label:'SNS에 자랑한다',effects:{followers:30,stress:-8,inspiration:8},log:'팬아트를 공유하자 팔로워가 늘었다.'},
  {label:'조용히 간직한다',effects:{stress:-15,inspiration:12},log:'마음속 보물창고에 넣어뒀다.'}]},
 {id:'troll',title:'악플러 등장',text:'"이게 왜 인기임? 설정 다 틀렸는데 ㅋㅋ" 댓글이 달렸다. 손이 떨린다.',weight:3,need:'published',options:[
  {label:'정중하게 답글을 단다',effects:{stress:8,followers:15,fame:5},log:'성숙한 대응에 독자들이 응원을 보냈다.'},
  {label:'차단하고 잊는다',effects:{stress:4},log:'차단. 끝.'},
  {label:'밤새 반박글을 쓴다',effects:{stress:22,followers:-10,inspiration:-5},log:'다음 날 후회했다.'}]},
 {id:'policy_up',title:'플랫폼 정산 정책 변경',text:'크리에이터 정산 비율이 상향됐다는 공지가 떴다. 4주간 수익 +25%.',weight:1,options:[
  {label:'좋은 소식!',effects:{rateMod:{mul:1.25,weeks:4}},log:'정산 비율 상향. 4주간 수익 +25%'}]},
 {id:'policy_down',title:'플랫폼 서버 비용 상승',text:'정산 비율이 한시적으로 하향된다는 공지. 4주간 수익 -20%.',weight:1,options:[
  {label:'버티자...',effects:{rateMod:{mul:0.8,weeks:4},stress:5},log:'정산 비율 하향. 4주간 수익 -20%'}]},
 {id:'maintenance',title:'긴급 서버 점검',text:'플랫폼이 이틀간 멈췄다. 이번 주 유입이 크게 줄어든다.',weight:2,options:[
  {label:'이 틈에 작업한다',effects:{reachMod:{mul:0.6,weeks:1},inspiration:6},log:'점검 기간 동안 조용히 작업했다.'}]},
 {id:'boom',title:'장르 붐!',text:'커뮤니티에서 {trendGenre} 장르가 폭발적인 화제다. 이번 달 유행이 더 강해진다.',weight:2,options:[
  {label:'흐름을 탄다',effects:{trendBoost:2},log:'유행 장르의 유입 효과가 2배로.'}]},
 {id:'burnout_warn',title:'손목이 아프다',text:'며칠째 손목이 저리다. 몸이 보내는 신호다.',weight:3,need:'stress60',options:[
  {label:'병원에 간다 (-200 C)',effects:{coins:-200,stress:-25},log:'치료받고 한결 가벼워졌다.'},
  {label:'파스 붙이고 계속한다',effects:{stress:10,inspiration:-4},log:'...괜찮을 거야.'}]},
 {id:'contest',title:'플랫폼 창작 공모전 공지',text:'"이달의 신작 공모전" 공지. 이번 달 공개한 작품의 유입이 +40%, 1위는 상금 3,000 C.',weight:2,options:[
  {label:'참가한다',effects:{contest:1},log:'공모전 참가! 이번 달 공개작 유입 +40%.'},
  {label:'내 페이스대로 간다',effects:{stress:-3},log:'조급해하지 않기로 했다.'}]},
 {id:'mentor',title:'선배 작가의 DM',text:'유명 작가가 당신 작품을 봤다며 조언을 해주겠다고 한다.',weight:2,need:'published',options:[
  {label:'프롬프트를 배운다',effects:{skillXp:{prompt:70},stress:3},log:'프롬프트 경험치가 크게 올랐다.'},
  {label:'기획 비법을 듣는다',effects:{skillXp:{planning:70},stress:3},log:'기획 경험치가 크게 올랐다.'},
  {label:'홍보 노하우를 묻는다',effects:{skillXp:{marketing:70},stress:3},log:'홍보 경험치가 크게 올랐다.'}]},
 {id:'viral',title:'짤이 돌고 있다',text:'당신 캐릭터의 대사 캡처가 커뮤니티에서 밈이 됐다.',weight:2,need:'published',options:[
  {label:'공식 짤을 추가로 뿌린다',effects:{followers:120,fame:30,stress:5},log:'밈을 타고 팔로워가 급증했다.'},
  {label:'모른 척 작업한다',effects:{followers:50,inspiration:5},log:'조용히 미소지었다.'}]},
 {id:'plagiarism',title:'표절 시비',text:'누군가 당신 작품이 자기 작품과 비슷하다며 글을 올렸다. 사실이 아니다.',weight:1,need:'published',options:[
  {label:'제작 기록을 공개한다',effects:{stress:10,fame:15,followers:20},log:'기록을 공개하자 여론이 돌아섰다.'},
  {label:'무시한다',effects:{stress:6,fame:-10},log:'소문은 천천히 가라앉았다.'}]},
 {id:'friend_visit',title:'친구가 놀러 왔다',text:'"야 요즘 뭐 만들어? 보여줘!" 치킨을 들고 친구가 왔다.',weight:3,options:[
  {label:'밤새 논다',effects:{stress:-25,energy:-20,inspiration:6},log:'즐거운 밤. 체력은 조금 소모.'},
  {label:'작품을 테스트시킨다',effects:{stress:-8,draftPoints:{consistency:8}},log:'친구가 설정 구멍을 찾아줬다.'}]},
 {id:'laptop',title:'노트북이 고장났다',text:'작업 중 화면이 꺼졌다. 수리비가 필요하다.',weight:2,options:[
  {label:'수리한다 (-350 C)',effects:{coins:-350,stress:5},log:'수리 완료.'},
  {label:'중고로 때운다 (-120 C)',effects:{coins:-120,stress:12,progressMod:{mul:0.8,weeks:2}},log:'느린 노트북. 2주간 작업 속도 -20%.'}]},
 {id:'rival_collab',title:'라이벌의 제안',text:'{rival} 작가가 콜라보 작품을 제안했다. 비용은 반반, 팬도 반반.',weight:2,need:'fame150',options:[
  {label:'수락한다 (-500 C)',effects:{coins:-500,followers:260,fame:60,trophy:'collab',stress:8},log:'콜라보 성공! 서로의 팬이 섞였다.'},
  {label:'정중히 거절한다',effects:{stress:-2},log:'아직은 혼자 가고 싶다.'}]},
 {id:'insomnia',title:'잠이 안 온다',text:'캐릭터의 다음 대사가 머릿속을 맴돈다.',weight:3,options:[
  {label:'일어나서 적는다',effects:{inspiration:18,stress:6,energy:-10},log:'새벽 3시의 영감.'},
  {label:'억지로 잔다',effects:{stress:-6},log:'아침엔 잊어버렸다.'}]},
 {id:'cafe_idea',title:'카페에서 엿들은 대화',text:'옆자리 커플의 대화가 너무 드라마틱하다. 메모하고 싶다.',weight:3,options:[
  {label:'몰래 메모한다',effects:{inspiration:20},log:'영감이 샘솟는다.'}]},
 {id:'bad_update',title:'플랫폼 모델 업데이트',text:'AI 모델이 바뀌면서 공개작 일부의 말투가 흔들린다는 제보.',weight:2,need:'published',options:[
  {label:'긴급 점검한다 (체력 -20)',effects:{energy:-20,workPoints:{consistency:4},stress:8},log:'공개작 설정을 보강했다.'},
  {label:'일단 지켜본다',effects:{workPoints:{consistency:-6}},log:'일부 작품의 설정 유지가 떨어졌다.'}]},
 {id:'sponsor',title:'협찬 제안',text:'한 브랜드가 작품 안에 자연스럽게 제품을 녹여달라고 한다.',weight:1,need:'fame300',options:[
  {label:'받는다 (+1,500 C)',effects:{coins:1500,fame:-20,followers:-30},log:'통장은 두둑, 팬들은 살짝 실망.'},
  {label:'거절한다',effects:{fame:25},log:'창작의 순수성을 지켰다.'}]},
 {id:'gift',title:'팬의 선물',text:'팬이 커피 기프티콘을 잔뜩 보냈다.',weight:3,need:'fans500',options:[
  {label:'감사 인사',effects:{coins:150,stress:-10,followers:10},log:'따뜻한 마음.'}]},
 {id:'tax',title:'세금 신고 시즌',text:'정산 수익에 대한 세금 신고 기간이다.',weight:1,need:'rich',options:[
  {label:'성실 신고 (-수익의 8%)',effects:{coinsPct:-0.08,stress:4},log:'성실히 납부했다.'},
  {label:'세무사 고용 (-600 C)',effects:{coins:-600,stress:-2},log:'전문가에게 맡겼다.'}]},
 {id:'cat_disturb',title:'고양이가 키보드 위에',text:'치즈가 키보드에 앉아 프롬프트에 "ㅁㄴㅇㄹ"를 입력했다.',weight:3,need:'cat',options:[
  {label:'귀여우니까 용서',effects:{stress:-14,draftPoints:{consistency:-3}},log:'프롬프트에 발자국이 남았다.'}]},
 {id:'trend_shift',title:'트렌드 급변',text:'갑자기 다른 소재가 유행하기 시작했다.',weight:2,options:[
  {label:'그렇구나',effects:{reroll:1},log:'유행이 바뀌었다.'}]},
 {id:'free_ad',title:'플랫폼 메인 노출',text:'당신의 최신작이 플랫폼 메인 추천에 걸렸다!',weight:1,need:'published',options:[
  {label:'기회다!',effects:{reachMod:{mul:1.8,weeks:1},followers:60,fame:20},log:'메인 노출로 유입 폭증.'}]},
 {id:'copycat',title:'아류작 범람',text:'당신 작품을 따라 한 비슷한 작품들이 쏟아진다.',weight:2,need:'fame300',options:[
  {label:'원조의 품격을 보여준다',effects:{fame:30,stress:6},log:'원조는 원조다.'},
  {label:'신경 쓰지 않는다',effects:{stress:-4},log:'내 길을 간다.'}]},
 {id:'guild_invite',title:'제작자 길드 초대',text:'프롬프트 장인 길드에서 가입을 권유한다. 정보 교류가 가능하다.',weight:1,need:'fame150',options:[
  {label:'가입한다',effects:{skillXp:{prompt:40,planning:40},guild:1},log:'길드 가입. 역량 경험치 획득.'},
  {label:'사양한다',effects:{},log:'독고다이.'}]},
 {id:'lottery',title:'경품 당첨',text:'플랫폼 이벤트에서 경품에 당첨됐다.',weight:1,options:[
  {label:'받는다',effects:{coins:800,stress:-5},log:'횡재!'}]},
 {id:'cold',title:'감기 걸림',text:'콧물이 멈추지 않는다.',weight:2,options:[
  {label:'약 먹고 쉰다',effects:{energy:-30,stress:-5},log:'이번 주 체력 -30.'},
  {label:'강행한다',effects:{stress:15,progressMod:{mul:0.75,weeks:1}},log:'몽롱한 상태로 작업.'}]},
 {id:'reader_letter',title:'긴 편지',text:'한 독자가 당신 작품 덕에 힘든 시기를 버텼다고 편지를 보냈다.',weight:2,need:'published',options:[
  {label:'눈물을 닦는다',effects:{stress:-20,inspiration:15,fame:5},log:'이래서 만든다.'}]},
 {id:'offer_publish',title:'출판사의 제안',text:'당신의 세계관을 소설·굿즈로 확장하자는 제안이 왔다.',weight:1,need:'fame800',options:[
  {label:'계약한다 (+5,000 C)',effects:{coins:5000,fame:80,flag:'publisher'},log:'IP 확장 계약 체결!'},
  {label:'아직은 이르다',effects:{fame:10},log:'다음을 기약했다.'}]},
 {id:'rival_hit',title:'라이벌의 대히트',text:'{rival} 작가의 신작이 차트를 휩쓸고 있다. 질투와 존경이 동시에.',weight:2,options:[
  {label:'분석한다',effects:{skillXp:{marketing:35},inspiration:8},log:'성공 요인을 분석했다.'},
  {label:'신경 끈다',effects:{stress:-4},log:'남은 남, 나는 나.'}]},
 {id:'ai_tool',title:'새 제작 도구 출시',text:'무료 체험 기간이라 이번 주 이미지 작업이 공짜다.',weight:2,options:[
  {label:'이용한다',effects:{freeAssets:1,inspiration:4},log:'이번 주 이미지 작업 비용 0.'}]},
 {id:'workshop',title:'제작 워크숍',text:'플랫폼 공식 워크숍 참가권이 왔다. 참가비 400 C.',weight:2,options:[
  {label:'참가 (-400 C)',effects:{coins:-400,skillXp:{design:60,marketing:30}},log:'연출·홍보 경험치 획득.'},
  {label:'패스',effects:{},log:'다음 기회에.'}]},
 {id:'moving_pain',title:'층간 소음',text:'위층 공사 소음으로 집중이 안 된다.',weight:2,options:[
  {label:'카페로 피신 (-120 C)',effects:{coins:-120,inspiration:6},log:'카페에서 작업했다.'},
  {label:'이어폰으로 버틴다',effects:{stress:9},log:'드르륵... 드르륵...'}]},
 {id:'fan_meeting',title:'팬미팅 요청',text:'팬들이 소규모 팬미팅을 열어달라고 한다.',weight:1,need:'fans2000',options:[
  {label:'연다 (체력 -25)',effects:{energy:-25,followers:200,fame:40,stress:10},log:'팬미팅 성료!'},
  {label:'온라인으로 대체',effects:{followers:80,fame:15},log:'온라인 팬미팅.'}]},
 {id:'donation',title:'후원금',text:'팬들이 창작 후원금을 모아 보냈다.',weight:2,need:'fans1000',options:[
  {label:'감사히 받는다',effects:{coins:1200,stress:-6},log:'후원 감사합니다!'}]},
];
