'use strict';

// v13.3: 승민의 정체성(3학년 1반 담임·한문 교사)과 주제(三人成虎·百聞不如一見)를 덧입히는 레이어.
// 사건·정답·단서 공개 조건·저장 필드는 바꾸지 않는다. 기존 파일은 고치지 않고 화면 문자열과 효과만 덧붙인다.
const ID14_VERSION='13.3.0';
const ID14_SOUND_KEY='last_seen_id14_sound';

// ---- 효과음 (파일 없이 합성, 사용자 조작 뒤에만 재생, 설정에서 끌 수 있음) ----
let ID14ctx=null;
function ID14soundOn(){try{return localStorage.getItem(ID14_SOUND_KEY)!=='off';}catch(_){return true;}}
function ID14tone(notes){
  if(!ID14soundOn())return;
  if(navigator.userActivation&&!navigator.userActivation.hasBeenActive)return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    ID14ctx=ID14ctx||new AC();
    if(ID14ctx.state==='suspended')ID14ctx.resume();
    const t0=ID14ctx.currentTime;
    for(const [freq,start,length,gain] of notes){
      const osc=ID14ctx.createOscillator(),amp=ID14ctx.createGain();
      osc.type='sine';osc.frequency.value=freq;
      amp.gain.setValueAtTime(0.0001,t0+start);
      amp.gain.exponentialRampToValueAtTime(gain,t0+start+0.02);
      amp.gain.exponentialRampToValueAtTime(0.0001,t0+start+length);
      osc.connect(amp);amp.connect(ID14ctx.destination);
      osc.start(t0+start);osc.stop(t0+start+length+0.05);
    }
  }catch(_){}
}
const ID14SFX={
  notify:()=>ID14tone([[880,0,.35,.06],[1175,.16,.5,.05]]),
  unlock:()=>ID14tone([[520,0,.18,.04],[780,.1,.3,.04]]),
  seal:()=>ID14tone([[110,0,.55,.12],[330,.05,.6,.04],[660,.12,.8,.03]])
};

