'use strict';

// v13.7: 오답 보기를 그럴듯하게, 최종 추리의 신원 대조를 플레이어에게, 해인의 기록을 죽음 뒤에 다시 읽기.
// 정답 키와 판정 함수는 바꾸지 않는다. 오답 보기의 문장과 기록 문장만 바꾼다.
const CANON4_VERSION='13.7.0';

// ---- 챕터 A: 오답도 "신중한 문장"으로. 증거를 읽어야 틀린 이유가 보인다 ----
const CANON4_A_LABELS={
  P1:{skipped:'해인이 08:40에 서진석을 만나 원본을 돌려받기로 했다.',guilty:'해인이 08:40에 최기훈에게 평가표 수정 경위를 들으려 했다.'},
  P3:{same:'두 사진 모두 17번 보관함 파일을 다른 각도에서 찍은 것이다.',missing:'봉투 속 자료는 17번 파일에서 꺼낸 행사 운영자료다.'},
  P5:{hong:'홍온유의 두 번째 점수가 바뀌어 선발 순위가 뒤집혔다.',choi:'점수 하나가 바뀌었지만 합계 순위는 그대로다.'},
  P6:{student:'홍온유가 공용 컴퓨터로 최종 제출본 파일을 열었다.',teacher:'학생이 변경을 부인한 뒤 학교가 재확인을 마쳤다.'},
  P9:{culprit:'익명 발신자는 파일을 든 사람이 서진석이라고 밝혔다.',phone:'익명 문자와 21:20 최기훈의 전화는 같은 번호에서 왔다.'},
  P10:{never:'11월 계획표에는 10월 31일 이후 일정이 모두 취소 표시돼 있다.',faked:'리허설 안내에는 해인이 11월부터 휴직한다는 메모가 있다.'}
};
for(const [id,labels] of Object.entries(CANON4_A_LABELS)){
  const p=PUZZLES.find(x=>x.id===id);
  if(!p||!Array.isArray(p.opts))continue;
  for(const opt of p.opts)if(labels[opt[0]])opt[1]=labels[opt[0]];
}

// ---- 챕터 B: 같은 원칙. 판정 키는 그대로 ----
const CANON4_B_LABELS=[
  ['홍온유가 점수를 고치도록 서진석에게 요청했다.','서진석이 최기훈에게 점수를 바꾸라고 직접 지시했고, 그 지시가 문서로 남아 있다.'],
  ['점수 변경을 인정한 사람이 사망 사건에도 직접 관여했다고 확인된다.','김민구 측이 선발 전에 계약 내용을 알고 점수 변경을 요청했다.'],
  ['정유림에게 — 따라가지 않은 관계자 통로의 내부 목격','문화회관 시설팀에게 — 관계자 계단 CCTV 영상'],
  ['공유폴더에서 — 자동 동기화 시각만으로 만든 이동 기록','공유폴더에서 — 18:04 자동 동기화 기록']
];
const CANON4prevIRbody=IRbody;
IRbody=function(id,draft){
  let html=CANON4prevIRbody(id,draft);
  for(const [from,to] of CANON4_B_LABELS)html=html.replace(E(from),E(to));
  if(id==='BP6')html=html.replace(`${IRsource('B30',true)}`,`${IRsource('B30',true)}${IRsource('B34')}`);
  return html;
};
const CANON4prevIRassess=IRassess;
IRassess=function(id,draft){
  const base=CANON4prevIRassess(id,draft);
  if(id==='BP6'&&draft.request==='witness')return '시설팀 답변을 다시 읽어 봐. 관계자 계단에 남아 있는 영상이 있었을까?';
  if(id==='BP4'&&draft.interpretation==='student')return '최기훈은 “바꾸라는 말은 안 했다”고 했어. 지시가 문서로 남았다는 기록이 있었는지 확인해.';
  if(id==='BP4'&&draft.interpretation==='murder')return '김민구 측이 무엇을 알았는지 보여 주는 기록은 없어. 확인되는 사람과 문서만으로 판단해.';
  return base;
};

