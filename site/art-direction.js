'use strict';

// Presentation layer. All evidence, puzzle gates and verdicts remain in the existing engine.
const ART_VERSION='13.2.0';
document.documentElement.classList.add('art-edition');

let ARTguideOpen=false;
PHONErail=function(chapterB=PHONEisB(),showHome=true){
  return `<details class="art-guidance" ${ARTguideOpen?'open':''}><summary><span>승민의 메모</span>${PHONEicon('chevron')}</summary><p>${E(RELEASEgoal())}</p></details><nav class="phone-game-rail" aria-label="게임 도구">${showHome?`<button type="button" data-act="${chapterB?'b9-nav':'nav'}" data-to="${chapterB?'b9home':'home'}">${PHONEicon('home')}<span>휴대폰</span></button>`:'<span class="art-device-owner">'+(chapterB?'이승민':'권해인')+'의 휴대폰</span>'}<button type="button" data-phone="tools">${PHONEicon('board')}<span>조사 수첩</span></button></nav>`;
};
document.addEventListener('toggle',event=>{if(event.target.classList?.contains('art-guidance'))ARTguideOpen=event.target.open;},true);

PHONEhome=function(chapterB=false){
  const d=PHONEdate(),prefix=chapterB?'b9':'';
  const apps=chapterB?[['b9photos','photos','사진'],['b9calendar','calendar','캘린더'],['b9notes','notes','메모'],['b9files','files','파일']]:[['photos','photos','사진'],['calendar','calendar','캘린더'],['notes','notes','메모'],['files','files','파일'],['contacts','contacts','연락처'],['n9list','vault','개인 기록']];
  const dock=[[prefix+'calls','calls','전화'],[prefix+'messages','messages','메시지'],[prefix+'browser','browser','Safari'],['releaseMusic','music','음악']];
  return `<div class="phone-workspace"><section class="screen phone-home ${chapterB?'phone-seungmin':'phone-haein'}" aria-label="${chapterB?'이승민':'권해인'}의 휴대폰 홈">${status(true)}<div class="content phone-home-content"><div class="art-home-widgets"><button class="art-date-widget" type="button" data-act="${chapterB?'b9-nav':'nav'}" data-to="${prefix}calendar"><span>${d.month}월 · ${E(d.weekday)}</span><b>${d.day}</b><small>${chapterB?'오늘의 일정':'합창 리허설'}</small><em>${chapterB?'캘린더 열기':'09:00 · 학교 강당'}</em></button><button class="art-music-widget" type="button" data-phone="music" aria-label="음악 · 리허설 재생목록"><span class="art-album-mark" aria-hidden="true">${PHONEicon('music')}</span><span>음악</span><b>합창 리허설</b><small>재생목록 열기 ${PHONEicon('play')}</small></button></div><div class="phone-home-grid">${apps.map(a=>PHONEappButton(...a,chapterB)).join('')}</div></div><div class="phone-dock">${dock.map(a=>PHONEappButton(...a,chapterB)).join('')}</div><div class="phone-home-indicator" aria-hidden="true"></div><div class="toast"></div></section>${PHONErail(chapterB,false)}</div>`;
};

lineItem=function(id,title,sub,act='inspect',key=id,more=''){
  const item=String(id||'');
  const source=B9[item]?.app;
  const icons={file:'files',call:'calls',event:'calendar',note:'notes','b9-open':source||'notes','b9-old':'files'};
  const isPerson=['chat','contact'].includes(act);
  const avatar=isPerson?E((CHATS[item]?.avatar||title).slice(0,2)):PHONEicon(icons[act]||'notes');
  const read=item.startsWith('B')?B9SEEN(item):!!(id&&R[id]&&seen(id));
  return `<button type="button" class="v7item art-list-item ${read?'art-is-read':''} ${isPerson?'art-person-item':''}" data-act="${E(act)}" data-id="${E(key)}" ${more}><span class="v7avatar">${avatar}</span><span class="v7itemmain"><b>${E(title)}</b><small>${E(sub)}</small></span><span class="v7time" aria-hidden="true">${PHONEicon('chevron')}</span></button>`;
};

