'use strict';

// v12: source attribution, coherent chronology, evidence-led final deduction.
const V12_VERSION = '12.0.0';
const V12_FINAL_EVIDENCE = ['B27', 'B28', 'B29'];
const V12_APP_NAMES = { messages:'메시지', calls:'전화', photos:'사진', notes:'메모', calendar:'캘린더', files:'파일', browser:'Safari' };
const V12_A_APPS = { '메시지':'messages', '전화':'calls', '사진':'photos', '메모':'notes', '캘린더':'calendar', '파일':'files', '연락처':'contacts' };

R.A01[2] = '10월 30일 21:37, 권해인이 리허설 앞부분을 휴대폰으로 직접 재생해 달라고 부탁했다. 다음 날 10:30에 직접 돌려받기로 했고, 늦어지면 17번 보관함 메모와 지난해 자료도 확인해 달라고 했다.';
R.A22[2] = '해인이 점수 차이를 묻자 최기훈은 지난해 정리된 자료라며 월요일에 이야기하자고 답했다. 질문과 답변을 함께 대조해야 한다.';
R.A27[1] = '10월 31일 10:38';
R.A30[1] = '10월 31일 10:52';
R.A36[2] = '09:00 리허설 앞부분은 휴대폰으로 직접 재생한다. 이후 연습용 음원은 설정을 다시 맞춰 컴퓨터로 옮겨도 된다. 휴대폰은 10:30에 권해인이 직접 찾기로 했다.';
FILES.find(f => f.id === 'A36').body = '승민쌤께.\n09:00 리허설 앞부분은 이 휴대폰에 맞춰 둔 곡 순서와 음량으로 재생해 주세요.\n앞부분이 끝난 뒤 반복 연습용 음원이 필요하면 시작 시점과 음량을 다시 맞춰 학교 컴퓨터에 옮겨도 괜찮아요.\n10:30쯤 제가 직접 휴대폰을 찾으러 올게요.\n혹시 늦어지면 17번 보관함 메모와 작년 자료도 확인해 주세요.';

Object.assign(PUZZLES.find(p => p.id === 'P7'), {
  needed:['A23','A34'], question:'업무분장표에 적힌 평가자료 취합 담당자와 학생 관리 담당자를 구분해.',
  conclusion:'최기훈은 평가자료 취합, 임효은은 행사 진행과 학생 관리를 맡았다. 이 업무분장만으로 실제 점수 수정자를 단정할 수는 없다.',
  hints:['파일 앱의 업무분장표를 확인해.','평가자료 취합과 학생 관리는 서로 다른 업무야.','취합 담당은 최기훈, 학생 관리는 임효은으로 적혀 있어.']
});
Object.assign(PUZZLES.find(p => p.id === 'P10'), {
  question:'11월 일정표와 리허설 안내에서 확인할 수 있는 범위는?',
  opts:[['never','해인은 이후 어떤 이유로도 계획을 바꾸지 않을 것이다.'],['planned','해인이 다음 달 업무를 준비한 사실은 확인되지만, 이후 행적은 별도로 확인해야 한다.'],['faked','업무 계획만으로 해인이 다음 달 모든 일정에 참석했다고 확정할 수 있다.']],
  conclusion:'해인은 11월 업무를 준비했다. 계획을 적었다는 사실과 이후 실제 행적은 구분해야 한다.',
  hints:['일정표가 작성된 시점과 그 이후를 구분해.','계획은 의도를 보여 주지만 이후 행동까지 증명하지는 않아.','11월 업무를 준비한 사실까지만 확인할 수 있어.']
});
N9.N20.text = '11월 1일 청소년 음악 행사 안내. 행사 사진과 원본 영상은 촬영 담당 배준서가 관리한다. 양평문화회관 로비 출입문은 관계자 통로와도 이어진다.';

