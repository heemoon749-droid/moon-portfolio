# Design Principle

> 포트폴리오 디자인/퍼블리싱의 단일 기준서.
> **Why**: `claude.md` (기획·브리프) · **What**: `design-roles.json` (토큰) · **How**: 이 문서.
> **Measured from**: Figma `modube-수정` (204:2524) + Cover(9:13) + modube.css 코드 실측
> 마지막 업데이트: 2026-04-21 (서브 프로젝트 압축 포맷 패턴 추가)

---

## 0. First Principles

1. **물의 잔잔함** — 고요 · 신뢰 · 정돈. 모든 디자인 결정은 이 감정을 해치지 않는다.
2. **셸(Shell) vs 콘텐츠(Mockup) 분리** — 포트폴리오 자체의 컨셉(물/뉴모피즘/코랄)과 프로젝트 내부 브랜드 컬러는 **절대 섞이지 않는다**. 프로젝트 브랜드는 목업 박스 안에서만 산다.
3. **토큰만 말한다** — HEX·px 하드코딩 금지. 모든 값은 `design-roles.json` 기반 CSS 변수로.
4. **Mobile-First** — 기본은 모바일. 이중 브레이크포인트: `1024px`(메이저 그리드 복원)·`768px`(보조 전환).
5. **시멘틱 BEM** — `frame-1`·`div-5` 금지. `cmp-` / `btn-` / `ico-` 프리픽스.

---

## 1. Brand Core (포트폴리오 셸)

### 1.1 무드 보드
| 속성 | 값 |
|---|---|
| 컨셉 | 물의 잔잔함과 유연함, 차분하고 깨끗함 |
| 감정 | 고요 · 신뢰 · 정돈 |
| 전체 너비 | `sz-1280` (1440px 아트보드 기준 중앙 1280 컨테이너) |
| 폰트 | Pretendard (KR/EN/Num 단일) |

### 1.2 Core Palette
| 역할 | 토큰 | 값 |
|---|---|---|
| 배경 (Primary BG) | `color.white` | `#f8f9fa` |
| 서피스 하이라이트 | `color.pureWhite` | `#ffffff` |
| 메인 텍스트 | `color.secondary700` | `#3d405b` |
| 보조 텍스트 | `color.secondary500` | `#787a8b` |
| 구분선 · 비활성 | `color.secondary200/300` | — |
| 강조 (Accent) | `color.primary500` | `#e07a5f` |
| 강조 Hover | `color.primary600` | `#ca6e56` |
| Accent 배경 | `color.primary100` | `#f8f2f0` |

> **Accent(코랄) 사용 금지 영역**: 본문 텍스트 · 배경 전면. 반드시 **포인트 1~2곳**만.

### 1.3 프로젝트 브랜드(목업 안에서만)
| 프로젝트 | 컬러 | 출처 |
|---|---|---|
| Modube | 코랄 `#e07a5f` | (셸 Accent 와 동일하므로 목업도 코랄 허용) |
| 내일배움카드 | Active Red `#ec4741` · Deep Navy `#082d4e` | `hue.red` 계열 사용 금지 — 별도 브랜드값 |
| 모두의러닝 | TBD | — |

⚠️ 내배카의 `#ec4741` 은 셸 밖(섹션 제목·CTA)에서 **절대 사용 금지**.

---

## 2. Typography

### 2.1 폰트
- **Pretendard 단일 체계** — KR / EN / Num 모두 동일 폰트 사용
- CSS 변수: `--font-base`
- 별도 영문 폰트 금지 (시각 리듬 일관성 유지)

### 2.2 클래스 전용 원칙
타이포는 **CSS 변수로 변환하지 않는다.** 지정된 클래스만 사용:

| 클래스 | 크기 | 무게 | 용도 |
|---|---|---|---|
| `.t-heading-m` | 24 | 600 | 섹션 제목 |
| `.t-body-m-bold` | 20 | 600 | 카드 제목 |
| `.t-body-s-bold` | 16 | 600 | 리스트 강조 |
| `.t-body-s` | 16 | 400 | 본문 기본 |
| `.t-sub-bold` | 14 | 600 | 라벨·pill |
| `.t-sub` | 14 | 400 | 캡션·보조 |
| `.t-caption` | 12 | 500 | 메타·주석 |

