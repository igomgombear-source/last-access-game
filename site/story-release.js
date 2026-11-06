'use strict';

// 13.1: contextual opening and original-source reading. The case and save keys are retained.
const RELEASE_VERSION='13.1.1';
const RELEASE_WALLPAPER='assets/music-room-release.jpg';
V10DIALOGUE.splice(0,V10DIALOGUE.length,
  ['권해인','승민쌤, 내일 리허설 앞부분만 대신 진행해 주실 수 있어요?'],
  ['이승민','네. 학생들 모이면 강당에서 시작하면 되죠?'],
  ['권해인','네. 아침에 잠깐 처리할 일이 있어서요. 음원은 이 휴대폰에 순서대로 준비해 뒀어요.'],
  ['이승민','휴대폰을 맡기시게요? 파일만 보내주셔도 되는데.'],
  ['권해인','강당 장비에 연결해서 시작 부분과 음량을 맞춰 놨어요. 첫 리허설은 그대로 틀어 주시면 돼요.'],
  ['이승민','그 뒤에 반복해서 연습할 곡은요?'],
  ['권해인','컴퓨터로 옮겨도 괜찮아요. 그때 시작 부분과 음량만 다시 맞춰 주세요.'],
  ['이승민','알겠습니다. 휴대폰은 언제 돌려드리면 될까요?'],
  ['권해인','열 시 반쯤 제가 찾으러 올게요. 부탁드려요.'],
  ['이승민','그럼 내일 뵐게요. 리허설은 걱정 마세요.']
);
R.A01[2]='10월 30일 밤, 음악 교사 권해인은 강당 장비에 맞춘 휴대폰으로 다음 날 리허설 앞부분을 진행해 달라고 부탁했다. 휴대폰은 토요일 10:30에 직접 찾으러 오기로 했다.';
R.A36[2]='09:00 리허설 앞부분은 준비된 휴대폰으로 재생한다. 이후 반복 연습용 음원은 시작 부분과 음량을 다시 맞춰 컴퓨터에 옮겨도 된다. 반환 약속은 토요일10:30이다.';
FILES.find(f=>f.id==='A36').body='승민쌤께.\n09:00 합창 리허설 — 재생목록 순서대로 진행해 주세요.\n강당 장비에 맞춘 음량과 시작 부분은 그대로 두시면 돼요.\n첫 리허설이 끝난 뒤 반복 연습용은 컴퓨터로 옮겨도 괜찮아요. 그때는 시작 부분과 음량을 다시 맞춰 주세요.\n10:30에 제가 휴대폰을 찾으러 갈게요. 고맙습니다.';

