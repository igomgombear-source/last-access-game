'use strict';

// Presentation and evidence interactions only: case records and outcomes stay in the base data.
const IR_MODIFIED = ['BP1', 'BP2', 'BP3', 'BP4', 'BP6'];
const IR_PREVIOUS = {BP2:'BP1', BP3:'BP2', BP4:'BP3', BP6:'BP5'};
const IR_HINTS = {
  BP1:['문자와 휴대폰 전달 메모의 주체를 따로 읽어 봐.', '발신 번호의 주인과 휴대폰을 직접 받은 사람이 같은지 비교해.', '문자는 해인의 번호로 왔지만, 승민이 휴대폰을 직접 건넨 상대는 효은이야.'],
  BP2:['두 기록이 가리키는 해를 먼저 구분해.', '2025년에는 무엇을 직접 보았는지, 2026년에는 누가 문자를 썼는지 확인해.', '2025년의 말은 전해 들은 내용이고, 2026년 문자는 효은이 해인인 것처럼 작성했어.'],
  BP3:['11월 1일에 실제 만난 사람의 설명을 찾아봐.', '당시 대면을 설명하는 진술과, 그날 발신된 자료를 함께 연결해.', '홍지은의 직접 목격 기록과 11월 1일 발신 메일 사본을 연결해.'],
  BP4:['운영 확인서와 계약 자료에서 같은 표시를 찾아봐.', '문서번호 SJ-25-04와 최기훈이 인정한 행동을 구분해서 읽어.', '계약 자료는 운영 확인서와 연결되고, 최기훈은 점수 변경을 인정했어. 여기서 확인되는 것은 조작 경위와 이해관계야.'],
  BP6:['18:17 뒤를 직접 본 기록이 어디까지 남았는지 확인해.', '공개 사진의 촬영자와, 그 사람이 실제로 보존했다고 답한 자료를 찾아봐.', '배준서가 보존한 미공개 촬영 원본을 요청할 수 있어.']
};