**금지**: 인라인 `font-size` / `font-weight` / `line-height` · 임의 텍스트 클래스 생성.

### 2.3 Eyebrow 규칙 (`t-eyebrow` — modube 코드 실측)
- 14px · weight 600 · line-height 1 · letter-spacing 0
- 색상: `color.primary500` (코랄) · **대/소문자 보존** (자동 `text-transform: uppercase` 없음)
- 섹션 타이틀 위 라벨로만 사용 (예: `Web Brand Foundation`, `Visual`, `Design System`, `Achievement`)
- 과거 스펙(UPPERCASE · letterSpacing 21.4% · opacity 0.8)은 **폐기**. 코드가 최신 SoT.

---

## 3. Spacing & Layout

> _실측 출처: Figma `modube-수정` (id: 204:2524) + Cover(id: 9:13). 2026-04-13 측정._

### 3.1 허용 토큰 (이외 수치 금지)
`spacing-04` `spacing-08` `spacing-12` `spacing-16` `spacing-24`
`spacing-40-mo(28)` `spacing-40(40)`
`spacing-80-mo(52)` `spacing-80(120)`

> `--spacing-40`과 `--spacing-80`은 tokens.css에서 모바일 미디어쿼리(< 768px) 시 자동으로 `-mo` 값으로 전환. 코드에서 `-mo` 토큰을 직접 사용하지 않는다.

### 3.2 위계 규칙 (modube.css 코드 기반)
| 레벨 | 토큰 | PC값 | 모바일값 | 사용처 |
|---|---|---|---|---|
| **Page** — 섹션 상·하 padding | `--spacing-80` | 120px | 52px | `.cmp-section`, `.cmp-section-visual` |
| **Section** — 그룹/프레임 margin | `--spacing-40` | 40px | 28px | `.cmp-tab-points`, `.cmp-project-hero__meta` gap |
| **Component** — 카드/그리드 gap | `--spacing-24` | 24px | — | `.cmp-foundation-grid` gap, `.cmp-surface` padding, `.cmp-tab-frame` gap |
| **Element** — 내부 간격 | `--spacing-16` | 16px | — | `.cmp-point-card` padding/gap, `.cmp-spacing-demo__col` padding |
| **Micro** — 텍스트·태그 gap | `--spacing-08` ~ `--spacing-12` | 8~12px | — | `.cmp-title-group` gap(8), `.cmp-section__header` gap(12) |
| **Atomic** — 최소 단위 | `--spacing-04` | 4px | — | 헤더 라벨 gap |

**사용 빈도 (Top 3)**: `--spacing-24` 29회 > `--spacing-40` 29회 > `--spacing-08` 32회

### 3.3 Grid System (코드 실측 6종)
| 이름 | CSS | 컬럼 | 비율 | 사용처 |
|---|---|---|---|---|
| **Hero 2-col** | `340px 1fr` | 2 | 고정:유동 | `.cmp-project-hero__top` |
| **Foundation 5-col** | `repeat(5, 1fr)` | 5 | 균등 | `.cmp-foundation-grid` (2+2+1 span) |
| **Equal 2-col** | `1fr 1fr` | 2 | 1:1 | `.cmp-tab-points__row`, `.cmp-btn-spec-grid`, `.cmp-ds-pair`, `.cmp-typo-pair` |
| **Ratio 2-col** | `1fr 2fr` | 2 | 1:2 | `.cmp-spacing-demo` |
| **Table 3-col** | `1fr 1fr 1fr` | 3 | 균등 | `.cmp-ds-table__head/row` |
| **Achievement 3-col** | `repeat(3, 1fr)` | 3 | 균등 | `.cmp-achievement__grid` |

**모바일 전환 규칙** (< 1024px):
- 모든 multi-column 그리드 → `1fr` (단일 컬럼)
- 예외: `.cmp-ds-table` → `1fr 1fr` (3열→2열, 3번째 숨김)

**Span 규칙**:
- `.cmp-surface--col2` → `grid-column: span 2` (5-col 그리드 내)
- `.cmp-surface--tall` → `grid-column: 1 / -1` (전체 폭)
- `.cmp-point-card--wide` → `grid-column: 1 / -1` (전체 폭)