function RELEASErecord(id,text) { B9[id].text=text; R[id][2]=text; }
RELEASErecord('B10','승민: “그날 해인쌤 번호로 온 문자, 선생님이 쓰신 거죠?”\n임효은: “네. 그날 저녁 문자는 제가 보냈어요. 해인 선생님 본인이 보낸 것처럼 보이게 했습니다.”\n승민: “휴대폰은 해인쌤에게 직접 전하셨나요?”\n임효은: “직접 전하지 못했어요. 해인 선생님을 만나지도 못했습니다.”');
RELEASErecord('B11','임효은: “작년 온유 학생 일에서 제가 직접 보지 않고 전달한 말이 문제였어요. 해인 선생님이 다시 확인하니까 두려웠습니다. 그날도 직접 확인하지 않은 말을 승민쌤에게 전했어요. 제가 돌려주겠다고 맡아 놓고, 잘 받았다는 문자까지 보냈습니다. 경찰에도 사실대로 말씀드렸어요.”\n승민: “해인쌤이 직접 받은 줄 알았습니다. 제가 확인한 건 선생님께 건넸다는 사실뿐이었네요.”');
for(const [id,tail] of [
  ['B13','\n이 증언은 만남과 파일 소지만을 확인함.'],
  ['B15',' 누락이 고의인지 판단하려면 더 알아봐야 함.'],
  ['B18',' 사전에 확정된 것인지, 단순한 검토 시안인지는 단독으로 단정할 수 없음.'],
  ['B19','\n이 문서는 서진석이 결과 변경을 숨길 이해관계를 보여 준다. 범행 행위는 다른 기록으로 확인해야 한다.'],
  ['B20','\n이 진술은 평가자료 조작 경위에 관한 것이다.'],
  ['B21',' 자동 동기화는 직접 사용의 증거가 아님.'],
  ['B22','\n일정만으로 실제 만났다는 사실은 확정할 수 없음.'],
  ['B24',' 이후 행적은 이 사진 한 장으로 알 수 없다.'],
  ['B25','\n정유림의 직접 목격은 로비를 벗어나는 시점까지만 확인한다.'],
  ['B30','\n미공개 영상이 실제로 남아 있다는 촬영자의 확인이다.'],
  ['B27','\n이 검증표는 행위를 확인한다. 동행인의 신원은 B28의 연속 동선 대조와 함께 판단해야 한다.'],
  ['B28','\n따라서 B27의 계단참 동행인은 공개 사진과 원본에 나온 서진석으로 연결된다.'],
  ['B29','\n동기나 거짓말만이 아니라, 영상 속 행위·동행인의 신원·사망 원인과 시점을 함께 연결해야 한다.']
]) RELEASErecord(id,B9[id].text.replace(tail,''));
for(const [id,tail] of [['N05',' 중요한 문서는 보이지 않음.'],['N06',' 17번 파일과 무관.'],['N07',' 사건 관련 증거 없음.'],['N08',' 사진에 나온 직원 신원은 핵심 단서가 아님.'],['N19',' 사건 관련 없음.']]){N9[id].text=N9[id].text.replace(tail,'');if(R[id])R[id][2]=N9[id].text;}

function RELEASEcontext(){
  const steps=[
    ['이승민','나는 양평중학교 한문 교사 이승민이다.\n내일은 교내 합창 리허설이 있는 날이다.'],
    ['늦은 음악실','음악 교사 권해인과 리허설 준비를 마무리하고 있었다. 학생 명단과 악보를 챙기고 나니, 어느새 학교가 조용해졌다.'],
    ['평범한 부탁','해인이 피아노 옆에 둔 휴대폰을 집어 들었다.\n“승민쌤, 잠깐 괜찮으세요?”']
  ];
  const i=Math.min(state.releaseContextStep||0,steps.length-1),s=steps[i];
  return `<section class="release-story"><header><span>마지막 접속</span><span>PROLOGUE</span></header><div class="release-story-copy"><p class="release-date">2026년 10월 30일 금요일 · 밤 9시 37분</p><h1>${E(s[0])}</h1><p>${br(s[1])}</p></div><footer><span>${i+1} / ${steps.length}</span><button class="v7btn" data-release="context-next">${i===2?'해인의 말을 듣는다':'계속'}</button></footer></section>`;
}
V10startFresh=function(){
  RELEASEstopAudio();state=INITIAL();V9init();state.started=true;state.edition=RELEASE_VERSION;state.v12ReducedMotion=v10ReducedMotion;state.screen='releaseContext';state.releaseContextStep=0;state.day='10/30';state.time='21:37';v10CoverVisible=false;v10SettingsOpen=false;render();
};
V10finishIntro=function(){
  state.started=true;state.v10IntroDone=true;state.v10IntroStep=V10DIALOGUE.length;state.releaseOpeningTask=true;state.releaseMusicChapterB=false;state.screen='releaseMusic';state.day='10/31';state.time='09:00';mark('A01');render();
};

