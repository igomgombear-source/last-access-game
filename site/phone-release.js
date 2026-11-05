'use strict';

// Personal-phone presentation. Case data and all existing game routes remain owned by the engine.
function PHONEicon(name, extraClass = '') {
  const shapes = {
    calls:'<path d="M7 3 4 5c-2 2 1 7 5 11s9 7 11 5l2-3-5-4-2 2c-2-1-5-4-6-6l2-2z"/>',
    messages:'<path d="M21 11c0 5-4 8-9 8-1 0-2 0-3-.4L4 21l1-5c-1.3-1.4-2-3.1-2-5 0-5 4-8 9-8s9 3 9 8z"/>',
    photos:'<g stroke-width="0">'+['#ed6c6b','#f4a447','#efd365','#83bd83','#70b7cf','#7b95c7','#a087bf','#ce8cad'].map((c,i)=>`<ellipse cx="12" cy="7" rx="3.3" ry="5.2" fill="${c}" fill-opacity=".88" transform="rotate(${45*i} 12 12)"/>`).join('')+'<circle cx="12" cy="12" r="2.8" fill="#fff"/></g>',
    notes:'<rect x="4" y="3" width="16" height="19" rx="2"/><path d="M4 8h16M8 12h8M8 16h8"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18M8 14h1M12 14h1M16 14h1M8 17h1M12 17h1"/>',
    files:'<path d="M3 6h7l2 2h9v12H3z"/><path d="M3 8V4h7l2 2h9v2"/>',
    contacts:'<rect x="3" y="3" width="17" height="18" rx="3"/><circle cx="11.5" cy="9" r="3"/><path d="M6.5 18c.2-5 9.8-5 10 0M20 7h2M20 12h2M20 17h2"/>',
    browser:'<circle cx="12" cy="12" r="9"/><path d="m16 7-2 7-7 3 3-7z"/><path d="m10 10 4 4"/>',
    music:'<path d="M9 18V6l11-3v12M9 9l11-3"/><ellipse cx="6" cy="18" rx="3" ry="2.4"/><ellipse cx="17" cy="15" rx="3" ry="2.4"/>',
    settings:'<path d="m10 3-.7 2.3-2 .9-2.2-.8-2 3.4 1.6 1.8v2.8L3 15.2l2 3.4 2.2-.8 2 .9L10 21h4l.7-2.3 2-.9 2.2.8 2-3.4-1.6-1.8v-2.8L21 8.8l-2-3.4-2.2.8-2-.9L14 3z"/><circle cx="12" cy="12" r="3.5"/>',
    board:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 3v18M11 8h6M11 12h6M11 16h4"/>',
    vault:'<path d="M3 7h18v14H3zM2 3h20v4H2zM9 11h6"/>',
    home:'<path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    chevron:'<path d="m15 5-7 7 7 7"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    unlock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 7-2.6"/>',
    play:'<path d="m8 4 13 8-13 8z"/>',
    pause:'<path d="M8 4v16M16 4v16"/>',
    signal:'<path d="M3 18v2M8 14v6M13 10v10M18 5v15"/>',
    wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r=".8" fill="currentColor"/>',
    battery:'<rect x="2" y="6" width="18" height="12" rx="3"/><path d="M22 10v4"/><rect x="4.5" y="8.5" width="11" height="7" rx="1" fill="currentColor" stroke="none"/>',
    camera:'<path d="M3 7h5l2-3h4l2 3h5v14H3z"/><circle cx="12" cy="13" r="4"/>',
    flashlight:'<path d="M7 3h10v5l-3 4v9h-4v-9L7 8zM7 7h10M10 15h4"/>',
    bell:'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 21h4"/>',
    more:'<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>'
  };
  return `<svg class="phone-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[name] || shapes.notes}</svg>`;
}

function PHONEisB() { return state.screen.startsWith('b9') || (state.screen === 'inspect' && String(state.inspectBack).startsWith('b9')) || (state.screen === 'releaseMusic' && !!state.releaseMusicChapterB); }
function PHONEdate() {
  const [month,day] = String(state.day || '10/31').split('/').map(Number);
  const date = new Date(2026,month-1,day);
  return {month,day,weekday:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][date.getDay()]};
}
function PHONErail(chapterB = PHONEisB(), showHome = true) {
  return `<nav class="phone-game-rail" aria-label="게임 도구">${showHome ? `<button type="button" data-act="${chapterB?'b9-nav':'nav'}" data-to="${chapterB?'b9home':'home'}">${PHONEicon('home')}<span>휴대폰 홈</span></button>` : '<span class="phone-rail-label">마지막 접속</span>'}<button type="button" data-phone="tools">${PHONEicon('board')}<span>조사 수첩 · 게임 메뉴</span></button></nav>`;
}