### 3.4 Container 체계
```
Viewport (100%)
 └ Section (full width, padding-block: --spacing-80)
    └ Content container (max-width: sz-1280, margin-inline: auto)
       └ padding-inline: --spacing-40 (PC) / --spacing-16 (모바일)
          └ Content area ← 모든 그리드의 기준선
```

- **이중 브레이크포인트** (코드 실측):
  - `@media (max-width: 1023px)` — 메인 전환점. 모든 multi-column 그리드가 `1fr`로 붕괴, hero `340px 1fr` → 단일, point-card flex-column, 헤더 네비 48→40, `.cmp-project-header__content` padding → `--spacing-16`.
  - `@media (max-width: 767px)` — 보조. `.cmp-digital-rules` 세로 스택 + `tokens.css`에서 `--spacing-40/80` 이 `-mo(28/52)` 값으로 자동 스왑.
- `container` 클래스 **금지** → `.cmp-section > *` 또는 독립 max-width 선언
- `.cmp-section > *` — 직계 자식에 `max-width: --sz-1280` + `padding-inline: --spacing-40` 자동 적용
- full-width 배경이 필요한 섹션 → `.cmp-section-visual` (패딩/max-width 자체 관리, 토글·프레임이 full-bleed 일 때)

### 3.5 Drift 방지 체크리스트
Figma 실측에서 발견된 **off-grid 값은 아래처럼 정정**한다.

| Figma 실측 | 정정값 | 토큰 |
|---|---|---|
| 25 (카드 padding) | **24** | `spacing-24` |
| 11 (Hero img↔text gap) | **12** | `spacing-12` |
| 35, 39 (header gap) | **40** | `spacing-40` |
| 57.5 / 58.5 (table row) | **60** | 구조값 예외 |

HTML/CSS 구현 시 반드시 **정정값 사용**. Figma 의 반올림 오차를 그대로 옮기지 않는다.

---

## 4. Shape · Shadow · Surface

### 4.1 Border Radius — 곡률 위계 (modube 코드 실측)

포트폴리오의 곡률은 **5단계 위계**. 작은 요소일수록 덜 구부러지고, 큰 서피스일수록 더 부드럽게 흐른다 — 물의 표면장력을 모사.

| 단계 | 토큰 (tokens.css) | 값 | 대상 컴포넌트 |
|---|---|---|---|
| **Circular** | 50% | — | 불릿 도트(5px), 포인트 도트(12px) |
| **XS — Atomic** | `--radius-04` | 4px | 최소 단위 (사용처 없음, 보존) |
| **S — Micro** | `--radius-08` | 8px | `.cmp-tool`, `.cmp-swatch`, `.cmp-tag`, `.cmp-visual-toggle__btn`, `.cmp-tab-mockup__scroll`, `.cmp-point-card__thumb`, `.cmp-code-badge`, `.cmp-mono-stack img` |
| **M — Card** | `--radius-16` | 16px | `.cmp-surface`, `.cmp-project-hero__background`, `.cmp-point-card`, `.cmp-spacing-demo__col`, `.cmp-typo-pair__col`, `.cmp-card` |
| **L — Frame** | `--radius-24` | 24px | `.cmp-tab-frame` (대형 쇼케이스 프레임) |
| **XL — Surface** | `--radius-32` | 32px | 예비 (대형 카드 확장용) |
| **XXL — Nav** | `--radius-40` | 40px | `.cmp-project-header__nav` (48×48 원형), `.cmp-floating-nav__top` (82×82) |
| **Pill** | `--radius-pill` | 9999px | 완전 원형 배지/버튼(현재 사용처 없음 — `.cmp-tag`는 S 사용) |

> ⚠️ 과거 MD는 `.cmp-tag` 를 "Pill"로 분류했으나 **실제 main.css 는 `--radius-08`** 사용. Tag = S-Micro 카테고리로 확정.

### 4.2 곡률 관계 규칙 (Curvature Relationship)