function V12setRecord(id, value) {
  B9[id] = { ...(B9[id] || {id}), ...value };
  const o = B9[id];
  R[id] = [o.title, o.time, o.text, o.app];
}
V12setRecord('B03', {time:'10/31 10:52', text:'09:00 리허설 앞부분은 해인 선생님 휴대폰으로 직접 재생했다. 이후 반복 연습용 음원은 시작 시점과 음량을 다시 맞춰 학교 컴퓨터에 복사했다.\n10:30 반환 약속이 지났으나 해인 선생님은 오지 않았다. 10:52 임효은 선생님에게 휴대폰을 맡겼다. 직접 반환한 것은 아니다.'});
V12setRecord('B19', {text:'문서번호 SJ-25-04\n운영 업체: 가온무대기획 / 담당: 서진석\n김민구 중심의 대표 출연 구성을 전제로 후속 공연과 정산을 진행한다. 선발 과정에 허위가 드러나면 정산 재검토와 후속 계약 중단 사유가 된다.\n이 문서는 서진석이 결과 변경을 숨길 이해관계를 보여 준다. 범행 행위는 다른 기록으로 확인해야 한다.'});
V12setRecord('B20', {text:'승민: “홍온유 학생 점수는 누가 바꿨나요?”\n최기훈: “제가 세 번째 점수를 88점에서 78점으로 바꿨습니다. 서진석 씨가 이미 김민구 중심으로 외부 공연을 진행하고 있다며 결과를 맞춰 달라고 했어요.”\n승민: “온유가 수정했다는 근거는요?”\n최기훈: “없었습니다. 학생의 컴퓨터 사용을 구실로 제 책임을 피했습니다. 최초 출력본과 수정 경위를 학교에 제출했습니다.”\n이 진술은 평가자료 조작 경위에 관한 것이다.'});
V12setRecord('B24', {text:'문화회관 로비에서 권해인과 서진석이 서류를 살펴보는 모습. 권해인은 ‘17’ 표시가 있는 파란 파일을 들고 있다. 서진석은 짙은 남색 재킷에 밝은 소매 단을 착용했다.\n촬영: 배준서 · 청소년 음악 행사 기록 촬영.\n공개 사진의 촬영 시각은 17:42다. 이후 행적은 이 사진 한 장으로 알 수 없다.'});
V12setRecord('B25', {text:'“17:42 두 분이 로비에서 대화하셨어요. 18:17에는 로비 옆 출입문 방향으로 함께 이동하는 걸 봤습니다. 그 문 뒤의 관계자 통로까지 따라가지는 않았어요.”\n정유림의 직접 목격은 로비를 벗어나는 시점까지만 확인한다.'});
V12setRecord('B26', {text:'“18:26 이후 촬영한 미공개 원본도 남아 있습니다. 편집하지 않은 파일을 경찰에 제출하겠습니다.”\n원본 앞부분에는 권해인과 서진석이 17번 파란 파일을 들고 관계자 통로로 이동하는 모습이 남아 있다.\n11월 22일 검증을 마친 후속 기록은 ‘현장 영상 검증표’, ‘동선과 인물 대조’, ‘현장 감정 요약’에 나뉘어 있다.'});
V12setRecord('B30', {title:'촬영 담당자의 답장', time:'11/21 16:10', app:'messages', sender:'배준서', text:'승민: “공개하신 17:42 사진 이후 촬영 원본도 남아 있나요?”\n배준서: “네. 로비에서 관계자 통로까지 이어서 촬영한 영상이 있어요. 두 분이 이동하는 장면 뒤로 계단참도 찍혔습니다. 원본을 보존해서 수사팀에 제출할게요.”\n미공개 영상이 실제로 남아 있다는 촬영자의 확인이다.'});
V12setRecord('B27', {title:'현장 영상 검증표', time:'11/22 10:05', app:'files', sender:'수사팀 · 원본 검증', text:'자료: 배준서의 연속 촬영 원본과 문화회관 계단 고정 카메라\n18:26 — 로비에서 두 사람이 함께 관계자 통로로 이동한다. 권해인 손에는 17번 파일이 있다.\n18:31 — 통로 영상이 계단 고정 카메라의 진입 장면과 이어진다.\n18:34 — 계단참에서 동행인이 권해인의 양어깨를 앞으로 밀고, 권해인은 계단 아래로 넘어진다. 미는 동작 직전 다른 인물은 들어오지 않는다.\n18:37 — 같은 동행인이 혼자 돌아 나온다. 손에는 17번 파일이 있다.\n이 검증표는 행위를 확인한다. 동행인의 신원은 B28의 연속 동선 대조와 함께 판단해야 한다.'});
V12setRecord('B28', {title:'동선과 인물 대조', time:'11/22 10:32', app:'files', sender:'수사팀 · 교차 대조', text:'17:42 공개 사진의 서진석은 짙은 남색 재킷과 밝은 소매 단을 착용했다.\n18:26 원본의 얼굴 식별 장면에서 같은 인물이 서진석임을 확인했다.\n18:26부터 계단참 진입까지 이어지는 촬영 기록과 고정 카메라를 대조했다. 이동 중 동행인이 바뀌거나 다른 사람이 끼어드는 장면은 없다.\n출입 기록의 관계자 카드 역시 서진석에게 배부된 C-17이다. 카드 명의만을 근거로 신원을 판단한 것은 아니다.\n따라서 B27의 계단참 동행인은 공개 사진과 원본에 나온 서진석으로 연결된다.'});
V12setRecord('B29', {title:'현장 감정 요약', time:'11/22 11:20', app:'files', sender:'수사팀 · 감정 결과', text:'권해인의 사망 원인은 계단 추락으로 인한 손상이다. 추정 시점은 11월 1일 저녁이며, 영상의 18:34 추락 장면과 일치한다.\n계단참 난간과 바닥의 위치를 대조한 결과, B27의 밀침 직후 추락한 지점이 현장과 맞는다.\n17번 파일은 이후 서진석이 사용하는 보관함에서 확보됐다. 파일에는 최초 평가표 사본과 SJ-25-04 운영 확인서가 함께 남아 있었다.\n동기나 거짓말만이 아니라, 영상 속 행위·동행인의 신원·사망 원인과 시점을 함께 연결해야 한다.'});
Object.assign(B9PUZZLES.find(p=>p.id==='BP3'), {opts:[['sync','메일이 서버에 저장됐다는 사실만으로 생존이 확인된다'],['guardian','홍지은의 직접 대면 진술과 그날 발신한 자료 메일'],['schedule','11월 수업 계획']]});
Object.assign(B9PUZZLES.find(p=>p.id==='BP6'), {need:['B24','B25','B30'], hint:'공개 사진의 촬영자에게 보낸 질문과 답장을 확인해. 실제로 보존된 원본인지 확인하는 것이 먼저야.'});