messages=function(){
  return shell('메시지','home',`<div class="art-list-heading"><h1>메시지</h1><span>대화 기록</span></div>${Object.entries(CHATS).map(([id,c])=>lineItem(id,c.name,c.messages.at(-1).text.slice(0,70),'chat',id)).join('')}`);
};
chat=function(){
  const c=CHATS[state.room]||CHATS.unknown;
  let previousDate='';
  const body=c.messages.map(msg=>{
    const date=msg.time.includes('/')?msg.time.split(' ')[0]:'';
    const divider=date&&date!==previousDate?`<div class="v7chatday">${E(date)}</div>`:'';
    if(date)previousDate=date;
    const attrs=msg.id?`type="button" data-act="inspect" data-id="${E(msg.id)}"`:'';
    const tag=msg.id?'button':'div';
    return `${divider}<div class="v7bubbleRow ${msg.who==='me'?'me':''}"><${tag} class="v7bubble ${msg.id&&seen(msg.id)?'selected':''}" ${attrs}>${br(msg.text)}${msg.id?`<span class="v7sub">${seen(msg.id)?'확인한 원문':'원문 보기'} ${PHONEicon('chevron')}</span>`:''}</${tag}><span class="v7chatTime">${E(msg.time)}</span></div>`;
  }).join('');
  return shell(c.name,'messages',`<div class="art-conversation"><div class="art-conversation-person"><span>${E(c.avatar)}</span><p>${E(c.name)}<small>이 휴대폰에 남아 있는 대화</small></p></div><div class="v7chat">${body}</div><div class="art-chat-readonly">${PHONEicon('lock')} 저장된 대화 기록</div></div>`);
};

