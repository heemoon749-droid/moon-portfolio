/* ============================================================
 * main.js — index.html 전용
 * Gallery 스크롤 progress / 화살표 / Section rail 인디케이터
 * ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
   * Gallery
   * ---------------------------------------------------------- */
  const track = document.getElementById('gallery-track');
  const fill = document.querySelector('.cmp-gallery__progress-fill');
  const prevBtn = document.querySelector('[data-gallery-prev]');
  const nextBtn = document.querySelector('[data-gallery-next]');

  if (track && fill) {
    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 0;
      fill.style.transform = `scaleX(${ratio})`;
    };

    track.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* 카드 인덱스 기반 이동 */
    const cards = Array.from(track.querySelectorAll('.cmp-gallery__card'));
    let currentIndex = 0;

    const scrollToCard = (dir) => {
      currentIndex = (currentIndex + dir + cards.length) % cards.length;
      const target = cards[currentIndex];
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { resetAuto(); scrollToCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { resetAuto(); scrollToCard(1); });

    /* 3초 자동 슬라이드 */
    let autoTimer = setInterval(() => scrollToCard(1), 3000);

    const resetAuto = () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => scrollToCard(1), 3000);
    };

    /* 마우스가 트랙 위에 있을 때 일시 정지 */
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => scrollToCard(1), 3000);
    });
  }

  /* ----------------------------------------------------------
   * Section Rail — IntersectionObserver로 활성 섹션 감지
   * ---------------------------------------------------------- */
  const railItems = document.querySelectorAll('.cmp-section-rail__item');
  if (railItems.length === 0) return;

  const sectionIds = Array.from(railItems).map(btn => btn.dataset.railTarget);
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let labelTimer = null;

  const setActive = (id) => {
    railItems.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.railTarget === id);
    });

    /* 활성 아이템 라벨을 2초간 표시 후 숨김 */
    clearTimeout(labelTimer);
    railItems.forEach(btn => btn.classList.remove('is-label-visible'));
    const activeBtn = Array.from(railItems).find(btn => btn.dataset.railTarget === id);
    if (activeBtn) {
      activeBtn.classList.add('is-label-visible');
      labelTimer = setTimeout(() => activeBtn.classList.remove('is-label-visible'), 2000);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(el => observer.observe(el));

  railItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.railTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
