// 크랙 작가 키우기 — 콘텐츠 데이터 (v3: 크랙 제작자 생태계 기반 재설계)
// 실제 서비스의 공개 정책(크리에이터 미션, 크랙 온리, 크랙 오리지널, 월 정산, 운영 정책)을 참고한 게임용 재해석입니다.
// 수치·독자 반응·정산액은 모두 시뮬레이션이며 실제 플랫폼과 제휴하지 않습니다.

export const WEEKS_PER_YEAR=48, WEEKS_PER_MONTH=4, CAREER_YEARS=3;
export const WON_PER_CRACKER=35;            // 크래커 1개의 원화 환산(게임용)
export const SETTLE_RATE={base:0.015,only:0.025,original:0.025}; // 크래커 사용액 대비 정산 비율
export const GIFT_RATE={creator:0.9,normal:0.7};
export const CASHOUT_MIN=10000;
export const CREATOR_REQ={works:10,players:1000,followers:500,messages:100000};

// 보통은 기존 수치 그대로. 운영 여유, 제작 스탯 성장과 공모전 경쟁 강도를 조절한다.
export const DIFFICULTIES=[
 {id:'easy',name:'쉬움',symbol:'heart',desc:'제작과 성장에 집중',startMoney:1.4,energy:15,stress:0.8,reach:1.2,rival:0.85,stats:1.2,contest:0.9},
 {id:'normal',name:'보통',symbol:'book',desc:'기존 게임의 기준 난이도',startMoney:1,energy:0,stress:1,reach:1,rival:1,stats:1,contest:1},
 {id:'hard',name:'어려움',symbol:'sword',desc:'자금과 휴식 계획이 중요',startMoney:0.85,energy:-5,stress:1.25,reach:0.9,rival:1.15,stats:0.9,contest:1.08},
 {id:'legend',name:'레전드',symbol:'trophy',desc:'적은 여유, 치열한 순위 경쟁',startMoney:0.7,energy:-10,stress:1.5,reach:0.8,rival:1.3,stats:0.8,contest:1.16},
];