scoreTable=function(doc,interactive=false){
  return `<div class="v7tablewrap"><table class="v7table" aria-label="${E(doc.name)}"><thead><tr>${['학생','평가1','평가2','평가3','합계'].map(t=>`<th scope="col">${t}</th>`).join('')}</tr></thead><tbody>${doc.scores.map((row,i)=>`<tr>${row.map((cell,j)=>`<${j?'td':'th scope="row"'}>${interactive&&j>0?`<button type="button" class="v7cellButton ${state.answers.cell===((i===0?'on':'bn')+j)?'on':''}" data-act="cell" data-value="${i===0?'on':'bn'}${j}" aria-label="${E(row[0])} ${j===4?'합계':'평가'+j} ${E(cell)}" aria-pressed="${state.answers.cell===((i===0?'on':'bn')+j)}">${E(cell)}</button>`:E(cell)}</${j?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
};
function ARTscoreSheet(file,interactive=false){
  return `<article class="art-score-sheet"><header><span>${file.id==='A15'?'최초 취합표':'최종 제출본'}</span><small>${E(file.date)}</small></header><h2>${E(file.name)}</h2>${scoreTable(file,interactive)}<footer>양평중학교 · 2025 합창제 평가자료</footer></article>`;
}
file=function(){
  const f=FILES.find(x=>x.id===state.file)||FILES[0];
  return shell('파일 미리보기','files',`${f.type==='score'?ARTscoreSheet(f):`<article class="art-document"><p class="art-document-date">${E(f.date)}</p><h1>${E(f.name)}</h1><div class="v7docText">${br(f.body)}</div></article>`}${archiveButton(f.id)}${['A15','A16'].includes(f.id)?'<button class="v7btn light" data-act="puzzle" data-id="P5">두 평가표 비교</button>':''}`);
};
const ARTpreviousPuzzle=puzzle;
puzzle=function(){
  const p=PUZZLES.find(x=>x.id===state.puzzle);
  if(!p||p.kind!=='score'||done(p.id)||p.needed.some(id=>!seen(id))||(p.doneNeed||[]).some(id=>!done(id)))return ARTpreviousPuzzle();
  const hint=state.hints[p.id]||0;
  return shell(p.title,'board',`<section class="art-score-investigation"><div class="art-section-label">자료 대조 · ${E(p.id)}</div><h1>두 장의 평가표</h1><p class="art-notebook-note">${E(p.question)}</p><p class="art-instruction">달라진 평가 항목을 두드려 표시하세요.</p><div class="art-score-comparison">${ARTscoreSheet(FILES.find(f=>f.id==='A15'),true)}${ARTscoreSheet(FILES.find(f=>f.id==='A16'),true)}</div><fieldset class="art-verdict"><legend>자료가 확인하는 사실</legend>${options(p.id,p.opts)}</fieldset><button type="button" class="v7btn blue" data-act="verify">비교 결과 기록</button><button type="button" class="v7btn light" data-act="hint">힌트 요청 (${hint}/3)</button>${hint?`<div class="v7darknotice">${E(p.hints[hint-1])}</div>`:''}<button type="button" class="v7btn light" data-act="nav" data-to="board">조사 수첩으로</button></section>`,{dark:true});
};

const ARTfinalTitles=['행적','인물','경위','근거'];
function ARTfinalIndex(){return Math.min(3,Math.max(0,Number(state.artFinalStep)||0));}
function ARTfinalChoice(act,value,label,selected,extra=''){
  return `<button type="button" class="art-choice ${selected?'is-selected':''}" data-act="${act}" data-value="${value}" aria-pressed="${!!selected}"><span class="art-choice-check" aria-hidden="true">${selected?'✓':''}</span><span>${E(label)}${extra}</span></button>`;
}
V12finalQuestion=function(){
  const page=ARTfinalIndex(),order=Array.isArray(state.releaseFinalOrder)?state.releaseFinalOrder:[];
  const evidence=Array.isArray(state.v12Evidence)?state.v12Evidence:[];
  const solved=state.v12CaseSolved===true;
  const filled=[solved||order.length===4,!!state.bselected,!!state.v12Method,evidence.length>0];
  let body='';
  if(page===0){
    body=`<h2>그날의 행적을 잇는다.</h2><p>발생한 순서대로 장면을 선택하세요. 표시한 장면은 다시 눌러 뺄 수 있습니다.</p>${solved?'<p class="art-resolution">이전에 확인한 사건 순서가 보존돼 있습니다.</p>':`<ol class="art-event-sequence">${order.map((key,i)=>{const event=IR_FINAL_EVENTS.find(x=>x[0]===key);return event?`<li><button type="button" data-art="event-remove" data-value="${key}" aria-label="${i+1}번 장면 선택 해제"><b>${i+1}</b><span>${E(event[1])}</span><em aria-hidden="true">×</em></button></li>`:'';}).join('')}${order.length<4?`<li class="art-event-empty"><b>${order.length+1}</b><span>이어지는 장면을 선택</span></li>`:''}</ol><div class="art-event-sources">${IR_FINAL_EVENTS.filter(([key])=>!order.includes(key)).map(([key,label])=>`<button type="button" data-act="b9-ir-timeline" data-value="${key}">${PHONEicon('files')}<span>${E(label)}</span><b aria-hidden="true">＋</b></button>`).join('')}</div><button type="button" class="v7btn light" data-act="b9-ir-timeline-clear">순서 다시 선택</button>`}<button type="button" class="art-source-link" data-act="b9-open" data-id="B27">${PHONEicon('files')} 현장 영상 검증표 원문 ${PHONEicon('chevron')}</button>`;
  }else if(page===1){
    body=`<h2>직접 관여한 사람.</h2><p>현장의 기록과 인물 대조를 바탕으로 판단하세요.</p><div class="art-person-choices">${[['hyo','임효은'],['choi','최기훈'],['seo','서진석']].map(([value,name])=>`<button type="button" data-act="b9-suspect" data-value="${value}" class="${state.bselected===value?'is-selected':''}" aria-pressed="${state.bselected===value}"><span aria-hidden="true">${E(name.slice(1))}</span><b>${name}</b><small>${state.bselected===value?'선택함':'선택'}</small></button>`).join('')}</div><button type="button" class="art-source-link" data-act="b9-open" data-id="B28">${PHONEicon('files')} 동선과 인물 대조 원문 ${PHONEicon('chevron')}</button>`;
  }else if(page===2){
    body=`<h2>현장에서 일어난 일.</h2><p>기록이 설명하는 사망 경위를 선택하세요.</p>${[['push','동행인이 계단참에서 해인을 밀어 추락하게 했다.'],['score','동행인이 먼저 떠난 뒤, 해인이 혼자 계단에서 추락했다.'],['message','통로에 새로 들어온 제삼자가 해인을 추락하게 했다.']].map(([value,label])=>ARTfinalChoice('v12-method',value,label,state.v12Method===value)).join('')}<button type="button" class="art-source-link" data-act="b9-open" data-id="B29">${PHONEicon('files')} 현장 감정 요약 원문 ${PHONEicon('chevron')}</button>`;
  }else{
    const selectedPerson={hyo:'임효은',choi:'최기훈',seo:'서진석'}[state.bselected]||'미선택';
    body=`<h2>판단을 뒷받침하는 기록.</h2><p>행위·인물·사망 경위를 연결하는 근거를 고르세요.</p><div class="art-evidence-list">${[['B27','현장 영상 검증표'],['B10','문자 작성자 인정'],['B28','동선과 인물 대조'],['B19','후원공연 계약 검토자료'],['B29','현장 감정 요약']].map(([id,label])=>`<div>${ARTfinalChoice('v12-evidence',id,label,evidence.includes(id),`<small>${E(B9[id].sender)} · ${E(B9[id].time)}</small>`)}<button type="button" class="art-evidence-open" data-act="b9-open" data-id="${id}" aria-label="${label} 원문 보기">${PHONEicon('files')}</button></div>`).join('')}</div><dl class="art-final-review"><div><dt>행적</dt><dd>${solved?'보존된 순서':order.length+' / 4장면'}</dd></div><div><dt>인물</dt><dd>${selectedPerson}</dd></div><div><dt>경위</dt><dd>${state.v12Method?'선택함':'미선택'}</dd></div><div><dt>근거</dt><dd>${evidence.length}개 선택</dd></div></dl>`;
  }
  return `<section class="art-final-investigation"><nav class="art-final-tabs" aria-label="최종 추리 항목">${ARTfinalTitles.map((title,i)=>`<button type="button" data-art="final-tab" data-index="${i}" class="${i===page?'is-current':''}" aria-current="${i===page?'step':'false'}"><span>${filled[i]?'✓':i+1}</span>${title}</button>`).join('')}</nav><div class="art-final-page"><p class="art-section-label">최종 기록 · ${page+1} / 4</p>${body}</div>${state.releaseFinalFeedback?`<p class="ir-feedback" role="status">${E(state.releaseFinalFeedback)}</p>`:''}</section>`;
};
const ARTpreviousBScene=B9scene;
B9scene=function(){
  let html=ARTpreviousBScene();
  if(state.bsceneStep===1){
    html=html.replace('class="b9scene"','class="b9scene art-final-scene"');
    if(ARTfinalIndex()<3)html=html.replace('<button class="v7btn" data-act="b9-scene-next">최종 판단 제출</button>',`<button type="button" class="v7btn" data-art="final-next">다음 · ${ARTfinalTitles[ARTfinalIndex()+1]} ${PHONEicon('chevron')}</button>`);
  }
  return html;
};
function ARTgoFinal(index){state.artFinalStep=Math.min(3,Math.max(0,index));render();const body=document.querySelector('.art-final-scene .sceneBody');if(body)body.scrollTop=0;}
document.addEventListener('click',event=>{
  const el=event.target.closest('[data-art]');if(!el)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(state.screen!=='b9scene'||state.bsceneStep!==1)return;
  if(el.dataset.art==='final-tab')ARTgoFinal(Number(el.dataset.index));
  else if(el.dataset.art==='final-next')ARTgoFinal(ARTfinalIndex()+1);
  else if(el.dataset.art==='event-remove'&&!state.v12CaseSolved){state.releaseFinalOrder=(state.releaseFinalOrder||[]).filter(x=>x!==el.dataset.value);state.releaseFinalFeedback='';render();}
},true);

const ARTpreviousTitle=V10title;
V10title=function(){return ARTpreviousTitle().replace('A PHONE MYSTERY','양평중학교 · 2026').replace('<h1>마지막 접속</h1>','<h1><span>마지막</span><span>접속</span></h1>').replaceAll('v13.1.1','v'+ART_VERSION);};
const ARTpreviousRender=render;
render=function(){if(state.started)state.edition=ART_VERSION;ARTpreviousRender();};
document.title='마지막 접속 — v'+ART_VERSION;
render();