// ---- 승민의 한 줄: 기록을 읽을 때 덧붙는 1인칭 반응 (기록 본문은 그대로) ----
const ID14THOUGHT={
  A02:'이름은 맞는데 보낸 사람은 모른다. 누가 보냈는지부터 확인해야 한다.',
  A04:'저장되지 않은 번호라는 사실에서 끌어낼 수 있는 건 거기까지다. 나머지는 내 추측이다.',
  A05:'통화가 있었다는 것뿐이다. 무슨 말이 오갔는지는 이 기록에 없다.',
  A06:'“원본 확인을 뜻하는 듯한”. 듯하다는 말은 확인된 것으로 적지 않는다.',
  A07:'가지 않겠다는 말이다. 말은 말이고, 행동은 따로 확인해야 한다.',
  A08:'앞서 한 말과 다르다. 그래도 근처에 있었다는 사실이 곧 무엇을 했다는 뜻은 아니다.',
  A09:'17번. 해인쌤이 번호까지 적어 둔 이유를 생각해 본다.',
  A10:'봉투 구석의 작은 번호는 직접 보지 않았다면 놓쳤을 것이다. 百聞不如一見.',
  A12:'판본을 맞대어 다른 곳을 찾는 일을 교감(校勘)이라고 한다. 수업에서 가르치던 방법을 여기서 쓰게 될 줄이야.',
  A15:'숫자는 두 번 읽는다. 처음엔 눈으로, 다음엔 손가락으로 짚어서.',
  A16:'같은 이름 옆의 숫자가 달라졌다. 달라진 것과 누가 바꿨는지는 별개의 문제다.',
  A17:'컴퓨터를 썼다는 사실과 자료를 바꿨다는 사실은 다르다. 한 줄에 같이 적지 않는다.',
  A19:'학생이 직접 쓴 말이다. 그 말을 끝까지 확인한 어른이 있었는지 모르겠다.',
  A20:'“확인해 볼게.” 담임이 되고 나서 내가 가장 자주 하는 말이다. 그 말이 얼마나 쉽게 잊히는지도 안다.',
  A22:'“이미 정리된 일.” 정리됐다는 것과 확인됐다는 것은 다른 말이다.',
  A24:'원본과 전달본을 나란히 놓고 대조한다. 해인쌤도 같은 방법을 택했다.',
  A25:'익명의 말이다. 그럴듯하게 들린다는 이유로 믿어서는 안 된다.',
  A31:'34초. 통화가 있었다는 사실 하나뿐이다.',
  A32:'해인쌤도 이 숫자 앞에서 멈췄다.',
  A34:'“제가 처리할게요.” 교무실에서 나도 자주 듣고 자주 하는 말이다. 처리와 확인은 다르다.',
  B01:'기사 속 이름은 해인쌤이었다. 한 번 읽고는 믿을 수 없어서 두 번 읽었다. 믿고 싶지 않다고 확인을 멈출 수는 없다.',
  B02:'나는 이 문자를 해인쌤이 쓴 것으로 믿고 답장했다. 그 믿음이 어디서 왔는지 다시 따져 봐야 한다.',
  B10:'거짓말을 한 사람과 해를 입힌 사람은 다르다. 두 가지를 같은 줄에 적지 않는다.',
  B11:'직접 보지 않고 전한 말이 사람을 움직였다. 三人成虎. 나 역시 그 말을 그대로 믿었다.',
  B13:'직접 본 일과 전해 들은 일을 나누어 적는다. 이 기록은 직접 본 사람의 것이다.',
  B15:'빠진 문서가 있다는 것과 누가 일부러 뺐다는 것은 다른 이야기다.',
  B19:'이해관계가 있다는 것과 행동을 했다는 것은 다르다. 동기와 행위는 다른 칸에 적는다.',
  B21:'해인쌤의 마지막 메모다. 끝까지 확인하려던 사람의 기록을 이런 식으로 읽게 될 줄은 몰랐다.',
  B22:'일정은 만남이 아니라 약속이다. 실제로 만났는지는 다른 기록으로 확인해야 한다.',
  B24:'사진 한 장은 한 장면일 뿐이다. 그 뒤의 일을 상상으로 채우지 않는다.',
  B25:'본 사람의 말도 본 데까지만 믿는다.',
  B26:'백 번 듣는 것보다 한 번 보는 것. 원본이 남아 있다면 내 눈으로 확인해야 한다. 百聞不如一見.',
  B29:'끝까지 읽어야 하는 기록이다. 해인쌤이 하려던 일을 이제 내가 마무리해야 한다.'
};
function ID14inject(html,id){
  const line=ID14THOUGHT[id];
  if(!line)return html;
  const at=html.indexOf('<button class="v7btn');
  if(at<0)return html;
  const note=`<aside class="id14-thought" aria-label="승민의 한 줄"><span class="id14-thought-mark" aria-hidden="true">✓</span><p>${E(line)}</p></aside>`;
  return html.slice(0,at)+note+html.slice(at);
}
const ID14prevInspect=inspect;
inspect=function(){return ID14inject(ID14prevInspect(),state.inspect);};
const ID14prevB9detail=B9detail;
B9detail=function(){return ID14inject(ID14prevB9detail(),state.brecord);};

// ---- 타이틀: 三人成虎를 크게, 설정에 효과음 스위치 ----
const ID14prevTitle=V10title;
V10title=function(){
  const on=ID14soundOn();
  const hanja=`<div class="id14-hanja" role="group" aria-label="삼인성호. 세 사람이 말하면 없는 호랑이도 생긴다."><p class="id14-hanja-chars" lang="zh-Hant" aria-hidden="true"><span>三</span><span>人</span><span>成</span><span>虎</span></p><p class="id14-hanja-read"><b>삼인성호</b> · 세 사람이 말하면<br>없는 호랑이도 생긴다</p></div>`;
  return ID14prevTitle()
    .replace('돌아오지 않은 사람.</p>','돌아오지 않은 사람.</p>'+hanja)
    .replace('<button type="button" class="v7btn blue" data-v10="close">',`<button type="button" class="v7btn light" data-id14="sound" aria-pressed="${on}">효과음 · ${on?'켜짐':'꺼짐'}</button><button type="button" class="v7btn blue" data-v10="close">`)
    .replaceAll('v13.2.1','v'+ID14_VERSION);
};
document.title='마지막 접속 — v'+ID14_VERSION;

