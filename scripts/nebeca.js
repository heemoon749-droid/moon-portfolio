/* ============================================================
 * nebeca.js — 페이지 슬라이더 (썸네일 클릭 → 목업 이미지 교체)
 * ============================================================ */

(function initPageSlider() {
  'use strict';
  const pageImg = document.querySelector('.cmp-device-mockup__page');
  const thumbs = document.querySelectorAll('.cmp-page-slider__thumb');
  const prevBtn = document.querySelector('.cmp-page-slider__arrow--prev');
  const nextBtn = document.querySelector('.cmp-page-slider__arrow--next');
  if (!pageImg || thumbs.length === 0) return;

  let current = 0;
  var autoTimer;

  function goTo(index) {
    thumbs[current].classList.remove('is-active');
    current = (index + thumbs.length) % thumbs.length;
    thumbs[current].classList.add('is-active');
    pageImg.style.opacity = '0';
    setTimeout(function () {
      pageImg.src = thumbs[current].dataset.src;
      pageImg.style.opacity = '1';
    }, 200);
    var track = thumbs[current].parentElement;
    var thumbLeft = thumbs[current].offsetLeft - track.offsetLeft;
    track.scrollTo({ left: thumbLeft - track.clientWidth / 2 + thumbs[current].offsetWidth / 2, behavior: 'smooth' });
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(current + 1); }, 10000);
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () { goTo(i); resetAuto(); });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

  resetAuto();
})();