export const TARGETS=[
 {id:'female',name:'여성향',desc:'관계·감정선·서사 중심. 로맨스/로판/드라마 선호.',pool:1.0},
 {id:'male',name:'남성향',desc:'시뮬·육성·세계관·액션 선호. 분량과 시스템을 본다.',pool:0.9},
 {id:'all',name:'전체',desc:'넓게 노출되지만 어느 쪽에도 1순위가 아니다.',pool:1.15},
];
// 장르별 타겟 기본 선호도(0.6~1.4). 트렌드에 따라 월별로 흔들린다.
export const GENRES=[
 {id:'romance',name:'로맨스',aud:{female:1.35,male:0.8,all:1.0},unlock:0},
 {id:'rofan',name:'로판',aud:{female:1.4,male:0.7,all:0.95},unlock:0},
 {id:'daily',name:'현대·일상',aud:{female:1.1,male:1.0,all:1.15},unlock:0},
 {id:'school',name:'학원',aud:{female:1.15,male:1.1,all:1.05},unlock:0},
 {id:'fantasy',name:'판타지',aud:{female:0.9,male:1.35,all:1.05},unlock:0},
 {id:'sim',name:'육성·경영',aud:{female:0.75,male:1.4,all:0.95},unlock:2},
 {id:'mystery',name:'미스터리',aud:{female:1.0,male:1.1,all:1.0},unlock:2},
 {id:'horror',name:'공포',aud:{female:0.85,male:1.2,all:0.9},unlock:3},
 {id:'sf',name:'SF',aud:{female:0.8,male:1.3,all:0.95},unlock:3},
 {id:'action',name:'액션',aud:{female:0.8,male:1.35,all:0.95},unlock:4},
 {id:'drama',name:'드라마',aud:{female:1.3,male:0.75,all:1.0},unlock:4},
 {id:'murim',name:'무협',aud:{female:0.6,male:1.3,all:0.85},unlock:5},
 {id:'comedy',name:'코미디',aud:{female:1.05,male:1.1,all:1.2},unlock:5},
 {id:'bl_gl',name:'BL·GL',aud:{female:1.3,male:0.5,all:0.7},unlock:6},
];
// 해시태그(최대 3개). 월별 메타 태그 4개가 랜덤으로 선정되어 검색·추천 유입이 늘어난다.
export const TAGS=['북부대공','패전국공주','소꿉친구','집착','츤데레','다정남','연상','연하','회귀','빙의','악역영애','계약결혼','동거','오피스','전학생','선후배','아포칼립스','던전','헌터','게임세계','우주','AI','탐정','저택','기숙사','아이돌','밴드','카페','의사','군인','용병','흑막','구원','순애','피폐','힐링','코믹','일상물','TRPG','스탯','육성','하렘','역하렘','가상연애','전생','마법학교','황궁','뱀파이어','수인','메이드','집사'];
export const FORMS=[
 {id:'one',name:'1:1 대화',desc:'한 캐릭터와 깊게. 안정성이 높다.',stability:0,story:0,msgs:1.0},
 {id:'multi',name:'다인 대화',desc:'여러 인물이 함께. 몰입은 높고 설정 유지는 어렵다.',stability:-8,story:6,msgs:1.1},
 {id:'simul',name:'시뮬레이션',desc:'규칙·스탯·분기. 남성향에서 강하다.',stability:-6,story:8,msgs:1.25},
 {id:'narr',name:'서술형(TRPG)',desc:'진행자 서술 중심. 분량이 길고 크래커 소모가 크다.',stability:-4,story:10,msgs:1.35},
];
export const MODES=[
 {id:'light',name:'라이트챗',crackers:15,quality:0.85,desc:'가볍고 싸다. 무료 이용자 유입↑, 몰입 상한↓'},
 {id:'super',name:'슈퍼챗 2.0 (기본)',crackers:40,quality:1.0,desc:'플랫폼 시그니처 모델. 균형.'},
 {id:'hyper',name:'하이퍼챗',crackers:120,quality:1.12,desc:'최상위 모델. 몰입↑, 진입 장벽↑'},
];
export const LENGTHS=[
 {id:1,name:'기본',cracker:1,retention:1,story:0},
 {id:1.5,name:'1.5x',cracker:1.4,retention:0.96,story:3},
 {id:3,name:'3x',cracker:2.4,retention:0.88,story:6},
 {id:5,name:'5x',cracker:3.8,retention:0.72,story:9},
];
export const AUDIENCES=[
 {id:'all',name:'미성년자가 대화하기에 적절해요',short:'전연령',pool:1.0,pay:1.0,community:1.0,risk:0},
 {id:'adult',name:'미성년자가 대화하기에 적절하지 않아요',short:'성인',pool:0.6,pay:1.7,community:1.5,risk:2},
];
export const IMAGE_SOURCES=[
 {id:'gen',name:'직접 생성',desc:'이미지 생성 도구 사용. 작업마다 비용.',cost:6000,visual:1.0,risk:0},
 {id:'commission',name:'외주 커미션',desc:'일러스트레이터에게 의뢰. 비싸지만 확실하다.',cost:60000,visual:1.35,risk:0},
 {id:'free',name:'무료 소재',desc:'라이선스 프리 소재. 저렴하고 평범하다.',cost:0,visual:0.7,risk:0},
 {id:'ripped',name:'퍼온 이미지',desc:'출처 불명 이미지. 공짜지만 운영 정책 위반 시 최고 수준 제재.',cost:0,visual:0.95,risk:6},
];
export const ORIGINS=[
 {id:'original',name:'오리지널 창작',desc:'온리·오리지널 신청 가능.',boost:1.0,risk:0},
 {id:'fanwork',name:'2차 창작',desc:'기존 IP 기반. 팬덤 유입 +35%지만 온리·오리지널 불가, 권리 침해 신고 위험.',boost:1.35,risk:3},
];
export const TEMPLATES=[
 {id:'basic',name:'기본 템플릿',desc:'플랫폼 제공 템플릿. 빠르지만 상한이 낮다.',progress:1.3,points:0.8},
 {id:'custom',name:'제작자 커스텀 프롬프트',desc:'자유 형식 7,000자. 느리지만 상한이 높다.',progress:1.0,points:1.0},
];
export const KINDS=[
 {id:'character',name:'캐릭터',desc:'한 캐릭터와의 대화. 빠르게 만들고 수를 늘리기 좋다.'},
 {id:'story',name:'스토리',desc:'서사·시스템 중심. 스탯·엔딩 설정이 열리고 오리지널 심사 대상.'},
];
export const STATS={story:'서사',stability:'안정성',visual:'비주얼',appeal:'어필'};
// 제작 탭(모듈). required: 필수. kind: 특정 유형 전용. stat: 주로 오르는 능력치.
export const MODULES={
 profile:{name:'프로필',desc:'이미지·이름·한 줄 소개',required:true,stat:'appeal',skill:'direction',cost:1},
 prompt:{name:'스토리 설정',desc:'프롬프트 본문',required:true,stat:'stability',skill:'prompt',cost:1.4},
 start:{name:'시작 설정',desc:'첫 장면·시작 메시지',required:true,stat:'story',skill:'planning',cost:1},
 media:{name:'미디어',desc:'상황별 이미지·이미지 코드',required:false,stat:'visual',skill:'image',cost:1.2},
 keyword:{name:'키워드북',desc:'설정집·고유명사 사전',required:false,stat:'stability',skill:'planning',cost:1},
 shortcut:{name:'단축어',desc:'자주 쓰는 행동 버튼',required:false,stat:'appeal',skill:'direction',cost:0.6},
 stat:{name:'스탯 설정',desc:'호감도·체력 등 수치 시스템',required:false,kind:'story',stat:'story',skill:'planning',cost:1.2},
 ending:{name:'엔딩 설정',desc:'분기와 결말',required:false,kind:'story',stat:'story',skill:'prompt',cost:1.2},
 register:{name:'등록',desc:'상세 설명·장르·타겟·태그·공개 설정',required:true,stat:'appeal',skill:'direction',cost:0.7},
};
export const MODULE_ORDER=['profile','prompt','start','media','keyword','shortcut','stat','ending','register'];
export const SKILLS={
 planning:{name:'기획',desc:'세계관·시작 설정·스탯·키워드북. 장르 해금.'},
 prompt:{name:'프롬프트',desc:'말투 유지·설정 붕괴 방지·엔딩 분기.'},
 image:{name:'이미지',desc:'프로필·상황별 이미지·이미지 코드.'},
 direction:{name:'연출',desc:'소개·태그·단축어·등록 정보. 첫인상.'},
 community:{name:'커뮤니티',desc:'홍보·소통·갤러리 감각. 트렌드 예측.'},
};
export const BACKGROUNDS=[
 {id:'student',name:'대학생',desc:'시간은 많고 돈은 없다. 체력 110, 90만원.',money:900000,energy:110,legacy:0},
 {id:'worker',name:'직장인 투잡',desc:'매주 월급 +28만원. 대신 체력 70.',money:1500000,energy:70,salary:280000,legacy:0},
 {id:'dreamer',name:'전업 지망생',desc:'모든 것을 걸었다. 160만원, 체력 100.',money:1600000,energy:100,legacy:0},
 {id:'illustrator',name:'프리랜서 일러스트레이터',desc:'이미지 Lv.3, 커미션 비용 절반.',money:1200000,energy:95,skills:{image:3},legacy:0},
 {id:'novelist',name:'전직 웹소설 작가',desc:'기획 Lv.3·프롬프트 Lv.2·팔로워 300. [유산 해금]',money:1400000,energy:95,skills:{planning:3,prompt:2},followers:300,legacy:3},
 {id:'rich',name:'금수저',desc:'1,200만원과 오피스텔로 시작. [유산 해금]',money:12000000,energy:90,studio:2,legacy:5},
 {id:'galluser',name:'갤러리 고인물',desc:'커뮤니티 Lv.3, 인지도 80. 홍보 효과 +. [유산 해금]',money:1000000,energy:100,skills:{community:3},rep:80,legacy:3},
];
export const TRAITS=[
 {id:'owl',name:'야행성',desc:'최대 체력 +15. 작업 피로 +1.',legacy:0},
 {id:'steel',name:'멘탈갑',desc:'스트레스 증가량 -30%. 악플에 강하다.',legacy:0},
 {id:'muse',name:'영감 체질',desc:'매주 영감 +12.',legacy:0},
 {id:'prolific',name:'다작형',desc:'진행 속도 +20%, 포인트 -8%. 캐릭터 양산에 유리.',legacy:0},
 {id:'perfectionist',name:'완벽주의',desc:'포인트 +15%, 진행 속도 -15%.',legacy:0},
 {id:'social',name:'소통왕',desc:'팔로워 증가 +30%, 댓글 반응 +.',legacy:0},
 {id:'thrifty',name:'절약왕',desc:'모든 지출 -15%.',legacy:2},
 {id:'visualist',name:'비주얼 장인',desc:'비주얼 포인트 +25%.',legacy:2},
 {id:'lorekeeper',name:'설정 덕후',desc:'안정성 포인트 +20%, 다인·시뮬 패널티 절반.',legacy:3},
 {id:'lucky',name:'알고리즘의 선택',desc:'신작 탭 "반응 뜨거운 신작" 선정 확률 +, 나쁜 이벤트 ↓.',legacy:3},
 {id:'twoslots',name:'멀티태스커',desc:'동시 제작 슬롯 +1.',legacy:4},
 {id:'merchant',name:'정산 장인',desc:'선물·정산 수익 +12%.',legacy:2},
];
export const STUDIOS=[
 {id:0,name:'본가 내 방',rent:0,deposit:0,slots:1,energy:0,recover:0,desc:'시작은 여기서.'},
 {id:1,name:'원룸 작업실',rent:140000,deposit:1500000,slots:2,energy:5,recover:4,desc:'드디어 나만의 공간.'},
 {id:2,name:'오피스텔',rent:420000,deposit:6000000,slots:3,energy:12,recover:8,desc:'넓은 책상과 좋은 채광.'},
 {id:3,name:'크리에이터 스튜디오',rent:950000,deposit:22000000,slots:4,energy:22,recover:12,desc:'외주 비용 -20%.'},
 {id:4,name:'펜트하우스 스튜디오',rent:2200000,deposit:80000000,slots:5,energy:35,recover:18,desc:'인지도 +3/주.'},
];
export const ITEMS=[
 {id:'chair',name:'인체공학 의자',price:1200000,desc:'최대 체력 +10',effect:{energy:10}},
 {id:'coffee',name:'커피머신',price:1500000,desc:'최대 체력 +8, 영감 +2/주',effect:{energy:8,inspiration:2}},
 {id:'monitor',name:'듀얼 모니터',price:2500000,desc:'작업 진행 +3',effect:{progress:3}},
 {id:'tablet',name:'드로잉 태블릿',price:3000000,desc:'비주얼 포인트 +25%',effect:{visualMul:0.25}},
 {id:'keyboard',name:'기계식 키보드',price:1800000,desc:'안정성 포인트 +20%',effect:{stabilityMul:0.2}},
 {id:'notebook',name:'설정집 노트',price:800000,desc:'서사 포인트 +20%',effect:{storyMul:0.2}},
 {id:'plant',name:'몬스테라 화분',price:400000,desc:'영감 +3/주',effect:{inspiration:3}},
 {id:'cat',name:'고양이 "치즈"',price:900000,desc:'스트레스 회복 +6/주. 귀엽다.',effect:{recover:6}},
 {id:'booth',name:'방음 부스',price:4000000,desc:'영감 폭발 확률 +6%',effect:{crit:0.06}},
 {id:'pc',name:'고성능 PC',price:6000000,desc:'작업 진행 +5, 비주얼 포인트 +10%',effect:{progress:5,visualMul:0.1}},
 {id:'lamp',name:'무드 조명',price:600000,desc:'어필 포인트 +15%',effect:{appealMul:0.15}},
 {id:'bed',name:'낮잠용 소파',price:2200000,desc:'스트레스 회복 +8/주',effect:{recover:8}},
];
export const SUBSCRIPTIONS=[
 {id:'imagegen',name:'이미지 생성 구독',monthly:60000,desc:'직접 생성 이미지 비용 0, 비주얼 포인트 +15%'},
 {id:'superpass',name:'슈퍼패스',monthly:85000,desc:'비공개 테스트 비용 절반, 테스트 시 안정성 +3 추가'},
 {id:'manager',name:'SNS 예약 홍보 툴',monthly:50000,desc:'매주 최신작 SNS 홍보 자동 실행'},
 {id:'trend',name:'트렌드 리포트',monthly:30000,desc:'다음 달 메타 태그·타겟 선호 미리 보기'},
];
export const HELPERS=[
 {id:'illust',name:'일러스트 커미션',price:600000,desc:'미디어 진행 +40, 비주얼 포인트 +30',module:'media',progress:40,stat:'visual',points:30},
 {id:'beta',name:'베타 테스터 모집',price:300000,desc:'안정성 포인트 +18, 스토리 설정 진행 +10',module:'prompt',progress:10,stat:'stability',points:18},
 {id:'editor',name:'소개·태그 컨설팅',price:400000,desc:'등록 진행 +40, 어필 포인트 +16',module:'register',progress:40,stat:'appeal',points:16},
 {id:'consultant',name:'서사 컨설팅',price:500000,desc:'시작 설정 진행 +30, 서사 포인트 +22',module:'start',progress:30,stat:'story',points:22},
];
export const JOBS=[
 {id:'store',name:'편의점 알바',energy:30,money:180000,stress:10,rep:0,desc:'확실한 수입. 체력 30.'},
 {id:'commission',name:'캐릭터 커미션',energy:25,money:420000,stress:8,rep:40,desc:'인지도 40 필요. 이미지 경험치 +.',xp:'image'},
 {id:'promptjob',name:'프롬프트 대행',energy:25,money:620000,stress:9,rep:120,desc:'인지도 120 필요. 프롬프트 경험치 +.',xp:'prompt'},
 {id:'lecture',name:'제작 강의·멘토링',energy:20,money:950000,stress:6,rep:320,followers:40,desc:'인지도 320 필요. 팔로워 +40.'},
 {id:'collab',name:'브랜드 협업',energy:30,money:2400000,stress:12,rep:800,followers:120,desc:'인지도 800 필요. 팔로워 +120.'},
];
export const LIFE=[
 {id:'walk',name:'산책',energy:10,stress:-12,inspiration:12,desc:'비교는 잠시 내려두고. 스트레스 -12, 영감 +12'},
 {id:'read',name:'다른 작품 플레이',energy:12,stress:-4,inspiration:22,desc:'남의 작품에서 배운다. 영감 +22'},
 {id:'friends',name:'친구와 수다',energy:12,stress:-22,inspiration:4,desc:'스트레스 -22'},
 {id:'gym',name:'운동',energy:18,stress:-10,inspiration:4,energyMax:1,desc:'스트레스 -10, 가끔 최대 체력 +1'},
 {id:'nap',name:'푹 쉬기',energy:0,stress:-16,inspiration:0,desc:'체력 20을 쉬는 데 쓴다. 스트레스 -16'},
];
export const PROMOS=[
 {id:'sns',name:'SNS 홍보',money:0,energy:8,mul:1.35,followers:0,stress:2,desc:'X·인스타에 짤과 링크. 유입 ×1.35'},
 {id:'gallery',name:'갤러리 홍보탭',money:0,energy:10,mul:1.7,followers:8,stress:6,desc:'커뮤니티 홍보. 유입 ×1.7, 성인 작품 ×2.2, 악플 위험'},
 {id:'event',name:'선물 추첨 이벤트',money:150000,energy:12,mul:1.5,followers:30,stress:3,desc:'크래커 경품. 팔로워 +30'},
 {id:'discord',name:'디스코드 서버 소식',money:0,energy:6,mul:1.2,followers:5,stress:1,desc:'팬 커뮤니티 공지. 인지도 150 필요',rep:150},
];
// 독자 댓글 풀. 조건: strong/weak 능력치, 타겟, 기타.
export const COMMENTS={
 story_hi:['서사가 미쳤다... 3시간 순삭','전개가 진짜 소설 한 편 읽은 느낌','설정 하나하나가 다 살아있음','이거 오리지널 가야 되는 거 아님?','분기마다 다른 결말 나오는 거 소름','밤새 돌렸다 책임져라','한 턴 한 턴이 다 떡밥이네','감정선 쌓이는 속도가 완벽함'],
 story_lo:['뭔가 밍밍해요. 사건이 안 일어남','시작 설정에서 뭘 해야 할지 모르겠어요','캐릭터는 좋은데 이야기가 없음','10턴 지나도 똑같은 장면','선택지가 의미가 없는 느낌','시작 메시지가 너무 길어서 스킵함'],
 stability_hi:['말투 안 무너지는 거 진짜 귀함','키워드북 덕분에 설정 안 까먹네','50턴 넘게 했는데 아직도 캐릭터 유지됨','유저노트 없이도 설정 유지됨 대박','이름 한 번도 안 틀림','세계관 용어 정확하게 씀'],
 stability_lo:['갑자기 존댓말 하다가 반말함','같은 문장 계속 반복돼요 리롤 지옥','5턴 만에 이름 까먹음 ㅋㅋ','유저노트 없이는 못 하겠다','내 캐릭터가 갑자기 다른 사람 됨','죽은 캐릭터가 다시 말함...','설정이랑 다르게 행동함'],
 visual_hi:['상황 이미지 뜰 때마다 소름','썸네일 보고 들어왔는데 안이 더 좋음','이미지 코드 적용 깔끔','표정 차분 미쳤다','배경 이미지까지 있는 거 처음 봄','프사 보고 팔로우'],
 visual_lo:['이미지 코드가 안 떠요','프사가 너무 흔한 느낌','상황 이미지 하나만 더 있었으면','무료 소재 티 남','썸네일이랑 분위기가 다름'],
 appeal_hi:['한 줄 소개에 낚였는데 후회 없음','태그 보고 들어왔는데 정확함','소개글이 작품을 정확히 설명함','단축어 편해서 계속 하게 됨','가이드 친절해서 입문하기 좋음'],
 appeal_lo:['설명이 너무 짧아서 뭔지 모르고 들어옴','썸네일만 보면 다른 작품인 줄','태그랑 내용이 안 맞아요','권장 모드 안내가 없어서 헤맴','단축어 좀 만들어주세요'],
 female:['설레서 못 자겠음','집착 묘사 미쳤다','다정남 최고...','엔딩 보고 울었어요','이 남주 실존하면 안 되나','고백 장면 캡처해둠','질투하는 거 왜 이렇게 귀엽냐'],
 male:['스탯 시스템 재밌음','분기 많아서 회차 돌리는 맛','전투 묘사 좋다','육성 요소 더 넣어주세요','난이도 조절 가능하게 해주세요','히든 엔딩 찾는 중','자원 관리 빡센데 그게 재밌음'],
 adult:['수위 조절 잘됨','세이프티 걸려서 답답함','이거 보고 성인 인증함','묘사가 세련됨','19 치고 서사가 탄탄함'],
 sim:['세이브 기능 있었으면','스탯 올리는 재미가 있다','랜덤 이벤트 더 늘려주세요','이거 거의 게임임'],
 narr:['서술이 소설 같아서 좋음','답변이 길어서 크래커가 녹는다...','진행자 톤이 일관됨','TRPG 느낌 제대로'],
 long:['답변 길어서 몰입됨','5x는 진짜 장편 읽는 기분','길이 대비 내용이 알참','크래커 아껴야 하는데 멈출 수가 없음'],
 light:['가볍게 하기 좋음','라이트챗으로도 충분히 재밌네','무과금으로 돌리기 딱'],
 hyper:['하이퍼챗으로 하니까 다른 작품임','비싸지만 그만한 가치 있음','하이퍼 전용 작품 같다'],
 generic:['후속작 언제 나와요','작가님 팔로우 박고 갑니다','선물 보냈어요 힘내세요','업데이트 알림 켜둠','친구한테 추천함','퀄 대비 플레이수 너무 적다 더 떠야 함','매일 출석 중','이런 작품이 왜 이제 떴지','작가님 다른 작품도 다 함','댓글 처음 달아봄'],
 update:['업데이트 체감됨 감사합니다','고쳐주셔서 다시 하는 중','패치노트 읽는 재미','업데이트 알림 보고 바로 왔음'],
 award:['수상 축하드려요!','대회 수상작이라길래 왔는데 납득','심사위원 보는 눈 있네','수상 기념 선물 보냄'],
 sequel:['후속작 드디어!!','전작 하고 와서 더 재밌음','시리즈로 묶어주세요','전작 세이브 이어지면 좋겠다'],
 original:['오리지널 배지 달린 거 보고 들어옴','공식 추천에서 봤어요','오리지널 선정 축하합니다','이게 플랫폼이 사간 작품이구나'],
 troll:['이게 왜 인기임?','설정 다 틀렸는데 ㅋㅋ','AI가 쓴 티 남','제작자 갤에서 자추하는 거 다 봄','이거 어디서 베낀 듯','썸네일 낚시임','돈 벌려고 만든 티 남','프롬 복붙 아님?'],
 rival:['{rival}: 작가님 작품 잘 봤습니다. 키워드북 구조 참고할게요','{rival}: 같은 장르 하는 입장에서 배웁니다','{rival}: 콜라보 한번 하시죠','{rival}: 이 전개는 제가 먼저 한 건데...'],
};
export const RIVAL_ARCHETYPES=[
 {id:'rofan',name:'로판 장인',target:'female',genres:['rofan','romance'],kind:'story',rate:0.10,power:1.1},
 {id:'simmaster',name:'시뮬 장인',target:'male',genres:['sim','fantasy','action'],kind:'story',rate:0.08,power:1.15},
 {id:'factory',name:'다작 공장',target:'all',genres:['daily','school','romance','comedy'],kind:'character',rate:0.3,power:0.75},
 {id:'original',name:'오리지널 전문',target:'female',genres:['drama','mystery','rofan'],kind:'story',rate:0.06,power:1.3},
 {id:'meme',name:'밈 제작자',target:'all',genres:['comedy','daily'],kind:'character',rate:0.2,power:0.9},
 {id:'adult',name:'언세이프티 네임드',target:'male',genres:['romance','daily','fantasy'],kind:'character',rate:0.15,power:1.0,adult:true},
 {id:'worldbuilder',name:'세계관 빌더',target:'male',genres:['sf','fantasy','murim'],kind:'story',rate:0.07,power:1.2},
 {id:'newbie',name:'유망 신인',target:'female',genres:['romance','school'],kind:'character',rate:0.18,power:0.6,grow:1.06},
];
export const RIVAL_NAMES=['달빛공방','새벽연구소','코코넛','밤하늘','민트라떼','솜사탕랩','구름제작소','벚꽃문학관','오로라','초코파이','은하수','레몬사탕','보라도마뱀','유리구슬','잿빛늑대','흰고래','딸기우유','검은고양이','파도소리','종이비행기','루나틱','설탕별','밀크티','모래시계','안개숲','네온사인','무명작가A','프롬장인','설정집덕후','야근러','심야식당','별빛서가'];
// 크랙풍 제목 생성 재료
export const TITLE_PARTS={
 names:['이레온','세라','에녹','하랑','리엘','유안','제노','카일','시온','노아','루카','아린','윤슬','테오','미하엘','레이나','지한','하윤','클로이','이든'],
 surnames:['베르크하임','한','윈터','그레이','아르덴','최','레이븐','강','슈발츠','서','오르테가','백'],
 taglines:['북부대공의 계약 신부','패전국 공주의 생존기','돌아온 소꿉친구','집착하는 집사','기숙사 룸메이트','폐교의 전학생','새벽의 흑막','마법학교 수석','용병단의 막내','황궁의 약사'],
 english:['FULL DIVE','LAST ORDER','RE:LIFE','NIGHT SHIFT','GLASS HEART','ZERO HOUR','WHITE NOISE','ECHO','DEAD LINE','BLUE PILL','OVERDRIVE','AFTER SCHOOL'],
 subs:['ILEON','SERA','ARDEN','NOVA','ZERO','KAIROS','LUNA','ASHER'],
 sims:['테이머','헌터','용병단장','길드 마스터','던전 주인','마법학교 교수','카페 사장','아이돌 매니저','황제','촌장'],
 worlds:['아포칼립스','던전','황궁','기숙사','우주정거장','폐광','마법학교','뒷골목','요양원','섬'],
};
export const EVENTS=[
 // 난이도 전용: 6주차부터 12주 간격으로 순환. 일반 랜덤 풀과 분리한다.
 {id:'easy_mentor',difficulty:'easy',symbol:'bulb',title:'신인 멘토링 지원',text:'멘토가 다음 제작을 도와주겠다고 한다. 필요한 지원을 선택하자.',options:[
  {label:'제작 코칭 · 2주간 작업 속도 +15%, 기획 경험치 +20',effects:{progressMod:{mul:1.15,weeks:2},skillXp:{planning:20}},log:'제작 코칭을 받았다.'},
  {label:'운영 지원 · 자금 +12만원',effects:{money:120000},log:'운영 지원금을 받았다.'}]},
 {id:'easy_feedback',difficulty:'easy',symbol:'heart',title:'독자 응원 모임',text:'작은 독자 모임에서 응원이 도착했다. 다음 작품을 준비할 여유가 생겼다.',options:[
  {label:'아이디어 나누기 · 영감 +18, 팔로워 +15',effects:{inspiration:18,followers:15},log:'독자들과 아이디어를 나눴다.'},
  {label:'재충전 · 스트레스 -18',effects:{stress:-18},log:'응원을 받고 쉬었다.'}]},
 {id:'normal_study',difficulty:'normal',symbol:'book',title:'제작 스터디 모집',text:'제작자들이 소규모 스터디를 연다. 이번에 배울 주제를 정하자.',options:[
  {label:'프롬프트 연구 · 프롬프트 경험치 +16',effects:{skillXp:{prompt:16}},log:'프롬프트 작성법을 교환했다.'},
  {label:'장르 분석 · 기획 경험치 +16',effects:{skillXp:{planning:16}},log:'장르별 전개를 분석했다.'}]},
 {id:'normal_exchange',difficulty:'normal',symbol:'mail',title:'제작자 교류회',text:'동료 제작자들이 홍보 경험과 휴식 방법을 공유하고 있다.',options:[
  {label:'홍보 사례 듣기 · 2주간 신규 노출 +10%',effects:{reachMod:{mul:1.1,weeks:2}},log:'홍보 사례를 적용했다.'},
  {label:'동료와 쉬기 · 스트레스 -8, 영감 +8',effects:{stress:-8,inspiration:8},log:'동료와 재충전했다.'}]},
 {id:'hard_rush',difficulty:'hard',symbol:'warning',title:'인기 장르 신작 경쟁',text:'인기 장르에 경쟁작이 몰렸다. 짧게 집중 홍보하거나 다음 제작을 준비할 수 있다.',options:[
  {label:'홍보 집중 · 2주간 신규 노출 +20%, 스트레스 +10',effects:{reachMod:{mul:1.2,weeks:2},stress:8},log:'경쟁 속에서 홍보에 집중했다.'},
  {label:'다음 기획 준비 · 영감 +12, 2주간 신규 노출 -10%',effects:{inspiration:12,reachMod:{mul:0.9,weeks:2}},log:'현재 유입을 양보하고 기획을 준비했다.'}]},
 {id:'hard_review',difficulty:'hard',symbol:'scroll',title:'까다로운 합평회',text:'동료들이 개선점을 조목조목 지적한다. 피드백을 받아들이는 데에도 여유가 필요하다.',options:[
  {label:'분석하기 · 프롬프트 경험치 +30, 스트레스 +10',effects:{skillXp:{prompt:30},stress:8},log:'합평을 분석해 역량을 키웠다.'},
  {label:'일정 조정 · 스트레스 -10, 1주간 작업 속도 -10%',effects:{stress:-10,progressMod:{mul:0.9,weeks:1}},log:'제작 속도를 낮추고 컨디션을 회복했다.'}]},
 {id:'legend_challenge',difficulty:'legend',symbol:'trophy',title:'상위권 제작자 공개 도전',text:'상위권 제작자들이 공개 제작 챌린지를 연다. 단기 노출 기회지만 부담도 크다.',options:[
  {label:'참가 · 2주간 신규 노출 +25%, 스트레스 +18',effects:{reachMod:{mul:1.25,weeks:2},stress:12},log:'상위권 챌린지에 참가했다.'},
  {label:'내 작업에 집중 · 영감 +14, 2주간 신규 노출 -15%',effects:{inspiration:14,reachMod:{mul:0.85,weeks:2}},log:'노출 경쟁 대신 다음 기획을 준비했다.'}]},
 {id:'legend_precision',difficulty:'legend',symbol:'gear',title:'고난도 프롬프트 검증',text:'복잡한 프롬프트의 검증 기회가 생겼다. 집중 연구와 안정적인 일정 사이에서 선택하자.',options:[
  {label:'집중 연구 · 프롬프트 경험치 +40, 스트레스 +18',effects:{skillXp:{prompt:40},stress:12},log:'집중 연구로 프롬프트 경험을 쌓았다.'},
  {label:'작업량 축소 · 스트레스 -12, 2주간 작업 속도 -10%',effects:{stress:-12,progressMod:{mul:0.9,weeks:2}},log:'작업량을 줄여 컨디션을 관리했다.'}]},

 // --- 플랫폼·정책 ---
 {id:'policy_revision',title:'운영 정책 개정 안내',text:'캐릭터 생성 정책이 구체화됐다. 프로필·상황 이미지·프롬프트의 금지 항목이 명시되고, 퍼온 이미지 작품은 집중 점검 대상이다.',weight:2,options:[
  {label:'내 작품을 점검한다 (체력 -15)',effects:{energy:-15,riskAll:-2,stress:4},log:'작품을 점검해 위험 요소를 줄였다.'},
  {label:'괜찮겠지',effects:{riskAll:1},log:'...괜찮겠지?'}]},
 {id:'model_update',title:'슈퍼챗 모델 업데이트',text:'시그니처 모델이 새 버전으로 바뀌었다. 일부 공개작의 말투가 흔들린다는 제보가 올라온다.',weight:2,need:'published',options:[
  {label:'프롬프트 긴급 수정 (체력 -20)',effects:{energy:-20,workPoints:{stability:4},stress:8},log:'공개작 프롬프트를 새 모델에 맞춰 손봤다.'},
  {label:'지켜본다',effects:{workPoints:{stability:-6}},log:'일부 작품의 안정성이 떨어졌다.'}]},
 {id:'hyper_launch',title:'하이퍼챗 출시',text:'최상위 모델 "하이퍼챗"이 베타로 열렸다. 메시지당 크래커가 비싸지만 몰입이 다르다는 평.',weight:1,once:true,options:[
  {label:'체험해 본다',effects:{inspiration:15,skillXp:{prompt:30}},log:'하이퍼챗을 체험했다. 프롬프트 경험치 +30.'}]},
 {id:'price_up',title:'크래커 가격 인상',text:'크래커 가격이 인상됐다. 갤러리가 "곧 망한다"로 도배됐다. 4주간 유료 이용자 소비가 줄어든다.',weight:1,options:[
  {label:'버틴다',effects:{payMod:{mul:0.8,weeks:4},stress:4},log:'4주간 크래커 소비 -20%.'}]},
 {id:'settle_reform',title:'정산 정책 개편',text:'보상 캐시의 현금 전환이 공식화됐다. 최소 1만원부터, 세금은 원천징수. 크리에이터들의 사기가 올랐다.',weight:1,once:true,options:[
  {label:'드디어!',effects:{inspiration:10,stress:-6},log:'정산 정책 개편. 창작 의욕 +'}]},
 {id:'maintenance',title:'긴급 서버 점검',text:'플랫폼이 이틀간 멈췄다. 이번 주 유입이 크게 줄어든다.',weight:2,options:[
  {label:'이 틈에 작업한다',effects:{reachMod:{mul:0.6,weeks:1},inspiration:6},log:'점검 기간 동안 조용히 작업했다.'}]},
 {id:'main_feature',title:'메인 추천 노출',text:'당신의 최신작이 앱 메인 추천 영역에 걸렸다!',weight:1,need:'published',options:[
  {label:'기회다!',effects:{reachMod:{mul:1.8,weeks:1},followers:60,rep:20},log:'메인 노출로 유입 폭증.'}]},
 {id:'buyout_contest',title:'크랙 오리지널 집중 매입 대회',text:'총 4.8억 규모의 집중 매입 대회가 공고됐다. 최우수 선정작 3,000만원, 상위 50작품 매입. 이번 달 오리지널 심사 통과율이 오른다.',weight:1,need:'creator',options:[
  {label:'도전한다',effects:{contestMonth:1},log:'집중 매입 대회 기간! 이번 달 오리지널 심사 가산.'},
  {label:'내 페이스대로',effects:{stress:-3},log:'조급해하지 않기로 했다.'}]},
 {id:'overseas',title:'해외 서비스 소개',text:'크랙 온리 작품이 북미(OOC)·일본(캬라푸) 서비스에 소개됐다. 해외 추가 정산이 들어온다.',weight:2,need:'only',options:[
  {label:'글로벌 데뷔!',effects:{money:400000,rep:30,followers:40},log:'해외 추가 정산 +40만원.'}]},
 {id:'referral',title:'외부 작품 입주 트랙',text:'다른 플랫폼 작품을 크랙에 입주시키면 추천인과 입주자가 각 5만원을 받는다는 공지. 아는 제작자에게 권유해 볼까?',weight:1,need:'creator',options:[
  {label:'권유한다',effects:{money:50000,rep:10},log:'추천인 보상 5만원.'},
  {label:'관심 없다',effects:{},log:'패스.'}]},
 {id:'status_changed',title:'운영자에 의해 상태가 변경됐어요',text:'전연령으로 등록한 작품이 "민감한 스토리"로 분류돼 성인 전용으로 전환됐다. 유입 범위가 줄어든다.',weight:2,need:'published_all',options:[
  {label:'수정 후 재검토 요청 (체력 -15)',effects:{energy:-15,stress:6},log:'표현을 다듬어 재검토를 요청했다.'},
  {label:'성인 작품으로 간다',effects:{convertAdult:1},log:'최신 전연령 작품이 성인 작품으로 전환됐다.'}]},
 {id:'ip_report',title:'권리 침해 신고',text:'2차 창작 작품에 원작자 권리 침해 신고가 접수됐다. 운영 정책상 원작자 허가 없는 2차 창작은 차단될 수 있다.',weight:3,need:'fanwork',options:[
  {label:'자진 비공개 (팬덤 유입 포기)',effects:{archiveFanwork:1,stress:8},log:'2차 창작 작품을 비공개로 돌렸다.'},
  {label:'버틴다',effects:{sanction:1,stress:12},log:'작품이 차단되고 경고를 받았다.'}]},
 {id:'ripped_caught',title:'외부 이미지 무단 사용 적발',text:'퍼온 이미지를 쓴 작품이 적발됐다. 운영 정책상 경고 없이 최고 수준 제재가 가능하다.',weight:4,need:'ripped',options:[
  {label:'즉시 이미지 교체 (-30만원)',effects:{money:-300000,replaceRipped:1,sanction:1,stress:10},log:'이미지를 교체했지만 경고 1회.'},
  {label:'모른 척한다',effects:{sanction:2,stress:18},log:'작품 차단 + 7일 이용 제한.'}]},
 // --- 커뮤니티 ---
 {id:'gallery_rank',title:'갤러리 "제작자 서열정리" 글',text:'누군가 제작자 서열을 매긴 글을 올렸다. 당신은 {tier}에 있다.',weight:2,need:'published',options:[
  {label:'웃고 넘긴다',effects:{stress:-3,rep:5},log:'서열 따위.'},
  {label:'댓글로 반박한다',effects:{stress:12,rep:-5,followers:10},log:'댓글창이 불탔다.'}]},
 {id:'prompt_share',title:'프롬프트 공유 문화',text:'갤러리에 "프롬 작성 날먹하는 법" 글이 올라왔다. 좋은 구조를 배울 수 있지만 내 프롬이 퍼질 수도 있다.',weight:3,options:[
  {label:'배운다',effects:{skillXp:{prompt:45}},log:'프롬프트 경험치 +45.'},
  {label:'내 노하우도 공유한다',effects:{skillXp:{prompt:20},rep:25,followers:25},log:'공유글이 인기를 끌었다. 인지도 +25.'}]},
 {id:'troll',title:'악플',text:'"이게 왜 인기임? 설정 다 틀렸는데 ㅋㅋ" 댓글이 달렸다. 손이 떨린다.',weight:3,need:'published',options:[
  {label:'정중하게 답글',effects:{stress:8,followers:15,rep:5},log:'성숙한 대응에 독자들이 응원을 보냈다.'},
  {label:'차단하고 잊는다',effects:{stress:4},log:'차단. 끝.'},
  {label:'댓글 기능을 닫는다',effects:{stress:-4,closeComments:1},log:'최신작 댓글을 닫았다. 조용하지만 반응도 줄어든다.'}]},
 {id:'censorship_drama',title:'홍보탭 검열 논란',text:'갤러리 홍보탭에 언세이프티 작품이 몰리면서 검열 논란이 터졌다. 홍보탭이 일주일간 시끄럽다.',weight:2,options:[
  {label:'논쟁에서 빠진다',effects:{promoMod:{mul:0.7,weeks:1}},log:'이번 주 갤러리 홍보 효과 -30%.'},
  {label:'의견을 낸다',effects:{promoMod:{mul:0.7,weeks:1},rep:10,stress:10},log:'인지도는 올랐지만 피곤하다.'}]},
 {id:'quit_post',title:'"제작자들이 많이 접는 이유"',text:'시간·노력·비용 대비 남는 게 없고 성적이 극단적으로 갈린다는 글이 공감을 얻고 있다. 솔직히 나도 공감된다.',weight:2,need:'stress50',options:[
  {label:'그래도 나는 만든다',effects:{stress:-6,inspiration:8},log:'그래도 만든다.'},
  {label:'이번 주는 쉰다',effects:{energy:-30,stress:-18},log:'이번 주 체력 -30, 스트레스 -18.'}]},
 {id:'fanart',title:'팬아트가 도착했다',text:'독자가 당신 캐릭터를 그려 보냈다. 눈물 날 정도로 예쁘다.',weight:3,need:'published',options:[
  {label:'SNS에 자랑한다',effects:{followers:30,stress:-8,inspiration:8},log:'팬아트를 공유하자 팔로워가 늘었다.'},
  {label:'조용히 간직한다',effects:{stress:-15,inspiration:12},log:'마음속 보물창고에 넣어뒀다.'}]},
 {id:'viral',title:'짤이 돌고 있다',text:'당신 캐릭터의 대사 캡처가 커뮤니티 밈이 됐다.',weight:2,need:'published',options:[
  {label:'공식 짤을 뿌린다',effects:{followers:120,rep:30,stress:5},log:'밈을 타고 팔로워 급증.'},
  {label:'모른 척 작업한다',effects:{followers:50,inspiration:5},log:'조용히 미소지었다.'}]},
 {id:'rival_collab',title:'{rival}의 콜라보 제안',text:'{rival} 작가가 세계관을 공유하는 콜라보 작품을 제안했다. 비용 반반, 팬도 반반.',weight:2,need:'rep150',options:[
  {label:'수락한다 (-50만원)',effects:{money:-500000,followers:260,rep:60,trophy:'collab',stress:8,relation:30},log:'콜라보 성공! 서로의 팬이 섞였다.'},
  {label:'정중히 거절',effects:{relation:-5},log:'아직은 혼자 가고 싶다.'}]},
 {id:'rival_hit',title:'{rival}의 대히트',text:'{rival} 작가의 신작이 랭킹을 휩쓸고 있다. 질투와 존경이 동시에.',weight:2,options:[
  {label:'분석한다',effects:{skillXp:{community:35},inspiration:8},log:'성공 요인을 분석했다.'},
  {label:'신경 끈다',effects:{stress:-4},log:'남은 남, 나는 나.'}]},
 {id:'rival_original',title:'{rival}, 오리지널 입주',text:'{rival} 작가가 크랙 오리지널에 선정됐다. 갤러리가 축하와 질투로 뒤섞였다.',weight:2,need:'published',options:[
  {label:'축하 댓글',effects:{relation:15,rep:5},log:'관계가 좋아졌다.'},
  {label:'나도 준비한다',effects:{inspiration:12,stress:4},log:'오리지널 심사를 목표로 삼았다.'}]},
 {id:'rival_dm',title:'{rival}의 DM',text:'"작가님 작품 잘 보고 있어요. 혹시 키워드북 구조 어떻게 짜세요?" 선의의 질문인지 떠보는 건지.',weight:2,need:'published',options:[
  {label:'친절하게 알려준다',effects:{relation:20,skillXp:{planning:15}},log:'설명하다 보니 나도 정리됐다.'},
  {label:'적당히 둘러댄다',effects:{relation:-10},log:'비밀은 비밀.'}]},
 {id:'plagiarism',title:'표절 시비',text:'누군가 당신 작품이 자기 작품과 비슷하다며 글을 올렸다. 사실이 아니다.',weight:1,need:'published',options:[
  {label:'제작 기록을 공개한다',effects:{stress:10,rep:15,followers:20},log:'기록을 공개하자 여론이 돌아섰다.'},
  {label:'무시한다',effects:{stress:6,rep:-10},log:'소문은 천천히 가라앉았다.'}]},
 {id:'usernote_trend',title:'유저노트 유행',text:'독자들이 유저노트로 설정을 보강하는 게 유행이다. 안정성이 낮은 작품도 조금 버틸 수 있게 됐다.',weight:2,options:[
  {label:'좋은 일',effects:{workPoints:{stability:2}},log:'공개작 안정성 +2.'}]},
 // --- 생활 ---
 {id:'burnout_warn',title:'손목이 아프다',text:'며칠째 손목이 저리다. 몸이 보내는 신호다.',weight:3,need:'stress60',options:[
  {label:'병원에 간다 (-20만원)',effects:{money:-200000,stress:-25},log:'치료받고 한결 가벼워졌다.'},
  {label:'파스 붙이고 계속한다',effects:{stress:10,inspiration:-4},log:'...괜찮을 거야.'}]},
 {id:'friend_visit',title:'친구가 놀러 왔다',text:'"요즘 뭐 만들어? 보여줘!" 치킨을 들고 친구가 왔다.',weight:3,options:[
  {label:'밤새 논다',effects:{stress:-25,energy:-20,inspiration:6},log:'즐거운 밤. 체력은 조금 소모.'},
  {label:'작품을 테스트시킨다',effects:{stress:-8,draftPoints:{stability:8}},log:'친구가 설정 구멍을 찾아줬다.'}]},
 {id:'laptop',title:'노트북이 고장났다',text:'작업 중 화면이 꺼졌다. 수리비가 필요하다.',weight:2,options:[
  {label:'수리한다 (-35만원)',effects:{money:-350000,stress:5},log:'수리 완료.'},
  {label:'중고로 때운다 (-12만원)',effects:{money:-120000,stress:12,progressMod:{mul:0.8,weeks:2}},log:'느린 노트북. 2주간 작업 속도 -20%.'},
  {label:'친구 노트북을 빌린다',effects:{stress:8,progressMod:{mul:0.7,weeks:3}},log:'빌린 노트북. 3주간 작업 속도 -30%.'}]},
 {id:'insomnia',title:'잠이 안 온다',text:'캐릭터의 다음 대사가 머릿속을 맴돈다.',weight:3,options:[
  {label:'일어나서 적는다',effects:{inspiration:18,stress:6,energy:-10},log:'새벽 3시의 영감.'},
  {label:'억지로 잔다',effects:{stress:-6},log:'아침엔 잊어버렸다.'}]},
 {id:'cafe_idea',title:'카페에서 엿들은 대화',text:'옆자리 커플의 대화가 너무 드라마틱하다. 메모하고 싶다.',weight:3,options:[
  {label:'몰래 메모한다',effects:{inspiration:20},log:'영감이 샘솟는다.'}]},
 {id:'gift',title:'팬의 선물',text:'팬이 커피 기프티콘을 잔뜩 보냈다.',weight:3,need:'fans500',options:[
  {label:'감사 인사',effects:{money:50000,stress:-10,followers:10},log:'따뜻한 마음.'}]},
 {id:'tax',title:'종합소득세 신고',text:'정산 수익에 대한 세금 신고 기간이다. 현금 전환 때 원천징수됐지만 신고는 해야 한다.',weight:1,need:'rich',options:[
  {label:'직접 신고 (체력 -15)',effects:{energy:-15,stress:6},log:'홈택스와 싸웠다.'},
  {label:'세무사 고용 (-30만원)',effects:{money:-300000,stress:-2},log:'전문가에게 맡겼다.'}]},
 {id:'cat_disturb',title:'고양이가 키보드 위에',text:'치즈가 키보드에 앉아 프롬프트에 "ㅁㄴㅇㄹ"를 입력했다.',weight:3,need:'cat',options:[
  {label:'귀여우니까 용서',effects:{stress:-14,draftPoints:{stability:-3}},log:'프롬프트에 발자국이 남았다.'}]},
 {id:'cold',title:'감기 걸림',text:'콧물이 멈추지 않는다.',weight:2,options:[
  {label:'약 먹고 쉰다',effects:{energy:-30,stress:-5},log:'이번 주 체력 -30.'},
  {label:'강행한다',effects:{stress:15,progressMod:{mul:0.75,weeks:1}},log:'몽롱한 상태로 작업.'}]},
 {id:'reader_letter',title:'긴 편지',text:'한 독자가 당신 작품 덕에 힘든 시기를 버텼다고 편지를 보냈다.',weight:2,need:'published',options:[
  {label:'눈물을 닦는다',effects:{stress:-20,inspiration:15,rep:5},log:'이래서 만든다.'}]},
 {id:'sponsor',title:'협찬 제안',text:'한 브랜드가 작품 안에 자연스럽게 제품을 녹여달라고 한다.',weight:1,need:'rep300',options:[
  {label:'받는다 (+150만원)',effects:{money:1500000,rep:-20,followers:-30},log:'통장은 두둑, 팬들은 살짝 실망.'},
  {label:'거절한다',effects:{rep:25},log:'창작의 순수성을 지켰다.'}]},
 {id:'publisher',title:'출판사의 제안',text:'당신의 세계관을 소설·굿즈로 확장하자는 제안이 왔다.',weight:1,need:'rep800',options:[
  {label:'계약한다 (+500만원)',effects:{money:5000000,rep:80,flag:'publisher'},log:'IP 확장 계약 체결!'},
  {label:'아직은 이르다',effects:{rep:10},log:'다음을 기약했다.'}]},
 {id:'workshop',title:'크리에이터 워크숍',text:'플랫폼 공식 제작 워크숍 참가권이 왔다. 참가비 40만원.',weight:2,options:[
  {label:'참가 (-40만원)',effects:{money:-400000,skillXp:{direction:60,community:30}},log:'연출·커뮤니티 경험치 획득.'},
  {label:'패스',effects:{},log:'다음 기회에.'}]},
 {id:'fan_meeting',title:'팬미팅 요청',text:'팬들이 소규모 팬미팅을 열어달라고 한다.',weight:1,need:'fans2000',options:[
  {label:'연다 (체력 -25)',effects:{energy:-25,followers:200,rep:40,stress:10},log:'팬미팅 성료!'},
  {label:'온라인으로 대체',effects:{followers:80,rep:15},log:'온라인 팬미팅.'}]},
 {id:'donation',title:'후원 크래커',text:'팬들이 창작 후원 크래커를 모아 보냈다.',weight:2,need:'fans1000',options:[
  {label:'감사히 받는다',effects:{gift:3000,stress:-6},log:'후원 선물 3,000 크래커!'}]},
 {id:'lottery',title:'경품 당첨',text:'플랫폼 이벤트에서 경품에 당첨됐다.',weight:1,options:[
  {label:'받는다',effects:{money:300000,stress:-5},log:'횡재!'}]},
 {id:'mentor',title:'선배 작가의 DM',text:'네임드 작가가 당신 작품을 봤다며 조언을 해주겠다고 한다.',weight:2,need:'published',options:[
  {label:'프롬프트를 배운다',effects:{skillXp:{prompt:70},stress:3},log:'프롬프트 경험치가 크게 올랐다.'},
  {label:'기획 비법을 듣는다',effects:{skillXp:{planning:70},stress:3},log:'기획 경험치가 크게 올랐다.'},
  {label:'홍보 노하우를 묻는다',effects:{skillXp:{community:70},stress:3},log:'커뮤니티 경험치가 크게 올랐다.'}]},
 {id:'sequel_request',title:'후속작 요청 폭주',text:'"후속작 언제 나와요" 댓글이 100개를 넘었다.',weight:2,need:'hit',options:[
  {label:'후속작을 준비한다',effects:{inspiration:20,stress:5},log:'후속작 기획에 불이 붙었다.'},
  {label:'새 이야기를 쓴다',effects:{inspiration:8},log:'새로운 세계로.'}]},
 // --- 호재 ---
 {id:'youtube_review',title:'유튜버가 내 작품을 리뷰했다',text:'구독자 30만 유튜버가 "요즘 하는 캐챗" 영상에서 당신 작품을 소개했다.',weight:1,need:'published',options:[
  {label:'영상을 공유한다',effects:{reachMod:{mul:2.0,weeks:2},followers:300,rep:60},log:'유튜브 효과로 2주간 유입 ×2.'}]},
 {id:'whale',title:'큰손 독자',text:'한 독자가 당신 작품에 크래커 1만 개를 선물했다. 메시지: "다음 작품도 기다릴게요."',weight:1,need:'published',options:[
  {label:'감사 인사를 남긴다',effects:{gift:10000,stress:-10,followers:5},log:'선물 10,000 크래커!'}]},
 {id:'official_collab',title:'플랫폼 공식 콜라보 제안',text:'운영팀이 시즌 이벤트 공식 캐릭터 제작을 의뢰했다. 제작비와 메인 노출을 준다.',weight:1,need:'creator',options:[
  {label:'수락 (체력 -40)',effects:{energy:-40,money:2000000,rep:120,followers:200,reachMod:{mul:1.5,weeks:2}},log:'공식 콜라보 제작! 메인 노출.'},
  {label:'일정상 거절',effects:{rep:5},log:'다음 기회에.'}]},
 {id:'fancafe',title:'팬카페가 생겼다',text:'독자들이 당신 작품 팬카페를 만들었다. 가입자가 벌써 200명.',weight:1,need:'fans2000',options:[
  {label:'공식 인증한다',effects:{followers:150,rep:30,stress:-8},log:'팬카페 공식 인증. 든든한 지원군.'}]},
 {id:'goods',title:'굿즈 제안',text:'굿즈 업체가 당신 캐릭터 아크릴 스탠드를 만들자고 한다. 로열티 계약.',weight:1,need:'rep500',options:[
  {label:'계약 (+150만원)',effects:{money:1500000,rep:20,followers:60},log:'굿즈 출시! 로열티 입금.'},
  {label:'거절',effects:{},log:'아직은 이르다.'}]},
 {id:'overseas_viral',title:'해외 커뮤니티 바이럴',text:'당신 작품 번역 캡처가 해외 커뮤니티에서 화제다. 해외 독자가 몰려온다.',weight:1,need:'only',options:[
  {label:'영어 소개를 추가한다 (체력 -15)',effects:{energy:-15,followers:250,money:600000,rep:40},log:'해외 유입과 추가 정산.'},
  {label:'그냥 둔다',effects:{followers:80,money:200000},log:'해외 독자가 조금 늘었다.'}]},
 {id:'nominated',title:'크랙 크리에이터 어워드 후보',text:'연말 어워드 후보 명단에 당신 이름이 올랐다. 갤러리가 술렁인다.',weight:1,need:'rep500',options:[
  {label:'영광이다',effects:{rep:50,followers:100,inspiration:15},log:'어워드 후보 지명.'}]},
 {id:'tax_refund',title:'세금 환급',text:'원천징수된 세금 일부가 환급됐다.',weight:1,need:'rich',options:[
  {label:'받는다',effects:{money:400000},log:'환급 +40만원.'}]},
 {id:'algo_boost',title:'추천 알고리즘 개편 (호재)',text:'추천 알고리즘이 바뀌면서 당신 타겟의 작품이 더 많이 노출된다. 4주간 유입 +30%.',weight:1,need:'published',options:[
  {label:'타이밍 좋다',effects:{reachMod:{mul:1.3,weeks:4}},log:'알고리즘 개편 수혜.'}]},
 {id:'mentor_offer',title:'멘토링 요청',text:'신인 제작자가 멘토링을 부탁한다. 시간은 들지만 커뮤니티 평판이 오른다.',weight:2,need:'rep300',options:[
  {label:'도와준다 (체력 -20)',effects:{energy:-20,rep:40,followers:30,skillXp:{community:30}},log:'신인을 도왔다. 갤러리 평판 상승.'},
  {label:'바빠서 거절',effects:{},log:'미안하다.'}]},
 // --- 악재 ---
 {id:'hacked',title:'계정 해킹 시도',text:'누군가 내 계정에 로그인을 시도했다. 2단계 인증을 안 켜뒀다.',weight:1,options:[
  {label:'보안 설정 (체력 -10)',effects:{energy:-10,stress:5},log:'2단계 인증 설정. 안전.'},
  {label:'설마 뚫리겠어',effects:{hackRisk:1},log:'...'}]},
 {id:'prompt_leak',title:'프롬프트 유출',text:'내 작품 프롬프트가 통째로 복사돼 다른 제작자 작품에 쓰였다. 갤러리에 비교 캡처가 올라왔다.',weight:2,need:'published',options:[
  {label:'운영팀에 신고',effects:{stress:12,rep:15,relationRandom:-30},log:'신고 접수. 해당 작품은 차단됐다.'},
  {label:'프롬을 더 발전시킨다',effects:{stress:8,inspiration:10,skillXp:{prompt:30}},log:'원조는 계속 앞서간다.'}]},
 {id:'refund_wave',title:'플랫폼 장애와 환불 사태',text:'결제 장애로 크래커 환불이 대량 발생했다. 이번 달 정산에서 일부가 차감된다.',weight:1,need:'creator',options:[
  {label:'어쩔 수 없다',effects:{cashPct:-0.15,stress:8},log:'정산 예정액 -15%.'}]},
 {id:'settle_delay',title:'정산 지연 공지',text:'시스템 점검으로 이번 달 정산이 다음 달로 미뤄진다는 공지.',weight:1,need:'creator',options:[
  {label:'기다린다',effects:{delaySettle:1,stress:6},log:'이번 달 정산 이월.'}]},
 {id:'comment_raid',title:'좌표 테러',text:'어딘가에서 좌표가 찍혔다. 악플 수십 개가 한꺼번에 달렸다.',weight:2,need:'published',options:[
  {label:'하나하나 삭제한다 (체력 -20)',effects:{energy:-20,stress:14},log:'밤새 댓글을 지웠다.'},
  {label:'댓글을 닫는다',effects:{closeComments:1,stress:6},log:'최신작 댓글 닫음.'},
  {label:'팬들에게 맡긴다',effects:{stress:10,followers:20,rep:5},log:'팬들이 대신 싸워줬다.'}]},
 {id:'algo_drop',title:'추천 알고리즘 개편 (악재)',text:'알고리즘 개편으로 기존작 노출이 급감했다. 4주간 유입 -30%.',weight:1,need:'published',options:[
  {label:'신작으로 돌파한다',effects:{reachMod:{mul:0.7,weeks:4},inspiration:10},log:'4주간 유입 -30%. 신작이 답이다.'}]},
 {id:'fee_up',title:'플랫폼 수수료 인상',text:'정산 비율은 그대로지만 크래커 환율이 바뀌어 체감 정산이 8주간 10% 줄어든다.',weight:1,need:'creator',options:[
  {label:'받아들인다',effects:{payMod:{mul:0.9,weeks:8},stress:4},log:'8주간 정산 -10%.'}]},
 {id:'release_rush',title:'대형 신작 러시',text:'네임드 제작자 셋이 같은 주에 신작을 냈다. 신작 탭이 가득 찼다.',weight:2,options:[
  {label:'한 주 미룬다',effects:{reachMod:{mul:0.75,weeks:1},inspiration:4},log:'이번 주 유입 -25%.'}]},
 {id:'usernote_abuse',title:'유저노트 악용',text:'일부 독자가 유저노트로 캐릭터를 설정과 다르게 뒤틀어 캡처를 퍼뜨린다. 작품 이미지가 흔들린다.',weight:2,need:'published',options:[
  {label:'프롬에 방어 규칙 추가 (체력 -15)',effects:{energy:-15,workPoints:{stability:3},stress:5},log:'방어 규칙 추가.'},
  {label:'무시한다',effects:{rep:-15,stress:6},log:'인지도 -15.'}]},
 {id:'review_delay',title:'심사 지연',text:'오리지널 심사가 밀려 결과가 2주 늦어진다는 안내.',weight:2,need:'reviewing',options:[
  {label:'기다린다',effects:{reviewDelay:2,stress:6},log:'심사 2주 지연.'}]},
 {id:'false_report',title:'허위 신고',text:'경쟁자로 추정되는 계정이 내 작품을 허위 신고했다. 운영팀 검토 동안 노출이 줄어든다.',weight:1,need:'rep300',options:[
  {label:'소명한다 (체력 -15)',effects:{energy:-15,reachMod:{mul:0.6,weeks:1},stress:10},log:'소명 완료. 1주 노출 감소.'}]},
 {id:'theft',title:'노트북 도난',text:'카페에서 잠깐 자리를 비운 사이 노트북이 사라졌다. 백업은... 반쯤.',weight:1,options:[
  {label:'새로 산다 (-150만원)',effects:{money:-1500000,stress:15,draftPoints:{story:-10,stability:-10}},log:'작업 일부를 잃었다.'},
  {label:'중고 급구 (-50만원)',effects:{money:-500000,stress:20,progressMod:{mul:0.7,weeks:3},draftPoints:{story:-10,stability:-10}},log:'느린 중고. 3주간 속도 -30%.'}]},
 {id:'fan_leave',title:'팬 이탈',text:'최근 작품 방향에 실망한 팬들이 "변했다"며 떠난다는 글이 올라왔다.',weight:2,need:'fans1000',options:[
  {label:'소통 글을 올린다 (체력 -10)',effects:{energy:-10,followers:-40,rep:10},log:'일부는 돌아왔다.'},
  {label:'내 길을 간다',effects:{followers:-120,inspiration:8},log:'팔로워 -120. 하지만 영감은 올랐다.'}]},
 {id:'ill',title:'병원 신세',text:'과로로 입원했다. 이번 주는 아무것도 못 한다.',weight:1,need:'stress60',options:[
  {label:'쉰다',effects:{energy:-100,stress:-30,money:-300000},log:'입원. 체력 소진, 스트레스 -30.'}]},
 {id:'rival_diss',title:'{rival}의 저격',text:'{rival} 작가가 갤러리에 당신 작품을 돌려 까는 글을 올렸다. "요즘 설정 베끼는 제작자 많네요."',weight:2,need:'rep150',options:[
  {label:'정면 반박',effects:{stress:15,rep:20,relation:-40,followers:30},log:'설전. 구경꾼이 늘었다.'},
  {label:'무대응',effects:{stress:6,relation:-15},log:'조용히 넘겼다.'},
  {label:'DM으로 오해를 푼다',effects:{stress:8,relation:20},log:'알고 보니 오해였다.'}]},
 {id:'rival_shoutout',title:'{rival}의 추천',text:'{rival} 작가가 자기 팔로워들에게 당신 작품을 추천했다.',weight:2,need:'relationGood',options:[
  {label:'감사 인사',effects:{followers:180,rep:25,relation:10},log:'팔로워 급증!'}]},
 {id:'ad_policy',title:'성인 작품 노출 제한 강화',text:'성인 작품의 추천 노출이 제한된다는 정책 변경. 4주간 성인 작품 유입 -40%.',weight:1,need:'hasAdult',options:[
  {label:'받아들인다',effects:{adultMod:{mul:0.6,weeks:4},stress:5},log:'성인 작품 4주간 노출 -40%.'}]},
 {id:'bug_week',title:'이미지 코드 버그',text:'플랫폼 버그로 상황 이미지가 한 주 동안 안 뜬다. 비주얼이 강점인 작품이 타격.',weight:2,need:'published',options:[
  {label:'공지로 안내한다',effects:{workPoints:{visual:-2},stress:4},log:'공개작 비주얼 체감 하락.'}]},
 {id:'family',title:'가족의 걱정',text:'"그 AI 캐릭터 만드는 거... 돈은 되니?" 명절 식탁이 조용해졌다.',weight:2,need:'poor',options:[
  {label:'정산 내역을 보여준다',effects:{stress:-8},log:'...숫자를 보여줬다.'},
  {label:'말을 돌린다',effects:{stress:10},log:'밥만 먹었다.'}]}
];
export const ENDINGS=[
 {id:'original_star',name:'오리지널 간판 작가',desc:'플랫폼이 직접 매입한 당신의 세계관은 공식 콘텐츠가 됐다. 입구에 당신 작품이 걸려 있다.',cond:'originals>=3&&rep>=1500'},
 {id:'pro',name:'전업 크리에이터',desc:'정산만으로 생활이 가능해졌다. 매월 초 정산 알림이 월급보다 든든하다.',cond:'creator>=1&&settled>=60000000'},
 {id:'named',name:'팔로워 만 명의 네임드',desc:'신작을 올리면 알림만으로 랭킹에 든다. 당신 이름이 곧 장르다.',cond:'followers>=20000'},
 {id:'gallery_legend',name:'갤러리의 전설',desc:'정보글·프롬 공유·홍보탭. 커뮤니티는 당신을 선배라 부른다.',cond:'rep>=2500'},
 {id:'artisan',name:'아는 사람은 아는 작가',desc:'플레이 수는 평범하지만 댓글란은 언제나 뜨겁다. 완성도가 당신의 서명이다.',cond:'avgQuality>=78&&works>=8'},
 {id:'banned',name:'다른 플랫폼으로',desc:'누적된 제재로 크리에이터 권한을 잃었다. 작품과 경험은 남았다. 다음엔 규칙 안에서.',cond:'sanctions>=4'},
 {id:'burnout',name:'불꽃처럼',desc:'모든 것을 태웠다. 쉬어야 할 때다. 다음엔 조금 더 자신을 아끼자.',cond:'burnouts>=3'},
 {id:'hobbyist',name:'행복한 취미 제작자',desc:'큰 성공은 없었지만 스트레스 없이 이야기를 즐겼다. 그걸로 충분하다.',cond:'avgStress<=30&&works>=4'},
 {id:'rookie',name:'아직 끝나지 않은 이야기',desc:'기록은 남았고 경험도 쌓였다. 다음 회차가 진짜 시작이다.',cond:'true'},
];
export const LEGACY_SHOP=[
 {id:'bg_novelist',name:'배경: 전직 웹소설 작가',cost:3,desc:'기획 Lv.3·프롬프트 Lv.2·팔로워 300으로 시작'},
 {id:'bg_rich',name:'배경: 금수저',cost:5,desc:'1,200만원·오피스텔로 시작'},
 {id:'bg_galluser',name:'배경: 갤러리 고인물',cost:3,desc:'커뮤니티 Lv.3·인지도 80으로 시작'},
 {id:'tr_thrifty',name:'특성: 절약왕',cost:2,desc:'모든 지출 -15%'},
 {id:'tr_visualist',name:'특성: 비주얼 장인',cost:2,desc:'비주얼 포인트 +25%'},
 {id:'tr_merchant',name:'특성: 정산 장인',cost:2,desc:'선물·정산 수익 +12%'},
 {id:'tr_lorekeeper',name:'특성: 설정 덕후',cost:3,desc:'안정성 포인트 +20%'},
 {id:'tr_lucky',name:'특성: 알고리즘의 선택',cost:3,desc:'반응 뜨거운 신작 확률 +'},
 {id:'tr_twoslots',name:'특성: 멀티태스커',cost:4,desc:'제작 슬롯 +1'},
 {id:'two_traits',name:'특성 2개 선택',cost:4,desc:'새 회차에서 특성을 2개 고를 수 있다'},
 {id:'start_money',name:'선배의 통장',cost:2,desc:'매 회차 시작 자금 +200만원'},
 {id:'start_skill',name:'선배의 노트',cost:3,desc:'매 회차 모든 역량 +1'},
 {id:'start_fans',name:'팬클럽 계승',cost:3,desc:'매 회차 팔로워 +500'},
 {id:'creator_fast',name:'크리에이터 패스트트랙',cost:4,desc:'크리에이터 미션 조건 절반'},
 {id:'all_genres',name:'장르 올패스',cost:4,desc:'모든 장르를 처음부터 사용'},
 {id:'long_career',name:'경력 연장',cost:5,desc:'회차 길이 3년 → 5년'},
];
export const TROPHIES=[
 {id:'first',name:'첫 공개',desc:'첫 작품을 전체 공개'},
 {id:'ten',name:'작품 10개',desc:'전체 공개 작품 10개'},
 {id:'mission',name:'크리에이터 미션 돌입',desc:'미션 참여 조건 달성'},
 {id:'creator',name:'정식 크리에이터',desc:'크리에이터 미션 완료'},
 {id:'only',name:'ONLY 배지',desc:'첫 크랙 온리 등록'},
 {id:'original',name:'ORIGINAL 배지',desc:'첫 오리지널 선정'},
 {id:'sequel',name:'후속작 승인',desc:'오리지널 후속작 시리즈 심사 통과'},
 {id:'hot',name:'반응 뜨거운 신작',desc:'신작 탭 알고리즘 선정'},
 {id:'weekly1',name:'주간 1위',desc:'주간 랭킹 1위'},
 {id:'monthly1',name:'이달의 작품',desc:'월간 랭킹 1위'},
 {id:'fans1k',name:'팔로워 1,000',desc:'팔로워 1,000명'},
 {id:'fans10k',name:'팔로워 10,000',desc:'팔로워 10,000명'},
 {id:'settle1m',name:'첫 100만원 정산',desc:'월 정산 100만원 돌파'},
 {id:'settle10m',name:'월 천만원',desc:'월 정산 1,000만원 돌파'},
 {id:'comments100',name:'댓글 100',desc:'한 작품 댓글 100개'},
 {id:'collab',name:'콜라보',desc:'라이벌과 콜라보 성공'},
 {id:'clean',name:'무사고 1년',desc:'제재 없이 1년 완주'},
 {id:'survivor',name:'번아웃 생존자',desc:'번아웃 후 오리지널 선정'},
 {id:'studio4',name:'펜트하우스',desc:'최고 작업실 입주'},
 {id:'endings3',name:'다회차 제작자',desc:'엔딩 3종 수집'},
 {id:'allgenre',name:'장르 올라운더',desc:'7개 장르로 공개'},
 {id:'insights10',name:'독자 분석가',desc:'독자 인사이트 10개 발견'},
 {id:'contest',name:'입상',desc:'공모전 입상'},
 {id:'grandprix',name:'대상',desc:'공모전 대상 수상'},
 {id:'award',name:'어워드 수상',desc:'연말 크리에이터 어워드 수상'},
];
// 회차를 넘어 유지되는 독자 인사이트(발견형 지식)
export const INSIGHTS=[
 {id:'followers_notify',text:'팔로워에게 신작 알림이 간다. 팔로워가 많을수록 첫 주 유입이 안정적이다.',cond:'followers>=300'},
 {id:'newtab',text:'신작 탭 노출은 공개 후 2주. 첫 주 좋아요 비율이 높으면 "반응 뜨거운 신작"으로 2주 더 노출된다.',cond:'hot>=1'},
 {id:'female_story',text:'여성향 독자는 서사·안정성이 높은 작품에 오래 머문다.',cond:'target_female>=2'},
 {id:'male_sim',text:'남성향 독자는 시뮬·스탯·분기가 있는 작품에서 메시지를 많이 보낸다.',cond:'target_male>=2'},
 {id:'adult_pay',text:'성인 작품은 유입은 좁지만 유료 크래커 소비가 1.7배다.',cond:'adult>=1'},
 {id:'length_tradeoff',text:'답변 길이를 늘리면 크래커 소모(정산)는 늘지만 가벼운 독자는 떨어진다.',cond:'length3>=1'},
 {id:'gallery_adult',text:'갤러리 홍보탭은 성인 작품에 특히 효과적이지만 악플 확률도 높다.',cond:'gallery>=3'},
 {id:'tags_meta',text:'월별 메타 태그를 맞추면 검색·추천 유입이 크게 는다. 트렌드 리포트로 다음 달을 미리 볼 수 있다.',cond:'tagmeta>=1'},
 {id:'only_rate',text:'크랙 온리는 정산 비율을 1.5% → 2.5%로 올리고 해외 노출 기회를 준다.',cond:'only>=1'},
 {id:'original_private',text:'오리지널 심사는 한 번도 전체 공개된 적 없는 스토리만 신청할 수 있다.',cond:'original_apply>=1'},
 {id:'creator_gate',text:'크리에이터가 되기 전엔 대화 정산이 없다. 선물(70%)과 부업으로 버텨야 한다.',cond:'weeks>=8'},
 {id:'keyword_stab',text:'키워드북을 채우면 긴 대화에서도 설정이 덜 무너진다.',cond:'keyword>=2'},
 {id:'fresh_update',text:'업데이트는 신선도를 되돌려 알림과 재노출을 만든다.',cond:'updates>=3'},
 {id:'ripped_risk',text:'퍼온 이미지는 언젠가 적발된다. 최고 수준 제재는 경고 없이 온다.',cond:'ripped_caught>=1'},
 {id:'fanwork',text:'2차 창작은 팬덤 유입이 크지만 온리·오리지널이 막히고 신고에 취약하다.',cond:'fanwork>=1'},
];

