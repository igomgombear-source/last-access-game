'use strict';
const V10ART='assets/59a05aa107e3.webp';
const V10DIALOGUE=[
 ['권해인','승민쌤, 휴대폰 좀 맡아주실 수 있어요?'],
 ['이승민','휴대폰이요? 무슨 일 있으세요?'],
 ['권해인','내일 9시 합창 리허설 앞부분만 대신 진행해 주셨으면 해서요.'],
 ['이승민','네. 음원만 보내주시면 되는 거죠?'],
 ['권해인','곡 순서와 시작 시점, 음량을 이 휴대폰에 맞춰 놨어요. 강당 음향장치도 이걸로 테스트했고요.'],
 ['이승민','그냥 파일만 옮기면 안 돼요?'],
 ['권해인','옮기려면 설정을 다시 맞춰야 해요. 앞부분은 이 휴대폰으로 재생하고, 이후 반복 연습용은 컴퓨터에 옮겨도 괜찮아요.'],
 ['이승민','해인쌤은 언제 오시는데요?'],
 ['권해인','8시 40분에 원본 자료를 확인할 일이 있어요. 10시 반쯤에는 제가 직접 휴대폰을 찾으러 올게요.'],
 ['이승민','혹시 늦어지시면 제가 어떻게 하면 될까요?'],
 ['권해인','그때는 17번 보관함 메모와 작년 자료도 확인해 주세요. 온유 일은 이번에 제대로 확인하고 싶어요.'],
 ['이승민','알겠습니다. 리허설부터 잘 진행해 놓을게요.']
];
let v10CoverVisible=true;
let v10SettingsOpen=false;
let v10ReducedMotion=state.v12ReducedMotion??window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const V10preView=view;
const V10preRender=render;
function V10hasProgress(){return !!(state.started||state.screen==='v10novel'||state.screen==='v12arrival'||state.seen.length||state.done.length);}
function V10title(){
 const canContinue=V10hasProgress();
 return `<section class="v12-title" aria-label="마지막 접속 타이틀 화면"><div class="v12-title-layout"><header class="v12-title-copy"><div class="v12-eyebrow"><span></span> A PHONE MYSTERY</div><h1>마지막 접속</h1><p class="v12-title-line">돌아온 한 통의 문자.<br>돌아오지 않은 사람.</p></header><figure class="v12-title-art"><img src="${V10ART}" alt="책상 위의 휴대폰과 17번 파란 파일, 갈색 자료 봉투"><figcaption>2026.10.30 · 21:37</figcaption></figure><div class="v12-title-actions"><button class="v12-title-primary" type="button" data-v10="new">새 게임 시작 <span aria-hidden="true">↗</span></button><button class="v12-title-secondary" type="button" data-v10="continue" ${canContinue?'':'disabled'}>이어하기 <span>${canContinue?'저장된 기록':'저장된 기록 없음'}</span></button><button class="v12-title-settings" type="button" data-v10="settings">설정</button><p class="v12-title-meta">기록을 읽고, 연결하고, 마지막 진실을 찾아라.<br><span>CHAPTER A + B · v12</span></p></div></div>${v10SettingsOpen?`<div class="v12-settings-layer"><section role="dialog" aria-modal="true" aria-labelledby="title-settings-heading" class="v12-settings-card"><h2 id="title-settings-heading">설정</h2><p>진행은 이 브라우저에 자동 저장돼요. 마지막 수동 저장은 게임 안의 설정에서 불러올 수 있어요.</p><button type="button" class="v7btn light" data-v10="reduce" aria-pressed="${v10ReducedMotion}">화면 전환 효과 줄이기 · ${v10ReducedMotion?'켜짐':'꺼짐'}</button><button type="button" class="v7btn blue" data-v10="close">돌아가기</button></section></div>`:''}</section>`;
}
function V10novel(){
 const i=Math.max(0,Math.min(V10DIALOGUE.length-1,state.v10IntroStep||0));
 const [who,text]=V10DIALOGUE[i];
 return `<section class="v12-novel"><header><span>마지막 접속</span><button type="button" data-v10="skip">건너뛰기</button></header><div class="v12-progress" aria-label="프롤로그 진행 ${i+1}/${V10DIALOGUE.length}"><span style="width:${100*(i+1)/V10DIALOGUE.length}%"></span></div><div class="v12-novel-body"><div class="v12-eyebrow">PROLOGUE · 맡겨진 휴대폰</div><p class="v12-scene-date">2026년 10월 30일 금요일<br>밤 9시 37분 · 양평중학교</p><p class="v12-speaker">${E(who)}</p><p class="v12-dialogue" aria-live="polite">“${E(text)}”</p><p class="v12-novel-hint">다음 대화를 눌러 이야기를 진행해.</p></div><footer><button type="button" class="v7btn" data-v10="next">${i===V10DIALOGUE.length-1?'휴대폰 전달받기':'다음 대화 ›'}</button><span>${i+1} / ${V10DIALOGUE.length}</span></footer></section>`;
}
function V12arrival(){
 const steps=[
  {tag:'10월 31일 · 09:05',title:'맡겨진 음악은 끝났다.',body:'리허설 앞부분은 해인이 맞춰 둔 휴대폰으로 무사히 진행했다.\n\n휴대폰을 직접 찾으러 오기로 한 시각은 10시 반. 승민은 반복 연습용 음원을 옮기기 위해 해인의 사용 안내를 확인하려 했다.',button:'잠시 후'},
  {tag:'10월 31일 · 09:17',title:'알 수 없는 발신자',body:'“홍온유 학생 일은 이번에도 그냥 넘어가실 건가요?”\n\n화면에 익명의 문자가 떠올랐다. 지난해 합창제에서 점수표가 바뀌었다던 학생의 이름이었다.',button:'해인의 부탁을 떠올린다'},
  {tag:'10월 31일 · 09:18',title:'17번 보관함부터.',body:'“제가 늦으면 작년 자료도 확인해 주세요.”\n\n해인은 그 자료를 다시 확인하고 있었다. 승민은 부탁받은 메모와 행사 기록을 살펴보기로 한다.\n\n메시지는 문장을 눌러 자세히 읽고, 사진은 확대해 표시를 확인할 수 있다. 읽은 기록의 의미는 추리보드에서 연결한다.',button:'휴대폰 조사 시작'}
 ];
 const s=steps[Math.min(state.v12ArrivalStep||0,2)];
 return `<section class="v7scene">${status(true)}<div class="v7sceneBody"><div class="v7sceneTag">${E(s.tag)}</div><h1 class="v7sceneQuote">${E(s.title)}</h1><p class="v12-scene-desc">${E(s.body)}</p></div><footer class="v7sceneFoot"><button class="v7btn" type="button" data-v10="arrival">${E(s.button)}</button></footer><div class="toast"></div></section>`;
}
view=function(){if(v10CoverVisible||state.screen==='intro')return V10title();if(state.screen==='v10novel')return V10novel();if(state.screen==='v12arrival')return V12arrival();return V10preView();};
render=function(){app.classList.toggle('is-title',v10CoverVisible||state.screen==='intro');app.classList.toggle('v12-reduce-motion',v10ReducedMotion);V10preRender();};
function V10finishIntro(){state.started=true;state.v10IntroDone=true;state.v10IntroStep=V10DIALOGUE.length;state.v12ArrivalStep=0;mark('A01');state.day='10/31';state.time='09:05';state.screen='v12arrival';render();}
function V10startFresh(){state=INITIAL();V9init();state.edition=12;state.v12ReducedMotion=v10ReducedMotion;state.screen='v10novel';state.v10IntroStep=0;state.day='10/30';state.time='21:37';v10CoverVisible=false;v10SettingsOpen=false;render();}
function V10new(){if(V10hasProgress())V12ask('새 게임을 시작할까요?','현재 자동 진행은 새 게임으로 바뀌고, 수동 저장은 유지돼요.','새 게임 시작',V10startFresh);else V10startFresh();}
function V10continue(){if(!V10hasProgress())return;v10CoverVisible=false;v10SettingsOpen=false;render();}
document.addEventListener('click',e=>{
 const button=e.target.closest('[data-v10]');if(!button)return;
 e.preventDefault();e.stopImmediatePropagation();
 const action=button.dataset.v10;
 if(action==='new')V10new();
 else if(action==='continue')V10continue();
 else if(action==='settings'){v10SettingsOpen=true;render();}
 else if(action==='close'){v10SettingsOpen=false;render();}
 else if(action==='reduce'){v10ReducedMotion=!v10ReducedMotion;state.v12ReducedMotion=v10ReducedMotion;render();}
 else if(action==='next'){if(state.v10IntroStep>=V10DIALOGUE.length-1)V10finishIntro();else{state.v10IntroStep=(state.v10IntroStep||0)+1;render();}}
 else if(action==='skip')V12ask('프롤로그를 건너뛸까요?','휴대폰을 맡긴 이유를 읽지 않고 다음 날 장면으로 이동해요.','건너뛰기',V10finishIntro);
 else if(action==='arrival'){state.v12ArrivalStep=(state.v12ArrivalStep||0)+1;if(state.v12ArrivalStep===1){state.time='09:17';mark('A02');}else if(state.v12ArrivalStep===2)state.time='09:18';else state.screen='home';render();}
},true);
render();
app.style.visibility='visible';
document.getElementById('boot-overlay')?.remove();
