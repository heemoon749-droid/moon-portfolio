/* ============================================================
 * reveal.js — 섹션 등장 애니메이션
 *
 * 사용법: 등장시킬 요소에 class="is-reveal" 부여.
 * IntersectionObserver 가 뷰포트 진입 시 .is-visible 토글.
 * prefers-reduced-motion 또는 IO 미지원 환경에서는 즉시 노출.
 * ============================================================ */
(function () {
  'use strict';

  const targets = document.querySelectorAll('.is-reveal');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  targets.forEach((el) => io.observe(el));
})();