const V12previousUnlock = B9UNLOCK;
// The original binding is const; record visibility uses this wrapper throughout v12 views.
function V12unlocked(id) {
  if (id === 'B05') return B9DONE('BP1');
  if (id === 'B30') return B9DONE('BP5');
  if (V12_FINAL_EVIDENCE.includes(id)) return B9DONE('BP6');
  return V12previousUnlock(id);
}

function V12recordApp(id) {
  if (B9[id]) return B9[id].app;
  if (id === 'LOCKED') return 'notes';
  return V12_A_APPS[R[id]?.[3]] || 'files';
}
function V12gateHint(missing, prerequisites=[], zooms=[]) {
  const parts=[];
  if(prerequisites.length)parts.push(`먼저 ‘${prerequisites.map(id=>PUZZLES.find(p=>p.id===id)?.title||B9PUZZLES.find(p=>p.id===id)?.title).join('’, ‘')}’ 추리를 완료해.`);
  if(zooms.length)parts.push('사진 앱에서 두 자료를 각각 확대해 표지 표시를 확인해.');
  if(missing.length)parts.push(`살펴볼 앱: ${[...new Set(missing.map(id=>V12_APP_NAMES[V12recordApp(id)]||'메모'))].join(' · ')}.`);
  return parts.join(' ');
}

savedSource = function(id) {
  if(!archived(id))return '';
  const ph=PHOTO_ASSETS.find(x=>x.id===id);
  if(ph)return `<div class="v7card"><h3>보관한 사진 원본</h3><div class="v7muted">${E(ph.time)}</div><div class="v7photoView v8savedPhoto">${photoArt(ph)}</div>${ph.zoom?`<div class="v7zoom">${br(ph.zoom)}</div>`:''}</div>`;
  const f=FILES.find(x=>x.id===id);
  if(f)return `<div class="v7card"><h3>보관한 문서 사본 · ${E(f.name)}</h3><div class="v7docText">${f.type==='score'?scoreTable(f):br(f.body)}</div></div>`;
  const entry=Object.entries(CHATS).find(([,room])=>room.messages.some(msg=>msg.id===id));
  if(entry){
    const [roomId,room]=entry;
    const index=room.messages.findIndex(msg=>msg.id===id);
    const first=id==='A22'?Math.max(0,index-1):Math.max(0,index-2);
    const last=id==='A22'?room.messages.length:Math.min(room.messages.length,index+5);
    let date=roomId==='staff25'?'2025/10/24':'';
    const dated=room.messages.map(msg=>{if(msg.time.includes('/'))date=msg.time.split(' ')[0];return {...msg,date};});
    return `<div class="v7card v12-source"><h3>보관한 대화 원문</h3><p class="v7muted">${E(room.name)} 대화방 · 해당 발언과 앞뒤 대화</p>${dated.slice(first,last).map(msg=>{
      const speaker=msg.who==='me'?'권해인':(msg.text.match(/—\s*([^\n]+)$/)?.[1]||room.name);
      return `<div class="v12-source-line ${msg.id===id?'is-key':''}"><div class="v12-source-who">${E(speaker)} <span>${E(msg.time.includes('/')?msg.time:msg.date+' '+msg.time)}</span></div><div class="v7docText">${br(msg.text)}</div></div>`;
    }).join('')}</div>`;
  }
  const n=NOTES.find(x=>x.record===id);
  if(n)return `<div class="v7card"><h3>보관한 메모</h3><div class="v7muted">${E(n.date)}</div><div class="v7docText">${br(n.body)}</div></div>`;
  const call=CALLS.find(x=>x.id===id);
  if(call)return `<div class="v7card"><h3>통화기록 사본</h3><div class="v7docText">${E(call.name)} · ${E(call.time)} · ${E(call.type)}</div></div>`;
  const ev=EVENTS.find(x=>x.id===id);
  if(ev)return `<div class="v7card"><h3>캘린더 일정 사본</h3><div class="v7docText">${E(ev.date)} ${E(ev.time)} · ${E(ev.title)}\n${E(ev.desc)}</div></div>`;
  return '';
};

photoArt = function(p) {
  if(!p.special)return `<img alt="${E(p.title)}" src="${p.img}" loading="lazy">`;
  return `<div class="v7photoTileArt ${p.special==='blue'?'blue':''}" role="img" aria-label="${E(p.zoom)}"><div class="paper"><span class="v12-file-tab">${p.special==='blue'?'학교 보관':'외부 운영'}</span><b>${p.special==='blue'?'17':'2025'}</b><span>${p.special==='blue'?'최초 평가자료':'행사 운영자료'}</span><small>${p.special==='blue'?'음악실 보관함':'SJ-25-04'}</small></div></div>`;
};

