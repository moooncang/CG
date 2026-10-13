// 크랙 작가 키우기 — 콘텐츠 데이터 (v3: 크랙 제작자 생태계 기반 재설계)
// 실제 서비스의 공개 정책(크리에이터 미션, 크랙 온리, 크랙 오리지널, 월 정산, 운영 정책)을 참고한 게임용 재해석입니다.
// 수치·독자 반응·정산액은 모두 시뮬레이션이며 실제 플랫폼과 제휴하지 않습니다.

export const WEEKS_PER_YEAR=48, WEEKS_PER_MONTH=4, CAREER_YEARS=3;
export const WON_PER_CRACKER=35;            // 크래커 1개의 원화 환산(게임용)
export const SETTLE_RATE={base:0.015,only:0.025,original:0.025}; // 크래커 사용액 대비 정산 비율
export const GIFT_RATE={creator:0.9,normal:0.7};
export const CASHOUT_MIN=10000;
export const CREATOR_REQ={works:10,players:1000,followers:500,messages:100000};


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
 {id:'legend_challenge',difficulty:'nightmare',symbol:'trophy',title:'상위권 제작자 공개 도전',text:'상위권 제작자들이 공개 제작 챌린지를 연다. 단기 노출 기회지만 부담도 크다.',options:[
  {label:'참가 · 2주간 신규 노출 +25%, 스트레스 +18',effects:{reachMod:{mul:1.25,weeks:2},stress:12},log:'상위권 챌린지에 참가했다.'},
  {label:'내 작업에 집중 · 영감 +14, 2주간 신규 노출 -15%',effects:{inspiration:14,reachMod:{mul:0.85,weeks:2}},log:'노출 경쟁 대신 다음 기획을 준비했다.'}]},
 {id:'legend_precision',difficulty:'nightmare',symbol:'gear',title:'고난도 프롬프트 검증',text:'복잡한 프롬프트의 검증 기회가 생겼다. 집중 연구와 안정적인 일정 사이에서 선택하자.',options:[
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

// ================= 난이도 =================
// 난이도는 수치 전반에 곱해진다. legacyMul은 유산 획득 배율.
export const DIFFICULTIES=[
 // startMoney/reach는 UI 호환용 별칭(money/exposure와 동일)
 {id:'easy',name:'입문',symbol:'heart',stats:1.15,desc:'유입·정산 +30%, 지출 -15%, 악재 절반, 라이벌 약함. 유산 ×0.5',money:1.3,energy:10,exposure:1.3,settle:1.3,cost:0.85,rival:0.8,rivalGrow:0.8,bad:0.5,stress:0.8,req:0.8,review:1.2,contest:0.8,legacyMul:0.5,bankrupt:null},
 {id:'normal',name:'보통',symbol:'book',stats:1,desc:'기준 난이도. 유산 ×1',money:1,energy:0,exposure:1,settle:1,cost:1,rival:1,rivalGrow:1,bad:1,stress:1,req:1,review:1,contest:1,legacyMul:1,bankrupt:null},
 {id:'hard',name:'하드',symbol:'sword',stats:0.9,desc:'유입 -25%, 정산 -15%, 지출 +20%, 체력 -10, 악재 1.6배, 라이벌 1.3배, 미션 조건 1.5배, 제재 3회면 권한 박탈. 유산 ×1.6',money:0.7,energy:-10,exposure:0.75,settle:0.85,cost:1.2,rival:1.3,rivalGrow:1.3,bad:1.6,stress:1.3,req:1.5,review:0.8,contest:1.25,legacyMul:1.6,bankrupt:-3000000,strikes:3},
 {id:'nightmare',name:'지옥',symbol:'trophy',stats:0.8,desc:'유입 -45%, 정산 -30%, 지출 +40%, 체력 -20, 악재 2.2배, 라이벌 1.6배(성장 가속), 미션 조건 2배, 제재 2회 박탈, 자금 -200만원 이하면 파산 엔딩. 유산 ×2.5',money:0.5,energy:-20,exposure:0.55,settle:0.7,cost:1.4,rival:1.6,rivalGrow:1.7,bad:2.2,stress:1.5,req:2,review:0.65,contest:1.5,legacyMul:2.5,bankrupt:-2000000,strikes:2},
];
for(const d of DIFFICULTIES){d.startMoney=d.money;d.reach=d.exposure;}
// ================= 추가 콘텐츠 =================
export const ITEMS_EXTRA=[
 {id:'standing',name:'스탠딩 데스크',price:900000,desc:'최대 체력 +5, 스트레스 회복 +2',effect:{energy:5,recover:2}},
 {id:'nas',name:'백업 NAS',price:700000,desc:'도난·고장 이벤트의 작업 손실 방지',effect:{backup:1}},
 {id:'mic',name:'방송용 마이크',price:1100000,desc:'SNS·디스코드 홍보 효과 +10%',effect:{promoMul:0.1}},
 {id:'ssd',name:'대용량 SSD',price:500000,desc:'이미지 작업 진행 +4',effect:{mediaProgress:4}},
 {id:'ring',name:'타이머 링',price:300000,desc:'작업당 스트레스 -1',effect:{workStress:-1}},
 {id:'aroma',name:'아로마 디퓨저',price:250000,desc:'영감 +2/주, 스트레스 회복 +2',effect:{inspiration:2,recover:2}},
 {id:'vr',name:'VR 헤드셋',price:1800000,desc:'다른 작품 플레이 영감 +8',effect:{readBonus:8}},
 {id:'frame',name:'수상 액자',price:400000,desc:'수상 1개당 인지도 +1/주',effect:{awardRep:1}},
];
export const SUBSCRIPTIONS_EXTRA=[
 {id:'analytics',name:'독자 분석 대시보드',monthly:40000,desc:'작품별 이탈 원인 표시, 업데이트 효과 +20%'},
 {id:'insurance',name:'크리에이터 보험',monthly:70000,desc:'해킹·도난·입원 이벤트 손실 전액 보전'},
];
export const JOBS_EXTRA=[
 {id:'translate',name:'프롬프트 번역 외주',energy:20,money:350000,stress:7,rep:60,desc:'인지도 60 필요. 해외 서비스용 번역.',xp:'prompt'},
 {id:'thumbnail',name:'썸네일 제작 대행',energy:18,money:300000,stress:6,rep:80,desc:'인지도 80 필요. 연출 경험치 +.',xp:'direction'},
 {id:'judge',name:'공모전 심사위원',energy:15,money:800000,stress:5,rep:600,desc:'인지도 600 필요. 커뮤니티 경험치 +.',xp:'community'},
];
export const LIFE_EXTRA=[
 {id:'journal',name:'설정 노트 정리',energy:8,stress:-3,inspiration:10,desc:'영감 +10, 기획 경험치 +4',xp:'planning'},
 {id:'trip',name:'당일치기 여행 (-8만원)',energy:25,stress:-30,inspiration:18,money:-80000,desc:'스트레스 -30, 영감 +18'},
 {id:'stream',name:'제작 방송',energy:15,stress:4,inspiration:2,followers:12,desc:'팔로워 +12, 인지도 +3',rep:3},
];
export const HELPERS_EXTRA=[
 {id:'voice',name:'단축어·가이드 외주',price:200000,desc:'단축어 진행 +60, 어필 포인트 +8',module:'shortcut',progress:60,stat:'appeal',points:8},
 {id:'lore',name:'키워드북 대필',price:350000,desc:'키워드북 진행 +50, 안정성 포인트 +14',module:'keyword',progress:50,stat:'stability',points:14},
];
export const TAGS_EXTRA=['학원제','졸업','첫사랑','재회','원수','복수','스승','제자','쌍둥이','기억상실','시한부','인어','천사','악마','탐정물','법정','요리','스포츠','밴드부','유학'];
export const ENDINGS_EXTRA=[
 {id:'contract',name:'전속 스튜디오의 간판',desc:'스튜디오 소속으로 안정과 간섭을 맞바꿨다. 당신의 이름 옆엔 늘 회사 로고가 붙는다.',cond:'studioContract>=1&&rep>=1000'},
 {id:'ip',name:'IP 제국',desc:'소설·웹툰·굿즈. 캐릭터 챗에서 시작한 세계관이 다른 매체로 번졌다.',cond:'webtoon>=1&&publisher>=1'},
 {id:'union',name:'연대의 작가',desc:'혼자가 아닌 함께. 크리에이터 연대의 얼굴이 되었다.',cond:'unionWin>=1&&rep>=800'},
 {id:'ghost',name:'그림자 작가',desc:'이름은 알려지지 않았지만, 당신 손을 거친 작품이 랭킹을 채운다.',cond:'ghostJobs>=3'},
 {id:'bankrupt',name:'파산',desc:'통장이 바닥났다. 꿈은 남았지만 월세는 기다려주지 않았다.',cond:'bankrupt>=1'},
 {id:'ironman',name:'지옥을 건넌 자',desc:'가장 가혹한 조건에서 3년을 버텼다. 당신을 꺾을 수 있는 것은 이제 없다.',cond:'nightmare>=1&&creator>=1'},
];
export const INSIGHTS_EXTRA=[
 {id:'contest_timing',text:'대회 공고 직후 공개한 작품이 심사 기간 동안 발화를 가장 많이 쌓는다.',cond:'contests>=1'},
 {id:'difficulty',text:'난이도가 높을수록 유산 배율이 커진다. 지옥은 2.5배.',cond:'hard>=1'},
 {id:'studio_cost',text:'전속 계약은 안정적이지만 정산을 나눠야 한다. 협상 역량(커뮤니티)이 조건을 바꾼다.',cond:'studioContract>=1'},
 {id:'backup',text:'백업 NAS와 보험은 악재 이벤트의 손실을 막아준다.',cond:'backup>=1'},
 {id:'season_summer',text:'여름 방학(7~8월)엔 학생 독자가 늘고, 연말(12월)엔 선물이 늘어난다.',cond:'summer>=1'},
 {id:'path',text:'크리에이터 노선 선택은 되돌릴 수 없다. 다작·완성도·커뮤니티 중 플레이 스타일에 맞게.',cond:'path>=1'},
 {id:'strikes',text:'하드 이상에서는 제재 누적 한도가 줄어든다. 퍼온 이미지는 한 번이면 끝이다.',cond:'sanction_hard>=1'},
 {id:'superfan',text:'열성 팬과의 관계는 축복이자 위험이다. 거리를 두는 선택도 있다.',cond:'superfan>=1'},
 {id:'rival_relation',text:'라이벌과의 관계가 좋으면 추천·콜라보가, 나쁘면 저격·허위 신고가 온다.',cond:'relation>=1'},
 {id:'longtail',text:'완결된 작품도 시즌 업데이트로 되살릴 수 있다. 팔로워 알림이 다시 간다.',cond:'revive>=1'},
];
export const LEGACY_EXTRA=[
 {id:'nightmare_unlock',name:'지옥 난이도 해금',cost:2,desc:'난이도 "지옥"을 선택할 수 있다'},
 {id:'start_item',name:'선배의 장비',cost:3,desc:'매 회차 인체공학 의자·설정집 노트 보유'},
 {id:'rival_friend',name:'갤러리 인맥',cost:2,desc:'매 회차 라이벌 3명과 우호 관계로 시작'},
 {id:'insight_bonus',name:'독자 분석가',cost:3,desc:'발견한 인사이트 1개당 유입 +1% (최대 25%)'},
 {id:'second_chance',name:'재심 청구',cost:3,desc:'오리지널 심사 미선정 시 1회 자동 재심'},
 {id:'legacy_bank',name:'유산 이자',cost:4,desc:'회차 종료 시 유산 +1 추가'},
];

// ================= 분기점 아크 & 대량 이벤트 =================
// chain:true 이벤트는 랜덤으로 뜨지 않고 schedule/분기로만 등장한다. need는 문자열 또는 배열.
export const EVENTS_EXTRA=[
 // ---------- 아크 A: 전속 스튜디오 ----------
 {id:'studio_offer',title:'전속 계약 제안',text:'제작 스튜디오 "루미나 크리에이티브"가 전속 계약을 제안했다. 매주 활동비를 주고 홍보를 대신해 주지만, 정산의 30%를 가져가고 작품 방향에 관여한다.',weight:1,once:true,need:['creator1','rep200','noflag:studio','noflag:studio_declined'],options:[
  {label:'계약한다 (주 40만원, 정산 -30%)',effects:{flag:'studio',salaryDelta:400000,payPerm:0.7,exposurePerm:1.2,schedule:[['studio_interfere',10]],rep:20},log:'루미나와 전속 계약. 매주 활동비, 정산 70%.'},
  {label:'조건을 협상한다 (커뮤니티 Lv.4)',needSkill:['community',4],effects:{flag:'studio',flag2:'studio_good',salaryDelta:400000,payPerm:0.85,exposurePerm:1.2,schedule:[['studio_interfere',10]],rep:30},log:'협상 성공. 정산 85%에 계약.'},
  {label:'거절한다',effects:{flag:'studio_declined',rep:10,inspiration:5},log:'내 이름으로 간다.'}]},
 {id:'studio_interfere',title:'스튜디오의 요구',text:'루미나가 "다음 작품은 남성향 시뮬로, 성인 등급으로" 지시했다. 계약서엔 "방향 협의" 조항이 있다.',chain:true,options:[
  {label:'따른다',effects:{money:500000,stress:12,inspiration:-10,schedule:[['studio_renew',14]]},log:'지시대로 만들었다. 보너스 50만원, 영감은 떨어졌다.'},
  {label:'거부한다',effects:{flag:'studio_tension',stress:8,schedule:[['studio_breakup',6]]},log:'거부했다. 관계가 틀어졌다.'}]},
 {id:'studio_breakup',title:'계약 해지 통보',text:'루미나가 계약 해지를 통보하며 위약금 200만원을 요구했다.',chain:true,options:[
  {label:'위약금을 낸다 (-200만원)',effects:{money:-2000000,unflag:'studio',salaryDelta:-400000,payPerm:'reset',exposurePerm:'reset',stress:10,rep:5},log:'위약금을 내고 자유의 몸이 됐다.'},
  {label:'법적 대응한다',effects:{stress:25,coin:{win:{money:500000,rep:60,unflag:'studio',salaryDelta:-400000,payPerm:'reset',exposurePerm:'reset'},lose:{money:-3000000,rep:-40,unflag:'studio',salaryDelta:-400000,payPerm:'reset',exposurePerm:'reset'}},chance:0.5},log:'분쟁 결과가 나왔다.'},
  {label:'사과하고 잔류한다',effects:{unflag:'studio_tension',stress:15,schedule:[['studio_renew',12]]},log:'고개를 숙였다.'}]},
 {id:'studio_renew',title:'계약 갱신',text:'루미나가 1년 계약 갱신을 제안했다. 이번엔 정산 분배를 조정할 수 있다.',chain:true,options:[
  {label:'갱신 (정산 80%)',effects:{payPerm:0.8,rep:20,schedule:[['studio_interfere',16]]},log:'계약 갱신. 정산 80%.'},
  {label:'종료한다',effects:{unflag:'studio',salaryDelta:-400000,payPerm:'reset',exposurePerm:'reset',rep:15,inspiration:10},log:'계약 종료. 다시 혼자다.'}]},
 // ---------- 아크 B: 유령 작가 ----------
 {id:'ghost_offer',title:'대필 의뢰',text:'네임드 제작자가 DM을 보냈다. "제 이름으로 낼 스토리 프롬을 써주실 수 있나요? 150만원 드립니다. 비밀로요."',weight:1,once:true,need:['rep150','noflag:ghost_declined'],options:[
  {label:'수락한다 (+150만원)',effects:{money:1500000,flag:'ghost',counter:'ghostJobs',stress:6,schedule:[['ghost_followup',8]]},log:'대필 완료. 통장은 두둑, 이름은 없다.'},
  {label:'거절한다',effects:{flag:'ghost_declined',rep:5},log:'내 이름으로만 쓴다.'}]},
 {id:'ghost_followup',title:'대필의 결과',text:'당신이 대필한 작품이 랭킹 1위에 올랐다. 의뢰인은 추가 의뢰를 하고 싶어 한다.',chain:true,options:[
  {label:'계속한다 (+200만원)',effects:{money:2000000,counter:'ghostJobs',stress:8,schedule:[['ghost_exposed',10]]},log:'두 번째 대필.'},
  {label:'이제 그만둔다',effects:{rep:5,inspiration:10},log:'그림자에서 나왔다.'}]},
 {id:'ghost_exposed',title:'대필 폭로',text:'갤러리에 "네임드 작품 사실 대필" 폭로글이 올라왔다. 당신 이름이 거론된다.',chain:true,options:[
  {label:'인정한다',effects:{rep:-80,followers:60,stress:15,counter:'ghostJobs'},log:'솔직함에 일부는 박수를, 일부는 야유를.'},
  {label:'부인한다',effects:{stress:25,coin:{win:{rep:10},lose:{rep:-200,followers:-150}},chance:0.5},log:'결과가 갈렸다.'}]},
 // ---------- 아크 C: 크리에이터 연대 ----------
 {id:'union_call',title:'크리에이터 연대 제안',text:'수수료·정산 문제로 제작자들이 공동 성명을 준비한다. 서명하면 플랫폼과 각을 세우는 셈이다.',weight:1,once:true,need:['creator','noflag:union_declined'],options:[
  {label:'서명한다',effects:{flag:'union',rep:30,stress:6,schedule:[['union_result',6]]},log:'연대에 서명했다.'},
  {label:'조용히 지켜본다',effects:{flag:'union_declined'},log:'침묵.'}]},
 {id:'union_result',title:'연대의 결과',text:'플랫폼이 공식 답변을 냈다.',chain:true,options:[
  {label:'결과 확인',effects:{coin:{win:{payMod:{mul:1.15,weeks:12},rep:60,counter:'unionWin',followers:80},lose:{reachMod:{mul:0.85,weeks:8},rep:-20,stress:10}},chance:0.55},log:'답변이 나왔다.'}]},
 // ---------- 아크 D: 열성 팬 ----------
 {id:'superfan',title:'열성 팬 "루나"',text:'매주 선물과 장문 댓글을 남기는 독자가 있다. DM으로 작품 설정집을 만들어도 되냐고 묻는다.',weight:1,once:true,need:['fans800','noflag:superfan_no'],options:[
  {label:'소통한다',effects:{flag:'superfan',counter:'superfan',followers:30,stress:-5,schedule:[['superfan_mod',8]]},log:'루나와 친해졌다.'},
  {label:'거리를 둔다',effects:{flag:'superfan_no',counter:'superfan'},log:'적당한 거리.'}]},
 {id:'superfan_mod',title:'루나의 제안',text:'루나가 디스코드 서버 관리자를 자원했다. 악플 관리와 공지를 대신해 주겠다고.',chain:true,options:[
  {label:'맡긴다',effects:{flag:'moderator',recoverPerm:3,schedule:[['superfan_turn',12]]},log:'루나가 관리자가 됐다. 매주 스트레스 -3.'},
  {label:'직접 관리한다',effects:{stress:4,schedule:[['superfan_gift',10]]},log:'내 서버는 내가.'}]},
 {id:'superfan_turn',title:'루나의 변화',text:'루나가 다른 팬들을 밀어내고 당신 작품의 "공식 해석"을 강요하기 시작했다. 서버가 조용해졌다.',chain:true,options:[
  {label:'관리자 권한을 회수한다',effects:{unflag:'moderator',recoverPerm:-3,stress:12,followers:-40,relationFan:-1},log:'루나가 떠났다. 서버는 다시 시끄럽지만 자유롭다.'},
  {label:'대화로 푼다',effects:{stress:8,coin:{win:{followers:40,stress:-10},lose:{followers:-100,stress:15,unflag:'moderator',recoverPerm:-3}},chance:0.6},log:'대화의 결과.'}]},
 {id:'superfan_gift',title:'루나의 선물',text:'루나가 생일이라며 크래커 2만 개를 선물했다. 메시지: "작가님 덕분에 버텨요."',chain:true,options:[
  {label:'감사 편지를 쓴다',effects:{gift:20000,stress:-12,followers:20},log:'선물 2만 크래커.'}]},
 // ---------- 아크 F: 전업 선언 (직장인) ----------
 {id:'quit_job',title:'퇴사할까',text:'정산이 월급을 넘보기 시작했다. 회사를 그만두면 체력이 늘지만 월급은 사라진다.',weight:2,once:true,need:['bg:worker','creator','noflag:fulltime'],options:[
  {label:'퇴사한다',effects:{flag:'fulltime',salaryDelta:-280000,energyMaxDelta:25,stress:-10,inspiration:15,schedule:[['fulltime_doubt',16]]},log:'사직서 제출. 전업 크리에이터.'},
  {label:'투잡을 유지한다',effects:{stress:4},log:'아직은 안전하게.'}]},
 {id:'fulltime_doubt',title:'전업의 무게',text:'퇴사 4개월. 정산은 들쭉날쭉하고 부모님은 걱정한다. 다시 취업 제안이 왔다.',chain:true,options:[
  {label:'창작에 집중한다',effects:{inspiration:20,stress:5,rep:10},log:'돌아가지 않는다.'},
  {label:'재취업한다',effects:{unflag:'fulltime',salaryDelta:280000,energyMaxDelta:-25,stress:-5},log:'다시 투잡.'}]},
 // ---------- 아크 G: IP 확장 ----------
 {id:'webtoon_offer',title:'웹툰화 제안',text:'출판사가 당신 세계관의 웹툰화를 제안했다. 원작료는 적지만 노출은 거대하다.',weight:1,once:true,need:['flag:publisher','noflag:webtoon'],options:[
  {label:'계약한다',effects:{flag:'webtoon',money:3000000,schedule:[['webtoon_launch',12]]},log:'웹툰 계약! 1년 뒤 연재.'},
  {label:'직접 만들겠다',effects:{rep:20,inspiration:10},log:'내 IP는 내가.'}]},
 {id:'webtoon_launch',title:'웹툰 연재 시작',text:'웹툰이 연재를 시작했다. 원작 캐릭터 챗으로 독자가 몰려온다.',chain:true,options:[
  {label:'원작 작품을 업데이트한다',effects:{reachMod:{mul:1.6,weeks:4},followers:600,rep:120,counter:'webtoon'},log:'웹툰 효과로 유입 폭증.'}]},
 // ---------- 아크 H: 오리지널 분쟁 ----------
 {id:'original_dispute',title:'오리지널 수정 요청',text:'플랫폼이 오리지널 작품의 특정 전개를 "브랜드 가이드에 맞지 않는다"며 수정을 요청했다.',weight:2,once:true,need:'originals1',options:[
  {label:'수정한다 (체력 -20)',effects:{energy:-20,workPoints:{story:-3},rep:10},log:'수정 완료. 원작의 맛은 조금 줄었다.'},
  {label:'창작의 자유를 주장한다',effects:{stress:12,schedule:[['original_dispute_end',4]]},log:'거부했다.'}]},
 {id:'original_dispute_end',title:'분쟁의 결말',text:'플랫폼 심의 결과가 나왔다.',chain:true,options:[
  {label:'확인',effects:{coin:{win:{rep:60,followers:100},lose:{rep:-30,reachMod:{mul:0.7,weeks:4}}},chance:0.5},log:'결과.'}]},
 // ---------- 아크 I: 번아웃 회복 ----------
 {id:'therapy',title:'상담을 받아볼까',text:'번아웃 이후 손이 떨린다. 지인이 창작자 상담 프로그램을 추천했다. 10주 과정, 50만원.',weight:2,once:true,need:['burnout1','noflag:therapy'],options:[
  {label:'등록한다 (-50만원)',effects:{money:-500000,flag:'therapy',recoverPerm:4,stress:-15},log:'상담 시작. 매주 스트레스 회복 +4.'},
  {label:'혼자 이겨낸다',effects:{stress:5},log:'...괜찮아.'}]},
 // ---------- 아크 J: 해외 진출 ----------
 {id:'overseas_agent',title:'해외 에이전시',text:'일본 서비스 캬라푸의 에이전시가 번역 연재를 제안했다. 번역비 선투자 100만원, 해외 정산 별도.',weight:1,once:true,need:['only','noflag:overseas'],options:[
  {label:'투자한다 (-100만원)',effects:{money:-1000000,flag:'overseas',schedule:[['overseas_result',8]]},log:'번역 작업 시작.'},
  {label:'보류',effects:{},log:'국내에 집중.'}]},
 {id:'overseas_result',title:'해외 연재 결과',text:'캬라푸 연재 2개월 결산.',chain:true,options:[
  {label:'확인',effects:{coin:{win:{money:3500000,followers:400,rep:80,counter:'overseasHit'},lose:{money:600000,followers:50}},chance:0.5},log:'해외 정산 도착.'}]},
 // ---------- 아크 K: 라이벌 불화 ----------
 {id:'feud_start',title:'{rival}와(과)의 불화',text:'{rival} 작가가 당신 신작 태그가 자기 작품을 베꼈다고 공개 저격했다.',weight:1,once:true,need:['published','rep100','noflag:feud'],options:[
  {label:'공개 반박',effects:{flag:'feud',relation:-40,rep:15,stress:12,schedule:[['feud_peak',6]]},log:'설전 시작.'},
  {label:'DM으로 푼다',effects:{relation:15,stress:5},log:'오해를 풀었다.'}]},
 {id:'feud_peak',title:'불화의 절정',text:'양쪽 팬덤이 갤러리에서 매일 싸운다. {rival}가 "같은 대회에서 보자"고 했다.',chain:true,options:[
  {label:'대회에서 실력으로 증명한다',effects:{inspiration:20,stress:8,schedule:[['feud_end',8]]},log:'대회를 준비한다.'},
  {label:'공개 화해 제안',effects:{relation:40,unflag:'feud',rep:20,stress:-10},log:'악수했다.'}]},
 {id:'feud_end',title:'불화의 끝',text:'대회가 끝났다. {rival}가 DM을 보냈다. "...잘 봤습니다."',chain:true,options:[
  {label:'화해한다',effects:{relation:50,unflag:'feud',rep:30,followers:80},log:'라이벌에서 동료로.'},
  {label:'끝까지 간다',effects:{relation:-60,rep:10,stress:10},log:'영원한 라이벌.'}]},
 // ---------- 경력 분기점 (시스템 예약) ----------
 {id:'creator_path',title:'크리에이터 노선 선택',text:'정식 크리에이터가 됐다. 앞으로의 방향을 정하자. 되돌릴 수 없다.',chain:true,options:[
  {label:'다작 노선: 제작 슬롯 +1, 포인트 -5%',effects:{flag:'path_many',counter:'path'},log:'다작 노선.'},
  {label:'완성도 노선: 포인트 +15%, 진행 -10%',effects:{flag:'path_quality',counter:'path'},log:'완성도 노선.'},
  {label:'커뮤니티 노선: 팔로워 +25%, 홍보 스트레스 절반',effects:{flag:'path_social',counter:'path'},log:'커뮤니티 노선.'}]},
 {id:'new_year',title:'새해 다짐',text:'한 해가 지났다. 올해의 다짐은?',chain:true,options:[
  {label:'건강: 최대 체력 +5',effects:{energyMaxDelta:5},log:'건강하게.'},
  {label:'야망: 유입 +5%',effects:{exposurePerm:1.05},log:'더 높이.'},
  {label:'절약: 지출 -5%',effects:{costPerm:0.95},log:'알뜰하게.'},
  {label:'휴식: 스트레스 -30, 영감 +20',effects:{stress:-30,inspiration:20},log:'쉬어가기.'}]},
 {id:'midcareer',title:'중간 회고',text:'경력의 절반이 지났다. 돌아보면 무엇이 보이는가?',chain:true,options:[
  {label:'작품이 보인다: 모든 공개작 안정성 +3',effects:{workPoints:{stability:3}},log:'작품을 돌봤다.'},
  {label:'사람이 보인다: 팔로워 +150, 라이벌 관계 +10',effects:{followers:150,relationAll:10},log:'관계를 돌봤다.'},
  {label:'돈이 보인다: +100만원',effects:{money:1000000},log:'통장을 돌봤다.'}]},
 // ---------- 시즌 ----------
 {id:'lunar',title:'설 연휴',text:'명절. 친척들이 모였다. "그 AI 캐릭터 만드는 거 돈은 좀 되니?"',weight:3,need:'month:1',options:[
  {label:'세뱃돈을 받는다',effects:{money:150000,stress:5},log:'세뱃돈 +15만원.'},
  {label:'명절 특별 이벤트를 연다',effects:{followers:40,energy:-15},log:'명절 이벤트.'}]},
 {id:'spring_semester',title:'신학기',text:'3월. 학생 독자들이 바빠졌다. 2주간 학원물 유입이 줄고 오피스물이 는다.',weight:3,need:'month:3',options:[
  {label:'그렇구나',effects:{reachMod:{mul:0.9,weeks:2}},log:'신학기 효과.'}]},
 {id:'summer_vacation',title:'여름 방학',text:'7월. 학생 독자가 폭증한다. 4주간 유입 +25%.',weight:4,need:'month:7',options:[
  {label:'신작 타이밍!',effects:{reachMod:{mul:1.25,weeks:4},counter:'summer'},log:'여름 특수.'}]},
 {id:'monsoon',title:'장마',text:'비가 열흘째. 습하고 처진다.',weight:3,need:'month:7',options:[
  {label:'집에서 작업',effects:{stress:6,inspiration:6},log:'빗소리.'}]},
 {id:'chuseok',title:'추석',text:'9월 추석. 선물 이벤트를 열기 좋은 시기다.',weight:3,need:'month:9',options:[
  {label:'추석 선물 이벤트 (-10만원)',effects:{money:-100000,followers:60,gift:2000},log:'추석 이벤트.'},
  {label:'쉰다',effects:{stress:-15},log:'송편.'}]},
 {id:'yearend_gift',title:'연말 선물 러시',text:'12월. 독자들이 한 해 감사 선물을 보낸다.',weight:4,need:'month:12',options:[
  {label:'감사 인사',effects:{gift:5000,followers:30,stress:-8},log:'연말 선물 러시.'}]},
 {id:'exam_season',title:'수능 시즌',text:'11월. 수험생 독자들이 사라졌다. 2주간 유입 -15%.',weight:3,need:'month:11',options:[
  {label:'응원 메시지를 올린다',effects:{reachMod:{mul:0.85,weeks:2},followers:20},log:'수험생 응원.'}]},
 {id:'blackfriday',title:'크래커 할인 주간',text:'플랫폼이 크래커 할인 행사를 열었다. 2주간 유료 소비 +30%.',weight:2,need:'month:11',options:[
  {label:'좋은 타이밍',effects:{payMod:{mul:1.3,weeks:2}},log:'크래커 할인 효과.'}]},
 {id:'anniversary',title:'플랫폼 창립 기념',text:'창립 기념 이벤트로 모든 작품 노출이 늘고 선물 보너스가 붙는다.',weight:2,need:'month:5',options:[
  {label:'기념 이벤트 참여',effects:{reachMod:{mul:1.2,weeks:2},gift:1500},log:'기념 이벤트.'}]},
 // ---------- 플랫폼·기술 ----------
 {id:'model_regress',title:'모델 퇴행 논란',text:'새 모델이 오히려 멍청해졌다는 불만이 폭주한다. 2주간 재방문이 줄어든다.',weight:2,need:'published',options:[
  {label:'유저노트 가이드를 올린다',effects:{workPoints:{stability:-2},followers:15},log:'가이드로 대응.'}]},
 {id:'image_model',title:'새 이미지 모델',text:'이미지 생성 모델이 업그레이드됐다. 이번 주 미디어 작업 비주얼 포인트 2배.',weight:2,options:[
  {label:'바로 작업한다',effects:{visualBoost:1,inspiration:5},log:'이번 주 비주얼 작업 강화.'}]},
 {id:'token_limit',title:'프롬프트 글자 수 확대',text:'프롬프트 상한이 7,000자에서 10,000자로 늘었다. 커스텀 프롬 작품의 설정 유지가 좋아진다.',weight:1,once:true,options:[
  {label:'설정을 보강한다 (체력 -15)',effects:{energy:-15,workPoints:{stability:4}},log:'공개작 안정성 +4.'}]},
 {id:'search_update',title:'검색 개편',text:'해시태그 검색 가중치가 올라갔다. 이달 메타 태그 효과가 2배.',weight:2,options:[
  {label:'태그를 손본다',effects:{tagBoost:4},log:'4주간 메타 태그 효과 2배.'}]},
 {id:'ranking_reset',title:'랭킹 집계 방식 변경',text:'주간 랭킹이 발화 수에서 "신규 플레이 수" 가중으로 바뀌었다. 신작이 유리해졌다.',weight:1,options:[
  {label:'신작을 준비한다',effects:{inspiration:8},log:'랭킹 개편.'}]},
 {id:'outage_refund',title:'장애 보상',text:'플랫폼 장애 보상으로 모든 이용자에게 크래커가 지급됐다. 이번 주 소비가 늘어난다.',weight:2,options:[
  {label:'타이밍',effects:{payMod:{mul:1.4,weeks:1}},log:'보상 크래커 효과.'}]},
 {id:'bot_accounts',title:'봇 계정 정리',text:'플랫폼이 봇 계정을 대거 삭제했다. 팔로워가 줄어든 대신 집계가 정확해졌다.',weight:1,need:'fans500',options:[
  {label:'받아들인다',effects:{followersPct:-0.05,rep:10},log:'팔로워 -5%.'}]},
 {id:'verify_badge',title:'인증 배지',text:'플랫폼이 인지도 높은 제작자에게 인증 배지를 준다.',weight:1,once:true,need:'rep800',options:[
  {label:'받는다',effects:{exposurePerm:1.05,rep:30},log:'인증 배지. 유입 +5%.'}]},
 {id:'api_change',title:'이미지 코드 규격 변경',text:'이미지 코드 형식이 바뀌어 기존 미디어가 일부 깨진다.',weight:2,need:'published',options:[
  {label:'전부 수정한다 (체력 -25)',effects:{energy:-25,stress:8},log:'수정 완료.'},
  {label:'인기작만 수정한다 (체력 -10)',effects:{energy:-10,workPoints:{visual:-3}},log:'일부 작품 비주얼 하락.'}]},
 // ---------- 커뮤니티 ----------
 {id:'tier_list',title:'작품 티어표',text:'갤러리에 이달의 작품 티어표가 올라왔다. 당신 작품이 {tier}에 있다.',weight:2,need:'published',options:[
  {label:'캡처해둔다',effects:{rep:8,stress:3},log:'티어표.'}]},
 {id:'ama',title:'질문 받습니다',text:'팬들이 AMA(질문 답변)를 요청한다.',weight:2,need:'fans500',options:[
  {label:'진행한다 (체력 -15)',effects:{energy:-15,followers:50,rep:15,stress:5},log:'AMA 성료.'},
  {label:'다음에',effects:{},log:'다음에.'}]},
 {id:'gallery_award',title:'갤러리 자체 시상',text:'갤러리에서 비공식 "갤 어워드"를 열었다. 당신이 "올해의 떡상" 부문 후보.',weight:1,need:'rep300',options:[
  {label:'투표를 독려한다',effects:{coin:{win:{rep:50,followers:80},lose:{rep:5}},chance:0.45,stress:4},log:'갤 어워드 결과.'}]},
 {id:'prompt_contest',title:'프롬 공유 대전',text:'갤러리에서 프롬프트 구조 공유 대회가 열렸다. 참여하면 서로의 노하우를 배운다.',weight:2,options:[
  {label:'참여한다',effects:{skillXp:{prompt:40,planning:20},rep:10},log:'노하우 교환.'}]},
 {id:'drama_screenshot',title:'DM 캡처 유출',text:'다른 제작자가 당신과 나눈 DM을 편집해 올렸다. 맥락이 왜곡됐다.',weight:1,need:'rep200',options:[
  {label:'원본을 공개한다',effects:{rep:20,stress:10,relationRandom:-40},log:'원본 공개로 반전.'},
  {label:'무시한다',effects:{rep:-20,stress:6},log:'소문이 돌았다.'}]},
 {id:'newbie_help',title:'뉴비 질문글',text:'"처음 만드는데 키워드북이 뭔가요?" 글이 올라왔다.',weight:3,options:[
  {label:'친절히 답한다',effects:{rep:6,skillXp:{community:10}},log:'뉴비를 도왔다.'},
  {label:'스크롤',effects:{},log:'...'}]},
 {id:'meme_contest',title:'짤 대회',text:'당신 캐릭터 짤 만들기 대회가 갤러리에서 자생적으로 열렸다.',weight:1,need:'hit',options:[
  {label:'상품을 건다 (-5만원)',effects:{money:-50000,followers:120,rep:25},log:'짤 대회 흥행.'}]},
 {id:'copy_tag',title:'태그 따라하기',text:'당신이 만든 태그 조합을 따라 한 작품들이 쏟아진다. 검색이 섞인다.',weight:2,need:'rep300',options:[
  {label:'원조 표시를 한다',effects:{rep:15,reachMod:{mul:0.9,weeks:2}},log:'원조는 원조.'}]},
 // ---------- 팬·독자 ----------
 {id:'fan_translation',title:'팬 번역',text:'한 팬이 당신 작품 소개를 영어로 번역해 해외 커뮤니티에 올렸다.',weight:1,need:'fans1000',options:[
  {label:'허락하고 감사한다',effects:{followers:90,rep:15},log:'해외 팬 유입.'}]},
 {id:'fan_cosplay',title:'코스프레',text:'행사장에서 당신 캐릭터 코스프레가 등장했다. 사진이 돌고 있다.',weight:1,need:'fans2000',options:[
  {label:'리트윗',effects:{followers:150,inspiration:10},log:'코스프레 바이럴.'}]},
 {id:'fan_fic',title:'2차 창작 팬픽',text:'팬이 당신 세계관으로 2차 창작 캐릭터를 만들어 올렸다. 당신 작품 유입도 는다.',weight:2,need:'hit',options:[
  {label:'공식 허용 가이드를 올린다',effects:{followers:60,rep:20},log:'2차 창작 허용.'},
  {label:'내리도록 요청',effects:{rep:-15,stress:5},log:'내려달라고 했다.'}]},
 {id:'reader_death',title:'한 독자의 부고',text:'오래 댓글을 남기던 독자의 가족이 부고를 전했다. "마지막까지 작가님 작품을 했어요."',weight:1,need:'fans1000',options:[
  {label:'추모 글을 올린다',effects:{stress:10,inspiration:20,rep:10},log:'이야기는 누군가의 마지막을 함께했다.'}]},
 {id:'minor_report',title:'미성년 독자 신고',text:'성인 작품에 미성년자가 접근했다는 신고가 들어왔다. 플랫폼 인증 문제지만 작품이 잠시 숨겨진다.',weight:2,need:'hasAdult',options:[
  {label:'협조한다',effects:{adultMod:{mul:0.5,weeks:1},stress:5},log:'1주 노출 제한.'}]},
 {id:'gift_whale2',title:'선물 랭킹 1위 독자',text:'선물 랭킹 1위 독자가 "작가님 전용 요청"을 한다. 특정 캐릭터의 분기를 추가해달라고.',weight:1,need:'fans1000',options:[
  {label:'추가한다 (체력 -20)',effects:{energy:-20,gift:8000,followers:20},log:'요청 반영. 선물 8,000.'},
  {label:'정중히 거절',effects:{rep:5},log:'작품은 모두의 것.'}]},
 // ---------- 생활·건강·돈 ----------
 {id:'rent_up',title:'월세 인상',text:'집주인이 월세를 올렸다.',weight:2,need:'studio1',options:[
  {label:'받아들인다',effects:{rentPerm:1.1,stress:5},log:'임대료 +10%.'},
  {label:'이사를 알아본다 (체력 -20)',effects:{energy:-20,stress:8},log:'발품을 팔았다.'}]},
 {id:'wrist',title:'손목 터널 증후군',text:'진단이 나왔다. 당분간 작업량을 줄이라고 한다.',weight:1,need:'stress60',options:[
  {label:'치료 (-40만원)',effects:{money:-400000,progressMod:{mul:0.85,weeks:3},stress:-10},log:'치료 중. 3주간 속도 -15%.'},
  {label:'보호대로 버틴다',effects:{progressMod:{mul:0.7,weeks:4},stress:10},log:'4주간 속도 -30%.'}]},
 {id:'power_out',title:'정전',text:'아파트 정전. 저장 안 한 작업이 날아갔다.',weight:2,options:[
  {label:'...',effects:{draftProgress:-15,stress:10},log:'작업 일부 손실.'}]},
 {id:'scam',title:'사기 DM',text:'"플랫폼 운영팀입니다. 정산 계좌 확인을 위해 링크를 눌러주세요."',weight:2,options:[
  {label:'무시한다',effects:{rep:2},log:'피싱 회피.'},
  {label:'링크를 누른다',effects:{money:-800000,stress:20},log:'...계좌에서 80만원이 빠져나갔다.'}]},
 {id:'lottery2',title:'이벤트 추첨 당첨',text:'플랫폼 앱 리뷰 이벤트에 당첨됐다.',weight:1,options:[
  {label:'받는다',effects:{money:200000},log:'+20만원.'}]},
 {id:'old_friend',title:'옛 친구의 부탁',text:'오랜 친구가 급전 50만원을 빌려달라고 한다.',weight:1,options:[
  {label:'빌려준다 (-50만원)',effects:{money:-500000,stress:-5,schedule:[['old_friend_return',12]]},log:'빌려줬다.'},
  {label:'거절한다',effects:{stress:8},log:'미안.'}]},
 {id:'old_friend_return',title:'친구의 답례',text:'친구가 돈을 갚으며 선물을 들고 왔다.',chain:true,options:[
  {label:'고맙다',effects:{money:600000,stress:-10,inspiration:8},log:'+60만원과 영감.'}]},
 {id:'move_offer',title:'작업실 공유 제안',text:'동료 제작자가 작업실을 함께 쓰자고 한다. 임대료를 나눈다.',weight:1,need:'studio1',options:[
  {label:'함께 쓴다',effects:{rentPerm:0.7,stress:4,relationRandom:20},log:'임대료 -30%.'},
  {label:'혼자가 편하다',effects:{},log:'혼자.'}]},
 {id:'birthday',title:'생일',text:'생일이다. 팬들이 축하 댓글을 달았다.',weight:1,options:[
  {label:'케이크를 산다',effects:{stress:-12,gift:1500,followers:15},log:'생일 축하.'}]},
 {id:'pet_sick',title:'치즈가 아프다',text:'고양이 치즈가 밥을 안 먹는다.',weight:2,need:'cat',options:[
  {label:'병원 (-30만원)',effects:{money:-300000,stress:-5},log:'다행히 괜찮았다.'},
  {label:'지켜본다',effects:{stress:15},log:'...'}]},
 {id:'coffee_spill',title:'키보드에 커피',text:'기계식 키보드에 커피를 쏟았다.',weight:2,need:'keyboard',options:[
  {label:'수리 (-15만원)',effects:{money:-150000},log:'수리 완료.'},
  {label:'그냥 쓴다',effects:{progressMod:{mul:0.9,weeks:2},stress:5},log:'키가 끈적인다.'}]},
 // ---------- 라이벌 ----------
 {id:'rival_quit',title:'{rival}의 은퇴 선언',text:'{rival} 작가가 번아웃으로 은퇴를 선언했다. 갤러리가 숙연해졌다.',weight:1,options:[
  {label:'응원 댓글',effects:{relation:20,stress:5,inspiration:5},log:'동료의 은퇴.'}]},
 {id:'rival_copy',title:'{rival}가 내 작품을 리메이크?',text:'{rival}의 신작이 내 작품과 설정이 너무 비슷하다.',weight:2,need:'published',options:[
  {label:'정중히 문의',effects:{relation:-10,coin:{win:{rep:20},lose:{rep:-10,stress:8}},chance:0.6},log:'문의 결과.'},
  {label:'신고한다',effects:{relation:-50,rep:10,stress:10},log:'신고.'},
  {label:'넘어간다',effects:{stress:4},log:'...'}]},
 {id:'rival_gift',title:'{rival}의 선물',text:'{rival} 작가가 당신 작품에 크래커를 선물했다. "리스펙."',weight:2,need:'relationGood',options:[
  {label:'답례한다',effects:{gift:3000,relation:15},log:'서로 선물.'}]},
 {id:'rival_team',title:'{rival}의 팀 제안',text:'{rival}가 제작 팀을 꾸리자고 한다. 수익은 나누고 작업은 분담한다.',weight:1,need:['relationGood','creator'],options:[
  {label:'팀을 만든다',effects:{flag:'team',progressPerm:1.15,payPerm:0.9,relation:30,counter:'team'},log:'팀 결성. 진행 +15%, 정산 -10%.'},
  {label:'혼자가 좋다',effects:{relation:-5},log:'솔로.'}]},
 {id:'rival_poach',title:'{rival}의 팬 빼가기',text:'{rival}가 당신 팬들에게 자기 작품 홍보 DM을 돌리고 있다.',weight:2,need:'rep200',options:[
  {label:'팬들에게 알린다',effects:{relation:-30,followers:-20,rep:10},log:'경고.'},
  {label:'더 좋은 작품으로 답한다',effects:{inspiration:12,followers:-40},log:'실력으로.'}]},
 {id:'rival_mentor',title:'{rival}의 멘토링',text:'{rival}가 당신 작품을 꼼꼼히 리뷰해줬다.',weight:2,need:'relationGood',options:[
  {label:'감사',effects:{draftPoints:{stability:10,story:6},relation:10},log:'제작 중 작품 포인트 상승.'}]},
 // ---------- 제작 ----------
 {id:'eureka',title:'유레카',text:'샤워 중에 완벽한 분기 구조가 떠올랐다.',weight:3,need:'drafting',options:[
  {label:'바로 적는다',effects:{draftPoints:{story:14},inspiration:-5},log:'제작 중 작품 서사 +14.'}]},
 {id:'block',title:'슬럼프',text:'한 줄도 안 써진다.',weight:3,need:'drafting',options:[
  {label:'쉬었다 한다',effects:{stress:-8,progressMod:{mul:0.8,weeks:1}},log:'1주 속도 -20%.'},
  {label:'억지로 쓴다',effects:{stress:12,draftPoints:{stability:-4}},log:'억지로 쓴 글은 티가 난다.'}]},
 {id:'beta_feedback',title:'베타 테스터의 혹평',text:'테스터가 "캐릭터가 매력 없다"고 했다.',weight:2,need:'drafting',options:[
  {label:'반영한다 (체력 -15)',effects:{energy:-15,draftPoints:{appeal:12}},log:'매력을 손봤다.'},
  {label:'내 비전을 믿는다',effects:{draftPoints:{story:4},stress:4},log:'고집.'}]},
 {id:'scope_creep',title:'설정 과잉',text:'키워드북이 500줄을 넘었다. 프롬프트가 설정을 다 못 읽는다.',weight:2,need:'drafting',options:[
  {label:'핵심만 남긴다',effects:{draftPoints:{stability:8,story:-3}},log:'다이어트.'},
  {label:'다 넣는다',effects:{draftPoints:{story:8,stability:-8}},log:'세계관 과식.'}]},
 {id:'name_clash',title:'이름 겹침',text:'당신 캐릭터 이름이 인기작 캐릭터와 똑같다. 검색이 섞인다.',weight:2,need:'drafting',options:[
  {label:'이름을 바꾼다',effects:{draftProgress:-10,draftPoints:{appeal:5}},log:'개명.'},
  {label:'그대로 간다',effects:{draftPoints:{appeal:-5}},log:'검색 혼선.'}]},
 {id:'template_update',title:'템플릿 업데이트',text:'기본 템플릿이 개선됐다. 기본 템플릿 작품의 상한이 조금 올랐다.',weight:1,once:true,options:[
  {label:'확인',effects:{workPoints:{story:2}},log:'템플릿 개선.'}]},
 // ---------- 난이도 특화 악재 ----------
 {id:'audit',title:'정산 감사',text:'플랫폼이 비정상 트래픽 의심으로 정산을 감사한다. 결과가 나올 때까지 이번 달 캐시가 동결된다.',weight:2,need:['creator','diff:hard'],options:[
  {label:'협조한다',effects:{delaySettle:1,stress:10},log:'정산 동결.'}]},
 {id:'mass_block',title:'대량 차단 사태',text:'정책 오탐으로 수백 작품이 차단됐다. 당신 작품도 포함됐다. 복구까지 1주.',weight:2,need:['published','diff:hard'],options:[
  {label:'이의 제기',effects:{reachMod:{mul:0.3,weeks:1},stress:12},log:'1주 노출 급감.'}]},
 {id:'competitor_app',title:'경쟁 앱 출시',text:'대형 경쟁 앱이 론칭했다. 독자가 분산된다. 8주간 유입 -15%.',weight:1,need:'diff:hard',once:true,options:[
  {label:'버틴다',effects:{reachMod:{mul:0.85,weeks:8}},log:'경쟁 앱 효과.'}]},
 {id:'loan_call',title:'대출 상환',text:'은행이 대출 상환을 요구했다.',weight:2,need:['diff:hard','money_low'],options:[
  {label:'갚는다 (-50만원)',effects:{money:-500000,stress:8},log:'상환.'},
  {label:'연장 요청',effects:{stress:15,rentPerm:1.05},log:'이자가 늘었다.'}]},
];
export const TROPHIES_EXTRA=[
 // 작품·발화
 {id:'works5',name:'다섯 번째 작품',desc:'작품 5개 등록',cond:'works>=5'},
 {id:'works25',name:'작품 25개',desc:'작품 25개 등록',cond:'works>=25'},
 {id:'works50',name:'작품 50개',desc:'작품 50개 등록. 공장장.',cond:'works>=50'},
 {id:'story5',name:'스토리텔러',desc:'스토리 5개 공개',cond:'stories>=5'},
 {id:'char10',name:'캐릭터 메이커',desc:'캐릭터 10개 공개',cond:'characters>=10'},
 {id:'msg10k',name:'첫 1만 발화',desc:'누적 발화 1만',cond:'messages>=10000'},
 {id:'msg1m',name:'백만 발화',desc:'누적 발화 100만',cond:'messages>=1000000'},
 {id:'msg10m',name:'천만 발화',desc:'누적 발화 1,000만',cond:'messages>=10000000'},
 {id:'players10k',name:'만 명의 독자',desc:'누적 대화 유저 1만',cond:'players>=10000'},
 {id:'players100k',name:'십만 명의 독자',desc:'누적 대화 유저 10만',cond:'players>=100000'},
 {id:'hitwork',name:'히트작',desc:'한 작품 발화 10만',cond:'maxWorkMsgs>=100000'},
 {id:'megahit',name:'메가히트',desc:'한 작품 발화 100만',cond:'maxWorkMsgs>=1000000'},
 {id:'likes1k',name:'좋아요 천 개',desc:'한 작품 좋아요 1,000',cond:'maxLikes>=1000'},
 {id:'comments1k',name:'댓글 천 개',desc:'한 작품 댓글 1,000',cond:'maxComments>=1000'},
 {id:'quality90',name:'완성도 90',desc:'완성도 90 이상 작품',cond:'maxQuality>=90'},
 {id:'quality100',name:'완벽',desc:'완성도 100 작품',cond:'maxQuality>=100'},
 {id:'volume5',name:'풀 볼륨',desc:'선택 탭을 전부 채운 스토리',cond:'maxVolume>=5'},
 {id:'allforms',name:'형태 마스터',desc:'대화 형태 4종 모두 공개',cond:'forms>=4'},
 {id:'bothtargets',name:'양손잡이',desc:'여성향·남성향 모두 공개',cond:'targets>=2'},
 {id:'genres10',name:'장르 수집가',desc:'10개 장르로 공개',cond:'genres>=10'},
 {id:'adult1',name:'성인 인증',desc:'성인 작품 첫 공개',cond:'adultWorks>=1'},
 {id:'fanwork1',name:'2차 창작자',desc:'2차 창작 작품 공개',cond:'fanworks>=1'},
 {id:'hyper1',name:'하이퍼 전용',desc:'하이퍼챗 권장 작품 공개',cond:'hyperWorks>=1'},
 {id:'long5x',name:'대하소설',desc:'답변 길이 5x 작품 공개',cond:'longWorks>=1'},
 {id:'tests10',name:'테스트 중독',desc:'비공개 테스트 10회',cond:'tests>=10'},
 {id:'helpers10',name:'외주 큰손',desc:'외주 10회',cond:'helpers>=10'},
 {id:'updates20',name:'패치노트',desc:'업데이트 20회',cond:'updates>=20'},
 {id:'crits50',name:'영감의 화신',desc:'영감 폭발 50회',cond:'crits>=50'},
 {id:'scrap3',name:'버릴 줄 아는 용기',desc:'제작 취소 3회',cond:'scrapped>=3'},
 {id:'sequel3',name:'시리즈 작가',desc:'후속작 3개 승인',cond:'sequels>=3'},
 // 팔로워·인지도·돈
 {id:'fans100',name:'첫 100명',desc:'팔로워 100',cond:'followers>=100'},
 {id:'fans5k',name:'팔로워 5,000',desc:'팔로워 5,000',cond:'followers>=5000'},
 {id:'fans50k',name:'팔로워 50,000',desc:'팔로워 50,000',cond:'followers>=50000'},
 {id:'rep100',name:'얼굴이 알려지다',desc:'인지도 100',cond:'rep>=100'},
 {id:'rep1000',name:'네임드',desc:'인지도 1,000',cond:'rep>=1000'},
 {id:'rep3000',name:'전설',desc:'인지도 3,000',cond:'rep>=3000'},
 {id:'money10m',name:'천만원',desc:'자금 1,000만원',cond:'money>=10000000'},
 {id:'money100m',name:'억대 작가',desc:'자금 1억',cond:'money>=100000000'},
 {id:'settle100k',name:'첫 정산',desc:'누적 정산 10만원',cond:'settled>=100000'},
 {id:'settle100m',name:'누적 정산 1억',desc:'누적 정산 1억',cond:'settled>=100000000'},
 {id:'gifts10k',name:'선물 1만',desc:'누적 선물 1만 크래커',cond:'gifts>=10000'},
 {id:'gifts100k',name:'선물 10만',desc:'누적 선물 10만 크래커',cond:'gifts>=100000'},
 {id:'debt',name:'빚쟁이',desc:'자금이 마이너스',cond:'money<=-1'},
 {id:'comeback',name:'재기',desc:'마이너스 자금에서 100만원으로 회복',cond:'comeback>=1'},
 // 랭킹·대회
 {id:'rank10',name:'TOP 10',desc:'주간 랭킹 10위 안',cond:'bestRank<=10'},
 {id:'rank3',name:'TOP 3',desc:'주간 랭킹 3위 안',cond:'bestRank<=3'},
 {id:'weekly10',name:'10주 1위',desc:'주간 1위 10회',cond:'weekly1>=10'},
 {id:'monthly3',name:'월간 3관왕',desc:'월간 1위 3회',cond:'monthly1>=3'},
 {id:'hot5',name:'핫 메이커',desc:'반응 뜨거운 신작 5회',cond:'hot>=5'},
 {id:'contest3',name:'공모전 단골',desc:'공모전 입상 3회',cond:'contestWins>=3'},
 {id:'contest10',name:'공모전 사냥꾼',desc:'공모전 입상 10회',cond:'contestWins>=10'},
 {id:'awards3',name:'어워드 3관왕',desc:'연말 어워드 3회 수상',cond:'awards>=3'},
 {id:'only3',name:'온리 전문',desc:'크랙 온리 3회',cond:'only>=3'},
 {id:'orig3',name:'오리지널 3편',desc:'오리지널 3편',cond:'originals>=3'},
 {id:'orig5',name:'오리지널 5편',desc:'오리지널 5편',cond:'originals>=5'},
 {id:'buyout_win',name:'매입 대회 수상',desc:'집중 매입 대회 입상',cond:'buyoutWin>=1'},
 // 성장·생활
 {id:'skill5',name:'역량 Lv.5',desc:'한 역량 Lv.5',cond:'skillMax>=5'},
 {id:'skill10',name:'역량 Lv.10',desc:'한 역량 Lv.10',cond:'skillMax>=10'},
 {id:'allskill10',name:'만렙',desc:'모든 역량 Lv.10',cond:'skillMin>=10'},
 {id:'items10',name:'장비 수집가',desc:'장비 10개',cond:'items>=10'},
 {id:'allitems',name:'풀 세팅',desc:'모든 장비 보유',cond:'items>=20'},
 {id:'subs4',name:'구독 부자',desc:'동시 구독 4개',cond:'subs>=4'},
 {id:'studio2',name:'오피스텔 입주',desc:'오피스텔 이상',cond:'studio>=2'},
 {id:'studio3',name:'스튜디오 입주',desc:'크리에이터 스튜디오 이상',cond:'studio>=3'},
 {id:'stress0',name:'무념무상',desc:'스트레스 0으로 주 마감',cond:'stress<=0'},
 {id:'stress100',name:'한계 돌파',desc:'스트레스 100 도달',cond:'maxStress>=100'},
 {id:'burnout2',name:'두 번째 번아웃',desc:'번아웃 2회',cond:'burnouts>=2'},
 {id:'jobs20',name:'생활인',desc:'부업 20회',cond:'jobs>=20'},
 {id:'walk20',name:'산책 애호가',desc:'산책 20회',cond:'walks>=20'},
 {id:'promo50',name:'홍보 머신',desc:'홍보 50회',cond:'promos>=50'},
 {id:'gallery20',name:'갤러리 단골',desc:'갤러리 홍보탭 20회',cond:'gallery>=20'},
 {id:'events50',name:'파란만장',desc:'이벤트 50회 경험',cond:'events>=50'},
 {id:'events150',name:'인생 드라마',desc:'이벤트 150회 경험',cond:'events>=150'},
 {id:'chain3',name:'분기점의 주인',desc:'아크 이벤트 3개 완료',cond:'arcs>=3'},
 {id:'friends3',name:'인맥왕',desc:'우호 라이벌 3명',cond:'friends>=3'},
 {id:'enemies3',name:'적을 만드는 재주',desc:'적대 라이벌 3명',cond:'enemies>=3'},
 {id:'sanction1',name:'경고장',desc:'제재 1회',cond:'sanctions>=1'},
 {id:'speedrun',name:'스피드런',desc:'24주 안에 크리에이터',cond:'creatorWeek<=24'},
 {id:'year1creator',name:'1년차 크리에이터',desc:'1년차에 크리에이터',cond:'creatorWeek<=48'},
 {id:'nopromo',name:'입소문',desc:'홍보 0회로 TOP 10',cond:'bestRank<=10&&promos<=0'},
 {id:'hard_clear',name:'하드 클리어',desc:'하드 이상으로 완주',cond:'hardClear>=1'},
 {id:'nightmare_clear',name:'지옥 클리어',desc:'지옥으로 완주',cond:'nightmareClear>=1'},
 {id:'legacy20',name:'유산 20',desc:'유산 누적 20',cond:'legacyTotal>=20'},
 {id:'runs3',name:'3회차',desc:'회차 3번 완주',cond:'runs>=3'},
 {id:'insights_all',name:'플랫폼 전문가',desc:'인사이트 전부 발견',cond:'insightsAll>=1'},
 {id:'endings6',name:'엔딩 수집가',desc:'엔딩 6종',cond:'endings>=6'},
];
// 기본 배열에 병합
EVENTS.push(...EVENTS_EXTRA);ITEMS.push(...ITEMS_EXTRA);SUBSCRIPTIONS.push(...SUBSCRIPTIONS_EXTRA);JOBS.push(...JOBS_EXTRA);LIFE.push(...LIFE_EXTRA);HELPERS.push(...HELPERS_EXTRA);TAGS.push(...TAGS_EXTRA);INSIGHTS.push(...INSIGHTS_EXTRA);LEGACY_SHOP.push(...LEGACY_EXTRA);TROPHIES.push(...TROPHIES_EXTRA);
ENDINGS.splice(ENDINGS.length-1,0,...ENDINGS_EXTRA);
