'use strict';

// v13.6: 정본 스토리 3차. 챕터 A의 10:45 효은 메시지와 "직접 통화해 볼까요" 선택지.
// 퍼즐·정답·장면 순서는 바꾸지 않는다. 새 저장 필드: canonHyoComing, canonCallChoice.
const CANON3_VERSION='13.6.0';
const CANON3_COMING_AFTER=5;

function CANON3coming(){return !!state.canonHyoComing;}
function CANON3check(){
  if(CANON3coming()||PHONEisB()||!state.started||state.sceneStep>0)return;
  if(typeof required==='undefined'||!Array.isArray(state.done))return;
  if(required.filter(done).length<CANON3_COMING_AFTER)return;
  state.canonHyoComing=true;
  if(!state.time||state.time<'10:45')state.time='10:45';
  setTimeout(()=>{toast('10:45 · 임효은: “승민쌤 강당이세요? 잠깐 갈게요.”');if(typeof ID14SFX==='object')ID14SFX.notify();},50);
}

// ---- 효은이 오고 있다: 목표 문구와 추리보드 카드 ----
const CANON3prevGoal=RELEASEgoal;
RELEASEgoal=function(){
  if(!PHONEisB()&&CANON3coming()&&state.sceneStep<1){
    if(!required.every(done))return '효은이 오고 있다. 남은 추리를 정리하고, 기록함에 남길 기록을 골라 두자.';
    return '효은이 강당 입구에 와 있다. 기록함을 확인했다면 효은을 만나자.';
  }
  return CANON3prevGoal();
};
const CANON3prevBoard=board;
board=function(){
  let html=CANON3prevBoard();
  if(!CANON3coming())return html;
  html=html.replace('<h3>10:30의 약속</h3>','<h3>10:45 · 효은의 메시지</h3>')
    .replace('약속 시간이 지났다. 돌아오지 않은 해인의 소식을 확인하자.','“승민쌤 강당이세요? 잠깐 갈게요.” 효은이 강당 입구로 오고 있다. 기록함에 남길 기록을 정리했다면 효은을 만나자.')
    .replace('챕터 A 마지막 장면으로','효은을 만난다');
  return html.replace(/필수 추리 (\d+)개가 남아 있어\. 새로운 기록을 읽으면 조사 항목이 추가돼\./,'“승민쌤 강당이세요? 잠깐 갈게요.” 효은이 오고 있다. 필수 추리 $1개가 남아 있어.');
};

// ---- 10:51 선택지: 직접 통화를 청할 것인가 ----
const CANON3_ASK_LINE='“해인쌤과 직접 통화해 볼 수 있을까요?” “지금은 쉬셔야 한대요. 제가 바로 갖다 드릴게요.” ';
const CANON3prevScene=scene;
scene=function(){
  const step=Math.min(state.sceneStep||0,6);
  if(step===6)state.day='11/02';
  let html=CANON3prevScene();
  if(step!==1)return html;
  const handover='승민은 조사한 원본과 결론을 기록함에 남긴 뒤 휴대폰을 넘기기로 한다.';
  html=html.replace(CANON3_ASK_LINE,'').replace(' '+handover,'').replace(handover,'');
  const choice=state.canonCallChoice;
  if(!choice){
    const foot=html.indexOf('<div class="v7sceneFoot">');
    const end=html.indexOf('<div class="toast">',foot);
    if(foot<0||end<0)return html;
    return html.slice(0,foot)+`<div class="v7sceneFoot"><p class="canon3-prompt">승민은 어떻게 할까?</p><button class="v7btn" type="button" data-canon3="ask">“해인쌤과 직접 통화해 볼 수 있을까요?”</button><button class="v7btn light" type="button" data-canon3="accept">“알겠습니다. 부탁드릴게요.”</button></div>`+html.slice(end);
  }
  const reply=choice==='ask'
    ?'<p class="v12-scene-desc canon3-reply">“해인쌤과 직접 통화해 볼 수 있을까요?”<br>효은: “지금은 쉬셔야 한대요. 제가 바로 갖다 드릴게요.”<br>승민은 더 묻지 않았다. '+handover+'</p>'
    :'<p class="v12-scene-desc canon3-reply">“알겠습니다. 부탁드릴게요.”<br>승민은 효은의 말을 그대로 받아들였다. '+handover+'</p>';
  const at=html.indexOf('</p>',html.indexOf('class="v12-scene-desc"'));
  return at<0?html:html.slice(0,at+4)+reply+html.slice(at+4);
};

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-canon3]');
  if(!el)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(state.screen!=='scene'||state.sceneStep!==1)return;
  state.canonCallChoice=el.dataset.canon3==='ask'?'ask':'accept';
  render();
},true);

const CANON3prevRender=render;
render=function(){CANON3check();CANON3prevRender();};
const CANON3prevTitle=V10title;
V10title=function(){return CANON3prevTitle().replaceAll('v'+CANON2_VERSION,'v'+CANON3_VERSION);};
document.title='마지막 접속 — v'+CANON3_VERSION;
render();