function IRdraft(id) {
  if (!state.releaseInvestigation || typeof state.releaseInvestigation !== 'object' || Array.isArray(state.releaseInvestigation)) state.releaseInvestigation = {};
  if (!state.releaseInvestigation[id] || typeof state.releaseInvestigation[id] !== 'object' || Array.isArray(state.releaseInvestigation[id])) state.releaseInvestigation[id] = {};
  return state.releaseInvestigation[id];
}
function IRready(p) {
  return !!p && !p.need.some(id => !B9SEEN(id)) && (!p.pre || B9DONE(p.pre)) && (!IR_PREVIOUS[p.id] || B9DONE(IR_PREVIOUS[p.id]));
}
function IRsource(id, open=false) {
  const record = B9[id];
  if (!record || !B9SEEN(id)) return '';
  return `<details class="ir-source" ${open?'open':''}><summary>${E(record.title)}<span>${E(record.time)} · ${E(record.sender)}</span></summary><div class="ir-source-body">${br(record.text)}</div></details>`;
}
function IRchoices(id, field, title, options, draft) {
  return `<fieldset class="ir-field"><legend>${E(title)}</legend>${options.map(([value,label])=>`<button type="button" class="b9choice ir-choice ${draft[field]===value?'selected':''}" data-act="b9-ir-choice" data-id="${id}" data-field="${field}" data-value="${value}" aria-pressed="${draft[field]===value}"><span aria-hidden="true">${draft[field]===value?'●':'○'}</span> ${E(label)}</button>`).join('')}</fieldset>`;
}
function IRbody(id, draft) {
  if (id==='BP1') return `<p class="ir-purpose">문자에 찍힌 이름과 직접 휴대폰을 받은 사람을 연결해 보자.</p><div class="ir-compare">${IRsource('B02',true)}${IRsource('B03',true)}</div>${IRchoices(id,'number','문자가 발송된 번호의 주인',[['haein','권해인'],['hyo','임효은']],draft)}${IRchoices(id,'recipient','승민이 직접 휴대폰을 건넨 상대',[['haein','권해인'],['hyo','임효은'],['police','문상윤']],draft)}<p class="ir-small">번호와 전달 경로를 연결하면, 문자 작성자에게 무엇을 확인해야 할지 알 수 있어.</p>`;
  if (id==='BP2') return `<p class="ir-purpose">효은의 말에서 2025년 일과 2026년 일을 나누어 확인해.</p><div class="ir-compare">${IRsource('B06',true)}${IRsource('B10',true)}</div>${IRchoices(id,'past','2025년 · 학생의 자료 수정에 관한 말',[['direct','수정하는 장면을 직접 보았다는 기록이다.'],['indirect','컴퓨터 사용 이야기를 전해 들었고, 수정 장면은 보지 못했다.']],draft)}${IRchoices(id,'message','2026년 · 마지막 안부 문자',[['owner','해인이 직접 작성한 문자다.'],['impersonation','효은이 해인이 보낸 것처럼 작성한 문자다.']],draft)}${IRsource('B09')}`;
  if (id==='BP3') {
    const picked=Array.isArray(draft.records)?draft.records:[];
    return `<p class="ir-purpose">직접 대면을 설명하는 기록과 당일 발신 자료를 연결해, 11월 1일의 행적을 확인해.</p><div class="ir-evidence-grid">${['B13','B14','B12','B02'].filter(B9SEEN).map(recordId=>`<div class="ir-evidence"><button type="button" class="b9choice ir-choice ${picked.includes(recordId)?'selected':''}" data-act="b9-ir-record" data-id="BP3" data-value="${recordId}" aria-pressed="${picked.includes(recordId)}"><span aria-hidden="true">${picked.includes(recordId)?'☑':'☐'}</span> ${E(B9[recordId].title)}</button>${IRsource(recordId)}</div>`).join('')}</div><p class="ir-small">여러 기록을 고를 수 있어. 서로 다른 출처 형식의 자료가 무엇을 확인하는지 비교해.</p>`;
  }
  if (id==='BP4') return `<p class="ir-purpose">계약 자료와 같은 문서번호를 가진 기록을 연결하고, 확인되는 범위를 정리해.</p><div class="ir-compare">${IRsource('B19',true)}${IRsource('B17',true)}</div>${IRchoices(id,'document','계약 자료와 문서번호가 일치하는 기록',[['B17',B9.B17.title],['B18',B9.B18.title],['B20',B9.B20.title]],draft)}${IRsource('B18')}${IRsource('B20')}${IRchoices(id,'interpretation','문서와 최기훈의 진술을 연결한 판단',[['interests','최기훈이 점수를 바꿨고, 서진석은 그 선발 결과에 계약상 이해관계가 있었다.'],['student','홍온유가 점수를 고치도록 서진석에게 요청했다.'],['murder','점수 변경을 인정한 사람이 사망 사건에도 직접 관여했다고 확인된다.']],draft)}`;
  if (id==='BP6') return `<p class="ir-purpose">공개 사진 이후의 행적을 확인하려면, 실제로 남아 있는 자료를 요청해야 해.</p>${IRsource('B25',true)}${IRsource('B30',true)}${IRchoices(id,'request','누구에게 어떤 자료를 요청할까?',[['video','배준서에게 — 보존한 미공개 촬영 원본'],['witness','정유림에게 — 따라가지 않은 관계자 통로의 내부 목격'],['sync','공유폴더에서 — 자동 동기화 시각만으로 만든 이동 기록']],draft)}`;
  return '';
}

function IRassess(id, draft) {
  if (id==='BP1') {
    if (!draft.number || !draft.recipient) return '두 칸을 모두 선택해. 각 기록에서 실제로 확인한 사람을 연결해 봐.';
    if (draft.number!=='haein') return '마지막 문자에 표시된 발신 번호와, 나중에 확인할 작성자를 구분해 봐.';
    if (draft.recipient!=='hyo') return '직접 반환했는지, 다른 사람에게 전달을 부탁했는지 메모를 다시 읽어 봐.';
  } else if (id==='BP2') {
    if (!draft.past || !draft.message) return '두 시점의 일을 각각 확인해.';
    if (draft.past!=='indirect') return '컴퓨터를 썼다는 이야기와 실제 수정 장면을 보았다는 말은 달라. 확인서의 표현을 비교해.';
    if (draft.message!=='impersonation') return '문자 작성자 인정에서 누가 직접 작성했다고 말하는지 확인해.';
  } else if (id==='BP3') {
    const chosen=Array.isArray(draft.records)?draft.records:[];
    if (!chosen.length) return '행적을 뒷받침하는 기록을 선택해.';
    if (chosen.some(key=>!['B12','B13','B14','B02'].includes(key) || !B9SEEN(key))) return '직접 확인한 자료에서 근거를 선택해.';
    if (chosen.includes('B02')) return '10월 31일의 문자가 11월 1일의 실제 대면까지 확인해 주지는 않아. 날짜와 작성자를 나누어 봐.';
    if (!chosen.includes('B13')) return '발신 자료와 함께, 보호자가 직접 본 일을 설명하는 기록도 연결해.';
    if (!chosen.includes('B14')) return '직접 대면 진술에 더해, 그날 발신된 자료 사본을 함께 대조해.';
  } else if (id==='BP4') {
    if (!draft.document || !draft.interpretation) return '문서번호가 이어지는 기록과, 그 연결에서 확인되는 판단을 선택해.';
    if (draft.document!=='B17') return '계약 자료의 문서번호와 선택한 기록의 번호를 비교해.';
    if (draft.interpretation!=='interests') return '점수 변경을 인정한 진술과 계약 조건이 확인하는 범위까지만 판단해.';
  } else if (id==='BP6') {
    if (!draft.request) return '다음으로 확보할 자료를 선택해.';
    if (draft.request==='witness') return '목격자가 직접 보았다는 범위를 넘어서는 장면을 증언으로 만들 수는 없어.';
    if (draft.request!=='video') return '자동 동기화는 이동 경로를 촬영한 기록이 아니야. 실제로 보존된 원본을 찾아봐.';
  }
  return '';
}