// ---- 프롤로그: 3학년 1반 담임, 칠판의 글자 ----
const ID14prevContext=RELEASEcontext;
RELEASEcontext=function(){
  return ID14prevContext()
    .replace('나는 양평중학교 한문 교사 이승민이다.','나는 양평중학교 3학년 1반 담임, 한문 교사 이승민이다.')
    .replace('내일은 교내 합창 리허설이 있는 날이다.','내일은 교내 합창 리허설이 있는 날이다. 우리 반 아이들도 무대에 선다.<br><br>오늘 3학년 1반 한문 시간에 칠판에 적어 둔 글자가 아직 마음에 남아 있었다. 三人成虎.')
    .replace('음악 교사 권해인과 리허설 준비를 마무리하고 있었다.','합창제를 함께 준비해 온 음악 교사 권해인과 리허설 준비를 마무리하고 있었다.');
};

// ---- 10:30의 담임 일상, 휴대폰을 열기 전의 망설임 ----
const ID14prevMorning=RELEASEmorning;
RELEASEmorning=function(){
  return ID14prevMorning().replace('학생들이 다시 연습을 시작했지만 해인은 보이지 않았다.','학생들이 다시 연습을 시작했지만 해인은 보이지 않았다.<br><br>3학년 1반 반장이 쭈뼛거리며 다가왔다. “쌤, 해인쌤은 언제 오세요? 다음 곡 음원이 필요한데요.”<br><br>“곧 오실 거야.” 승민은 그렇게 답했다. 그 말이 맞는지는 확인해 보지 않은 채였다.');
};
const ID14prevLock=RELEASElock;
RELEASElock=function(){
  return ID14prevLock().replace('돌아오지 않은 동료의 휴대폰에, 학생의 이름이 남아 있었다.','남의 휴대폰을 열어 보는 일이 마음에 걸렸다. 그러나 돌아오지 않은 동료의 휴대폰에, 학생의 이름이 남아 있었다.');
};

// ---- 후일담: 해인에 대한 승민의 마음, 월요일 아침의 3학년 1반 ----
const ID14prevBScene=B9scene;
B9scene=function(){
  const html=ID14prevBScene();
  if(state.bsceneStep!==4)return html;
  return html.replace('승민은 해인이 남긴 메모를 함께 전달했다. “학생의 말과 점수 변경 이유는 따로 확인할 것.”','승민은 해인이 남긴 메모를 함께 전달했다. “학생의 말과 점수 변경 이유는 따로 확인할 것.”\n\n승민은 한참 말을 잇지 못했다. 해인이 끝까지 확인하려던 것은 점수표 한 장이 아니라, 한 학생의 말이 기록에 남는 일이었다.\n\n월요일 아침, 승민은 3학년 1반 조회 시간 전에 칠판 앞에 섰다. 승민은 한 달 전 한문 시간에 적었던 三人成虎를 다시 썼다. 수업에서 여러 번 가르친 말이다. 그 옆에 한 줄을 더 적었다. 百聞不如一見.');
};

// ---- 추리 확정: 인장 연출 + 효과음 ----
function ID14seal(){
  document.querySelector('.id14-seal')?.remove();
  const el=document.createElement('div');
  el.className='id14-seal';el.setAttribute('aria-hidden','true');
  el.innerHTML='<span>確</span><span>認</span>';
  document.body.append(el);
  ID14SFX.seal();
  setTimeout(()=>el.remove(),1700);
}
const ID14prevToast=toast;
toast=function(message){
  ID14prevToast(message);
  if(/추리 완료/.test(String(message)))ID14seal();
};

// ---- 화면을 그린 뒤: 챕터 표지에 사자성어, 잠금 화면 알림음 ----
let ID14wasLock=false;
function ID14afterRender(){
  document.querySelectorAll('#app *').forEach(el=>{
    if(el.children.length||el.dataset.id14)return;
    const text=el.textContent.trim();
    const match=/^CHAPTER ([AB])\b(?!\s*\+)/.exec(text);
    if(!match||text.length>28)return;
    el.dataset.id14='1';
    el.insertAdjacentHTML('beforeend',` <span class="id14-chap" lang="zh-Hant">${match[1]==='A'?'三人成虎':'百聞不如一見'}</span>`);
  });
  const lock=!!document.querySelector('.release-lock');
  if(lock&&!ID14wasLock)ID14SFX.notify();
  if(!lock&&ID14wasLock)ID14SFX.unlock();
  ID14wasLock=lock;
}
const ID14prevRender=render;
render=function(){ID14prevRender();ID14afterRender();};

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-id14]');
  if(!button)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(button.dataset.id14==='sound'){
    const turnOn=!ID14soundOn();
    try{localStorage.setItem(ID14_SOUND_KEY,turnOn?'on':'off');}catch(_){}
    if(turnOn)ID14SFX.unlock();
    render();
  }
},true);

render();
