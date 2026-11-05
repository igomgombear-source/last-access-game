'use strict';

// Additive BP5 interaction. Existing records, conclusions and progression stay intact.
const V13Evidence = Object.freeze({
  candidates: ['B22', 'B24', 'B25', 'B21'],
  assess(claim, evidence, seen, prerequisites) {
    if (!prerequisites) return 'locked';
    if (!claim || !evidence) return 'incomplete';
    if (!this.candidates.includes(evidence) || !seen.includes(evidence)) return 'unseen';
    if (claim !== 'meeting') return 'claim';
    if (evidence === 'B22') return 'plan';
    if (evidence === 'B21') return 'sync';
    return 'supported';
  }
});

const V13previousPuzzle = B9puzzle;
B9puzzle = function () {
  if (state.bpuzzle !== 'BP5' || B9DONE('BP5')) return V13previousPuzzle();
  const p = B9PUZZLES.find(p => p.id === 'BP5');
  if (!B9DONE('BP4') || p.need.some(id => !B9SEEN(id))) return V13previousPuzzle();
  const draft = state.v13Confrontation || {};
  const evidence = V13Evidence.candidates.includes(draft.evidence) && B9SEEN(draft.evidence) ? B9[draft.evidence] : null;
  return B9shell(p.title, 'b9board', `<div class="v7pill">증거 대조</div>
    <h1 class="v13-heading">숨긴 만남</h1><p>진술과 기록을 비교하고, 확인할 문장에 근거를 제시해.</p>
    <div class="v13-compare"><section class="b9card"><h2>서진석의 설명</h2><p class="v13-meta">${E(B9.B23.time)} · ${E(B9.B23.sender)}</p><p class="v13-original">${E(B9.B23.text)}</p>
    <button class="b9choice ${draft.claim === 'meeting' ? 'selected' : ''}" data-act="b9-v13-claim" aria-pressed="${draft.claim === 'meeting'}">“직접 뵌 적도 없습니다.”에 근거 제시</button></section>
    <section class="b9card"><h2>대조할 기록</h2><div class="v13-evidence-list">${V13Evidence.candidates.filter(B9SEEN).map(id => `<button class="b9choice ${draft.evidence === id ? 'selected' : ''}" data-act="b9-v13-evidence" data-id="${id}" aria-pressed="${draft.evidence === id}">${E(B9[id].title)}</button>`).join('')}</div>
    ${evidence ? `<article class="v13-source"><h3>${E(evidence.title)}</h3><p class="v13-meta">${E(evidence.time)} · ${E(evidence.sender)}</p><p class="v13-original">${E(evidence.text)}</p></article>` : '<p>기록을 고르면 원문을 여기서 함께 읽을 수 있어.</p>'}</section></div>
    <p class="v13-feedback" role="status" aria-live="polite">${E(draft.feedback || '진술과 근거를 고른 뒤 제시해.')}</p>
    <button class="v7btn blue" data-act="b9-v13-submit">선택한 증거 제시</button>
    <button class="v7btn light" data-act="b9-v13-hint">${draft.hint >= 3 ? '해설 다시 보기' : '단계별 힌트'}</button>
    ${draft.hint ? `<p class="v7darknotice">${E(['실제 만남을 확인할 수 있는 기록을 찾아봐.', '약속 일정과 실제 목격은 서로 다른 사실을 확인해 줘.', '행사 사진이나 정유림의 직접 목격 기록을 만남 부인 진술과 비교해.'][Math.min(draft.hint, 3) - 1])}</p>` : ''}
    <button class="v7btn light" data-act="b9-nav" data-to="b9board">추리보드로 돌아가기</button>`, true);
};

const V13previousHandle = B9handle;
B9handle = function (d) {
  // Prevent the old submit route from bypassing the new evidence interaction.
  if (d.act === 'b9-verify' && d.id === 'BP5' && !B9DONE('BP5')) {
    toast('진술에 근거를 제시해 추리를 확인해.');
    return;
  }
  if (!d.act?.startsWith('b9-v13-')) return V13previousHandle(d);
  if (state.screen !== 'b9puzzle' || state.bpuzzle !== 'BP5' || B9DONE('BP5')) return;
  const draft = state.v13Confrontation ||= {};
  if (d.act === 'b9-v13-claim') { draft.claim = 'meeting'; draft.feedback = ''; }
  else if (d.act === 'b9-v13-evidence') {
    if (!V13Evidence.candidates.includes(d.id) || !B9SEEN(d.id)) return;
    draft.evidence = d.id; draft.feedback = '';
  } else if (d.act === 'b9-v13-hint') draft.hint = Math.min((draft.hint || 0) + 1, 3);
  else if (d.act === 'b9-v13-submit') {
    const p = B9PUZZLES.find(p => p.id === 'BP5');
    const result = V13Evidence.assess(draft.claim, draft.evidence, state.bseen, B9DONE('BP4') && p.need.every(B9SEEN));
    if (result === 'supported') {
      // Use the existing completion path, including time, unlocks and autosave.
      state.banswers.BP5 = p.correct;
      draft.feedback = '';
      archive(draft.evidence);
      V13previousHandle({act:'b9-verify', id:'BP5'});
      return;
    }
    draft.feedback = {
      locked:'먼저 관련 기록과 앞선 추리를 확인해.',
      incomplete:'확인할 진술과 대조할 기록을 모두 선택해.',
      unseen:'직접 열람한 기록에서 근거를 선택해.',
      claim:'지금 확인하려는 진술을 다시 선택해.',
      plan:'이 기록은 약속을 보여 줘. 실제로 만났는지도 확인할 수 있을까?',
      sync:'자동 동기화 시각으로 사람의 위치나 실제 만남을 확인할 수는 없어.'
    }[result];
  }
  render();
};

const V13previousTitle = V10title;
V10title = function () { return V13previousTitle().replace('CHAPTER A + B · v12', 'CHAPTER A + B · v13'); };
render();