status = function(dark = false) {
  return `<div class="phone-status ${dark?'is-light':''}" aria-label="${E(state.time)} 배터리 72퍼센트"><span class="phone-status-time">${E(state.time)}</span><span class="phone-island" aria-hidden="true"><i></i></span><span class="phone-status-icons">${PHONEicon('signal')}${PHONEicon('wifi')}${PHONEicon('battery')}</span></div>`;
};

function PHONEappButton(route,icon,label,chapterB = false) {
  const count = chapterB ? Object.values(B9).filter(o=>o.app===route.slice(2) && V12unlocked(o.id) && !B9SEEN(o.id)).length : 0;
  const act = route==='releaseMusic' ? 'data-phone="music"' : route==='n9list' ? 'data-act="n9-list"' : `data-act="${chapterB?'b9-nav':'nav'}" data-to="${route}"`;
  const calendar = icon==='calendar' ? `<span class="phone-calendar-day">${PHONEdate().day}</span>` : PHONEicon(icon);
  return `<button type="button" class="phone-app-button" ${act} aria-label="${E(label)}${count?', 새 기록 '+count+'개':''}"><span class="phone-app-icon phone-app-${icon}">${calendar}${count?`<span class="phone-app-badge" aria-hidden="true">${count}</span>`:''}</span><span class="phone-app-label">${E(label)}</span></button>`;
}
function PHONEhome(chapterB = false) {
  const d=PHONEdate();
  const apps = chapterB ? [['b9photos','photos','사진'],['b9calendar','calendar','캘린더'],['b9notes','notes','메모'],['b9files','files','파일']] : [['photos','photos','사진'],['calendar','calendar','캘린더'],['notes','notes','메모'],['files','files','파일'],['contacts','contacts','연락처'],['n9list','vault','개인 기록']];
  const prefix=chapterB?'b9':'';
  const dock=[[prefix+'calls','calls','전화'],[prefix+'messages','messages','메시지'],[prefix+'browser','browser','Safari'],['releaseMusic','music','음악']];
  const widget = chapterB ? '오늘의 일정' : '합창 리허설';
  const time = chapterB ? '일정 확인' : '09:00 · 학교 강당';
  return `<div class="phone-workspace"><section class="screen phone-home ${chapterB?'phone-seungmin':'phone-haein'}" aria-label="${chapterB?'이승민':'권해인'}의 휴대폰 홈">${status(true)}<div class="content phone-home-content"><div class="phone-calendar-widget"><button type="button" data-act="${chapterB?'b9-nav':'nav'}" data-to="${chapterB?'b9calendar':'calendar'}"><span class="phone-widget-date">${d.month}월 ${d.day}일 <small>${E(d.weekday)}</small></span><span class="phone-widget-event">${E(widget)}</span><span class="phone-widget-time">${E(time)}</span></button></div><div class="phone-home-grid">${apps.map(a=>PHONEappButton(...a,chapterB)).join('')}</div></div><div class="phone-dock">${dock.map(a=>PHONEappButton(...a,chapterB)).join('')}</div><div class="phone-home-indicator" aria-hidden="true"></div><div class="toast"></div></section>${PHONErail(chapterB,false)}</div>`;
}
home = function() { return PHONEhome(false); };
B9home = function() { return PHONEhome(true); };

function PHONEshell(title,back,content,opts={}) {
  const chapterB=!!opts.chapterB;
  const page=String(state.screen).replace(/[^a-zA-Z0-9_-]/g,'');
  const caseMode=!!opts.dark;
  const header = `<header class="v7head phone-app-header"><button type="button" class="v7back" data-act="${chapterB?'b9-nav':'nav'}" data-to="${E(back)}" aria-label="뒤로">${PHONEicon('chevron')}</button><h1 class="v7title">${E(title)}</h1><button type="button" class="phone-header-menu" data-phone="tools" aria-label="게임 메뉴">${PHONEicon('more')}</button></header>`;
  return `<div class="phone-workspace"><section class="screen phone-app phone-page-${page} ${caseMode?'phone-case v7boardScreen':''} ${chapterB?(caseMode?'b9dark':'b9screen'):''}">${caseMode?'<div class="phone-case-kicker">이승민의 조사 수첩</div>':status(false)}${header}<div class="content"><div class="v7body">${content}</div></div>${caseMode?'':'<div class="phone-home-indicator" aria-hidden="true"></div>'}<div class="toast"></div></section>${PHONErail(chapterB,true)}</div>`;
}
shell = function(title,back,content,opts={}) { return PHONEshell(title,back,content,{...opts,chapterB:PHONEisB()}); };
B9shell = function(title,back,content,dark=false) { return PHONEshell(title,back,content,{dark,chapterB:true}); };
B9dock = function() { return PHONErail(true,true); };