const IR_beforePuzzle=B9puzzle;
B9puzzle=function() {
  const id=state.bpuzzle;
  if (id==='BP5' && !B9DONE('BP5')) {
    return IR_beforePuzzle().replace(/<p class="v13-original">([\s\S]*?)<\/p>/g,(_,body)=>`<details class="ir-source"><summary>원문 전체 보기</summary><div class="ir-source-body">${body}</div></details>`);
  }
  if (!IR_MODIFIED.includes(id) || B9DONE(id)) return IR_beforePuzzle();
  const p=B9PUZZLES.find(p=>p.id===id);
  if (!IRready(p)) return B9shell('추리 보류','b9board','<div class="b9card"><p>관련 기록과 앞선 추리를 먼저 확인해.</p><button class="v7btn light" data-act="b9-nav" data-to="b9board">조사 목록으로</button></div>',true);
  const draft=IRdraft(id);
  return B9shell(p.title,'b9board',`<section class="ir-investigation"><div class="ir-step-label">기록 연결</div><h1 class="ir-heading">${E(p.title)}</h1>${IRbody(id,draft)}<p class="ir-feedback" role="status" aria-live="polite">${E(draft.feedback||'원문을 비교한 뒤 연결을 확인해.')}</p><button type="button" class="v7btn blue" data-act="b9-ir-submit" data-id="${id}">${id==='BP6'?'자료 요청 확인':'기록 연결 확인'}</button><button type="button" class="v7btn light" data-act="b9-ir-hint" data-id="${id}">${draft.hint>=3?'해설 다시 보기':'단계별 힌트'}</button>${draft.hint?`<div class="v7darknotice">${E(IR_HINTS[id][Math.min(draft.hint,3)-1])}</div>`:''}<button type="button" class="v7btn light" data-act="b9-nav" data-to="b9board">조사 목록으로 돌아가기</button></section>`,true);
};

const IR_FINAL_EVENTS=[
  ['push','계단참에서 동행인이 해인을 밀고, 해인이 추락한다.','18:34'],
  ['exit','동행인이 17번 파일을 들고 혼자 돌아 나온다.','18:37'],
  ['lobby','두 사람이 17번 파일을 가지고 관계자 통로로 이동한다.','18:26'],
  ['stairs','통로 영상이 계단 고정 카메라의 진입 장면과 이어진다.','18:31']
];
const IR_FINAL_ORDER=['lobby','stairs','push','exit'];
function IRvalidTimeline(order) { return Array.isArray(order) && order.length===4 && IR_FINAL_ORDER.every((key,i)=>order[i]===key); }