board = function() {
  const progress=required.filter(done).length;
  const cards=PUZZLES.filter(p=>done(p.id)||p.needed.some(seen)||(p.doneNeed||[]).some(done)).map(p=>{
    const missing=p.needed.filter(id=>!seen(id));
    const pre=(p.doneNeed||[]).filter(id=>!done(id));
    const zoom=(p.zoomNeed||[]).filter(id=>!state.zoomedPhotos.includes(id));
    const ready=!missing.length&&!pre.length&&!zoom.length;
    const label=done(p.id)?'✓ 완료':pre.length?'선행 추리 필요':zoom.length?'사진 확대 필요':ready?(p.optional?'선택 · 추리 가능':'추리 가능'):`자료 ${p.needed.length-missing.length}/${p.needed.length}`;
    return `<section class="v7boardCard"><div class="v7row between"><h3>${E(p.title)}</h3><span class="v7pill ${done(p.id)?'done':''}">${E(label)}</span></div><p>${done(p.id)?E(p.conclusion):ready?'기록을 연결해 판단할 준비가 됐어.':E(V12gateHint(missing,pre,zoom))}</p>${ready||done(p.id)?`<button class="v7btn ${done(p.id)?'light':'blue'}" data-act="puzzle" data-id="${p.id}">${done(p.id)?'결론 다시 보기':'추리 시작'}</button>`:''}</section>`;
  }).join('');
  return shell('추리보드','home',`<div class="v7row between"><span class="v7pill">CHAPTER A</span><span class="v7pill">필수 추리 ${progress}/${required.length}</span></div><h1 class="v12-board-title">사건 기록판</h1><div class="v7muted">이승민 · 양평중학교 한문 교사<br>앱 탐색 순서는 자유야. 먼저 풀어야 하는 추리가 있으면 카드에 표시돼.</div><div class="progressTrack"><span style="width:${100*progress/required.length}%"></span></div>${cards}<section class="v7boardCard"><h3>10:30의 약속</h3><p>${progress===required.length?'약속 시간이 지났다. 돌아오지 않은 해인의 소식을 확인하자.':`필수 추리 ${required.length-progress}개가 남아 있어. 새로운 기록을 읽으면 조사 항목이 추가돼.`}</p><button class="v7btn" data-act="scene-start" ${progress===required.length?'':'disabled'}>챕터 A 마지막 장면으로</button></section>`,{dark:true,vault:true});
};
const V12originalPuzzle=puzzle;
puzzle=function(){return V12originalPuzzle().replace('② 학생 관련 진술 인물','② 학생 관리 담당자');};

scene=function(){
  const parts=[
    {time:'10:38',tag:'10월 31일 · 10:38',quote:'“해인 선생님께 연락이 왔어요.”',desc:'10:30에 돌아오겠다는 약속이 지났다. 승민이 행정실에 해인의 행방을 물으려던 때, 임효은이 먼저 다가왔다. 하지만 승민은 해인과 직접 대화하지 못했다.',button:'대화 계속'},
    {time:'10:45',tag:'10월 31일 · 10:45',quote:'“몸이 좋지 않아 사람을 만나기 어렵대요. 휴대폰은 제가 전달할게요.”',desc:'효은의 설명뿐, 해인이 직접 보낸 연락은 없다. 승민은 조사한 원본과 결론을 기록함에 남긴 뒤 휴대폰을 넘기기로 한다.',button:'기록 정리'},
    {time:'10:52',tag:'10월 31일 · 10:52',quote:'“그럼 제가 맡아서 전달하겠습니다.”',desc:'리허설 앞부분은 해인의 휴대폰으로 재생했다. 이후 반복 연습용 음원은 안내대로 시작 시점과 음량을 다시 맞춰 컴퓨터로 옮겼다. 승민은 효은에게 휴대폰을 맡긴다.',button:'휴대폰 반환'},
    {time:'19:36',tag:'10월 31일 · 19:36',quote:'“승민쌤, 저 해인이에요. 휴대폰 잘 받았어요.”',desc:'권해인의 번호로 안부 문자가 왔다. 몸이 좋지 않아 당분간 쉬고 싶고 휴직도 생각한다는 내용이다. 승민은 이 문자가 누구의 손으로 작성됐는지는 확인하지 못했다.',button:'답장 보기'},
    {time:'19:40',tag:'10월 31일 · 저녁',quote:'“푹 쉬세요. 학교 일은 걱정하지 마시고요.”',desc:'승민은 안부 문자에 안도하고 학교 업무로 돌아갔다. 휴대폰을 직접 주인에게 돌려준 것도, 목소리를 들은 것도 아니었다.',button:'사건 마무리'},
    {time:'19:40',tag:'CASE 01 · 연락 확인',quote:'돌아온 것은 사람의 목소리가 아니라, 한 통의 문자였다.',desc:'휴대폰 반환은 끝났다. 그러나 권해인의 실제 행방을 직접 확인한 사람은 없었다.',button:'에필로그'},
    {time:'09:41',tag:'3주 후 · 11월 21일',quote:'“양평 지역 중학교 교사 사망 사건… 경찰 수사 중”',desc:'피해자가 권해인이라는 소식이 전해졌다. 마지막 문자를 사람의 안부로 받아들였던 판단부터 다시 확인해야 한다.',button:'챕터 A 종료'}
  ];
  const s=parts[Math.min(state.sceneStep,6)];
  return `<div class="v7scene">${status(true)}<div class="v7sceneBody"><div class="v7sceneTag">${E(s.tag)}</div><h1 class="v7sceneQuote">${E(s.quote)}</h1><p class="v12-scene-desc">${E(s.desc)}</p>${state.sceneStep===1?`<div class="v7darknotice">보관한 원본 ${state.archived.length}개 · 완료한 추리 ${state.done.length}개. 필수 추리의 핵심 자료는 자동으로 보존돼.</div>`:''}</div><div class="v7sceneFoot">${state.sceneStep===1?'<button class="v7btn light" data-act="nav" data-to="vault">보관한 기록 점검</button>':''}<button class="v7btn" data-act="scene-next">${E(s.button)}</button>${state.sceneStep<3?'<button class="v7btn light" data-act="nav" data-to="board">추리보드로 돌아가기</button>':''}</div><div class="toast"></div></div>`;
};