let RELEASEaudio=null;
function RELEASEstopAudio(){if(RELEASEaudio){RELEASEaudio.pause();RELEASEaudio=null;}}
function RELEASEmusic(){
  const opening=!!state.releaseOpeningTask,playing=!!(RELEASEaudio&&!RELEASEaudio.paused);
  return `<div class="phone-workspace"><section class="screen release-music">${status(true)}<header class="release-music-header"><span>${opening?'리허설 · 첫 번째 할 일':'음악'}</span>${opening?'':`<button class="release-icon-button" aria-label="음악 닫기" data-release="music-close">${PHONEicon('close')}</button>`}</header><div class="content release-player"><img src="${RELEASE_WALLPAPER}" alt="아침의 음악실 피아노"><p class="release-kicker">학교 강당 · 리허설 재생목록</p><h1>합창 리허설</h1><p>준비된 음원 · 시작 구간</p><div class="release-audio-track"><span class="${playing?'is-playing':''}"></span></div><p class="release-audio-meta">${playing?'재생 중':'재생 대기'} · 짧은 연습용 가이드</p><button class="release-play-button" data-release="music-play" aria-label="${playing?'음원 일시정지':'리허설 음원 재생'}">${PHONEicon(playing?'pause':'play')}</button>${opening?`<p class="release-player-task">해인이 준비한 음원을 재생해 리허설 앞부분을 진행하자.</p><button class="v7btn" data-release="music-finish" ${state.releasePlayed?'':'disabled'}>리허설을 마친다</button><button class="v7btn light" data-release="music-silent">소리 없이 리허설 진행</button>`:''}<p class="release-audio-note">소리는 재생 버튼을 눌렀을 때만 나와요.</p></div><div class="phone-home-indicator"></div></section>${opening?'':PHONErail(!!state.releaseMusicChapterB)}</div>`;
}
function RELEASEmorning(){
  const i=state.releaseMorningStep||0;
  const steps=[
    ['09:05','첫 리허설이 끝났다.','학생들이 잠깐 쉬는 사이, 승민은 반복 연습용 음원을 학교 컴퓨터로 옮겼다. 안내대로 시작 부분과 음량을 다시 맞췄다.\n\n이제 휴대폰을 돌려줄 차례였다.','약속 시각까지'],
    ['10:30','아직 오지 않았다.','해인이 휴대폰을 찾으러 오기로 한 시각이다.\n\n승민은 강당 입구를 살폈다. 학생들이 다시 연습을 시작했지만 해인은 보이지 않았다.','행방을 확인한다'],
    ['10:33','연락할 곳이 마땅치 않았다.','승민은 자신의 휴대폰으로 교무실에 연락했다. 하지만 해인이 지금 어디에 있는지는 확인되지 않았다.\n\n해인에게 직접 연락하려고 보니, 정작 해인의 휴대폰은 내 손에 있었다. 잠깐 켜진 화면에 읽지 않은 문자가 남아 있었다.','남아 있는 알림을 본다']
  ];
  if(i>=3)return RELEASElock();
  const s=steps[i];return `<section class="release-story release-morning"><header><span>10월 31일 토요일</span><span>${s[0]}</span></header><div class="release-story-copy"><p class="release-date">학교 강당</p><h1>${s[1]}</h1><p>${br(s[2])}</p></div><footer><button class="v7btn" data-release="morning-next">${s[3]}</button></footer></section>`;
}
function RELEASElock(){
  return `<div class="phone-workspace"><section class="screen release-lock" aria-label="권해인의 휴대폰 잠금 화면">${status(true)}<div class="release-lock-clock">${PHONEicon('unlock')}<p>10월 31일 토요일</p><h1>10:35</h1></div><div class="release-notifications"><button data-release="open-notification" class="release-notification"><span class="release-message-icon">${PHONEicon('messages')}</span><span><span class="release-notification-meta"><b>알 수 없는 발신자</b><small>09:17</small></span><span>홍온유 학생 일은 이번에도 그냥 넘어가실 건가요?</span></span></button><p class="release-lock-thought">돌아오지 않은 동료의 휴대폰에, 학생의 이름이 남아 있었다.</p></div><footer><p>첫 확인 · 이 문자가 무슨 일인지 최근 대화에서 알아보자.</p><button class="v7btn" data-release="open-notification">알림 내용 확인</button></footer><div class="phone-home-indicator"></div></section></div>`;
}
function RELEASEgoal(){
  if(PHONEisB()){
    if(state.v12CaseSolved)return '사건 기록이 완성됐다. 보관함에서 원문과 결론을 다시 살펴볼 수 있어.';
    if(!B9DONE('BP1'))return '마지막 문자와 휴대폰 전달 경로를 확인하자.';
    if(!B9DONE('BP2'))return '효은의 진술에서 두 시점의 일을 나누어 보자.';
    if(!B9DONE('BP3'))return '해인을 실제로 만난 사람의 기록을 확인하자.';
    if(!B9DONE('BP4'))return '누락된 문서와 점수 변경의 관계를 확인하자.';
    if(!B9DONE('BP5'))return '서진석의 진술을 실제 만남 기록과 비교하자.';
    if(!B9DONE('BP6'))return '공개 사진 이후의 촬영 원본이 남았는지 확인하자.';
    return '현장 기록을 대조하고 마지막 행적을 재구성하자.';
  }
  if(!seen('A19'))return '온유가 어떤 일로 해인에게 연락했는지 알아보자.';
  if(!seen('A26')||!seen('A06'))return '해인이 오늘 아침 무엇을 확인하려 했는지 살펴보자.';
  if(!done('P4'))return '해인이 남긴 지난해 자료를 열어 보자.';
  if(!done('P5'))return '최초 평가표와 최종본에서 달라진 부분을 찾자.';
  if(!done('P8'))return '전달받은 자료와 원래 목록을 대조하자.';
  if(!required.every(done))return '조사 수첩에서 기록이 확인하는 범위를 정리하자.';
  return '기록을 정리하고 해인의 소식을 다시 확인하자.';
}
const RELEASEoldRail=PHONErail;
PHONErail=function(chapterB=PHONEisB(),showHome=true){return `<aside class="release-objective"><span>지금 확인할 것</span><p>${E(RELEASEgoal())}</p></aside>`+RELEASEoldRail(chapterB,showHome);};

