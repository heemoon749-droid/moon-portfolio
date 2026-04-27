/* ============================================================
 * water-ripple.js — Hero 내부 물 파동 Canvas
 *
 *   [heroSim]   .cmp-hero__canvas    → Hero 내부에만 존재
 *                                       · 주기 자동 펄스
 *                                       · 이미지 solid 마스크(반사)
 * ============================================================ */

(function initWaterRipple() {
  'use strict';

  // ------- Shared Config -------
  const SCALE   = 4;
  const DAMPING_DEFAULT = 0.988;

  // ------- Theme-aware 파동 컬러 -------
  // light : 기본 화이트 하이라이트 + 페일 블루 트로프
  // dark  : 베이스 #22232e (다크 surface) hue 유지, 크레스트는 라이트,
  //         트로프는 살짝 더 어둡게 — 네이비 톤의 잔잔한 수면.
  const PALETTES = {
    light: { crest: [255, 255, 255], trough: [180, 195, 220] },
    dark:  { crest: [136, 147, 198], trough: [ 18,  20,  40] }
  };
  let palette = PALETTES.light;
  function syncPalette() {
    const mode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    palette = PALETTES[mode];
  }
  syncPalette();
  new MutationObserver(syncPalette).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /**
   * 단일 파동 시뮬레이션 생성기.
   * @param {HTMLCanvasElement} canvas
   * @param {object} opts
   *   - getSize()    : () => {w, h}       — 논리 CSS 크기
   *   - buildMask?   : (ctxSolid) => void — solid 마스크 갱신
   *   - alphaMax     : 픽셀 최대 알파
   */
  function createSim(canvas, opts) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let W = 0, H = 0, gw = 0, gh = 0;
    let cur, prev, solid;
    let off, offCtx, imageData;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { w, h } = opts.getSize();
      W = Math.max(1, Math.floor(w));
      H = Math.max(1, Math.floor(h));
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gw = Math.max(8, Math.ceil(W / SCALE));
      gh = Math.max(8, Math.ceil(H / SCALE));
      cur   = new Float32Array(gw * gh);
      prev  = new Float32Array(gw * gh);
      solid = new Uint8Array(gw * gh);

      off = document.createElement('canvas');
      off.width  = gw;
      off.height = gh;
      offCtx = off.getContext('2d', { alpha: true });
      imageData = offCtx.createImageData(gw, gh);

      if (opts.buildMask) opts.buildMask({ solid, gw, gh, SCALE });
    }

    function rebuildMask() {
      if (!solid) return;
      solid.fill(0);
      if (opts.buildMask) opts.buildMask({ solid, gw, gh, SCALE });
    }

    function drop(cssX, cssY, strength, radius) {
      const gx = Math.floor(cssX / SCALE);
      const gy = Math.floor(cssY / SCALE);
      const r  = radius || 3;
      const r2 = r * r;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = gx + dx;
          const ny = gy + dy;
          if (nx < 1 || nx >= gw - 1 || ny < 1 || ny >= gh - 1) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;
          const i = ny * gw + nx;
          if (solid[i]) continue;
          const falloff = 1 - d2 / r2;
          prev[i] -= strength * falloff;
        }
      }
    }

    const damping = opts.damping ?? DAMPING_DEFAULT;
    function step() {
      const g = gw;
      for (let y = 1; y < gh - 1; y++) {
        const row = y * g;
        for (let x = 1; x < g - 1; x++) {
          const i = row + x;
          if (solid[i]) { cur[i] = 0; continue; }
          const v = (prev[i - 1] + prev[i + 1] + prev[i - g] + prev[i + g]) * 0.5 - cur[i];
          cur[i] = v * damping;
        }
      }
      const tmp = prev;
      prev = cur;
      cur  = tmp;
    }

    function render() {
      const data = imageData.data;
      const alphaMax = opts.alphaMax ?? 65;
      for (let y = 0; y < gh; y++) {
        const row = y * gw;
        for (let x = 0; x < gw; x++) {
          const i = row + x;
          if (solid[i]) {
            const idx = i * 4;
            data[idx] = data[idx+1] = data[idx+2] = data[idx+3] = 0;
            continue;
          }
          const left  = x > 0      ? prev[i - 1]  : prev[i];
          const right = x < gw - 1 ? prev[i + 1]  : prev[i];
          const up    = y > 0      ? prev[i - gw] : prev[i];
          const down  = y < gh - 1 ? prev[i + gw] : prev[i];
          const sx = right - left;
          const sy = down - up;
          const slope = Math.sqrt(sx * sx + sy * sy);
          const mag = Math.min(1, slope * 2.0);
          const idx = i * 4;
          const rgb = prev[i] > 0 ? palette.crest : palette.trough;
          data[idx]     = rgb[0];
          data[idx + 1] = rgb[1];
          data[idx + 2] = rgb[2];
          data[idx + 3] = Math.floor(mag * alphaMax);
        }
      }
      offCtx.putImageData(imageData, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(off, 0, 0, W, H);
    }

    return {
      resize, rebuildMask, drop, step, render,
      get W() { return W; },
      get H() { return H; },
      get gw() { return gw; },
      get gh() { return gh; },
      get solid() { return solid; }
    };
  }

  // ============================================================
  // heroSim — Hero 내부 캔버스
  // ============================================================
  const heroCanvas = document.querySelector('.cmp-hero__canvas');
  const hero       = document.querySelector('.cmp-hero');
  const image      = document.querySelector('.cmp-hero__image');

  const heroSim = heroCanvas && hero ? createSim(heroCanvas, {
    getSize() {
      const r = hero.getBoundingClientRect();
      return { w: r.width, h: r.height };
    },
    buildMask({ solid, gw, gh, SCALE }) {
      if (!image) return;
      const heroRect = hero.getBoundingClientRect();
      const imgRect  = image.getBoundingClientRect();
      const cx = (imgRect.left + imgRect.width  / 2 - heroRect.left) / SCALE;
      const cy = (imgRect.top  + imgRect.height / 2 - heroRect.top ) / SCALE;
      const radius = (Math.min(imgRect.width, imgRect.height) / 2 - 12) / SCALE;
      const r2 = radius * radius;
      const xStart = Math.max(0, Math.floor(cx - radius - 1));
      const xEnd   = Math.min(gw, Math.ceil (cx + radius + 1));
      const yStart = Math.max(0, Math.floor(cy - radius - 1));
      const yEnd   = Math.min(gh, Math.ceil (cy + radius + 1));
      for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= r2) solid[y * gw + x] = 1;
        }
      }
    },
    alphaMax: 52
  }) : null;

  // 주기 자동 펄스 — 히어로 영역 안 랜덤
  const HERO_INTERVAL = 2400;
  const HERO_DROP     = 14;
  function randomHeroPoint() {
    if (!heroSim) return null;
    const W = heroSim.W, H = heroSim.H;
    for (let tries = 0; tries < 20; tries++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const gx = Math.floor(x / SCALE);
      const gy = Math.floor(y / SCALE);
      if (!heroSim.solid[gy * heroSim.gw + gx]) return { x, y };
    }
    return null;
  }

  // ============================================================
  // Boot
  // ============================================================
  if (heroSim) heroSim.resize();

  let pulseTimer = 0;
  let last = performance.now();
  function loop(now) {
    const dt = now - last;
    last = now;

    if (heroSim) {
      pulseTimer += dt;
      if (pulseTimer >= HERO_INTERVAL) {
        pulseTimer = 0;
        const p = randomHeroPoint();
        if (p) heroSim.drop(p.x, p.y, HERO_DROP, 3);
      }
      heroSim.step();
      heroSim.render();
    }
    requestAnimationFrame(loop);
  }

  // Events
  window.addEventListener('resize', () => {
    if (heroSim) heroSim.resize();
  });
  window.addEventListener('scroll', () => {
    if (heroSim) heroSim.rebuildMask();
  }, { passive: true });

  if (image) {
    image.addEventListener('load', () => heroSim && heroSim.rebuildMask());
  }

  setTimeout(() => {
    const p = randomHeroPoint();
    if (p && heroSim) heroSim.drop(p.x, p.y, HERO_DROP, 3);
  }, 500);

  requestAnimationFrame(loop);
})();