B9listRecords=function(kind){return Object.values(B9).filter(o=>o.app===kind&&V12unlocked(o.id));};
const V12originalBDetail=B9detail;
B9detail=function(){
  const o=B9[state.brecord];
  if(!o||!V12unlocked(o.id))return B9shell('기록','b9home','아직 공개되지 않은 자료야.');
  let extra='';
  if(o.id==='B27')extra=`<div class="v12-frames" aria-label="원본 영상 판독 도식">${[['18:26','로비','두 사람 · 17번 파일'],['18:31','관계자 통로','동행인의 이동이 이어짐'],['18:34','계단참','양어깨를 미는 동작'],['18:37','관계자 통로','한 사람 · 17번 파일']].map(([t,place,label],i)=>`<figure><div class="v12-frame-art frame-${i}"><span class="v12-person"></span>${i<3?'<span class="v12-person victim"></span>':''}<span class="v12-file-mini">17</span></div><figcaption><b>${t} · ${place}</b><span>${label}</span></figcaption></figure>`).join('')}</div><p class="v7muted">촬영 원본을 설명하기 위한 판독 도식. 실제 검증 내용은 아래 기록을 확인해.</p>`;
  if(o.id==='B24')extra='<div class="v12-photo-diagram"><span class="v12-person"></span><span class="v12-person victim"></span><span class="v12-file-mini">17</span><span class="v12-photo-stamp">17:42 · 문화회관 로비</span></div><p class="v7muted">공개 사진의 인물과 소지품을 옮긴 판독 도식</p>';
  if(o.id==='B16')extra='<div class="v7notice">해인이 남긴 공유 권한으로 보존 자료를 열람할 수 있어.</div>';
  return B9shell(o.title,state.breturn||'b9home',`<article class="b9record"><div class="b9stage">${E(o.id)} · ${E(o.sender)}</div><h1 class="v12-record-title">${E(o.title)}</h1><div class="v7muted">${E(o.time)}</div>${extra}<pre>${br(o.text)}</pre></article><button class="v7btn blue" data-act="b9-archive" data-id="${o.id}">${archived(o.id)?'✓ 승민 기록함에 보관됨':'기록함에 보관'}</button><button class="v7btn light" data-act="b9-nav" data-to="b9board">추리보드 확인</button>`);
};
B9board=function(){
  const solved=state.bdone.length;
  const cards=B9PUZZLES.filter((p,i)=>i<=solved||p.need.some(B9SEEN)||B9DONE(p.id)).map(p=>{
    const missing=p.need.filter(id=>!B9SEEN(id));
    const pre=p.pre&&!B9DONE(p.pre)?[p.pre]:[];
    const ready=!missing.length&&!pre.length;
    return `<section class="b9card"><div class="v7row between"><h2>${E(p.title)}</h2><span class="v7pill ${B9DONE(p.id)?'done':''}">${B9DONE(p.id)?'✓ 해결':pre.length?'선행 추리 필요':ready?'추리 가능':`자료 ${p.need.length-missing.length}/${p.need.length}`}</span></div><p>${B9DONE(p.id)?E(p.result):ready?'필요한 기록을 모았어. 자료를 연결해 보자.':E(V12gateHint(missing,pre))}</p>${ready||B9DONE(p.id)?`<button class="v7btn ${B9DONE(p.id)?'light':'blue'}" data-act="b9-puzzle" data-id="${p.id}">${B9DONE(p.id)?'결론 보기':'추리 시작'}</button>`:''}</section>`;
  }).join('');
  const read=V12_FINAL_EVIDENCE.filter(B9SEEN).length;
  const last=B9DONE('BP6')?`<section class="b9card"><h2>마지막 추리 · 기록을 하나로</h2><p>11월 22일, 원본 검증이 끝난 자료가 도착했다. 세 기록을 직접 읽은 뒤 인물과 범행 경위, 근거를 선택해.</p><div class="v7pill">최종 검증 자료 ${read}/3</div>${V12_FINAL_EVIDENCE.map(id=>`<button class="v7btn light" data-act="b9-open" data-id="${id}">${B9SEEN(id)?'✓ ':''}${E(B9[id].title)} 열기</button>`).join('')}<button class="v7btn blue" data-act="b9-scene-start" ${read===3?'':'disabled'}>최종 추리 시작</button></section>`:'';
  return B9shell('사건 추리보드','b9home',`<div class="v7row between"><span class="v7pill">CHAPTER B</span><span class="v7pill done">필수 추리 ${solved}/6</span></div><h1 class="v12-board-title">마지막 접속</h1><p class="v12-board-intro">문자 작성자와 실제 행적을 나누어 확인하고, 마지막에는 사건의 직접 증거를 연결해.</p><div class="progressTrack"><span style="width:${100*solved/6}%"></span></div>${cards}${last}`,true);
};

