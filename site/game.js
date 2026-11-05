const IMAGE_ASSETS={"p1":"assets/7dec2f21b8a0.webp","p2":"assets/fbf4e9816317.webp","p3":"assets/3e76ea1c4a1b.webp","p4":"assets/396020d22849.webp","p5":"assets/1c3bdfbbda7b.webp","p6":"assets/252c3df884eb.webp","p7":"assets/77d14e44a0c5.webp","p8":"assets/f68bf5b41b98.webp","p9":"assets/97ba84796284.webp","p10":"assets/33ad7ab954ac.webp","p11":"assets/a98fbb40321d.webp","p12":"assets/c6e0c831b199.webp","p13":"assets/26ced6cf89b3.webp","p14":"assets/58509f08a8d9.webp","p15":"assets/1c9142ad6265.webp"};
'use strict';
const app=document.getElementById('app');
const SAVE_KEY='last_seen_full_v12_manual_save';
const OLD_SAVE_KEY='last_seen_chapterA_v8_manual_save';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const br=s=>E(s).replace(/\n/g,'<br>');
const R={
A01:['마지막 부탁','금요일 21:37','해인이 리허설 음원이 담긴 휴대폰을 승민에게 맡겼다.','오프닝'],
A02:['9시 17분의 문자','토요일 09:17','홍온유 사건을 언급한 발신자 미상의 문자.','메시지'],
A03:['리허설 시간표','10월 31일','합창제 리허설 09:00. 해인은 늦어질 수 있다고 공지했다.','캘린더'],
A04:['저장되지 않은 번호','최근 연락처','저장되지 않은 두 번호 중 하나가 익명 제보자와 관련된다.','연락처'],
A05:['최기훈의 전화','금요일 21:20','최기훈에게서 46초 전화가 왔다. 위치나 통화 내용은 알 수 없다.','전화'],
A06:['비공개 일정','토요일 08:40','캘린더에 원본 확인을 뜻하는 듯한 비공개 일정이 있다.','캘린더'],
A07:['서진석의 방문 부인','금요일 18:35','서진석은 학교에 가지 않겠다고 말했다.','메시지'],
A08:['서진석의 학교 근처 메시지','금요일 21:11','서진석이 학교 근처에 있었다고 인정했다.','메시지'],
A09:['창고 열쇠와 파란 파일','금요일 21:02','17번 표시가 있는 파란 파일과 창고 열쇠.','사진'],
A10:['갈색 봉투 속 파란 파일','금요일 20:59','행사 자료 파일의 봉투에 작은 관리번호가 있다.','사진'],
A11:['서진석의 과거 업무','2025년 합창제','서진석은 지난해 외부 공연·음향 담당자였다.','연락처'],
A12:['서진석 전달 자료 목록','금요일 밤','진행표, 음향 점검표, 리허설 기록 세 가지가 전달되었다.','파일'],
A13:['17번 보관함','금요일','학교 측 파란 파일을 별도로 보관했다는 메모.','메모'],
A14:['잠긴 조사 메모','2025 합창제','지난해 평가 관련 조사 메모를 열었다.','메모'],
A15:['최초 평가표','2025.10.23','홍온유 267점, 김민구 263점.','파일'],
A16:['최종 평가표','2025.10.24','홍온유 257점, 김민구 263점.','파일'],
A17:['당시 확인 기록','2025.10.24','컴퓨터 사용 사실과 자료 조작 여부는 구별해야 한다.','파일'],
A18:['행사 관련 지출 자료','2025 합창제','학교 행사와 외부 후원공연의 비용 항목이 일부 별도 작성되었다.','파일'],
A19:['홍온유의 이의 제기','2025.10.24','온유는 평가표가 달라졌으며 자신은 변경하지 않았다고 말했다.','메시지'],
A20:['해인의 당시 답장','2025.10.24','해인은 확인을 약속했지만 결과적으로 충분히 확인하지 못했다.','메시지'],
A21:['임효은과의 과거 대화','2026.10.29','효은은 해인이 지난 사건을 다시 조사한다는 사실을 알고 있었다.','메시지'],
A22:['최기훈의 설명','2026.10.30','최기훈은 자료가 이미 정리된 일이라며 월요일에 이야기하자고 했다.','메시지'],
A23:['행사 업무분장표','2025년','최기훈은 평가 취합, 임효은은 학생 관리, 서진석은 외부 운영.','파일'],
A24:['원본 대조 메모','2026.10.30','서진석의 자료와 원래 자료 목록을 비교해야 한다는 해인의 기록.','메모'],
A25:['익명의 전날 제보','2026.10.30 21:28','음악실 근처 파란 파일을 든 사람에 관한 익명 주장.','메시지'],
A26:['마지막으로 확인할 사람','2026.10.30','원본 자료와 관련된 담당자를 직접 만나야 한다는 메모.','메모'],
A27:['임효은의 연락','10월 31일 10:08','효은이 해인과 연락됐다고 말했다.','이벤트'],
A28:['효은의 일상 대화','2026.10.30','해인은 과거 사건을 아직 다른 사람에게 알리지 말아달라고 했다.','메시지'],
A29:['해인의 11월 업무 계획','10월 30일','해인은 다음 달 수업과 공연을 준비하고 있었다.','캘린더'],
A30:['휴대폰 반환 경위','10월 31일 10:22','승민이 효은에게 해인의 휴대폰을 전달했다.','이벤트'],
A31:['서진석 20:54 통화','금요일 20:54','해인이 서진석에게 34초 전화를 걸었다.','전화'],
A32:['점수 차이 메모','금요일 21:26','최초와 최종 평가표 숫자가 다르다는 해인의 메모.','메모'],
A33:['최초 출력 기록','2025.10.23','공용 컴퓨터에서 최초 취합표가 인쇄된 기록.','파일'],
A34:['당시 교사 단체대화','2025.10.24','해인이 점수 차이를 지적하자 최기훈이 자신이 처리하겠다고 했다.','메시지'],
A35:['원래 자료 목차','2025년 합창제','행사 진행표, 음향 점검표, 리허설 기록, 최종 운영 확인서.','파일'],
A36:['리허설 음원 사용 안내','2026.10.30','휴대폰에 담긴 리허설 음원을 학교 컴퓨터로 복사해 사용하라는 메모.','파일']
};
const m=(who,time,text,id=null)=>({who,time,text,id});
const CHATS={
unknown:{name:'알 수 없는 발신자',role:'연락처에 없음',avatar:'?',unread:1,messages:[
 m('them','10/30 21:28','오늘 9시가 넘어서 음악실 근처에서 파란 파일을 들고 이동하는 사람을 봤습니다.\n그 사람만 확인하시면 안 됩니다.','A25'),
 m('them','10/31 09:17','홍온유 학생 일은 이번에도 그냥 넘어가실 건가요?','A02')
]},
hyo:{name:'임효은',role:'양평중학교 교사',avatar:'효',messages:[
 m('me','10/29 17:16','효은쌤, 작년 온유 일 기억나세요?'),m('them','17:19','네, 기억납니다. 갑자기 왜 물어보세요?'),m('me','17:22','예전 자료를 정리하는데 제가 그때 잘못 알고 있었던 것 같아서요.'),m('them','17:25','어떤 자료인데요? 저도 확인해 봐도 될까요?','A21'),m('me','17:27','아직 정리가 안 됐어요. 확실해지면 말씀드릴게요.'),m('them','17:29','네. 필요하신 거 있으면 말씀해 주세요.'),
 m('me','10/30 20:12','효은쌤, 자료 정리 끝날 때까지는 기훈쌤께 아직 말씀 안 드렸으면 좋겠어요.','A28'),m('them','20:15','네. 확인하시고 필요하면 말씀해 주세요.'),m('them','20:47','내일 오전에 늦으실 수 있다고 들었어요. 리허설은 괜찮을까요?'),m('me','20:49','음원은 승민쌤께 맡길게요. 감사합니다.')
]},
seo:{name:'서진석',role:'외부 공연·음향 담당',avatar:'진',messages:[
 m('them','10/27 15:16','작년 행사 자료 다시 확인하신다고 들었습니다. 오래된 자료라 확인해 볼게요.'),m('me','15:22','가능하면 원본 목록도 부탁드릴게요.'),
 m('them','10/30 18:35','오늘은 학교 쪽에 안 갑니다. 저도 그 일에 더 얽히고 싶지는 않네요.','A07'),m('me','18:39','자료만 확인하면 되는 거잖아요. 부탁드릴게요.'),
 m('them','21:11','아까 학교 앞을 지나왔는데 음악실 불이 켜져 있더군요. 아직 계세요?','A08'),m('me','21:14','봉투는 확인했어요. 그런데 제가 요청한 자료가 전부 있는 건 아닌 것 같아요.'),m('them','21:16','일단 보내드린 자료만 확인해 주세요. 다른 선생님들께는 아직 말씀하지 마시고요.'),
 m('me','21:18','원래 자료 목차와 차이가 있어서요. 제가 다시 확인해 볼게요.')
]},
ki:{name:'최기훈',role:'합창제 운영 교사',avatar:'훈',messages:[
 m('them','10/30 19:10','저는 오늘 8시 반 전에는 퇴근하려고 합니다. 급한 일은 내일 확인하겠습니다.'),m('me','19:48','기훈쌤, 음악실 17번 보관함에 있던 파란 파일 혹시 확인하셨어요?','A22'),m('them','19:51','어떤 파일 말씀하시는 건가요?'),m('me','19:53','작년 합창제 평가 관련 자료요.'),m('them','19:57','그 자료는 작년에 정리된 것으로 알고 있습니다.'),m('me','20:04','최초 취합표와 최종본 점수가 달라서요. 직접 확인해야 할 것 같아요.'),m('them','20:08','알겠습니다. 월요일에 말씀 나누시죠.')
]},
hong:{name:'홍온유',role:'2025년 합창제 참가 학생',avatar:'온',messages:[
 m('them','2025/10/24 15:59','선생님, 제가 처음 봤던 점수랑 지금 발표된 점수가 달라요. 제가 자료를 바꾼 게 아니에요.','A19'),m('them','16:04','처음 본 평가표 사진도 있어요. 선생님은 제 말 믿어주시죠?'),m('me','16:11','온유야, 확인 중인 자료라 선생님들이 다시 확인해 보실 거야. 조금만 기다려 줘.','A20'),m('them','16:18','근데 제가 자료를 바꿨다고 하세요. 저는 정말 아니에요.'),m('me','16:24','누가 수정했는지 확실히 확인해 볼게.'),m('them','16:28','네. 감사합니다.')
]},
staff:{name:'합창제 준비방',role:'2026년 업무 대화',avatar:'🎼',messages:[
 m('them','10/30 18:04','내일 오전 리허설은 예정대로 진행하겠습니다.'),m('them','18:11','학생 출석 확인은 제가 준비하겠습니다. — 임효은'),m('me','18:16','음원하고 악보는 준비하겠습니다. 제가 오전에 조금 늦을 수도 있어서 승민쌤께 말씀드려 놓을게요.'),m('them','18:19','알겠습니다. 내일 뵙겠습니다.'),m('them','20:30','악보 인쇄는 30부면 될까요?')
]},
staff25:{name:'2025 합창제 운영 교사방',role:'지난해 업무 대화',avatar:'25',messages:[
 m('them','10/24 16:32','평가표 관련 문의가 있어 안내드립니다. 최종 점수는 검토 후 확정된 자료입니다. — 최기훈'),m('them','16:35','네. 학생들에게 확정된 결과를 기준으로 안내하겠습니다. — 임효은'),m('me','16:41','최초 취합표와 최종본의 점수가 다른 부분이 있는데 확인 가능할까요?'),m('them','16:44','확인된 내용입니다. 필요한 설명은 제가 별도로 진행하겠습니다. — 최기훈'),m('them','16:47','해인 선생님, 혹시 온유 학생 때문에 그러시는 건가요? — 임효은'),m('me','16:49','네. 학생이 직접 다른 점수표를 봤다고 해서요.'),m('them','16:52','그 부분은 제가 처리하겠습니다. 선생님들은 행사 준비를 진행해 주세요. — 최기훈','A34')
]},
family:{name:'가족',role:'개인 대화',avatar:'집',messages:[m('them','10/29 19:22','이번 주말에 집에 올 수 있어?'),m('me','19:30','리허설 있어서 일요일에 시간 되면 갈게.'),m('them','10/30 18:15','저녁 잘 챙겨 먹어!')]},
friend:{name:'동료 교사',role:'개인 대화',avatar:'동',messages:[m('them','10/30 12:42','오늘 급식 카레 맛있더라.'),m('me','12:45','난 아침을 늦게 먹어서 조금만 먹었어.'),m('them','17:22','다음 주 회의 자료 공유 부탁해~')]}
};
const NOTES=[
{id:'nt1',title:'합창제 체크리스트',date:'10월 30일',body:'학생 출석 명단 32명\n악보 30부 인쇄\n피아노·마이크 확인\n승민쌤께 음원 사용 안내',record:null},
{id:'nt2',title:'17번 보관함',date:'10월 30일 20:40',body:'음악실 17번 보관함. 학교 측 평가자료는 파란 파일에.\n서진석 씨가 준 봉투와 혼동하지 말 것.',record:'A13'},
{id:'nt3',title:'내일 오전 — 마지막으로 확인할 사람',date:'10월 30일 21:24',body:'토요일 아침 08:40.\n먼저 지난해 최초 출력 기록 확인.\n원본 관련 담당자 직접 만나 설명 듣기.',record:'A26'},
{id:'nt4',title:'원본 확인',date:'10월 30일 21:26',body:'최초 평가표와 최종본 숫자가 다름.\n홍온유 학생 기록 다시 찾아볼 것.\n서진석 씨의 자료와 원본 목록이 다른 이유 확인 필요.',record:'A32'},
{id:'nt5',title:'원본·사본 비교',date:'10월 30일 21:30',body:'서진석 씨가 보내준 묶음에 자료가 하나 빠진 듯함.\n행사 운영 관련 원래 목차와 다시 대조.',record:'A24'},
{id:'nt6',title:'2025 합창제 — 확인할 것 🔒',date:'지난해',body:'암호로 잠겨 있어.\n힌트: 최초 평가표 출력 날짜 네 자리(MMDD).',record:null,locked:true},
{id:'nt7',title:'11월 수업 계획',date:'10월 30일',body:'2학년 합창 활동 정리\n11월 둘째 주 공연 안내\n악보 개인별 피드백\n다음 달 교내 음악회 일정 확인',record:'A29'},
{id:'nt8',title:'주말 장보기',date:'10월 29일',body:'식빵, 계란, 우유, 사과\n빨래 세제',record:null},
{id:'nt9',title:'학생 상담 메모',date:'2025년 10월',body:'온유가 점수표 사진을 보여줌.\n점수 차이를 확인함.\n기훈 선생님은 정정이라 설명.\n학생의 자료 수정 여부는 따로 확인할 것.',record:null},
{id:'nt10',title:'개인 할 일',date:'10월 27일',body:'피아노 교재 주문\n동료에게 책 반납\n주말 커피 사기',record:null}
];
const FILES=[
{id:'A12',name:'서진석_전달목록.txt',date:'2026-10-30',body:'2025 합창제 자료\n1. 행사 진행표\n2. 음향 점검표\n3. 리허설 기록\n\n서진석이 전달한 문서 묶음의 목록.'},
{id:'A35',name:'2025_행사자료_원래목차.txt',date:'2025-10-25',body:'2025 합창제 자료 목차\n1. 행사 진행표\n2. 음향 점검표\n3. 리허설 기록\n4. 최종 운영 확인서'},
{id:'A23',name:'합창제_업무분장표.txt',date:'2025-10-20',body:'최기훈 — 학교 측 행사 운영 총괄 및 평가자료 취합\n권해인 — 음악 지도와 리허설\n임효은 — 행사 진행과 학생 관리\n서진석 — 외부 공연 운영 및 음향 지원'},
{id:'A18',name:'행사비_지출항목.txt',date:'2025-10-26',body:'학교 합창제 일반 운영비와 외부 후원공연 운영비는 별도 항목으로 구분해 기록됨.\n구체적인 계약 관련 내용은 이 파일에 없음.'},
{id:'A36',name:'토요일_리허설_음원_사용법.txt',date:'2026-10-30',body:'승민쌤께.\n휴대폰의 리허설용 음원 폴더를 학교 컴퓨터에 옮겨 사용해 주세요.\n해당 파일은 오늘 연습용이며, 업무가 끝나면 월요일에 휴대폰 돌려받을게요.'},
{id:'A33',name:'최초_평가표_출력기록.txt',date:'2025-10-23',body:'2025-10-23 16:02  최초 취합표 출력\n출력 위치: 음악실 공용 컴퓨터\n출력 기록만으로 실제 문서 수정자를 알 수는 없음.'},
{id:'A17',name:'2025_확인기록.txt',date:'2025-10-24',body:'합창제 자료 관련 확인 기록\n- 홍온유 학생이 공용 컴퓨터를 사용한 사실은 확인됨.\n- 최초 취합표와 최종 제출본의 점수에 차이가 있음.\n- 학생이 자료 변경 사실을 부인함.\n- 실제 변경 경위는 추가 확인이 필요함.\n\n별도 최종 처리 기록에는 학생에게 자료 무단 변경 의혹을 제기한 내용이 남음.',need:'P4'},
{id:'A15',name:'대표선발_최초평가표.pdf',date:'2025-10-23',need:'P4',type:'score',scores:[['홍온유',92,87,88,267],['김민구',89,88,86,263]]},
{id:'A16',name:'대표선발_최종제출본.pdf',date:'2025-10-24',need:'P4',type:'score',scores:[['홍온유',92,87,78,257],['김민구',89,88,86,263]]},
{id:'n19',name:'음악_수업진도표.txt',date:'2026-10-30',body:'2학년 음악 수행평가\n다음 주 화요일까지 제출.'}
];
const EVENTS=[
{id:'A06',date:'2026-10-31',time:'08:40',title:'확인',desc:'비공개 일정. 원본 자료 확인.'},
{id:'A03',date:'2026-10-31',time:'09:00',title:'합창제 리허설',desc:'강당. 승민쌤이 음원 담당. 해인은 늦을 수 있다고 공지.'},
{id:'A29',date:'2026-11-10',time:'16:00',title:'11월 공연 준비',desc:'수업 진도 정리, 무대 음원 점검.'},
{id:'CAL2025',date:'2025-10-23',time:'16:00',title:'2025 합창제 대표 선발 결과 취합',desc:'지난해 대표 선발 평가 취합일. 날짜를 확인해 보자.'},
{id:'n13',date:'2026-11-04',time:'15:00',title:'교직원 회의',desc:'회의 자료 배포'},
{id:'n16',date:'2026-11-07',time:'14:00',title:'개인 약속',desc:'카페에서 친구 만나기'}
];
const CALLS=[
{id:'A05',name:'최기훈',time:'10/30 21:20',type:'수신 46초',detail:'통화 내용과 발신 위치는 확인되지 않는다.'},
{id:'A31',name:'서진석',time:'10/30 20:54',type:'발신 34초',detail:'18:35 방문 부인 메시지 이후 통화.'},
{id:'n17',name:'가족',time:'10/30 18:21',type:'수신 2분 12초'},
{id:'n18',name:'인쇄실',time:'10/30 17:04',type:'발신 35초'},
{id:'ncall',name:'임효은',time:'10/29 19:05',type:'수신 1분 02초'}
];
const CONTACTS=[{id:'A11',name:'서진석',detail:'2025 합창제 외부 공연·음향 담당'},{id:'A04',name:'등록되지 않은 번호 2건',detail:'익명 발신자 등 미등록 전화번호. 발신자 확인은 아직 불가.'},{name:'임효은',detail:'양평중학교 교사'},{name:'최기훈',detail:'양평중학교 교사'},{name:'홍온유',detail:'2025년 합창제 참가 학생'},{name:'이승민',detail:'양평중학교 한문 교사'}];
const PHOTO_ASSETS=[
{id:'A10',special:'envelope',title:'음악실 서류 봉투',time:'2026.10.30 20:59',detail:'피아노 의자 위에 놓인 서류 봉투를 촬영했다.',zoom:'봉투 모서리 관리번호: SJ-25-04\n표지: 2025 행사 운영 자료'},
{id:'A09',special:'blue',title:'창고 열쇠 옆 문서',time:'2026.10.30 21:02',detail:'음악실 창고 열쇠 옆에 놓인 문서의 사진.',zoom:'파란 파일 표지: 17번\n이 파일은 갈색 봉투 속 자료와 표지가 다르다.'},
{id:'g2',img:IMAGE_ASSETS.p2,title:'음악실 피아노',time:'2026.10.30 16:48'},
{id:'g3',img:IMAGE_ASSETS.p3,title:'학교 본관',time:'2026.10.30 17:02'},
{id:'g4',img:IMAGE_ASSETS.p4,title:'악보와 연습 메모',time:'2026.10.30 17:19'},
{id:'g5',img:IMAGE_ASSETS.p5,title:'카페에서 보낸 오후',time:'2026.10.24 17:34'},
{id:'g6',img:IMAGE_ASSETS.p6,title:'가을 음악회 무대',time:'2026.10.29 19:22'},
{id:'g7',img:IMAGE_ASSETS.p7,title:'학교 복도',time:'2026.10.30 20:50'},
{id:'g9',img:IMAGE_ASSETS.p9,title:'음악실 창문',time:'2026.10.30 19:39'},
{id:'g13',img:IMAGE_ASSETS.p13,title:'학교 앞 가을 하늘',time:'2026.10.30 17:12'},
{id:'g15',img:IMAGE_ASSETS.p15,title:'편의점 영수증',time:'2026.10.29 21:05'},
{id:'g8',img:IMAGE_ASSETS.p8,title:'보관함 근처',time:'2026.10.28 15:32'},
];
const PUZZLES=[
{id:'P1',title:'리허설 전의 약속',needed:['A06','A26'],kind:'radio',question:'08:40의 비공개 일정과 메모를 함께 읽으면 무엇을 알 수 있을까?',opts:[['skipped','해인이 합창제 리허설을 취소했다.'],['morning','해인이 리허설 전에 지난해 자료 원본을 확인하려 했다.'],['guilty','그 약속 상대가 평가표를 수정한 범인이다.']],correct:'morning',conclusion:'해인은 리허설 전에 원본 확인 약속이 있었다.',hints:['캘린더의 오전 일정과 메모의 목적을 함께 읽어봐.','두 기록 모두 토요일 오전을 가리키고 있어.','원본 자료를 직접 확인하려는 일정이지, 특정 범인과의 약속을 확정하는 자료는 아니야.']},
{id:'P2',title:'서진석의 방문 경위',needed:['A07','A10','A31'],kind:'timeline',question:'방문 부인 → 전화 → 봉투 사진을 올바르게 연결해.',opts:[['s1','18:35 메시지 → 20:54 통화 → 20:59 사진'],['s2','20:59 사진 → 18:35 메시지 → 20:54 통화'],['s3','20:54 통화 → 20:59 사진 → 18:35 메시지']],opts2:[['certain','서진석이 직접 봉투를 놓는 장면이 확인됐다.'],['delivered','서진석과 연락 후 해인이 자료 봉투를 확인했다. 직접 전달인지는 모른다.'],['none','봉투는 평가자료와 관련 없다고 확정할 수 있다.']],correct:['s1','delivered'],conclusion:'서진석과 통화한 뒤 권해인이 서류 봉투를 확인했다. 직접 전달 여부는 미확인이다.',hints:['메시지, 통화, 사진의 시각을 비교해.','봉투가 촬영된 시점에는 서진석과의 통화가 끝난 상태야.','사진은 봉투의 존재만 확인해 줄 뿐, 전달자를 촬영하지 않았어.']},
{id:'P3',title:'두 개의 파란 파일',needed:['A09','A10'],zoomNeed:['A09','A10'],kind:'radio',question:'두 사진을 확대했을 때 가장 정확한 결론은?',opts:[['same','둘은 같은 파일을 장소만 옮겨 찍은 것이다.'],['two','하나는 행사 운영자료, 다른 하나는 17번 보관함 표시가 있는 별도 파일이다.'],['missing','사진만으로 최종 운영 확인서가 사라진 시각을 알 수 있다.']],correct:'two',conclusion:'두 파란 파일은 서로 다른 자료다.',hints:['파일의 표지 글씨를 비교해 봐.','둘 다 파란색이라는 점보다 표지의 표시를 봐.','한쪽에는 행사 운영 자료, 다른 쪽에는 번호가 적혀 있어.']},
{id:'P4',title:'잠긴 2025년 조사 메모',needed:['A33','LOCKED'],kind:'pin',question:'지난해 최초 평가표 출력일을 MMDD 네 자리로 입력해.',correct:'1023',conclusion:'2025년 합창제 조사 메모가 열렸다. 평가표와 확인 기록을 볼 수 있다.',hints:['메모에 “최초 평가표 출력일”이라는 힌트가 있어.','파일 앱에서 잠금 없이 열리는 최초 출력 기록의 날짜를 확인해.','날짜를 월 두 자리, 일 두 자리 순서로 입력해.']},
{id:'P5',title:'바뀐 평가 점수',needed:['A15','A16'],kind:'score',question:'어느 평가 항목이 바뀌었고, 확정할 수 있는 결론은 무엇일까?',opts:[['changed','두 문서의 특정 점수가 달라지고 선발 순위가 바뀌었다.'],['hong','홍온유가 점수를 조작한 사실이 증명되었다.'],['choi','최기훈이 점수를 바꾼 장면이 확인되었다.']],correct:['on3','changed'],conclusion:'홍온유의 세 번째 점수는 88점에서 78점으로 변경되었지만 수정자는 확인되지 않았다.',hints:['홍온유와 김민구의 각 평가 항목을 비교해.','합계가 바뀐 학생의 개별 평가 항목을 확인해.','숫자의 변화와 실제 수정자가 누구인지는 다른 문제야.']},
{id:'P6',title:'학생의 조작 의혹',needed:['A17','A19'],doneNeed:['P5'],kind:'multi',question:'기록으로 직접 확인되는 사실을 모두 골라.',opts:[['diff','원본과 최종 제출본에 점수 차이가 있다.'],['computer','홍온유가 공용 컴퓨터를 사용한 적이 있다.'],['student','홍온유가 점수를 직접 수정했다.'],['teacher','최기훈이 변경을 지시한 사실이 증명됐다.']],correct:['diff','computer'],conclusion:'점수 차이와 공용 컴퓨터 이용은 확인되지만, 학생이 점수를 조작했다는 증거는 없다.',hints:['확인 기록에 적힌 사실만 선택해.','공용 컴퓨터 이용과 평가표 수정은 동일한 행동이 아니야.','누가 실제로 수정했는지는 현재 기록에서 확인되지 않아.']},
{id:'P7',title:'2025년 교사들의 역할',needed:['A21','A23','A34'],kind:'double',question:'평가자료 취합 담당자와 학생 관련 진술을 남긴 인물을 구분해.',opts:[['choi','최기훈'],['hyo','임효은'],['seo','서진석']],opts2:[['hyo','임효은'],['choi','최기훈'],['hong','홍온유']],correct:['choi','hyo'],conclusion:'최기훈은 평가 취합 담당, 임효은은 학생 관련 진술을 남긴 인물이었다.',hints:['업무분장표의 역할을 확인해.','평가자료 취합은 학생 관리와 다른 업무야.','교사방의 최종 판단과 임효은의 발언을 비교해.'],optional:true},
{id:'P8',title:'누락된 최종 운영 확인서',needed:['A12','A35'],kind:'radio',question:'원래 목차에는 있지만 서진석이 전달한 목록에는 없는 문서는?',opts:[['stage','행사 진행표'],['sound','음향 점검표'],['final','최종 운영 확인서'],['rehearsal','리허설 기록']],correct:'final',conclusion:'원래 목차의 ‘최종 운영 확인서’가 서진석 전달 목록에는 없다.',hints:['두 목록에 공통으로 있는 항목을 먼저 제외해.','원래 목록은 네 가지, 전달받은 목록은 세 가지야.','서로 차이나는 마지막 항목을 확인해.']}
];
PUZZLES.push(
{id:'P9',title:'익명 제보의 신빙성',needed:['A02','A25','A05'],kind:'radio',optional:true,question:'익명의 메시지와 통화기록을 보았을 때, 무엇까지 확인할 수 있을까?',opts:[['culprit','익명 발신자는 범인의 정체를 알고 있다.'],['reported','누군가 파란 파일을 들었다는 익명의 주장만 확인된다.'],['phone','21:20 통화한 최기훈이 익명 문자를 작성했다.']],correct:'reported',conclusion:'익명의 제보는 조사 방향을 알려주지만, 발신자와 목격 내용의 진위는 별도 확인해야 한다.',hints:['익명 메시지는 관찰자의 주장이야.','해인의 통화기록과 익명 메시지의 발신자가 동일하다는 자료는 없어.','제보 내용과 그것이 사실로 검증된 내용은 구분해야 해.']},
{id:'P10',title:'11월 업무 계획의 의미',needed:['A03','A29','A36'],kind:'radio',optional:true,question:'권해인의 업무 계획과 음원 사용 안내를 보면 어디까지 말할 수 있을까?',opts:[['never','권해인은 어떤 이유로도 휴직할 생각이 없었다.'],['planned','해인은 11월 업무를 준비했지만 이후 계획이 바뀌었을 가능성은 남는다.'],['faked','10월 31일 안부 메시지의 작성자가 가짜라는 사실이 확정된다.']],correct:'planned',conclusion:'해인은 11월 수업을 준비하고 있었지만, 그 사실만으로 뒤의 휴직 언급이 거짓이라고 확정할 수는 없다.',hints:['미래 계획은 그 뒤의 사건을 모두 알려주지 않아.','일정표는 그 시점의 의도이지 결과가 아니야.','업무 계획과 최후의 메시지를 해석할 때 단정하지 않는 것이 중요해.']}
);
const required=PUZZLES.filter(p=>!p.optional).map(p=>p.id);
function hasSave(){try{return !!localStorage.getItem(SAVE_KEY);}catch(e){return false;}}
function hasLegacySave(){try{return !!localStorage.getItem(OLD_SAVE_KEY);}catch(e){return false;}}
const INITIAL=()=>({screen:'intro',started:false,seen:[],archived:[],done:[],answers:{},hints:{},room:'unknown',note:'nt1',file:'A12',photo:'A10',event:'A06',call:'A31',contact:'A11',month:'2026',puzzle:'P1',chapterStage:0,sceneStep:0,dirty:false,day:'10/31',time:'09:17',openedPin:false,photoZoom:false,zoomedPhotos:[],inspectBack:'home',infoBack:'home',manualSavedAt:null});
let state=INITIAL();
try{ if(localStorage.getItem(SAVE_KEY)) state={...INITIAL(),...JSON.parse(localStorage.getItem(SAVE_KEY))}; }catch(err){state=INITIAL();}
function copyState(){return JSON.parse(JSON.stringify(state));}
function seen(id){return state.seen.includes(id);}
function mark(id){if(!id)return;if(!seen(id))state.seen.push(id);state.dirty=true;}
function archived(id){return state.archived.includes(id);}
function archive(id){if(!id || !R[id])return;mark(id);if(!archived(id))state.archived.push(id);state.dirty=true;}
function done(id){return state.done.includes(id);}
function navigate(to){if(state.sceneStep>=3 && !['scene','chapterEnd','vault','inspect','settings'].includes(to)){state.screen=state.sceneStep>=7?'chapterEnd':'scene';render();return;}state.screen=to;state.dirty=true;render();}
function toast(s){const el=document.querySelector('.toast');if(!el)return;el.textContent=s;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1900);}
function status(dark=false){return `<div class="statusBar v7status" style="color:${dark?'white':'#191b20'}"><div class="statusTime">${E(state.time)} <span style="font-size:12px">●●●</span></div><div class="statusIcons"><span>▂▄▆</span><span>◢</span><span class="battery">72</span></div></div>`;}
function shell(title,back,content,opts={}){return `<div class="screen ${opts.dark?'v7boardScreen':''}">${status(!!opts.dark)}<div class="v7head"><button class="v7back" data-act="nav" data-to="${E(back)}" aria-label="뒤로">‹</button><div class="v7title">${E(title)}</div>${opts.vault?'<button class="v7topright" data-act="nav" data-to="vault">보관함</button>':opts.board?'<button class="v7topright" data-act="nav" data-to="board">추리보드</button>':''}</div><div class="content"><div class="v7body">${content}</div></div><div class="toast"></div></div>`;}
function scrollShell(title,back,content,opts={}){return shell(title,back,content,opts);}
function archiveButton(id){return id&&R[id]?`<button class="v7btn ${archived(id)?'light':'blue'}" data-act="archive" data-id="${E(id)}">${archived(id)?'✓ 승민의 기록함에 보관됨':'⇩ 승민의 기록함에 보관'}</button>`:'';}
function lineItem(id,title,sub,act='inspect',key=id,more=''){return `<button class="v7item" data-act="${E(act)}" data-id="${E(key)}" ${more}><span class="v7avatar">${id&&seen(id)?'✓':'⌕'}</span><span class="v7itemmain"><b>${E(title)}</b><small>${E(sub)}</small></span><span class="v7time">›</span></button>`;}
function storyIntro(){return `<div class="v7scene">${status(true)}<div class="v7sceneBody"><div class="v7sceneTag">양평중학교 · 2026.10.30 21:37</div><div style="font-size:38px;font-weight:950;line-height:1.1">마지막<br><span style="color:#eccba6">접속</span></div><div class="v7sceneQuote">“승민쌤, 내일 리허설에 쓸 음원이 제 휴대폰에 있어요. 잠깐 맡아주실 수 있을까요?”</div><p class="v7muted">권해인 선생님은 토요일 오전에 오래된 자료를 확인할 일이 있다고 말했다. 다음 날, 그녀는 약속된 시간에 나타나지 않았다.</p><div class="v7notice warn">CHAPTER A · 권해인의 휴대폰<br>탐색 순서는 자유야. 확인한 기록을 조합해 진실을 추리해.</div></div><div class="v7sceneFoot"><button class="v7btn" data-act="start">${state.started?'휴대폰 조사 계속하기':'조사 시작'}</button>${state.started?'<button class="v7btn light" data-act="nav" data-to="settings">저장·불러오기</button>':''}</div><div class="toast"></div></div>`;}
function home(){const apps=[['messages','💬','메시지','#37ae78'],['calls','☎','전화','#3fa86d'],['photos','🌈','사진','#bb6fbc'],['notes','▤','메모','#e8a741'],['calendar','31','캘린더','#d55d68'],['files','▥','파일','#4d91db'],['contacts','♙','연락처','#8192bc'],['browser','◉','Safari','#4b98e3'],['board','⌁','추리보드','#765fba'],['vault','▣','승민 보관함','#796b82'],['settings','⚙','설정','#808894']];return `<div class="screen homeWallpaper">${status(true)}<div class="content"><div class="homeContent"><div class="homeTime" style="margin-top:6px;font-size:48px">${E(state.time)}</div><div class="homeDate">2026년 10월 31일 토요일</div><div class="homePanel" style="margin-top:20px"><div class="headline">권해인의 휴대폰</div><div class="subtle" style="margin-top:7px">양평중학교 음악 교사 · 암호 없음<br>확인한 기록 ${state.seen.filter(id=>R[id]).length}개 · 필수 추리 ${required.filter(done).length}/${required.length}개 · 선택 추리 ${PUZZLES.filter(p=>p.optional&&done(p.id)).length}개</div></div><div class="appGrid" style="margin-top:26px">${apps.map(([to,icon,name,color])=>`<button class="appBtn" data-act="nav" data-to="${to}"><span class="appIcon" style="background:${color};color:white;font-size:26px;font-weight:800">${icon}</span><span class="appLabel" style="font-size:12px">${name}</span></button>`).join('')}</div><div class="homeHint" style="margin-top:24px;color:#b7bac6;font-size:12px;line-height:1.65">문자를 눌러 확인하고, 사진을 확대하고, 기록함에 보관해. 중요한 결론은 추리보드에서 만들어져.</div></div></div><div class="v7dock"><button data-act="nav" data-to="messages"><span class="di">💬</span>메시지</button><button data-act="nav" data-to="photos"><span class="di">🌈</span>사진</button><button data-act="nav" data-to="board"><span class="di">⌁</span>추리</button><button data-act="nav" data-to="settings"><span class="di">⚙</span>설정</button></div><div class="toast"></div></div>`;}
function messages(){let items=Object.entries(CHATS).filter(([id])=>id!=='staff25'||true);let html=`<h1 class="v7listHead">메시지</h1><div class="v7notice">09:17 익명의 문자가 왔어. 대화를 자세히 확인하면 자료로 보관할 수 있어.</div>${items.map(([id,c])=>lineItem(id,c.name,c.messages[c.messages.length-1].text.slice(0,60),'chat',id)).join('')}`;return shell('메시지','home',html,{board:true});}
function chat(){const c=CHATS[state.room]||CHATS.unknown;let html=`<div style="margin:-18px -17px -42px"><div class="v7chat"><div class="v7chatday">기록을 눌러 자세히 확인할 수 있어</div>${c.messages.map(msg=>`<div class="v7bubbleRow ${msg.who==='me'?'me':''}">${msg.who==='them'?`<div class="v7avatar" style="width:29px;height:29px;font-size:12px">${E(c.avatar)}</div>`:''}<button class="v7bubble ${msg.id&&seen(msg.id)?'selected':''}" data-act="${msg.id?'inspect':'noop'}" ${msg.id?`data-id="${msg.id}"`:''}>${br(msg.text)}${msg.id?`<span class="v7sub">${seen(msg.id)?'✓ 확인한 기록':'⌕ 기록 자세히 보기'}</span>`:''}</button><span class="v7chatTime">${E(msg.time)}</span></div>`).join('')}</div></div>`;return shell(c.name,'messages',html,{board:true});}
function notes(){let html=`<h1 class="v7listHead">메모</h1><div class="notesGrid" style="margin-top:8px">${NOTES.map(n=>`<button class="noteCard" style="min-height:142px;padding:13px" data-act="note" data-id="${n.id}"><div><h4>${E(n.title)}</h4><p>${E(n.body.slice(0,68)).replace(/\n/g,'<br>')}</p></div><div class="noteMeta">${E(n.date)}</div></button>`).join('')}</div>`;return shell('메모','home',html,{board:true});}
function note(){const n=NOTES.find(x=>x.id===state.note)||NOTES[0];if(n.locked&&!done('P4'))return shell('잠긴 메모','notes',`<div class="v7card"><h3>🔒 2025 합창제 — 확인할 것</h3><p>암호 힌트: 최초 평가표 출력일, 네 자리(MMDD).</p></div><button class="v7btn blue" data-act="puzzle" data-id="P4">암호 입력하기</button><div class="v7notice">날짜는 파일 앱의 최초 출력 기록에서 찾을 수 있어.</div>`,{board:true});const body=n.locked?'홍온유 학생 최초 평가표 확인.\n학교 최종본과 비교.\n당시 최기훈 선생님 설명 재확인.\n임효은 선생님께는 자료 확인 후 말씀드리기.\n\n그때 온유 이야기를 좀 더 들어줬어야 했는데.':n.body;return shell('메모','notes',`<div class="v7card"><h3>${E(n.title)}</h3><div class="v7muted">${E(n.date)}</div><div class="v7docText" style="margin-top:16px">${E(body)}</div></div>${archiveButton(n.record)}${n.locked?'<button class="v7btn light" data-act="nav" data-to="files">관련 평가표 보기</button>':''}`,{board:true});}
function calls(){let html=`<h1 class="v7listHead">최근 통화</h1><div class="v7notice">통화 시각은 확인할 수 있지만 통화 내용과 위치는 알 수 없어.</div>${CALLS.map(c=>lineItem(c.id,c.name,c.time+' · '+c.type,'call',c.id)).join('')}`;return shell('전화','home',html,{board:true});}
function calendar(){const yy=state.month;const filtered=EVENTS.filter(x=>x.date.startsWith(yy));const html=`<h1 class="v7listHead">캘린더</h1><div class="v7row"><button class="v7btn ${yy==='2026'?'blue':'light'}" data-act="month" data-value="2026" style="width:50%">2026</button><button class="v7btn ${yy==='2025'?'blue':'light'}" data-act="month" data-value="2025" style="width:50%">2025</button></div><div class="v7section">${yy==='2026'?'2026년 10~11월':'2025년 10월'}</div>${filtered.map(ev=>lineItem(ev.id,ev.date.slice(5)+'  '+ev.title,ev.time+' · '+ev.desc,'event',ev.id)).join('')}`;return shell('캘린더','home',html,{board:true});}
function contacts(){return shell('연락처','home',`<h1 class="v7listHead">연락처</h1>${CONTACTS.map(c=>lineItem(c.id,c.name,c.detail,'contact',c.id||c.name)).join('')}`,{board:true});}
function browser(){return shell('Safari','home',`<h1 class="v7listHead">최근 방문한 페이지</h1>${['양평중학교 2026년 합창제 안내','음악 수업 자료 모음','악보 인쇄 안내','공연장 좌석 배치','지역 문화행사 일정'].map((x,i)=>lineItem('b'+i,x,'최근 검색 · 기록 확인','noop','')).join('')}<div class="v7notice">개인 웹 기록에는 사건을 확정하는 자료가 보이지 않아.</div>`,{board:true});}
function files(){return shell('파일','home',`<h1 class="v7listHead">파일</h1><div class="v7muted">나의 iPhone · 행사 자료 검토</div>${FILES.filter(f=>!f.need||done(f.need)).map(f=>lineItem(f.id,f.name,f.date,'file',f.id)).join('')}${!done('P4')?'<div class="v7notice warn">잠긴 조사 메모를 열면 추가 평가자료가 표시돼.</div>':''}`,{board:true});}
function scoreTable(doc,interactive=false){return `<div class="v7tablewrap"><table class="v7table"><thead><tr><th>학생</th><th>평가1</th><th>평가2</th><th>평가3</th><th>합계</th></tr></thead><tbody>${doc.scores.map((r,i)=>`<tr>${r.map((cell,j)=>`<td>${interactive&&j>0?`<button class="v7cellButton ${state.answers.cell===((i===0?'on':'bn')+j)?'on':''}" data-act="cell" data-value="${i===0?'on':'bn'}${j}">${E(cell)}</button>`:E(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function file(){const f=FILES.find(x=>x.id===state.file)||FILES[0];return shell('파일 미리보기','files',`<div class="v7card"><h3>${E(f.name)}</h3><div class="v7muted">${E(f.date)}</div><div class="v7docText" style="margin-top:17px">${f.type==='score'?scoreTable(f):br(f.body)}</div></div>${archiveButton(f.id)}${['A15','A16'].includes(f.id)?'<button class="v7btn light" data-act="puzzle" data-id="P5">평가표 차이 추리하기</button>':''}`,{board:true});}
function photoArt(p){if(p.special)return `<div class="v7photoTileArt ${p.special==='blue'?'blue':''}"><div class="paper">${'서류<br>기록'}</div></div>`;return `<img alt="${E(p.title)}" src="${p.img}">`;}
function photos(){return shell('사진','home',`<h1 class="v7listHead">최근 항목</h1><div class="v7muted" style="margin-bottom:14px">${PHOTO_ASSETS.length}장의 사진 · 탭해서 확대</div><div class="v7photoGrid">${PHOTO_ASSETS.map(p=>`<button class="v7photoThumb" data-act="photo" data-id="${p.id}" aria-label="${E(p.title)}">${photoArt(p)}</button>`).join('')}</div>`,{board:true});}
function photo(){const p=PHOTO_ASSETS.find(x=>x.id===state.photo)||PHOTO_ASSETS[0];const img=`<div class="v7photoView ${state.photoZoom?'v8magnified':''}">${photoArt(p)}</div>`;return shell('사진','photos',`<div class="v7row between"><div><b>${E(p.title)}</b><div class="v7muted">${E(p.time)}</div></div><button class="v7topright" data-act="zoom">${state.photoZoom?'확대 닫기':'자세히 확대'}</button></div>${img}${state.photoZoom&&p.zoom?`<div class="v7zoom">${br(p.zoom)}</div>`:''}${p.detail?`<div class="v7muted">${E(p.detail)}</div>`:''}${archiveButton(p.id)}<div class="v7row" style="justify-content:space-between;margin-top:8px"><button class="v7btn light" style="width:48%" data-act="photo-shift" data-value="-1">‹ 이전</button><button class="v7btn light" style="width:48%" data-act="photo-shift" data-value="1">다음 ›</button></div>`,{board:true});}
function savedSource(id){
if(!archived(id))return '';
const ph=PHOTO_ASSETS.find(x=>x.id===id);
if(ph)return `<div class="v7card"><h3>보관한 사진 원본</h3><div class="v7muted">${E(ph.time)}</div><div class="v7photoView v8savedPhoto">${photoArt(ph)}</div>${ph.zoom?`<div class="v7zoom">${br(ph.zoom)}</div>`:''}</div>`;
const f=FILES.find(x=>x.id===id);
if(f)return `<div class="v7card"><h3>보관한 문서 사본 · ${E(f.name)}</h3><div class="v7docText">${f.type==='score'?scoreTable(f):br(f.body)}</div></div>`;
const pair=Object.values(CHATS).flatMap(room=>room.messages.map(msg=>({...msg,room:room.name}))).find(x=>x.id===id);
if(pair)return `<div class="v7card"><h3>보관한 대화 원문</h3><div class="v7muted">${E(pair.room)} · ${E(pair.time)}</div><div class="v7docText">${br(pair.text)}</div></div>`;
const n=NOTES.find(x=>x.record===id);
if(n)return `<div class="v7card"><h3>보관한 메모</h3><div class="v7muted">${E(n.date)}</div><div class="v7docText">${br(n.body)}</div></div>`;
const call=CALLS.find(x=>x.id===id);
if(call)return `<div class="v7card"><h3>통화기록 사본</h3><div class="v7docText">${E(call.name)} · ${E(call.time)} · ${E(call.type)}</div></div>`;
const ev=EVENTS.find(x=>x.id===id);
if(ev)return `<div class="v7card"><h3>캘린더 일정 사본</h3><div class="v7docText">${E(ev.date)} ${E(ev.time)} · ${E(ev.title)}
${E(ev.desc)}</div></div>`;
return '';
}
function vault(){const ids=state.archived.filter(id=>R[id]);const back=state.sceneStep>=7?'chapterEnd':state.sceneStep>=1?'scene':'home';return shell('이승민의 기록함',back,`<h1 class="v7listHead">보관된 자료</h1><div class="v7notice">권해인의 휴대폰을 반환하면 이 기록함이 챕터 B에서 중요한 역할을 해. 완료한 추리는 별도 보존돼.</div><div class="v7section">보관된 문서·대화 원본 (${ids.length})</div>${ids.length?ids.map(id=>lineItem(id,R[id][0],R[id][1],'inspect',id)).join(''):'<div class="v7card"><p>아직 직접 보관한 원본이 없어. 사진·메시지·문서에서 보관 버튼을 눌러봐.</p></div>'}<div class="v7section">확정한 추리 (${state.done.length})</div>${state.done.length?state.done.map(id=>{const p=PUZZLES.find(x=>x.id===id);return `<div class="v7card"><b>${E(p.title)}</b><p>${E(p.conclusion)}</p></div>`}).join(''):'<div class="v7card"><p>추리보드에서 증거를 연결하면 결론이 보존돼.</p></div>'}`,{board:true});}
function board(){let progress=required.filter(done).length;let html=`<div class="v7row between"><div class="v7pill">CHAPTER A</div><div class="v7pill">필수 추리 ${progress}/${required.length}</div></div><h1 style="font-size:32px;margin:18px 0 8px">사건 기록판</h1><div class="v7muted">이승민 · 양평중학교 한문 교사<br>읽은 기록을 연결해 판단해. 퍼즐 순서는 자유야.</div><div class="progressTrack" style="margin:18px 0"><span style="width:${100*progress/required.length}%"></span></div>${PUZZLES.filter(p=>done(p.id)||p.needed.some(seen)||(p.doneNeed||[]).some(done)).map(p=>{const need=p.needed.filter(id=>!seen(id));const dn=p.doneNeed?.filter(id=>!done(id))||[];const zn=(p.zoomNeed||[]).filter(id=>!state.zoomedPhotos.includes(id));const ready=!need.length&&!dn.length&&!zn.length;return `<div class="v7boardCard ${!ready&&!done(p.id)?'locked':''}"><div class="v7row between"><h3>${E(p.title)}</h3><span class="v7pill ${done(p.id)?'done':''}">${done(p.id)?'✓ 완료':p.optional?'선택 추리':ready?'추리 가능':`${zn.length?'사진 확대 필요':`${p.needed.length-need.length}/${p.needed.length} 자료`}`}</span></div><p>${done(p.id)?E(p.conclusion):ready?'관련 기록이 연결되었어. 직접 추리해 봐.':'휴대폰 앱에서 필요한 기록을 더 확인해 봐.'}</p>${ready||done(p.id)?`<button class="v7btn ${done(p.id)?'light':'blue'}" data-act="puzzle" data-id="${p.id}">${done(p.id)?'결론 다시 보기':'추리 시작'}</button>`:''}</div>`}).join('')}<div class="v7boardCard"><p>새로운 자료를 발견하면 조사 항목이 이 화면에 추가돼.</p></div><div class="v7boardCard"><h3>추리 후 다음 장면</h3><p>${progress===required.length?'필수 추리가 완성됐어. 기록함을 확인하고 임효은의 연락을 받아보자.':`필수 추리 ${required.length-progress}개가 남아 있어.`}</p><button class="v7btn" data-act="scene-start" ${progress!==required.length?'disabled':''}>챕터 A 마지막 장면으로</button></div>`;return shell('추리보드','home',html,{dark:true,vault:true});}
function puzzle(){const p=PUZZLES.find(x=>x.id===state.puzzle)||PUZZLES[0];const missing=p.needed.filter(id=>!seen(id));const rest=(p.doneNeed||[]).filter(id=>!done(id));const zooms=(p.zoomNeed||[]).filter(id=>!state.zoomedPhotos.includes(id));if(missing.length||rest.length||zooms.length)return shell('추리 잠김','board',`<div class="v7notice warn">아직 기록이 부족해. 다른 앱을 더 확인해 봐.</div>`,{dark:true});const a=state.answers;let inner='';if(p.kind==='radio')inner=options(p.id,p.opts);if(p.kind==='double')inner=`<div class="v7section">${p.id==='P2'?'① 시간순 배열':'① 평가자료 취합 담당자'}</div>${options(p.id,p.opts)}<div class="v7section">${p.id==='P2'?'② 가능한 결론':'② 학생 관련 진술 인물'}</div>${options(p.id+'b',p.opts2)}`;if(p.kind==='timeline'){const seq=state.answers.P2Order||[];const items=[['photo','피아노 의자 위 자료 봉투 사진'],['msg','서진석의 학교 방문 부인 메시지'],['call','서진석과 짧은 통화']];inner=`<div class="v7section">① 실제 순서대로 기록 누르기</div><div class="v7darknotice">3개 기록을 시간순으로 선택해. 잘못 누르면 선택을 초기화할 수 있어.</div>${items.map(([key,label])=>`<button class="v8timelineChoice ${seq.includes(key)?'selected':''}" data-act="timeline" data-id="${key}"><span class="v8timelineNo">${seq.includes(key)?seq.indexOf(key)+1:'·'}</span><span>${E(label)}</span></button>`).join('')}<button class="v7btn light" data-act="timeline-clear">순서 다시 선택</button><div class="v7section">② 기록만으로 가능한 결론</div>${options('P2b',p.opts2)}`;}if(p.kind==='pin')inner=`<div class="v7card"><p>힌트: 2025년 최초 평가표 출력일. 숫자 4자리.</p><input class="v7input" maxlength="4" inputmode="numeric" pattern="[0-9]*" id="pinInput" placeholder="0000" autocomplete="off" aria-label="암호 네 자리"></div>`;if(p.kind==='score'){inner=`<div class="v7section">① 바뀐 평가 항목 터치</div><div class="v7card" style="padding:10px"><div class="v7small">최초 취합표</div>${scoreTable(FILES.find(f=>f.id==='A15'),true)}<div class="v7small" style="margin-top:14px">최종 제출본</div>${scoreTable(FILES.find(f=>f.id==='A16'),true)}</div><div class="v7section">② 확인할 수 있는 결론</div>${options(p.id,p.opts)}`;}
if(p.kind==='multi')inner=p.opts.map(([id,label])=>`<label class="v7option dark"><input type="checkbox" data-act="multi" data-value="${id}" ${Array.isArray(a[p.id])&&a[p.id].includes(id)?'checked':''}><span>${E(label)}</span></label>`).join('');let hintlevel=state.hints[p.id]||0;return shell(p.title,'board',`<div class="v7pill">${p.id} · ${p.optional?'선택':'필수'} 추리</div><div class="v7darknotice">${E(p.question)}</div>${done(p.id)?`<div class="v7darknotice"><b>✓ 추리 완료</b><br>${E(p.conclusion)}</div>`:inner}${!done(p.id)?`<button class="v7btn blue" data-act="verify">추리 제출</button><button class="v7btn light" data-act="hint">힌트 요청 (${hintlevel}/3)</button>${hintlevel?`<div class="v7darknotice">${E(p.hints[hintlevel-1])}</div>`:''}`:''}<button class="v7btn light" data-act="nav" data-to="board">추리보드로 돌아가기</button>`,{dark:true});}
function options(key,opts){return opts.map(([id,label])=>`<label class="v7option dark"><input type="radio" name="${E(key)}" data-act="answer" data-key="${E(key)}" value="${E(id)}" ${state.answers[key]===id?'checked':''}><span>${E(label)}</span></label>`).join('');}
function inspect(){const id=state.inspect;if(!id||!R[id])return shell('기록','home','기록이 없어.');const r=R[id];const postReturn=state.sceneStep>=3;let extra='';if(!postReturn){if(id==='A10'||id==='A09')extra='<button class="v7btn light" data-act="nav" data-to="photos">갤러리로 이동</button>';if(['A12','A35','A15','A16'].includes(id))extra='<button class="v7btn light" data-act="nav" data-to="files">원본 파일 보기</button>';}return shell(r[0],state.inspectBack||'vault',`<div class="v7pill">${E(id)} · ${E(r[3])}</div><div class="v7card"><h3>${E(r[0])}</h3><div class="v7muted">${E(r[1])}</div><p style="margin-top:14px">${E(r[2])}</p></div>${savedSource(id)}${postReturn?'':archiveButton(id)}${extra}${postReturn?'':'<button class="v7btn light" data-act="nav" data-to="board">추리보드 확인</button>'}`,{board:!postReturn});}
function settings(){const back=state.sceneStep>=7?'chapterEnd':state.sceneStep>=3?'scene':'home';return shell('설정',back,`<h1 class="v7listHead">게임 설정</h1><div class="v7card"><h3>수동 저장</h3><p>조사 진행, 보관한 자료, 추리 결과를 이 기기의 브라우저에 저장해. 자동 저장은 하지 않아.</p><p>${state.manualSavedAt?'마지막 저장: '+E(state.manualSavedAt):'아직 이 버전에서 저장하지 않았어.'}</p></div><button class="v7btn blue" data-act="save">현재 진행 저장</button><button class="v7btn light" data-act="load" ${hasSave()?'':'disabled'}>저장한 진행 불러오기</button>${hasLegacySave()?'<button class="v7btn light" data-act="load-legacy">v7 저장 이어하기 (한 번만 불러오기)</button>':''}<button class="v7btn light" data-act="reset">처음부터 시작</button><div class="v7notice">v7 원본과 v8 저장은 따로 보관돼. 브라우저 데이터를 지우면 저장도 사라질 수 있어.</div>`,{board:state.sceneStep<3});}
function scene(){const step=state.sceneStep;const parts=[
{tag:'10월 31일 · 10:08',quote:'“승민 선생님, 다행히 해인 선생님께 연락이 왔다고 해서요.”',desc:'임효은 선생님에게 연락이 왔다. 하지만 승민은 해인과 직접 통화하지 못했다.',button:'대화 계속'},
{tag:'10월 31일 · 10:15',quote:'“해인 선생님이 휴대폰을 찾으셔야 한다고 해서요. 제가 전달해 드릴게요.”',desc:'효은은 해인의 몸 상태가 좋지 않아 사람을 만나기 어렵다고 설명한다. 승민은 먼저 조사한 자료를 보관할 수 있다.',button:'기록 정리'},
{tag:'10월 31일 · 10:22',quote:'“그럼 제가 맡아서 전달하겠습니다. 감사합니다, 승민 선생님.”',desc:'승민은 리허설 음원을 학교 컴퓨터에 옮긴 후, 임효은에게 해인의 휴대폰을 전달했다.',button:'휴대폰 반환'},
{tag:'10월 31일 · 19:36',quote:'“승민쌤, 저 해인이에요. 휴대폰 잘 받았어요.”',desc:'권해인의 번호로 안부 메시지가 왔다. 몸이 좋지 않아 당분간 휴직도 생각하고 있다는 내용이다.',button:'답장 보기'},
{tag:'10월 31일 · 저녁',quote:'“푹 쉬세요. 학교 일은 걱정하지 마시고요.”',desc:'승민은 해인의 번호로 온 답장에 안도했다. 당장 리허설과 학교 행사 준비로 돌아갈 수 있었다.',button:'사건 마무리'},
{tag:'CASE 01 · 종료',quote:'연락 확인.\n휴대폰 반환 완료.',desc:'권해인의 번호로 안부 메시지가 왔다. 승민은 실종에 대한 걱정을 잠시 내려놓는다.',button:'에필로그'},
{tag:'3주 후 · 11월 21일',quote:'“양평 지역 중학교 교사 사망 사건… 경찰 수사 중”',desc:'피해자가 권해인이라는 소식이 전해진다. 다시 조사해야 할 것은 휴대폰의 마지막 메시지가 아니라, 그 뒤에 남겨진 기록들이다.',button:'챕터 A 종료'}
];const s=parts[Math.min(step,parts.length-1)];return `<div class="v7scene">${status(true)}<div class="v7sceneBody"><div class="v7sceneTag">${E(s.tag)}</div><div class="v7sceneQuote">${E(s.quote)}</div><p style="font-size:14px;line-height:1.8;color:#bcc3cf">${E(s.desc)}</p>${step===1?`<div class="v7darknotice">현재 직접 보관한 자료 ${state.archived.length}개 · 핵심 추리 ${state.done.length}개.<br>기록함에 보관한 자료는 이후 다시 확인할 수 있어.</div>`:''}${step===5?`<div class="v7pill done">CASE 01 · 연락 확인</div>`:''}</div><div class="v7sceneFoot">${step===1?'<button class="v7btn light" data-act="nav" data-to="vault">보관한 기록 점검</button>':''}<button class="v7btn" data-act="scene-next">${E(s.button)}</button>${step<3?'<button class="v7btn light" data-act="nav" data-to="board">추리보드로 돌아가기</button>':''}</div><div class="toast"></div></div>`;}
function chapterEnd(){return `<div class="v7scene">${status(true)}<div class="v7sceneBody"><div class="v7sceneTag">CHAPTER A · COMPLETE</div><div style="font-size:38px;font-weight:900;line-height:1.2">끝난 줄<br>알았던 사건</div><p style="font-size:15px;color:#c4cad4;line-height:1.9">권해인의 휴대폰은 이미 반환됐어.<br>하지만 이승민의 개인 기록함에는 아직 설명되지 않은 자료가 남아 있어.</p><div class="v7darknotice">다음 장에서는 CHAPTER B · 돌아오지 않은 사람으로 이어져. 이제 이승민의 휴대폰에서 챕터 B가 이어져.</div><div class="v7pill done">완료한 필수 추리 ${required.filter(done).length}/${required.length}</div><p style="color:#c4cad4;font-size:13px">서진석의 자료, 홍온유의 점수표, 효은의 안부 메시지. 무엇이 진실이고 무엇이 주장인지 아직 구분되지 않았다.</p></div><div class="v7sceneFoot"><button class="v7btn" data-act="nav" data-to="vault">보관한 기록 다시 보기</button><button class="v7btn light" data-act="nav" data-to="settings">저장·불러오기</button></div><div class="toast"></div></div>`;}
function view(){if(state.screen==='intro')return storyIntro();if(state.screen==='home')return home();if(state.screen==='messages')return messages();if(state.screen==='chat')return chat();if(state.screen==='notes')return notes();if(state.screen==='note')return note();if(state.screen==='calls')return calls();if(state.screen==='calendar')return calendar();if(state.screen==='contacts')return contacts();if(state.screen==='browser')return browser();if(state.screen==='files')return files();if(state.screen==='file')return file();if(state.screen==='photos')return photos();if(state.screen==='photo')return photo();if(state.screen==='vault')return vault();if(state.screen==='board')return board();if(state.screen==='puzzle')return puzzle();if(state.screen==='inspect')return inspect();if(state.screen==='settings')return settings();if(state.screen==='scene')return scene();if(state.screen==='chapterEnd')return chapterEnd();return home();}
function render(){app.innerHTML=view();}
function validate(p){const a=state.answers; if(p.kind==='pin'){const n=document.getElementById('pinInput');return n?.value.trim()===p.correct;} if(p.kind==='timeline'){const arr=a.P2Order||[];return arr.join(',')==='msg,call,photo'&&a.P2b==='delivered';}if(p.kind==='score')return a.cell===p.correct[0]&&a[p.id]===p.correct[1];if(p.kind==='double')return a[p.id]===p.correct[0]&&a[p.id+'b']===p.correct[1];if(p.kind==='multi'){let x=a[p.id]||[];return x.length===p.correct.length&&p.correct.every(v=>x.includes(v));}return a[p.id]===p.correct;}
function verify(){const p=PUZZLES.find(x=>x.id===state.puzzle);if(!p||done(p.id))return;if(!validate(p)){toast('이 기록만으로는 그 결론을 확정하기 어려워. 다시 비교해 봐.');return;}state.done.push(p.id);if(p.id==='P4'){mark('A14');state.openedPin=true;} // Automatic core evidence remains across the phone handover.
const auto={P1:['A06','A26'],P2:['A07','A31'],P3:['A09','A10'],P4:['A14'],P5:['A15','A16'],P6:['A17'],P7:['A21','A23'],P8:['A12','A35']};for(const id of auto[p.id]||[])archive(id);
state.dirty=true;render();toast('추리 완료! 핵심 근거가 승민 기록함에 보관됐어.');}
function saveManual(){try{state.manualSavedAt=new Date().toLocaleString('ko-KR');state.dirty=false;localStorage.setItem(SAVE_KEY,JSON.stringify(copyState()));render();toast('현재 진행을 저장했어.');}catch(err){toast('브라우저 저장이 허용되지 않아 저장하지 못했어.');}}
function normalizeState(x){const d=INITIAL();const y={...d,...x};for(const key of ['seen','archived','done','zoomedPhotos'])if(!Array.isArray(y[key]))y[key]=[];if(!y.answers||typeof y.answers!=='object')y.answers={};if(!y.hints||typeof y.hints!=='object')y.hints={};return y;}
function loadLegacy(){if(!confirm('v8의 챕터 A 수동 저장을 가져올까? 기존 저장은 그대로 유지돼.'))return;try{const x=localStorage.getItem(OLD_SAVE_KEY);if(!x){toast('v8 저장 데이터가 없어.');return;}state=normalizeState(JSON.parse(x));render();toast('v8 진행을 가져왔어. v9 설정에서 새로 저장해.');}catch(e){toast('v8 저장 데이터를 열 수 없어.');}}
function loadManual(){if(!confirm('저장된 진행으로 돌아갈까? 저장하지 않은 변경은 사라져.'))return;try{let x=localStorage.getItem(SAVE_KEY);if(!x){toast('저장된 게임이 없어.');return;}state=normalizeState(JSON.parse(x));render();toast('저장된 진행을 불러왔어.');}catch(e){toast('저장 파일을 열 수 없어.');}}
function reset(){if(!confirm('현재 진행을 초기화할까? 수동 저장한 파일은 유지돼.'))return;state=INITIAL();render();}
function handleClick(btn){const d=btn.dataset;const act=d.act;const id=d.id;
if(act==='start'){state.started=true;mark('A01');navigate('home');}
else if(act==='nav'){navigate(d.to);}
else if(act==='chat'){state.room=id;navigate('chat');}
else if(act==='note'){state.note=id;const n=NOTES.find(x=>x.id===id);if(n?.record)mark(n.record);if(n?.locked)mark('LOCKED');navigate('note');}
else if(act==='file'){state.file=id;mark(id);navigate('file');}
else if(act==='photo'){state.photo=id;state.photoZoom=false;mark(id);navigate('photo');}
else if(act==='photo-shift'){let i=PHOTO_ASSETS.findIndex(x=>x.id===state.photo);i=(i+Number(d.value)+PHOTO_ASSETS.length)%PHOTO_ASSETS.length;state.photo=PHOTO_ASSETS[i].id;state.photoZoom=false;mark(state.photo);render();}
else if(act==='zoom'){state.photoZoom=!state.photoZoom;if(state.photoZoom&&!state.zoomedPhotos.includes(state.photo))state.zoomedPhotos.push(state.photo);state.dirty=true;render();}
else if(act==='call'){state.infoBack=state.screen;state.call=id;mark(id);const c=CALLS.find(x=>x.id===id);state.inspectInfo={title:c.name,detail:c.time+' · '+c.type+'\n'+(c.detail||'기록상 특이사항 없음.'),id};navigate('info');}
else if(act==='event'){state.infoBack=state.screen;state.event=id;mark(id);const x=EVENTS.find(x=>x.id===id);state.inspectInfo={title:x.title,detail:x.date+' '+x.time+'\n'+x.desc,id};navigate('info');}
else if(act==='contact'){state.infoBack=state.screen;const c=CONTACTS.find(x=>(x.id||x.name)===id);if(c?.id)mark(c.id);state.inspectInfo={title:c.name,detail:c.detail,id:c.id};navigate('info');}
else if(act==='inspect'){state.inspectBack=state.screen;mark(id);state.inspect=id;navigate('inspect');}
else if(act==='archive'){archive(id);render();toast('승민의 사건 기록함에 보관했어.');}
else if(act==='puzzle'){state.puzzle=id;navigate('puzzle');}
else if(act==='cell'){state.answers.cell=d.value;render();}
else if(act==='timeline'){let q=state.answers.P2Order||[];if(!q.includes(id)&&q.length<3)state.answers.P2Order=[...q,id];state.dirty=true;render();}
else if(act==='timeline-clear'){state.answers.P2Order=[];state.dirty=true;render();}
else if(act==='hint'){let p=state.puzzle;state.hints[p]=Math.min(3,(state.hints[p]||0)+1);render();}
else if(act==='verify'){verify();}
else if(act==='month'){state.month=d.value;render();}
else if(act==='scene-start'){if(required.every(done)){state.sceneStep=0;state.time='10:08';mark('A27');navigate('scene');}}
else if(act==='scene-next'){state.sceneStep++;if(state.sceneStep===2){mark('A30');archive('A27');archive('A30');}if(state.sceneStep===3)state.time='19:36';if(state.sceneStep===6){state.time='09:41';state.day='11/21';}if(state.sceneStep>=7){navigate('chapterEnd');}else render();}
else if(act==='save'){saveManual();}else if(act==='load'){loadManual();}else if(act==='load-legacy'){loadLegacy();}else if(act==='reset'){reset();}else if(act==='noop'){};
}
// Read-only generic detail for contacts, calendar and telephone entries.
const oldView=view;
view=function(){if(state.screen==='info'){const x=state.inspectInfo||{};return shell(x.title||'기록',state.infoBack||'home',`<div class="v7card"><h3>${E(x.title||'기록')}</h3><div class="v7docText">${br(x.detail||'')}</div></div>${archiveButton(x.id)}<button class="v7btn light" data-act="nav" data-to="board">추리보드 확인</button>`,{board:true});}return oldView();};
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;if(t.dataset.act==='answer'||t.dataset.act==='multi')return;handleClick(t);});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.act==='answer'){state.answers[t.dataset.key]=t.value;state.dirty=true;}else if(t.dataset.act==='multi'){const k=state.puzzle;let a=state.answers[k]||[];a=t.checked?[...new Set([...a,t.dataset.value])]:a.filter(x=>x!==t.dataset.value);state.answers[k]=a;state.dirty=true;}});
render();