// The archive remains optional; reading a source no longer requires saving it first.
savedSource=function(id){
  const f=FILES.find(f=>f.id===id);
  if(f)return `<article class="v7card release-source"><h3>${E(f.name)}</h3><p class="v7muted">${E(f.date)}</p><div class="v7docText">${f.type==='score'?scoreTable(f):br(f.body)}</div></article>`;
  const ph=PHOTO_ASSETS.find(p=>p.id===id);
  if(ph)return `<article class="v7card release-source"><h3>${E(ph.title)}</h3><p class="v7muted">${E(ph.time)}</p><div class="v7photoView">${photoArt(ph)}</div>${ph.zoom?`<p>${br(ph.zoom)}</p>`:''}</article>`;
  const entry=Object.entries(CHATS).find(([,room])=>room.messages.some(m=>m.id===id));
  if(entry){const [key,room]=entry,index=room.messages.findIndex(m=>m.id===id);let date=key==='staff25'?'2025/10/24':'';const msgs=room.messages.map(m=>{if(m.time.includes('/'))date=m.time.split(' ')[0];return {...m,date};});const first=Math.max(0,index-2),last=id==='A22'?msgs.length:Math.min(msgs.length,index+5);return `<article class="v7card release-source"><h3>${E(room.name)} · 대화 원문</h3>${msgs.slice(first,last).map(m=>`<div class="release-source-message ${m.id===id?'is-key':''}"><p class="v7muted">${E(m.who==='me'?'권해인':m.text.match(/—\s*([^\n]+)$/)?.[1]||room.name)} · ${E(m.time.includes('/')?m.time:m.date+' '+m.time)}</p><p>${br(m.text)}</p></div>`).join('')}</article>`;}
  const n=NOTES.find(n=>n.record===id);if(n&&!n.locked)return `<article class="v7card release-source"><h3>${E(n.title)}</h3><p class="v7muted">${E(n.date)}</p><div class="v7docText">${br(n.body)}</div></article>`;
  const c=CALLS.find(c=>c.id===id);if(c)return `<article class="v7card release-source"><h3>${E(c.name)}</h3><p>${E(c.time)} · ${E(c.type)}</p></article>`;
  const ev=EVENTS.find(ev=>ev.id===id);if(ev)return `<article class="v7card release-source"><h3>${E(ev.title)}</h3><p class="v7muted">${E(ev.date)} ${E(ev.time)}</p><p>${E(ev.desc)}</p></article>`;
  return '';
};
inspect=function(){const id=state.inspect,r=R[id];if(!r)return shell('기록','home','기록을 찾을 수 없어.');const source=savedSource(id);return shell(r[0],state.inspectBack||'vault',`${source||`<article class="v7card"><h2>${E(r[0])}</h2><p>${E(r[1])}</p><p>${E(r[2])}</p></article>`}${state.sceneStep<3?archiveButton(id):''}<button class="v7btn light" data-act="${PHONEisB()?'b9-nav':'nav'}" data-to="${PHONEisB()?'b9board':'board'}">조사 수첩 확인</button>`);};
const RELEASEoldPuzzle=puzzle;
puzzle=function(){let html=RELEASEoldPuzzle();const p=PUZZLES.find(p=>p.id===state.puzzle);if(p&&!done(p.id)&&p.kind!=='score'){const references=p.needed.filter(id=>id!=='LOCKED'&&seen(id)).map(id=>savedSource(id)).filter(Boolean).join('');if(references)html=html.replace('<button class="v7btn blue" data-act="verify">',`<details class="release-references"><summary>관련 기록 다시 읽기</summary>${references}</details><button class="v7btn blue" data-act="verify">`);}return html;};
const RELEASEoldNView=N9view;
N9view=function(){return RELEASEoldNView().replace('사건과 직접 관련 없는 기록들도 남아 있어. 공연장 안내에는 이후 도움이 될 수 있는 정보가 담겨 있어.','메시지, 사진 설명과 개인 메모를 모아 두었다.');};
const RELEASEoldScene=scene;
scene=function(){return RELEASEoldScene().replace('승민이 행정실에 해인의 행방을 물으려던 때','승민이 해인의 소식을 다시 확인하려던 때');};
const RELEASEoldBScene=B9scene;
B9scene=function(){return RELEASEoldBScene().replace('서진석은 계약 문제가 드러날 것을 우려해 원본 자료를 돌려달라고 요구했다.','계약 자료와 점수 변경에 대한 인정은 서진석이 자료 공개를 꺼릴 이해관계를 보여 준다. 현장 기록에서 확인된 행동은 다음과 같다.');};
B9bridge=function(){return `<section class="release-story"><header><span>CHAPTER A · COMPLETE</span><span>11월 21일</span></header><div class="release-story-copy"><p class="release-date">이승민의 기록</p><h1>잘 받았다는 문자.</h1><p>그날 나는 안도했다.\n하지만 해인에게 직접 돌려준 것은 아니었다.</p><p>그 뒤 남겨 둔 행정실 문답과 경찰 통화 기록.\n11월 21일의 기사를 읽으며, 승민은 그 기록들을 다시 펼쳤다.</p></div><footer><button class="v7btn" data-act="b9-start">챕터 B 시작 · 이승민 휴대폰</button><button class="v7btn light" data-act="b9-vault">A 기록 다시 보기</button><button class="v7btn light" data-act="b9-settings">설정 · 저장</button></footer></section>`;};