function V12saveSettings(chapterB=false){
  const content=`<h1 class="v7listHead">저장과 이어하기</h1><div class="v7notice">앱을 이동하거나 추리를 풀 때 자동으로 저장돼. 같은 브라우저와 같은 주소에서 이어할 수 있어.</div><section class="v7card"><h2>수동 저장</h2><p>되돌아가고 싶은 시점을 별도로 남길 수 있어.</p><p>${state.manualSavedAt?'마지막 수동 저장: '+E(state.manualSavedAt):'아직 수동 저장한 기록이 없어.'}</p><button class="v7btn blue" data-act="save">지금 진행 수동 저장</button><button class="v7btn light" data-act="load" ${hasSave()?'':'disabled'}>수동 저장 불러오기</button></section><section class="v7card"><h2>처음부터</h2><p>새 게임을 시작해도 수동 저장은 유지돼.</p><button class="v7btn light" data-act="reset">처음부터 시작</button></section><div class="v7notice">다른 주소나 다른 브라우저에서는 저장 기록이 이어지지 않아.</div>`;
  return chapterB?B9shell('설정','b9home',content):shell('설정',state.sceneStep>=7?'chapterEnd':state.sceneStep>=3?'scene':'home',content,{board:true});
}
settings=()=>V12saveSettings(false);
B9settings=()=>V12saveSettings(true);

function V12ask(title,description,buttonText,accept){
  document.getElementById('v12-confirm')?.remove();
  const dialog=document.createElement('dialog');
  dialog.id='v12-confirm'; dialog.className='v12-confirm';dialog.setAttribute('aria-labelledby','v12-confirm-title');
  dialog.innerHTML=`<h2 id="v12-confirm-title">${E(title)}</h2><p>${E(description)}</p><div><button type="button" data-cancel>취소</button><button type="button" data-accept>${E(buttonText)}</button></div>`;
  document.body.append(dialog);
  dialog.querySelector('[data-cancel]').onclick=()=>{dialog.close();dialog.remove();};
  dialog.querySelector('[data-accept]').onclick=()=>{dialog.close();dialog.remove();accept();};
  dialog.addEventListener('cancel',()=>dialog.remove(),{once:true});
  dialog.showModal();
  dialog.querySelector('[data-cancel]').focus();
}
loadManual=function(){
  if(!hasSave()){toast('수동 저장한 기록이 없어.');return;}
  V12ask('저장한 시점으로 돌아갈까요?','지금의 자동 진행을 수동 저장 시점으로 바꿔요. 수동 저장 자체는 그대로 남아요.','불러오기',()=>{
    try{const value=JSON.parse(localStorage.getItem(SAVE_KEY));if(!value||typeof value!=='object')throw new Error('invalid');state=normalizeState(value);V9init();v10CoverVisible=false;render();toast('수동 저장한 진행을 불러왔어.');}catch(_){toast('저장 기록을 읽을 수 없어. 현재 진행은 유지했어.');}
  });
};
function V12reset(){V12ask('처음부터 시작할까요?','현재 자동 진행을 새 게임으로 바꿔요. 수동 저장 기록은 유지돼요.','새 게임 시작',()=>V10startFresh());}
document.addEventListener('click',e=>{
  const action=e.target.closest('[data-act]')?.dataset.act;
  if(['load','b9-load','reset','b9-reset'].includes(action)){e.preventDefault();e.stopImmediatePropagation();if(action.includes('load'))loadManual();else V12reset();}
},true);

const V12beforeBHome=B9home;
B9home=function(){return V12beforeBHome().replace(/2026년 11월 (?:21|22)일 · [^<]+/,state.day==='11/23'?'2026년 11월 23일 · 월요일':state.day==='11/22'?'2026년 11월 22일 · 일요일':'2026년 11월 21일 · 토요일').replace(/(<span class="b9icon" style="background:[^"]+">[^<]+<\/span>)(<span>[^<]+<\/span>)/g,(all,icon,label)=>{
    const name=label.replace(/<[^>]+>/g,'');const appName=Object.keys(V12_APP_NAMES).find(key=>V12_APP_NAMES[key]===name);const count=Object.values(B9).filter(o=>o.app===appName&&V12unlocked(o.id)&&!B9SEEN(o.id)).length;
    return icon+(count?`<span class="v12-new-badge" aria-hidden="true">${count}</span>`:'')+label;
  });};