1. **Nested Radius Rule** — 부모보다 자식의 곡률이 작거나 같아야 한다.
   - 실증: `.cmp-point-card`(16px) > `.cmp-point-card__thumb`(8px)
   - 실증: `.cmp-tab-frame`(24px) > `.cmp-tab-mockup__scroll`(8px)
   - 실증: `.cmp-surface`(16px) > `.cmp-mono-stack img`(8px)
2. **Surface Size → Radius 매핑 (코드 기준)**
   - 32px 이하 요소 → `radius-08` (`.cmp-tool` 32×32)
   - 64px~200px 요소 → `radius-08` (`.cmp-swatch` 64×64, `.cmp-point-card__thumb` 140×100)
   - 카드 단위 (200px+) → `radius-16` (`.cmp-surface`, `.cmp-point-card`)
   - 풀-width 프레임 → `radius-24` (`.cmp-tab-frame`)
3. **Pill 예외** — 완전 원형(`--radius-pill`)이 필요한 가로형 요소에만 허용. 현 구현체에는 없음. (`.cmp-tag`는 S-Micro로 분류됨)
4. **직각 금지** — 셸 안의 모든 요소는 최소 `radius-04` 이상.
5. **반응형 곡률** — 모바일에서도 radius 값 불변. 곡률은 해상도와 무관하게 고정.

### 4.2 Shadow — 뉴모피즘 3종 (CSS 변수명 기준)
| CSS 변수 | JSON 원본 키 | 언제 |
|---|---|---|
| `--shadow-blur` | `effect.blur-effect` | **기본 뉴모피즘**. 모든 카드·배지·플로팅 요소의 디폴트 |
| `--shadow-gray` | `effect.gray-shadow` | 일반 평면 카드(목업 내부, 뉴모피즘을 쓸 수 없을 때) · `.cmp-tag` 기본 |
| `--shadow-coral` | `effect.coral-shadow` | **Accent 강조 카드** (한 섹션에 최대 1개) · `.cmp-card:hover` |

> JSON 키와 CSS 변수가 다르다 — **코드에서는 항상 `--shadow-*` 로 참조**. `effect.*` 는 JSON SoT 표기일 뿐.

**금지**: 세 가지를 한 컴포넌트에 중첩. `box-shadow` 인라인 작성(hex·rgba 하드코딩 포함).

### 4.3 Gradient
- `gradiant-linear` — 카드 글라스모피즘 오버레이 (Hero 서피스)
- `gradiant-coral02/07` — 코랄 방사형 배경 강조
- `gradiant-gray` — 중립 배경 (목업 베이스)

---

## 5. Components

### 5.1 Button Hierarchy
| 위계 | 한 섹션당 | 배경 | 텍스트 |
|---|---|---|---|
| **Primary** | **1개만** | `primary500` → hover `primary600` | `pureWhite` |
| Secondary | n개 | `pureWhite` + `blur-effect` | `secondary700` |
| Tertiary | 보조 영역 | transparent | `secondary500` |

- 한 줄에 버튼 3개 이상 금지
- 동일 레벨 행동이 2개 이상이면 Primary 사용 금지 → 전부 Secondary
- Primary 와 위험 액션을 같은 시각 강도로 두지 않음

### 5.2 Card
- 기본: `radius-24` + `blur-effect` + `pureWhite` 배경
- 대형 섹션 카드: `radius-32~40` (예외 허용) + `blur-effect`
- 코랄 강조: 위 + `coral-shadow`

### 5.3 Tag / Badge (`.cmp-tag` — main.css 실측)
- 형태: height 29px · `padding-inline: --spacing-12` · `--radius-08` · `--shadow-gray` · `--color-pure-white` 배경
- 텍스트: `.t-sub-bold` · `color.secondary600` → hover `color.primary500`
- **Pill 아님** — 과거 MD의 `radius-9999` 규칙은 폐기. 모든 현행 태그/배지는 S-Micro(`--radius-08`)를 사용.
- 오렌지 pill (Hero 내 커스텀): 배경 `rgba(224,122,95,0.08)` + inset shadow + `.t-sub-bold` · 컬러 `primary500` — 이 한 건만 예외로 허용.

