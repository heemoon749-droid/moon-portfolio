/* ============================================================
 * modube.js — Visual 섹션 탭 토글
 * ============================================================ */

(function initVisualToggle() {
  'use strict';
  const toggles = document.querySelectorAll('.cmp-visual-toggle__btn');
  if (!toggles.length) return;

  const panels = document.querySelectorAll('.cmp-tab-panel');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      toggles.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach((p) => {
        p.classList.toggle('is-active', p.dataset.tab === tab);
      });
    });
  });
})();