function V12finalQuestion(){
  const evidence=state.v12Evidence||[];
  return `<div class="b9card"><h2>① 직접 관여한 인물</h2>${[['hyo','임효은'],['choi','최기훈'],['seo','서진석']].map(([v,t])=>`<button class="b9choice ${state.bselected===v?'selected':''}" data-act="b9-suspect" data-value="${v}" aria-pressed="${state.bselected===v}">${state.bselected===v?'◉':'○'} ${t}</button>`).join('')}</div><div class="b9card"><h2>② 기록으로 설명되는 범행 경위</h2>${[['push','자료를 회수하려던 동행인이 계단참에서 해인을 밀어 추락하게 했다.'],['score','평가표 점수를 바꾼 행위 자체가 사망 원인이다.'],['message','가짜 안부 문자를 보낸 사람이 그 시각에 살해했다.']].map(([v,t])=>`<button class="b9choice ${state.v12Method===v?'selected':''}" data-act="v12-method" data-value="${v}" aria-pressed="${state.v12Method===v}">${state.v12Method===v?'◉':'○'} ${t}</button>`).join('')}</div><div class="b9card"><h2>③ 직접 관여를 연결하는 근거 모두 선택</h2><p>동기와 거짓말만으로 끝내지 말고, 행위·신원·사망 경위를 연결해.</p>${[['B27','현장 영상: 밀침과 추락이 기록됨'],['B10','임효은이 사칭 문자를 보냈다는 인정'],['B28','연속 동선과 인물 식별 대조'],['B19','후원공연 계약의 이해관계만 확인'],['B29','현장 감정: 사망 원인·시점과 영상의 일치']].map(([v,t])=>`<button class="b9choice ${evidence.includes(v)?'selected':''}" data-act="v12-evidence" data-value="${v}" aria-pressed="${evidence.includes(v)}">${evidence.includes(v)?'☑':'☐'} ${t}</button>`).join('')}</div>`;
}
B9scene=function(){
  const step=state.bsceneStep||0;
  const parts=[
    {tag:'11월 22일 · 14:36',title:'마지막 빈칸',desc:'원본 영상은 행위를, 연속 동선은 인물을, 현장 감정은 사망 경위를 확인해 준다.\n\n세 기록을 서로 대조해 마지막 판단을 내려야 한다. 계약과 거짓말은 중요한 단서지만, 그것만으로 사망 사건을 설명할 수는 없다.',button:'최종 추리로'},
    {tag:'FINAL DEDUCTION',title:'기록을 하나로 연결하라',desc:'직접 관여한 인물과 범행 경위를 고르고, 그 판단을 함께 뒷받침하는 세 가지 근거를 선택해.',button:'최종 판단 제출'},
    {tag:'재구성 · 11월 1일',title:'18시 34분, 계단참',desc:'2025년, 서진석은 김민구 중심의 외부 공연 계약을 진행했고 최기훈에게 점수 변경을 요구했다. 최기훈은 온유의 세 번째 점수를 10점 낮추고 학생에게 의혹을 돌렸다.\n\n2026년, 해인은 최초 평가표와 운영 확인서를 모아 이 연결을 확인했다. 11월 1일 온유의 보호자를 만난 뒤, 누락 이유를 직접 묻기 위해 문화회관으로 향했다.\n\n서진석은 계약 문제가 드러날 것을 우려해 원본 자료를 돌려달라고 요구했다. 두 사람은 로비에서 관계자 통로와 계단참으로 이동했다. 18:34, 서진석이 해인의 양어깨를 밀었고 해인은 계단 아래로 추락했다. 18:37 서진석은 17번 파일을 들고 혼자 나왔다.\n\n만남을 부인한 말은 동행 기록과 충돌했다. 그러나 마지막 판단을 가능하게 한 것은 거짓말 자체가 아니라, 기록된 행위와 신원, 사망 원인의 연결이었다.',button:'검거 소식'},
    {tag:'11월 22일 · 20:04',title:'마지막 대면',desc:'수사팀은 제출된 자료와 현장 검증 결과를 확보했다. 서진석의 출국 예정과 소재를 확인한 뒤 현장팀이 신병을 확보했다.\n\n문상윤: “서진석 씨, 권해인 선생님 사망 사건의 살인 혐의로 체포합니다.”\n\n계단참에서 끝난 줄 알았던 기록은, 행사 원본 속에 남아 있었다. 이후 판단은 확보된 증거와 수사 절차를 통해 이어진다.',button:'후일담'},
    {tag:'11월 23일 · 남겨진 사람들',title:'다시 읽힌 학생의 말',desc:'학교는 최초 평가표와 수정 경위를 공개하고 홍온유에게 제기했던 조작 의혹을 정정했다. 최기훈은 점수 수정과 책임 전가를 인정했다. 임효은도 간접 진술과 사칭 문자에 관해 사실대로 진술했다.\n\n익명 제보자는 행사 보조인력 임수호였다. 그가 본 파란 파일의 소지자는 권해인이었다. 그는 온유의 일이 다시 묻힐까 두려워 연락했지만, 사망 사건을 목격한 사람은 아니었다.\n\n홍온유: “제가 처음 한 말도, 이제 기록에 남는 거죠?”\n\n승민은 해인이 남긴 메모를 함께 전달했다. “학생의 말과 점수 변경 이유는 따로 확인할 것.”',button:'마지막 기록'},
    {tag:'TRUE END · 마지막 접속',title:'사람은 사라져도, 기록은 끝나지 않았다.',desc:'마지막 안부 문자는 권해인이 쓴 것이 아니었다. 18:04 자동 동기화는 그때 해인이 휴대폰을 사용했다는 증거도 아니었다.\n\n진실은 하나의 마지막 접속 시각에 있지 않았다. 학생의 첫 진술, 바뀐 점수, 숨긴 만남, 그리고 서로 이어진 현장 기록 속에 있었다.\n\n승민은 사건 기록함의 첫 줄을 고쳤다.\n“확인했다고 믿었던 것부터, 다시 확인할 것.”\n\nCASE CLOSED',button:'기록 다시 보기'}
  ];
  const s=parts[Math.min(step,parts.length-1)];
  return `<div class="b9scene">${status(true)}<div class="sceneBody"><div class="tag">${E(s.tag)}</div><h1 class="quote">${E(s.title)}</h1><div class="desc">${E(s.desc)}</div>${step===1?V12finalQuestion():''}</div><div class="sceneFooter"><button class="v7btn" data-act="b9-scene-next">${E(s.button)}</button>${step===1?'<button class="v7btn light" data-act="b9-vault">근거 다시 읽기</button>':''}${step===5?'<button class="v7btn light" data-act="b9-vault">전체 기록함 보기</button>':''}</div><div class="toast"></div></div>`;
};