### 5.4 Floating Nav — 2-파트 구조 (`main.css` 실측)
우측 중앙 고정. `right: --spacing-40` · `top: 50%` · 세로 스택.

**Part A — 그룹 (3 버튼)**
- 컨테이너: `radius: 12px` · `--grad-linear` 배경 + `backdrop-filter: blur(16px)` + 인셋 하이라이트 + 12/32 드롭섀도우
- 각 버튼: 56×56 · `radius: 28px`(반원) · hover 시 `--grad-coral07` 방사형 확산 + 아이콘 white 전환

**Part B — 독립 Top 버튼 (그룹 바깥, 그룹과 `--spacing-24` 간격)**
- 82×82 · `--radius-40` · 글라스 배경 · hover 시 `transform: translateY(-2px)` + primary500 컬러

**반응형**: `@media (max-width: 1279px)` 에서 전체 숨김(display: none). PC 전용.

### 5.5 Project Header — 고정 글라스 바 (`modube.css`)
- `position: fixed` · 투명 배경 `rgba(248,249,250,0.6)` + `backdrop-filter: blur(5px)` + 하단 hairline
- 좌우 네비: 48×48 원형 · `--radius-40` · 인셋 2중 하이라이트(상단/하단 방향성)
- 중앙 라벨: `.t-sub` (opacity 0.5) + `.t-sub-bold` — 프로젝트 타이틀용
- 모바일(≤1023): 네비 40×40, 라벨 세로 스택

### 5.6 Compressed Project Format (서브 프로젝트 전용)
풀 케이스(Modube/Nebeca/Learning)가 **Hero → Background → Foundation → Visual → Design System → Achievement** 6~7 섹션이라면, **서브 프로젝트는 4 섹션으로 압축**한다.

**압축 포맷 필수 섹션**
1. **Hero** (`.cmp-project-hero`) — 타이틀·태그·역할·배경 블록 (풀 케이스와 동일 컴포넌트 재사용)
2. **Logic / Strategy** (예: `.cmp-logic-grid` 3-col 카드) — 해결 로직을 3축으로 요약
3. **Visual Proof** (예: `.cmp-ab-grid` 3-col, `.cmp-ga-grid` 4-col) — 결과물·스크린샷·다이어그램
4. **Achievement** (`.cmp-achievement--flat`) — 성과 3-card

**Foundation · Visual · Design System 섹션은 생략**. 페이지 평균 길이는 풀 케이스의 약 60%.

이 패턴은 소규모 검증·실험·퍼포먼스 프로젝트에 적합. HTML/CSS는 페이지 전용 stylesheet(`sub.css` 등) 로 로컬 분리, 글로벌 토큰만 사용.

### 5.7 Visual Toggle (Segmented)
- 290px 폭 2-버튼 세그먼트 · 좌/우 `--radius-08` · border `color.secondary300`
- is-active: `primary500` 배경 + `pure-white` 텍스트
- hover(비활성): `primary100` 배경 + `primary500` 테두리·텍스트

---

## 6. Information Density

### B2C (사용자 화면)
- 한 섹션 = **메시지 1개**
- 정보 블록 5개 초과 시 분리
- 핵심 행동은 한 화면에 최대 3개
- 제목 → 설명 → 행동 순서 유지

### B2B (관리자 화면 · 목업 안에서만 해당)
- 고밀도 허용 · 테이블 우선 · 다중 행동 허용
- 단, 버튼 위계는 반드시 유지

---

## 7. Motion · Interaction

### 7.1 Motion 토큰 (tokens.css 실측)
| 토큰 | 값 | 의미 |
|---|---|---|
| `--ease-water` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | 물의 표면 복원 곡선 — 초기 추진 후 부드럽게 감속 |
| `--dur-hover` | `700ms` | 기본 hover 전환 지속. 잔잔함 유지 목적의 "긴" 이징 |

- 모든 hover 전환은 `transition: <prop> var(--dur-hover) var(--ease-water)` 형태로만 작성.
- 아이콘 버튼의 `transform` 은 `500ms var(--ease-water)` 로 별도 단축 허용 (반응성 확보).

