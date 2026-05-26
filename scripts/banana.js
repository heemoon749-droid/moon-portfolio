/* ============================================================
 * banana.js — Free Banana 보너스 모달
 * 모달 오픈/클로즈, 50/50 보너스 추첨, 종이 폭죽(confetti) 캔버스
 * ============================================================ */

(function () {
  'use strict';

  const trigger = document.querySelector('[data-banana-trigger]');
  const modal   = document.querySelector('[data-banana-modal]');
  if (!trigger || !modal) return;

  const closers   = modal.querySelectorAll('[data-banana-close]');
  const bonusBtn  = modal.querySelector('[data-banana-bonus]');
  const resultBox = modal.querySelector('[data-banana-result]');
  const canvas    = modal.querySelector('.cmp-banana-modal__confetti');
  const ctx       = canvas ? canvas.getContext('2d') : null;

  let confettiPieces = [];
  let rafId = null;
  let lastTs = 0;

  /* ----------------------------------------------------------
   * Confetti (종이 폭죽)
   * ---------------------------------------------------------- */
  const COLORS = ['#ff8a5b', '#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#f8c8dc'];
  const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resizeCanvas = () => {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  const spawnBurst = (originX, originY, count) => {
    if (PRM) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      confettiPieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.4,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
        ttl: 1800 + Math.random() * 1200,
      });
    }
  };

  const step = (ts) => {
    if (!ctx) return;
    const dt = lastTs ? Math.min(ts - lastTs, 50) : 16;
    lastTs = ts;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const gravity = 0.18;
    const drag = 0.992;

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.life += dt;
      p.vy += gravity;
      p.vx *= drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      const alpha = Math.max(0, 1 - p.life / p.ttl);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      if (p.life >= p.ttl || p.y > canvas.clientHeight + 80) {
        confettiPieces.splice(i, 1);
      }
    }

    if (confettiPieces.length > 0) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
      lastTs = 0;
    }
  };

  const fireConfetti = () => {
    if (!ctx || PRM) return;
    resizeCanvas();
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    /* 좌·우·중앙에서 동시에 터지는 종이 폭죽 */
    spawnBurst(w * 0.2, h * 0.55, 60);
    spawnBurst(w * 0.8, h * 0.55, 60);
    spawnBurst(w * 0.5, h * 0.35, 40);
    if (!rafId) {
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    }
  };

  /* ----------------------------------------------------------
   * Modal open / close
   * ---------------------------------------------------------- */
  const resetResult = () => {
    if (!resultBox) return;
    resultBox.classList.remove('is-visible', 'is-win', 'is-lose');
    resultBox.innerHTML = '';
    if (bonusBtn) bonusBtn.disabled = false;
  };

  const openModal = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    resetResult();
    /* 다음 페인트에서 폭죽 트리거 (캔버스 크기 계산 위해) */
    requestAnimationFrame(() => fireConfetti());
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    confettiPieces = [];
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (ctx) ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    resetResult();
  };

  trigger.addEventListener('click', openModal);
  closers.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
  });

  /* ----------------------------------------------------------
   * 보너스 추첨 (50/50)
   * ---------------------------------------------------------- */
  if (bonusBtn && resultBox) {
    bonusBtn.addEventListener('click', () => {
      const win = Math.random() < 0.5;
      bonusBtn.disabled = true;

      resultBox.classList.remove('is-visible', 'is-win', 'is-lose');
      resultBox.classList.add(win ? 'is-win' : 'is-lose');

      if (win) {
        resultBox.innerHTML = `
          <span class="cmp-banana-modal__result-icon" aria-hidden="true">🍫</span>
          <span class="cmp-banana-modal__result-title">초콜릿 보너스 당첨!</span>
          <span class="cmp-banana-modal__result-desc">달콤한 행운이 찾아왔어요 🎉</span>
        `;
        /* 당첨 시 한 번 더 폭죽 */
        fireConfetti();
      } else {
        resultBox.innerHTML = `
          <span class="cmp-banana-modal__result-icon" aria-hidden="true">🍀</span>
          <span class="cmp-banana-modal__result-title">다음 기회에..</span>
          <span class="cmp-banana-modal__result-desc">좋은 하루 되세요 🙂</span>
        `;
      }

      /* 트랜지션 트리거 */
      requestAnimationFrame(() => resultBox.classList.add('is-visible'));
    });
  }

  /* ----------------------------------------------------------
   * Resize 대응
   * ---------------------------------------------------------- */
  window.addEventListener('resize', () => {
    if (!modal.hidden) resizeCanvas();
  });
})();