const V12oldHandle=handleClick;
handleClick=function(el){
  const d=el.dataset;
  if(d.act==='v12-method'){state.v12Method=d.value;render();return;}
  if(d.act==='v12-evidence'){const chosen=state.v12Evidence||[];state.v12Evidence=chosen.includes(d.value)?chosen.filter(v=>v!==d.value):[...chosen,d.value];render();return;}
  if(d.act==='scene-start'&&required.every(done)){state.sceneStep=0;state.day='10/31';state.time='10:38';mark('A27');navigate('scene');return;}
  if(d.act==='scene-next'){state.sceneStep++;if(state.sceneStep===2){mark('A30');archive('A27');archive('A30');}state.time=['10:38','10:45','10:52','19:36','19:40','19:40','09:41'][state.sceneStep]||'09:41';if(state.sceneStep>=6)state.day='11/21';if(state.sceneStep>=7)navigate('chapterEnd');else render();return;}
  V12oldHandle(el);
};
const V12oldBHandle=B9handle;
B9handle=function(d){
  if(d.act==='b9-start'){state.day='11/21';state.time='09:46';navigate('b9home');return;}
  if(d.act==='b9-open'){
    if(!V12unlocked(d.id))return;
    state.breturn=state.screen;state.brecord=d.id;if(!B9SEEN(d.id))state.bseen.push(d.id);mark(d.id);navigate('b9detail');return;
  }
  if(d.act==='b9-verify'){
    const p=B9PUZZLES.find(p=>p.id===d.id);if(!p||B9DONE(p.id))return;
    if(p.need.some(id=>!B9SEEN(id))||(p.pre&&!B9DONE(p.pre))){toast('먼저 필요한 기록과 선행 추리를 확인해.');return;}
    if(state.banswers[p.id]!==p.correct){toast('선택한 설명과 기록이 맞는지 다시 비교해 봐.');return;}
    state.bdone.push(p.id);
    state.time={BP1:'11:17',BP2:'12:14',BP3:'14:16',BP4:'15:30',BP5:'16:10',BP6:'14:36'}[p.id];
    if(p.id==='BP6'){state.day='11/22';if(!B9SEEN('B26'))state.bseen.push('B26');archive('B26');}
    render();const apps=[...new Set(Object.values(B9).filter(o=>V12unlocked(o.id)&&!B9SEEN(o.id)).map(o=>V12_APP_NAMES[o.app]))];toast('추리 완료! '+(apps.length?'새 자료: '+apps.join(' · '):'기록함에서 결론을 확인해.'));return;
  }
  if(d.act==='b9-scene-start'){if(!B9DONE('BP6')||V12_FINAL_EVIDENCE.some(id=>!B9SEEN(id)))return;state.bsceneStep=0;state.day='11/22';state.time='14:36';navigate('b9scene');return;}
  if(d.act==='b9-scene-next'){
    if(state.bsceneStep===1){
      if(!state.bselected||!state.v12Method){toast('인물과 범행 경위를 모두 선택해.');return;}
      if(state.bselected!=='seo'){toast('사칭 문자나 점수 변경과, 현장 영상 속 인물을 구분해 봐.');return;}
      if(state.v12Method!=='push'){toast('영상의 18:34 행위와 현장 감정의 사망 원인을 연결해 봐.');return;}
      const evidence=state.v12Evidence||[];
      if(evidence.length!==3||!V12_FINAL_EVIDENCE.every(id=>evidence.includes(id))){toast('행위·인물·사망 경위를 각각 확인하는 세 자료가 필요해.');return;}
      state.v12CaseSolved=true;
      for(const id of V12_FINAL_EVIDENCE)archive(id);
    }
    if(state.bsceneStep>=5){navigate('b9vault');return;}
    state.bsceneStep++;
    state.time=['14:36','14:50','19:40','20:04','09:10','09:20'][state.bsceneStep];
    state.day=state.bsceneStep>=4?'11/23':'11/22';navigate('b9scene');return;
  }
  V12oldBHandle(d);
};

function V12persist(){try{localStorage.setItem(V9_AUTO_KEY,JSON.stringify({v:9,edition:12,state:copyState()}));}catch(_){document.querySelector('.toast')?.setAttribute('data-save-unavailable','true');}}
let V12lastView='';
const V12beforeRender=render;
render=function(){
  const key=[state.screen,state.puzzle,state.bpuzzle,state.brecord,state.note,state.photo,state.sceneStep,state.bsceneStep].join('|');
  const same=key===V12lastView;
  const scrolls=same?Array.from(document.querySelectorAll('#app .content,#app .sceneBody,#app .v7sceneBody')).map(e=>e.scrollTop):[];
  const pin=document.getElementById('pinInput');if(same&&pin)state.answers.pinDraft=pin.value;
  V12beforeRender();V12lastView=key;
  if(same)Array.from(document.querySelectorAll('#app .content,#app .sceneBody,#app .v7sceneBody')).forEach((el,i)=>{el.scrollTop=scrolls[i]||0;});
  const newPin=document.getElementById('pinInput');if(newPin&&state.answers.pinDraft)newPin.value=state.answers.pinDraft;
  document.querySelectorAll('#app .toast').forEach(el=>{el.setAttribute('role','status');el.setAttribute('aria-live','polite');});
  V12persist();
};
document.addEventListener('change',()=>queueMicrotask(V12persist));
document.addEventListener('input',e=>{if(e.target.id==='pinInput'){state.answers.pinDraft=e.target.value;V12persist();}});

// Visible fallback if any required resource fails to initialize.
document.getElementById('boot-status')?.remove();
render();