### 7.2 인터랙션 원칙
- **호버**: 컬러가 물처럼 퍼지거나 입체감이 미세하게 찰랑거림 (translateY 최대 2px)
- **커서**: 전역 Canvas 물 파동 (wave equation · 감쇠율 0.985, `scripts/water-ripple.js`)
- 버튼 hover: `primary500 → primary600` · translateY 금지, 카드·헤더 네비에서만 허용
- 카드 hover (`.cmp-card`): `--shadow-blur` → `--shadow-coral` 전환 + `grad-coral07` 방사형 확산 + `grad-linear` 글라스 오버레이 동시 페이드인
- **금지**: 바운스 · 회전 · 오버슈트 이징 · 튀는 이펙트 · 200ms 이하의 짧은 hover 이징(잔잔함 훼손)

---

## 8. Code Output Rules

- Pure **HTML5 · Vanilla CSS · Vanilla JS**. NO React, NO JSX.
- 외부 CSS 파일 구조. 인라인 스타일 금지(구조값 예외)
- 모든 색·간격·보더·반지름·그림자·사이징은 JSON → CSS 변수
- **변수명 규칙**:
  - 키 경로는 `-` 로 연결: `color.secondary700` → `--color-secondary700`
  - **camelCase 키는 kebab-case로 분해**: `color.pureWhite` → `--color-pure-white` (대문자 앞에 `-` 삽입)
  - 기존 `-` 는 유지: `spacing-40-mo` → `--spacing-40-mo`
  - JSON 의 `effect.*` · `gradient.*` 는 역할 기반으로 리네임: `effect.blur-effect` → `--shadow-blur`, `gradient.gradiant-coral07` → `--grad-coral07`
- 단위 없는 숫자는 CSS 변환 시 자동 `px` (예외: `%`, `auto`, `none`, `inherit`, `0`)

### Class Naming (BEM 변형)
- Block: `cmp-hero`, `cmp-card`, `nav-pc`, `course-card`
- Element: `cmp-hero__title`, `card__body`
- Modifier: `cmp-hero--compact`, `btn--primary`
- Prefix: `cmp-` 큰 컴포넌트 · `btn-` 버튼 · `ico-` 아이콘

### Asset
- **절대 경로**만 사용
- 이미지 `img_` · 아이콘 `ico-` · 요소 `el_`

---

## 9. Accessibility

- 모든 버튼에 `aria-label`
- 장식 요소는 `aria-hidden="true"`
- 링크는 `title` 속성으로 명확 설명
- 외부 링크 `target="_blank"` → `rel="noopener noreferrer"` 필수
- 메인 텍스트(`secondary700`) × 배경(`white`) 대비비 ≥ 4.5:1 유지

---

## 10. Critical DO-NOTs (한눈에)

1. ❌ HEX / px 하드코딩
2. ❌ 포트폴리오 셸에 프로젝트 브랜드 컬러 침투
3. ❌ 한 섹션에 Primary 버튼 2개 이상
4. ❌ Typography 클래스 없이 폰트 지정
5. ❌ 상대 경로 에셋
6. ❌ 뉴모피즘 · 코랄 · 그레이 섀도우 중첩
7. ❌ 바운스/회전 모션
8. ❌ `container` 클래스 · `frame-1` 같은 비의미 네이밍
9. ❌ `target="_blank"` 에 `rel` 누락
10. ❌ 한 섹션에 메시지 주제 2개 이상
11. ❌ Figma 실측값의 반올림 오차를 그대로 코드에 이식 (25→24, 11→12, 35/39→40)
12. ❌ Nested Radius Rule 위반 (부모보다 큰 자식 곡률)
13. ❌ 3.3 의 6가지 Grid System 외 임의 컬럼 분할
14. ❌ CSS 예외 처리 (calc 보정, 인접 셀렉터로 gap 상쇄 등) — 별도 클래스로 명시
15. ❌ `--spacing-40-mo` / `--spacing-80-mo` 직접 사용 — 기본 토큰만 사용하면 미디어쿼리에서 자동 전환

---

> 이 문서가 `claude.md` 의 기획과 충돌하면 `claude.md` 가 우선한다.
> 이 문서가 `design-roles.json` 의 값과 충돌하면 JSON 이 우선한다.
> 이 문서는 **규칙의 해석**을 담당한다.
