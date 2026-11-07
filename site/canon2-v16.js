'use strict';

// v13.5: 정본 스토리 2차. 새 기록, 효은·최기훈 대면, 최기훈 알리바이, SJ-25-04 대조, 익명 번호 대조.
// 범인·최종 추리 정답·기존 퍼즐 정답은 바꾸지 않는다. 새 저장 필드: canonDone, canonStage, canonFeedback.
const CANON2_VERSION='13.5.0';

// ---- 새 기록 ----
Object.assign(B9,{
  B31:{id:'B31',title:'읽지 않은 업무메일',time:'10/31 09:50',app:'messages',sender:'권해인 · 학교 업무메일',text:'제목: 오늘 리허설\n“승민쌤, 오늘은 학교에서 바로 나가야 할 것 같아요. 리허설 맡겨 드려서 죄송해요. 휴대폰은 월요일 아침에 받을게요. 혹시 누가 찾아도 승민쌤이 갖고 계셔 주세요.”\n주말에는 열지 않는 업무메일함에 3주 동안 읽지 않은 채 남아 있었다.'},
  B32:{id:'B32',title:'문화회관 공개 앨범 · 18:08',time:'11/01 18:08',app:'photos',sender:'배준서',text:'청소년 음악 행사 공개 앨범의 한 장.\n로비 한쪽에서 권해인과 최기훈이 이야기하고 있다. 최기훈 뒤로 양평중 합창부 학생들이 줄을 서 있다.'},
  B33:{id:'B33',title:'합창부 무대 영상과 진행 기록',time:'11/01 18:21',app:'files',sender:'양평문화회관',text:'공식 행사 영상: 18:21~18:45 양평중 합창부 무대. 지휘하는 최기훈이 처음부터 끝까지 화면에 있다.\n행사 진행 기록: 18:45~19:10 최기훈은 대기실에서 학생 31명의 인원을 확인하고 버스 탑승까지 인솔했다.\n문상윤 순경이 알려 준 추정 시각: 18:17 마지막 목격 이후, 19:05 발견 이전.'},
  B34:{id:'B34',title:'시설팀 답변',time:'11/21 15:40',app:'messages',sender:'양평문화회관 시설팀',text:'“관계자 계단에는 CCTV가 없습니다. 출입문 카드 기록은 경찰에 이미 제출했어요. 그 문 안쪽에서 무슨 일이 있었는지는 저희도 알 수가 없습니다.”'},
  B35:{id:'B35',title:'2025 외부 운영 연락망',time:'2025/10',app:'files',sender:'해인의 공유폴더',text:'2025 합창제 외부 운영 연락망 · 가온무대기획\n서진석 (운영 담당) 010-2754-0618\n임수호 (단기 스태프) 010-4817-2093\n배준서 (촬영 협력) 010-3392-7740'}
});
for(const id of ['B31','B32','B33','B34','B35'])R[id]=[B9[id].title,B9[id].time,B9[id].text,'기록'];
if(B9.B12&&!B9.B12.text.includes('문화회관'))CANONrecord('B12',{text:B9.B12.text+'\n“해인 선생님은 그날 저녁 양평문화회관 행사에서 자료 담당자를 만난다고 하셨어요.”'});

// ---- 진행 상태 ----
function CANON2done(key){
  const list=Array.isArray(state.canonDone)?state.canonDone:[];
  if(list.includes(key))return true;
  // 이전 버전에서 이미 지나간 저장은 막지 않는다.
  if(key==='hyo')return B9DONE('BP2');
  if(key==='choi'||key==='choiAlibi')return B9DONE('BP4');
  return false;
}
function CANON2mark(key){if(!Array.isArray(state.canonDone))state.canonDone=[];if(!state.canonDone.includes(key))state.canonDone.push(key);}