// ---- 최종 추리: 신원은 플레이어가 대조한다 ----
CANONrecord('B28',{text:'참고인 확인용 자료 · 동선과 인물 대조\n18:26 원본 속 동행인: 짙은 남색 재킷, 밝은 소매 단. 얼굴은 화면에서 또렷하지 않다.\n18:26부터 계단참 진입까지 연속 촬영과 삼각대 카메라 원본을 대조했다. 이동 중 동행인이 바뀌거나 다른 사람이 끼어드는 장면은 없다.\n관계자 출입문 기록: 카드 C-17, 18:26 입장 · 18:37 퇴장.'});
if(B9.B34&&!B9.B34.text.includes('C-17'))CANONrecord('B34',{text:B9.B34.text.replace('출입문 카드 기록은 경찰에 이미 제출했어요.','출입문 카드 기록은 경찰에 이미 제출했어요. C-17 카드는 그날 가온무대기획 운영 담당에게 배부된 카드입니다.')});
const CANON4prevFinal=V12finalQuestion;
V12finalQuestion=function(){
  let html=CANON4prevFinal();
  if(ARTfinalIndex()!==1)return html;
  const guide='<p>영상 속 동행인의 옷차림을 17:42 사진과, 출입 카드 C-17의 배부 대상을 운영 연락망과 대조해 판단하세요.</p>';
  const links=[['B24','17:42 행사 사진'],['B34','시설팀 답변 · C-17'],['B35','2025 외부 운영 연락망']]
    .filter(([id])=>B9SEEN(id)).map(([id,label])=>`<button type="button" class="art-source-link" data-act="b9-open" data-id="${id}">${PHONEicon('files')} ${E(label)} 원문 ${PHONEicon('chevron')}</button>`).join('');
  html=html.replace('<p>현장의 기록과 인물 대조를 바탕으로 판단하세요.</p>',guide);
  const at=html.indexOf('<div class="art-person-choices">');
  return at<0?html:html.slice(0,at)+`<div class="canon4-identity">${links}</div>`+html.slice(at);
};

// ---- 해인의 기록을 죽음 뒤에 다시 읽기 ----
const CANON4_AFTER={
  A01:'“승민쌤은 확인하고 말하는 사람이라 좋아요.” 그 말을 들은 다음 날, 나는 확인하지 않았다.',
  A20:'“누가 수정했는지 확실히 확인해 볼게.” 해인쌤은 1년이 걸려서라도 그 약속을 지키려 했다.',
  A26:'해인쌤이 직접 만나려던 사람. 그 만남이 마지막이 될 줄은 몰랐을 것이다.',
  A28:'“아직 말씀 안 드렸으면 좋겠어요.” 해인쌤은 효은쌤을 믿고 부탁했다.',
  A29:'11월 둘째 주 공연 안내. 해인쌤은 다음 달 수업까지 준비해 두었다. 그 계획을 이어받을 사람은 아직 없다.',
  A36:'“10:30에 제가 휴대폰을 찾으러 갈게요.” 그 약속이 왜 지켜지지 않았는지, 이제는 안다.'
};
function CANON4afterDeath(){return PHONEisB()||(state.sceneStep||0)>=6||(Array.isArray(state.bseen)&&state.bseen.length>0);}
const CANON4prevInject=ID14inject;
ID14inject=function(html,id){
  if(!CANON4afterDeath()||!CANON4_AFTER[id])return CANON4prevInject(html,id);
  const saved=ID14THOUGHT[id];
  ID14THOUGHT[id]=CANON4_AFTER[id];
  try{return CANON4prevInject(html,id);}finally{if(saved===undefined)delete ID14THOUGHT[id];else ID14THOUGHT[id]=saved;}
};

const CANON4prevTitle=V10title;
V10title=function(){return CANON4prevTitle().replaceAll('v'+CANON3_VERSION,'v'+CANON4_VERSION);};
document.title='마지막 접속 — v'+CANON4_VERSION;
render();