V12finalQuestion=function() {
  const evidence=Array.isArray(state.v12Evidence)?state.v12Evidence:[];
  const order=Array.isArray(state.releaseFinalOrder)?state.releaseFinalOrder:[];
  const solved=state.v12CaseSolved===true;
  return `<section class="ir-investigation"><div class="b9card"><h2>① 현장 기록의 순서</h2><p>발생한 순서대로 장면을 눌러 기록을 재구성해.</p>${solved?'<p>이전에 확인한 사건 순서가 보존돼 있어.</p>':IR_FINAL_EVENTS.map(([key,label])=>`<button type="button" class="b9choice ir-timeline ${order.includes(key)?'selected':''}" data-act="b9-ir-timeline" data-value="${key}" aria-pressed="${order.includes(key)}"><span class="ir-order-number">${order.includes(key)?order.indexOf(key)+1:'·'}</span><span>${E(label)}</span></button>`).join('')}${!solved?'<button type="button" class="v7btn light" data-act="b9-ir-timeline-clear">순서 다시 선택</button>':''}<button type="button" class="v7btn light" data-act="b9-open" data-id="B27">현장 영상 검증표 다시 읽기</button>${state.releaseFinalFeedback?`<p class="ir-feedback" role="status">${E(state.releaseFinalFeedback)}</p>`:''}</div><div class="b9card"><h2>② 직접 관여한 인물</h2>${[['hyo','임효은'],['choi','최기훈'],['seo','서진석']].map(([value,label])=>`<button type="button" class="b9choice ${state.bselected===value?'selected':''}" data-act="b9-suspect" data-value="${value}" aria-pressed="${state.bselected===value}">${E(label)}</button>`).join('')}</div><div class="b9card"><h2>③ 현장 기록이 설명하는 경위</h2>${[['push','동행인이 계단참에서 해인을 밀어 추락하게 했다.'],['score','동행인이 먼저 떠난 뒤, 해인이 혼자 계단에서 추락했다.'],['message','통로에 새로 들어온 제삼자가 해인을 추락하게 했다.']].map(([value,label])=>`<button type="button" class="b9choice ${state.v12Method===value?'selected':''}" data-act="v12-method" data-value="${value}" aria-pressed="${state.v12Method===value}">${E(label)}</button>`).join('')}</div><div class="b9card"><h2>④ 행위·인물·사망 경위를 연결하는 근거</h2><p>서로 다른 기록이 각각 어떤 사실을 확인하는지 연결해.</p>${[['B27','현장 영상 검증표'],['B10','문자 작성자 인정'],['B28','동선과 인물 대조'],['B19','후원공연 계약 검토자료'],['B29','현장 감정 요약']].map(([value,label])=>`<button type="button" class="b9choice ${evidence.includes(value)?'selected':''}" data-act="v12-evidence" data-value="${value}" aria-pressed="${evidence.includes(value)}">${evidence.includes(value)?'☑':'☐'} ${E(label)}</button>`).join('')}</div></section>`;
};

const IR_beforeHandle=B9handle;
B9handle=function(d) {
  if (d.act==='b9-scene-next' && state.screen==='b9scene' && state.bsceneStep===1 && !state.v12CaseSolved && !IRvalidTimeline(state.releaseFinalOrder)) {
    state.releaseFinalFeedback=Array.isArray(state.releaseFinalOrder) && state.releaseFinalOrder.length===4?'선택한 장면의 순서를 현장 영상 검증표의 시각과 다시 대조해.':'현장 기록 네 장면을 발생한 순서대로 연결해.';
    render(); return;
  }
  if (d.act==='b9-ir-timeline' || d.act==='b9-ir-timeline-clear') {
    if (state.screen!=='b9scene' || state.bsceneStep!==1 || state.v12CaseSolved) return;
    if (d.act==='b9-ir-timeline-clear') state.releaseFinalOrder=[];
    else if (IR_FINAL_ORDER.includes(d.value)) {
      const order=Array.isArray(state.releaseFinalOrder)?state.releaseFinalOrder:[];
      if (!order.includes(d.value)) state.releaseFinalOrder=[...order,d.value];
    }
    state.releaseFinalFeedback=''; render(); return;
  }
  if (d.act==='b9-verify' && IR_MODIFIED.includes(d.id) && !B9DONE(d.id)) {
    toast('기록 연결 화면에서 근거를 확인해.'); return;
  }
  if (!d.act?.startsWith('b9-ir-')) return IR_beforeHandle(d);
  if (state.screen!=='b9puzzle' || state.bpuzzle!==d.id || !IR_MODIFIED.includes(d.id) || B9DONE(d.id)) return;
  const p=B9PUZZLES.find(p=>p.id===d.id);
  if (!IRready(p)) { toast('관련 기록과 앞선 추리를 먼저 확인해.'); return; }
  const draft=IRdraft(d.id);
  if (d.act==='b9-ir-choice') { draft[d.field]=d.value; draft.feedback=''; }
  else if (d.act==='b9-ir-record' && d.id==='BP3') {
    if (!['B12','B13','B14','B02'].includes(d.value) || !B9SEEN(d.value)) return;
    const chosen=Array.isArray(draft.records)?draft.records:[];
    draft.records=chosen.includes(d.value)?chosen.filter(key=>key!==d.value):[...chosen,d.value]; draft.feedback='';
  } else if (d.act==='b9-ir-hint') draft.hint=Math.min((draft.hint||0)+1,3);
  else if (d.act==='b9-ir-submit') {
    draft.feedback=IRassess(d.id,draft);
    if (!draft.feedback) {
      state.banswers[d.id]=p.correct;
      // Delegate all completion state, time advancement, unlocks and autosave to v12/v13.
      IR_beforeHandle({act:'b9-verify',id:d.id}); return;
    }
  }
  render();
};