// Read-only history entries should not look like broken buttons.
browser = function() {
  const titles=['양평중학교 2026년 합창제 안내','음악 수업 자료 모음','악보 인쇄 안내','공연장 좌석 배치','지역 문화행사 일정'];
  return shell('Safari','home',`<div class="phone-address-bar">${PHONEicon('search')}<span>방문 기록</span></div><h2 class="v7listHead">최근 방문</h2><ul class="phone-history">${titles.map(t=>`<li>${PHONEicon('browser')}<span>${E(t)}<small>저장된 페이지 제목</small></span></li>`).join('')}</ul>`);
};

const PHONEoriginalChat = chat;
chat = function() {
  return PHONEoriginalChat().replace(/<button([^>]*class="v7bubble[^\"]*"[^>]*data-act="noop"[^>]*)>([\s\S]*?)<\/button>/g,(_,attrs,body)=>`<div${attrs.replace('data-act="noop"','')}>${body}</div>`);
};

function PHONEopenTools() {
  if(document.getElementById('phone-game-tools'))return;
  const chapterB=PHONEisB();
  const solved=chapterB?(state.bdone||[]).length:required.filter(done).length;
  const dialog=document.createElement('dialog');
  dialog.id='phone-game-tools';dialog.className='phone-tools';dialog.setAttribute('aria-labelledby','phone-tools-title');
  dialog.innerHTML=`<div class="phone-tools-heading"><div><span>마지막 접속</span><h2 id="phone-tools-title">조사 수첩</h2></div><button type="button" data-phone="close-tools" aria-label="게임 메뉴 닫기">${PHONEicon('close')}</button></div><p class="phone-tools-progress">CHAPTER ${chapterB?'B':'A'} · 필수 추리 ${solved}/${chapterB?6:required.length}</p><div class="phone-tools-actions">${[['board','추리보드','기록을 연결하고 판단하기'],['vault','증거 보관함','보관한 원문과 결론 다시 보기'],['settings','게임 설정 · 저장','저장, 불러오기, 처음부터 시작']].map(([route,label,desc])=>`<button type="button" data-phone="tool-route" data-to="${chapterB?'b9'+route:route}" data-chapter="${chapterB?'B':'A'}">${PHONEicon(route)}<span><b>${label}</b><small>${desc}</small></span>${PHONEicon('chevron','phone-next')}</button>`).join('')}</div><button type="button" class="phone-text-size" data-phone="text-size">글자 크기 · ${document.documentElement.dataset.phoneText==='large'?'크게':'보통'}</button><button type="button" class="phone-tools-resume" data-phone="close-tools">게임으로 돌아가기</button>`;
  document.body.append(dialog);
  dialog.addEventListener('close',()=>dialog.remove(),{once:true});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.showModal();dialog.querySelector('[data-phone="close-tools"]').focus();
}
try { if(localStorage.getItem('last_connection_text_size')==='large')document.documentElement.dataset.phoneText='large'; } catch(_) {}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-phone]');if(!button)return;
  event.preventDefault();event.stopImmediatePropagation();
  const action=button.dataset.phone;
  if(action==='tools')PHONEopenTools();
  else if(action==='close-tools')document.getElementById('phone-game-tools')?.close();
  else if(action==='tool-route'){
    document.getElementById('phone-game-tools')?.close();
    if(button.dataset.chapter==='B')B9handle({act:'b9-nav',to:button.dataset.to});
    else navigate(button.dataset.to);
  } else if(action==='music'){
    state.releaseMusicBack=state.screen;state.releaseMusicChapterB=PHONEisB();state.screen='releaseMusic';state.dirty=true;render();
  } else if(action==='text-size'){
    const value=document.documentElement.dataset.phoneText==='large'?'normal':'large';document.documentElement.dataset.phoneText=value;
    try{localStorage.setItem('last_connection_text_size',value);}catch(_){}
    button.textContent='글자 크기 · '+(value==='large'?'크게':'보통');
  }
},true);
