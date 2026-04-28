/* ============================================================
 * sub.js — 사이드 프로젝트 페이지 탭 컨트롤러
 *
 * .cmp-tabs-nav__btn 클릭 → data-tab 매칭되는 [data-tab-panel] 노출
 * 키보드 ←/→ 화살표로 탭 이동
 * is-reveal 요소는 패널 활성화 시 즉시 노출 (IO가 hidden 상태에서 트리거 못 함)
 * ============================================================ */
(function () {
  'use strict';

  const tabs   = document.querySelectorAll('.cmp-tabs-nav__btn');
  const panels = document.querySelectorAll('[data-tab-panel]');
  if (!tabs.length || !panels.length) return;

  function activate(targetTab) {
    const target = targetTab.getAttribute('data-tab');

    tabs.forEach((tab) => {
      const isActive = tab === targetTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute('data-tab-panel') === target;
      if (isActive) {
        panel.removeAttribute('hidden');
        // 패널이 보일 때 .is-reveal 즉시 노출
        panel.querySelectorAll('.is-reveal').forEach((el) => el.classList.add('is-visible'));
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
  });

  // 키보드 화살표 네비게이션
  tabs.forEach((tab, idx) => {
    tab.addEventListener('keydown', (e) => {
      let target;
      if (e.key === 'ArrowRight')      target = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft')  target = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home')       target = tabs[0];
      else if (e.key === 'End')        target = tabs[tabs.length - 1];
      if (target) {
        e.preventDefault();
        activate(target);
        target.focus();
      }
    });
  });
})();