// ---- 기록 공개 조건 ----
const CANON2prevUnlocked=V12unlocked;
V12unlocked=function(id){
  if(id==='B31')return true;
  if(id==='B32'||id==='B35')return B9DONE('BP3');
  if(id==='B33')return CANON2done('choi');
  if(id==='B34')return B9DONE('BP5');
  if(id==='B10'||id==='B11')return CANON2prevUnlocked(id)&&CANON2done('hyo');
  if(id==='B20')return B9DONE('BP3')&&CANON2done('choi');
  if(['B21','B22','B23','B24','B25'].includes(id))return CANON2prevUnlocked(id)&&CANON2done('choiAlibi');
  return CANON2prevUnlocked(id);
};
const CANON2prevGateHint=V12gateHint;
V12gateHint=function(missing,prerequisites=[],zooms=[]){
  if(missing.some(id=>id==='B10'||id==='B11')&&!CANON2done('hyo'))return '먼저 ‘대면 · 임효은’을 마쳐.';
  if(missing.includes('B20')&&!CANON2done('choi'))return '먼저 ‘대면 · 최기훈’을 마쳐.';
  if(missing.some(id=>['B21','B22','B23','B24','B25'].includes(id))&&!CANON2done('choiAlibi'))return '먼저 ‘최기훈의 18시 30분’을 확인해.';
  return CANON2prevGateHint(missing,prerequisites,zooms);
};

// ---- BP1: 09:50 메일과 가짜 문자의 모순 ----
const CANON2bp1=B9PUZZLES.find(p=>p.id==='BP1');
if(CANON2bp1&&!CANON2bp1.need.includes('B31'))CANON2bp1.need.push('B31');
const CANON2prevIRbody=IRbody;
IRbody=function(id,draft){
  let html=CANON2prevIRbody(id,draft);
  if(id!=='BP1')return html;
  html=html.replace(`${IRsource('B03',true)}</div>`,`${IRsource('B03',true)}${IRsource('B31',true)}</div>`);
  return html.replace('<p class="ir-small">',IRchoices(id,'mail','09:50 업무메일과 19:36 문자를 함께 읽으면',[['contradict','월요일에 받겠다던 해인이 토요일 저녁에 “잘 받았다”고 쓸 수는 없다. 문자는 그때 휴대폰을 가진 사람이 썼다.'],['sick','해인이 그사이 몸이 나빠져 계획을 바꾸고 휴대폰을 받았다.'],['delay','메일이 늦게 도착했을 뿐, 두 기록은 같은 사람이 쓴 것이다.']],draft)+'<p class="ir-small">');
};
const CANON2prevIRassess=IRassess;
IRassess=function(id,draft){
  const base=CANON2prevIRassess(id,draft);
  if(id!=='BP1'||base)return base;
  if(!draft.mail)return '업무메일과 문자를 비교하는 칸도 선택해.';
  if(draft.mail!=='contradict')return '메일에서 해인이 휴대폰을 언제 받겠다고 했는지, 문자에서는 무엇을 했다고 하는지 비교해.';
  return '';
};

