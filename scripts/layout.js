/* ============================================================
 * layout.js — 공통 Project Header + Floating Nav 주입
 *
 * Usage: <body> 에 data-* 속성으로 구성값 전달.
 *   data-layout="project"           → 헤더 + 플로팅 (내부 페이지)
 *   data-layout="cover"             → 플로팅만 (커버 페이지)
 *   data-page-sub="..."             → 헤더 상단 서브 라벨
 *   data-page-title="..."           → 헤더 타이틀
 *   data-prev-href="modube.html"    → 이전 링크 (없으면 history.back 버튼)
 *   data-prev-label="..."
 *   data-next-href="learning.html"  → 다음 링크 (없으면 버튼 생략)
 *   data-next-label="..."
 *
 * 반드시 DOM 파싱 후 실행. (<script defer> 또는 DOMContentLoaded 이후)
 * ============================================================ */
(function () {
  'use strict';

  // ---- 우클릭 컨텍스트 메뉴 차단 (복사·이미지 저장 억제) ----
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // ---- SVG 조각 (HTML 원본 그대로 보존) ----
  const ICONS = {
    arrowLeft:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    arrowRight:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    home:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z"/></svg>',
    profile:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
    /* 보류
      coffee:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h14v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5z"/><path d="M18 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c0 1 1 1 1 2s-1 1-1 2"/><path d="M12 3c0 1 1 1 1 2s-1 1-1 2"/></svg>',
    */
      arrowUp:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>'
  };

  // ---- Toast (준비중 알림 등 간단한 안내) ----
  let toastTimer = null;
  function showToast(message) {
    const existing = document.querySelector('.cmp-toast');
    if (existing) existing.remove();
    if (toastTimer) clearTimeout(toastTimer);

    const toast = document.createElement('div');
    toast.className = 'cmp-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);

    // 다음 프레임에 visible 클래스 부여 → 페이드 인
    requestAnimationFrame(() => toast.classList.add('is-visible'));

    // 2초 뒤 페이드 아웃 + 제거
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2000);
  }

  // ---- 유틸: 좌측 네비 (prev) ----
  function renderPrevNav(href, label) {
    if (href) {
      return (
        '<a class="cmp-project-header__nav" href="' + href + '" aria-label="' + (label || '이전') + '">' +
        ICONS.arrowLeft +
        '</a>'
      );
    }
    return (
      '<button class="cmp-project-header__nav" type="button" aria-label="뒤로가기" onclick="history.back()">' +
      ICONS.arrowLeft +
      '</button>'
    );
  }

  // ---- 유틸: 우측 네비 (next) ----
  function renderNextNav(href, label) {
    if (href) {
      return (
        '<a class="cmp-project-header__nav" href="' + href + '" aria-label="' + (label || '다음') + '">' +
        ICONS.arrowRight +
        '</a>'
      );
    }
    // next 없는 경우 시각 균형을 위해 빈 자리 유지 (display:flex space-between 보존)
    return '<span class="cmp-project-header__nav" aria-hidden="true" style="visibility:hidden"></span>';
  }

  // ---- Project Header 주입 ----
  function mountProjectHeader(cfg) {
    const sub = cfg.pageSub || '';
    const title = cfg.pageTitle || '';

    const html =
      '<header class="cmp-project-header" aria-label="프로젝트 네비게이션">' +
        '<div class="cmp-project-header__inner">' +
          '<div class="cmp-project-header__content">' +
            renderPrevNav(cfg.prevHref, cfg.prevLabel) +
            '<div class="cmp-project-header__label">' +
              '<span class="cmp-project-header__sub t-sub">' + sub + '</span>' +
              '<span class="cmp-project-header__title t-sub-bold">' + title + '</span>' +
            '</div>' +
            renderNextNav(cfg.nextHref, cfg.nextLabel) +
          '</div>' +
        '</div>' +
      '</header>';

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // ---- Section Rail 주입 (project 레이아웃 전용) ----
  function mountSectionRail() {
    const sections = Array.from(
      document.querySelectorAll('main > .cmp-portfolio > section, main > .cmp-portfolio > div[class*="cmp-project-hero"]')
    ).filter(el => el.tagName === 'SECTION');

    if (sections.length < 2) return;

    // 각 섹션에 id 자동 부여 (없는 경우만)
    sections.forEach((sec, i) => {
      if (!sec.id) sec.id = 'section-' + i;
    });

    const items = sections.map((sec, i) => {
      const label = i === 0 ? '개요' : (sec.getAttribute('aria-label') || ('0' + (i + 1)).slice(-2));
      return (
        '<button class="cmp-section-rail__item' + (i === 0 ? ' is-active' : '') + '" ' +
        'data-rail-target="' + sec.id + '" aria-label="' + label + '로 이동">' +
          '<span class="cmp-section-rail__dot" aria-hidden="true"></span>' +
          '<span class="cmp-section-rail__label t-sub-bold">' + label + '</span>' +
        '</button>'
      );
    }).join('');

    const rail =
      '<aside class="cmp-section-rail" aria-label="섹션 네비게이션">' +
        items +
      '</aside>';

    document.body.insertAdjacentHTML('beforeend', rail);

    // IntersectionObserver로 활성 섹션 감지
    const railItems = document.querySelectorAll('.cmp-section-rail__item');
    let labelTimer = null;

    const setActive = (id) => {
      railItems.forEach(btn => btn.classList.toggle('is-active', btn.dataset.railTarget === id));
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
        entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
      },
      { threshold: 0.3 }
    );

    sections.forEach(sec => observer.observe(sec));

    railItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.railTarget);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ---- Floating Nav 주입 ----
  function mountFloatingNav() {
    const html =
      '<nav class="cmp-floating-nav" aria-label="사이드 네비게이션">' +
        '<div class="cmp-floating-nav__group">' +
          '<button class="cmp-floating-nav__btn" type="button" aria-label="홈" onclick="location.href=\'index.html\'">' +
            ICONS.home +
          '</button>' +
          '<button class="cmp-floating-nav__btn" type="button" aria-label="소개" onclick="location.href=\'intro.html\'">' +
            ICONS.profile +
          '</button>' +
          /* 보류 — 커피챗 신청 버튼 (ICONS.coffee 주석과 함께 복구)
          '<button class="cmp-floating-nav__btn" type="button" aria-label="커피챗 신청">' +
            ICONS.coffee +
          '</button>' +
          */
        '</div>' +
        '<button class="cmp-floating-nav__top" type="button" aria-label="맨 위로" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">' +
          ICONS.arrowUp +
        '</button>' +
      '</nav>';

    // main 태그 뒤에 붙이거나, 없으면 body 끝
    const main = document.querySelector('main');
    if (main && main.parentNode) {
      main.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }

    // data-toast 속성 가진 버튼 → 클릭 시 토스트 출력
    document.querySelectorAll('.cmp-floating-nav [data-toast]').forEach((btn) => {
      btn.addEventListener('click', () => showToast(btn.getAttribute('data-toast')));
    });
  }

  // ---- Theme-aware 이미지 스왑 (data-src-dark 속성 사용) ----
  function syncThemedImages() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('[data-src-dark]').forEach((img) => {
      if (!img.dataset.srcLight) img.dataset.srcLight = img.getAttribute('src');
      const next = isDark ? img.getAttribute('data-src-dark') : img.dataset.srcLight;
      if (img.getAttribute('src') !== next) img.setAttribute('src', next);
    });
  }

  // ---- Theme toggle (data-theme-toggle 속성 버튼 → html[data-theme] 전환) ----
  function wireThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        syncThemedImages();
      });
    });
  }

  // ---- 엔트리 ----
  function init() {
    const body = document.body;
    const layout = body.getAttribute('data-layout') || 'project';

    if (layout === 'project') {
      mountProjectHeader({
        pageSub:   body.getAttribute('data-page-sub'),
        pageTitle: body.getAttribute('data-page-title'),
        prevHref:  body.getAttribute('data-prev-href'),
        prevLabel: body.getAttribute('data-prev-label'),
        nextHref:  body.getAttribute('data-next-href'),
        nextLabel: body.getAttribute('data-next-label')
      });
      mountSectionRail();
    }

    mountFloatingNav();
    wireThemeToggle();
    syncThemedImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