const RELEASE_REACTIONS={
  BP3:['그날 이후에도.','10월 31일의 문자가 마지막이라고 생각했다.\n하지만 홍지은이 만난 해인은 그 다음 날에도 자료를 확인하고 있었다.\n\n승민은 사건 기록의 마지막 행적을 고쳤다. 아직 확인할 만남이 남아 있었다.'],
  BP4:['온유가 처음 했던 말.','“제가 바꾼 게 아니에요.”\n\n학생의 컴퓨터 사용 기록만으로 설명했던 일이, 점수를 바꾼 사람의 인정과 맞지 않았다.\n\n승민은 최초 평가표와 계약 문서를 나란히 놓았다. 이제 해인이 누구를 만나려 했는지 확인해야 했다.'],
  BP6:['원본이 도착한 다음 날.','배준서는 보존한 촬영 원본을 수사팀에 제출했다.\n\n11월 22일, 검증을 마친 기록이 도착했다. 영상이 보여 주는 행동, 그 인물의 신원, 현장 감정은 서로 대조해야 했다.']
};
function RELEASEreaction(){const s=RELEASE_REACTIONS[state.releaseReaction]||RELEASE_REACTIONS.BP3;return `<section class="release-story"><header><span>이승민의 기록</span><span>${E(state.day)} · ${E(state.time)}</span></header><div class="release-story-copy"><h1>${E(s[0])}</h1><p>${br(s[1])}</p></div><footer><button class="v7btn" data-release="reaction-next">새 기록 확인</button></footer></section>`;}
const RELEASEoldBHandle=B9handle;
B9handle=function(d){const before=(state.bdone||[]).slice();RELEASEoldBHandle(d);const fresh=(state.bdone||[]).find(id=>!before.includes(id)&&RELEASE_REACTIONS[id]);if(fresh){state.releaseReaction=fresh;state.screen='releaseReaction';render();}};