// ---- 대면과 대조 ----
const CANON2CARDS=[
  {id:'hyo',kind:'대면',title:'대면 · 임효은',ready:()=>B9DONE('BP1')&&B9SEEN('B05'),
   stages:[
    {who:'임효은',line:'“해인 선생님이 아침에 전화로 몸이 안 좋다고 하셨어요. 그래서 제가 휴대폰을 맡아 전해 드리기로 한 거예요.”',ask:'효은의 말과 맞지 않는 기록을 내민다.',answer:'B31',wrong:'임효은: “그게 제 말과 무슨 상관이죠?” 해인이 그날 아침 무엇을 하려 했는지 적힌 기록을 찾아봐.'},
    {who:'임효은',line:'“…그럼 메일을 보내신 뒤에 몸이 나빠지셨겠죠. 저한테는 분명히 아프다고 하셨어요.”',ask:'그날 아침 해인을 직접 본 사람의 기록을 내민다.',answer:'B04',wrong:'임효은: “다른 사람 얘기는 하지 마세요.” 토요일 아침 해인을 직접 만난 사람이 누구였는지 떠올려 봐.'}
   ],
   done:'효은은 한참 말이 없었다. “…아프다는 말은 제가 지어낸 거예요.” 새 자료가 메시지에 도착했다.'},
  {id:'choi',kind:'대면',title:'대면 · 최기훈',ready:()=>B9DONE('BP3')&&B9SEEN('B32'),
   stages:[
    {who:'최기훈',line:'“11월 1일이요? 합창부 학생들을 데리고 문화회관에 있긴 했습니다. 해인 선생님은 못 봤어요.”',ask:'최기훈의 말과 맞지 않는 기록을 내민다.',answer:'B32',wrong:'최기훈: “그날 행사장에 사람이 얼마나 많았는데요.” 그날 문화회관에서 찍힌 사진을 찾아봐.'}
   ],
   done:'“…만났습니다. 점수 얘기를 하셨어요. 작년 일, 전부 말씀드리겠습니다.” 새 자료가 메시지와 파일에 도착했다.'},
  {id:'choiAlibi',kind:'추리',title:'최기훈의 18시 30분',ready:()=>CANON2done('choi')&&B9SEEN('B33'),
   stages:[
    {who:'이승민',line:'최기훈은 해인을 만나 놓고 못 봤다고 했다. 점수도 그가 바꿨다. 그렇다면 해인이 사라진 시간에는 어디에 있었을까.',ask:'사망 추정 시각(18:17 이후, 19:05 이전)에 최기훈이 해인과 함께 있을 수 없었음을 보여 주는 기록은?',answer:'B33',wrong:'그 기록의 시각을 사망 추정 시각과 나란히 놓아 봐. 18:17 이전의 일은 알리바이가 되지 않아.'}
   ],
   done:'최기훈은 거짓말을 했지만, 그 시간 내내 학생들과 무대와 대기실에 있었다. 거짓말한 사람과 해친 사람은 다르다.'},
  {id:'sj',kind:'대조',optional:true,title:'봉투의 번호',ready:()=>B9SEEN('B17')&&typeof seen==='function'&&seen('A10'),
   stages:[
    {who:'이승민',line:'최종 운영 확인서의 문서번호는 SJ-25-04. 어디선가 본 번호다.',ask:'같은 번호가 적힌 기록은?',answer:'A10',wrong:'챕터 A에서 해인이 찍어 둔 사진들을 떠올려 봐.'}
   ],
   done:'서진석이 보낸 봉투 모서리에는 SJ-25-04가 적혀 있었다. 그는 그 번호가 붙은 바로 그 문서를 알고서 빼고 보냈다.'},
  {id:'anon',kind:'대조',optional:true,title:'익명의 번호',ready:()=>B9SEEN('B35'),
   stages:[
    {who:'이승민',line:'해인에게 익명 문자를 보낸 번호는 010-4817-2093이었다.',ask:'같은 번호가 적힌 기록은?',answer:'B35',wrong:'번호가 적힌 명단을 찾아봐. 해인의 공유폴더에 있던 자료일지도 몰라.'}
   ],
   done:'익명의 제보자는 가온무대기획 단기 스태프 임수호였다. 범인이 아니라, 1년 전의 일을 기억하던 사람이었다.'}
];
function CANON2card(id){return CANON2CARDS.find(c=>c.id===id);}
function CANON2stage(card){const s=state.canonStage&&typeof state.canonStage==='object'?state.canonStage[card.id]:0;return Number.isInteger(s)?Math.min(Math.max(s,0),card.stages.length):0;}
function CANON2evidence(){
  const list=Object.values(B9).filter(o=>B9SEEN(o.id)&&V12unlocked(o.id)).map(o=>({id:o.id,title:o.title,meta:o.sender+' · '+o.time}));
  if(typeof seen==='function'&&seen('A10')&&R.A10)list.push({id:'A10',title:R.A10[0],meta:'해인의 휴대폰 사진 · '+R.A10[1]});
  return list;
}
function CANON2view(){
  const card=CANON2card(state.canonCard);
  if(!card||!card.ready())return B9shell('대면과 대조','b9board','<div class="b9card"><p>아직 확인할 수 없어. 관련 기록과 앞선 추리를 먼저 확인해.</p></div>');
  const solved=CANON2done(card.id),step=CANON2stage(card);
  const past=card.stages.slice(0,solved?card.stages.length:step).map(s=>`<div class="canon2-line is-past"><b>${E(s.who)}</b><p>${E(s.line)}</p></div>`).join('');
  let body;
  if(solved){
    body=`${past}<div class="canon2-result" role="status"><p>${E(card.done)}</p></div><button type="button" class="v7btn" data-act="b9-nav" data-to="b9board">추리보드로</button>`;
  }else{
    const s=card.stages[step];
    body=`${past}<div class="canon2-line"><b>${E(s.who)}</b><p>${E(s.line)}</p></div><p class="canon2-ask">${E(s.ask)}</p><div class="canon2-evidence">${CANON2evidence().map(o=>`<button type="button" class="b9choice canon2-pick" data-canon="pick" data-id="${E(o.id)}"><span>${E(o.title)}</span><small>${E(o.meta)}</small></button>`).join('')}</div>${state.canonFeedback?`<p class="ir-feedback canon2-feedback" role="status">${E(state.canonFeedback)}</p>`:''}`;
  }
  return B9shell(card.title,'b9board',`<section class="canon2-card"><p class="canon2-kind">${E(card.kind)}${card.optional?' · 선택':''}</p><h1 class="canon2-title">${E(card.title)}</h1>${body}</section>`);
}
function CANON2boardSection(){
  const cards=CANON2CARDS.filter(c=>c.ready()||CANON2done(c.id));
  if(!cards.length)return '';
  return `<section class="b9card canon2-board"><h2>대면과 대조</h2>${cards.map(c=>`<button type="button" class="canon2-board-item ${CANON2done(c.id)?'is-done':''}" data-canon="open" data-id="${c.id}"><span>${E(c.kind)}${c.optional?' · 선택':''}</span><b>${E(c.title)}</b><small>${CANON2done(c.id)?'✓ 확인함':'지금 확인할 수 있음'}</small></button>`).join('')}</section>`;
}
const CANON2prevBoard=B9board;
B9board=function(){
  const html=CANON2prevBoard();
  const section=CANON2boardSection();
  if(!section)return html;
  const at=html.indexOf('<div class="progressTrack">');
  if(at<0)return html;
  const end=html.indexOf('</div>',at)+6;
  return html.slice(0,end)+section+html.slice(end);
};
const CANON2prevView=view;
view=function(){if(state.screen==='b9canon'&&!v10CoverVisible)return CANON2view();return CANON2prevView();};
const CANON2prevGoal=RELEASEgoal;
RELEASEgoal=function(){
  if(PHONEisB()&&!state.v12CaseSolved){
    if(B9DONE('BP1')&&!CANON2done('hyo'))return '효은의 말을 09:50 업무메일과 맞대 보자.';
    if(B9DONE('BP3')&&!CANON2done('choi'))return '그날 문화회관 사진 속 최기훈을 확인하자.';
    if(CANON2done('choi')&&!CANON2done('choiAlibi'))return '최기훈이 그 시간에 어디 있었는지 확인하자.';
  }
  return CANON2prevGoal();
};

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-canon]');
  if(!el)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(el.dataset.canon==='open'){
    const card=CANON2card(el.dataset.id);if(!card||!(card.ready()||CANON2done(card.id)))return;
    state.canonCard=card.id;state.canonFeedback='';state.screen='b9canon';render();
    document.querySelector('.content')?.scrollTo?.(0,0);
    return;
  }
  if(el.dataset.canon==='pick'){
    const card=CANON2card(state.canonCard);if(!card||CANON2done(card.id)||!card.ready())return;
    const step=CANON2stage(card),s=card.stages[step];
    if(el.dataset.id!==s.answer){state.canonFeedback=s.wrong;render();return;}
    if(!state.canonStage||typeof state.canonStage!=='object')state.canonStage={};
    state.canonStage[card.id]=step+1;state.canonFeedback='';
    if(step+1>=card.stages.length){
      CANON2mark(card.id);
      if(typeof ID14seal==='function')ID14seal();
      render();
      if(card.kind==='대면')toast('대면 완료! 새 자료가 도착했어.');
      return;
    }
    render();
  }
},true);

const CANON2prevTitle=V10title;
V10title=function(){return CANON2prevTitle().replaceAll('v'+CANON_VERSION,'v'+CANON2_VERSION);};
document.title='마지막 접속 — v'+CANON2_VERSION;
render();