export const CONTESTS=[
 {id:'tag',name:'#{tag} 테마 공모전',desc:'이달의 메타 태그를 주제로. 태그가 포함된 전체 공개 작품만 참가 가능.',prize:[3000000,1500000,500000,100000],rep:[120,70,35,10]},
 {id:'genre',name:'{genre} 장르 공모전',desc:'지정 장르 작품만 참가 가능.',prize:[3000000,1500000,500000,100000],rep:[120,70,35,10]},
 {id:'target',name:'{target} 챌린지',desc:'지정 타겟 작품만 참가. 타겟 독자 투표 반영.',prize:[2500000,1200000,400000,100000],rep:[100,60,30,10]},
 {id:'story',name:'스토리 크리에이터 대전',desc:'스토리 유형만. 볼륨(선택 탭 수)이 심사에 크게 반영.',prize:[5000000,2000000,800000,200000],rep:[160,90,45,15]},
 {id:'rookie',name:'신인 발굴전',desc:'인지도 300 미만 제작자만. 심사 경쟁이 약하다.',prize:[1500000,800000,300000,100000],rep:[90,50,25,10]},
 {id:'buyout',name:'오리지널 집중 매입 대회',desc:'오리지널 심사 통과율 가산. 수상작은 즉시 오리지널 선정(구매금 별도).',prize:[30000000,10000000,3000000,500000],rep:[250,150,80,30]},
];
export const CONTEST_RANKS=['대상','최우수상','우수상','입선'];
export const YEAR_AWARDS=[
 {id:'story',name:'올해의 스토리',pick:'story'},
 {id:'character',name:'올해의 캐릭터',pick:'character'},
 {id:'rookie',name:'신인 크리에이터상',pick:'rookie'},
 {id:'female',name:'여성향 독자 선정',pick:'female'},
 {id:'male',name:'남성향 독자 선정',pick:'male'},
 {id:'comments',name:'댓글 폭발상',pick:'comments'},
 {id:'gift',name:'선물왕',pick:'gift'},
 {id:'steady',name:'꾸준함상',pick:'steady'},
];
export const FEED_TEMPLATES={
 rival_new:['{rival}님이 신작 「{title}」을(를) 공개했어요','「{title}」 — {rival} · 신작 탭 진입','{rival}: 신작 올렸습니다. 많관부'],
 rival_only:['{rival}님의 「{title}」이(가) 크랙 온리로 등록됐어요'],
 rival_original:['🎉 {rival}님의 「{title}」 크랙 오리지널 선정'],
 rival_post:['{rival}: 요즘 유입이 반토막인데 다들 그런가요?','{rival}: 키워드북 300줄 채우니까 안정성 확 올라감','{rival}: 홍보탭 또 싸움났네 ㅋㅋ','{rival}: 이번 달 메타 태그 #{tag} 미쳤다','{rival}: 하이퍼챗으로 테스트하니까 다른 작품이 됨','{rival}: 정산 들어왔다! 치킨 사먹어야지','{rival}: 심사 결과 기다리는 중... 손 떨림','{rival}: 프롬 공유합니다. 자유롭게 쓰세요','{rival}: 악플 때문에 댓글 닫았습니다','{rival}: 번아웃이라 당분간 쉽니다'],
 hot:['🔥 「{title}」 반응 뜨거운 신작 진입'],
 contest_open:['📣 {name} 접수 시작! {desc}'],
};