const RELEASEoldTitle=V10title;
V10title=function(){return RELEASEoldTitle().replace(V10ART,RELEASE_WALLPAPER).replace('책상 위의 휴대폰과 17번 파란 파일, 갈색 자료 봉투','가을 아침의 학교 음악실').replace('CHAPTER A + B · v13','CHAPTER A + B · v13.1.1');};
const RELEASEoldView=view;
view=function(){
  if(!v10CoverVisible){if(state.screen==='releaseContext')return RELEASEcontext();if(state.screen==='releaseMusic')return RELEASEmusic();if(state.screen==='releaseMorning'||state.screen==='v12arrival')return RELEASEmorning();if(state.screen==='releaseLock')return RELEASElock();if(state.screen==='releaseReaction')return RELEASEreaction();}
  return RELEASEoldView();
};
const RELEASEoldRender=render;
render=function(){
  if(state.started&&state.day==='10/31'&&state.sceneStep===0&&['home','messages','chat','notes','note','files','file','photos','photo','calendar','event','calls','call','board','puzzle','inspect','contacts','browser','vault','n9list','n9detail'].includes(state.screen)&&state.time<'10:35')state.time='10:35';
  if(state.screen!=='releaseMusic')RELEASEstopAudio();
  RELEASEoldRender();
};
document.addEventListener('click',event=>{
  const el=event.target.closest('[data-release]');if(!el)return;
  event.preventDefault();event.stopImmediatePropagation();
  switch(el.dataset.release){
    case 'context-next':state.releaseContextStep=(state.releaseContextStep||0)+1;if(state.releaseContextStep>=3){state.screen='v10novel';state.v10IntroStep=0;}render();break;
    case 'music-play':
      if(RELEASEaudio&&!RELEASEaudio.paused){RELEASEaudio.pause();render();break;}
      if(!RELEASEaudio){RELEASEaudio=new Audio('assets/rehearsal-guide.wav');RELEASEaudio.addEventListener('ended',()=>{if(state.screen==='releaseMusic')render();});}
      RELEASEaudio.play().then(()=>{state.releasePlayed=true;render();}).catch(()=>toast('소리를 재생하지 못했어. 다시 눌러 봐.'));break;
    case 'music-finish':if(!state.releasePlayed)return;RELEASEstopAudio();state.releaseOpeningTask=false;state.releaseMorningStep=0;state.screen='releaseMorning';state.time='09:05';render();break;
    case 'music-silent':RELEASEstopAudio();state.releasePlayed=true;state.releaseSilent=true;state.releaseOpeningTask=false;state.releaseMorningStep=0;state.screen='releaseMorning';state.time='09:05';render();break;
    case 'music-close':RELEASEstopAudio();state.screen=state.releaseMusicBack|| (state.releaseMusicChapterB?'b9home':'home');render();break;
    case 'morning-next':state.releaseMorningStep=(state.releaseMorningStep||0)+1;state.time=['09:05','10:30','10:33','10:35'][Math.min(state.releaseMorningStep,3)];if(state.releaseMorningStep>=3)state.screen='releaseLock';render();break;
    case 'open-notification':state.time='10:35';mark('A02');state.room='unknown';state.screen='chat';render();break;
    case 'reaction-next':state.screen='b9home';render();break;
  }
},true);
document.title='마지막 접속 — v13.1.1';
render();
document.documentElement.classList.remove('release-loading');
