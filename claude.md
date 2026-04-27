# 포트폴리오 마스터 브리프 — Claude 학습용

> 새 대화 시작 시 이 파일을 업로드하면 이전 맥락을 이어받을 수 있습니다.
> 마지막 업데이트: 2026-04-13

---

## 1. 프로젝트 개요

| 항목        | 내용                                            |
| ----------- | ----------------------------------------------- |
| 목표        | UX/UI 포트폴리오 웹사이트 완성                  |
| 디자이너    | 무늬 문                                         |
| 포지션      | AI를 더해 경험과 논리의 결을 만드는 디자이너    |
| 최종 결과물 | GitHub Pages 웹사이트 (Canvas API 물 파동 효과) |
| Figma 파일  | 최종 (RAuDNfSHTtyms2Tdlwp1mI)                   |

### 완성 현황

| 페이지                     | 상태      |
| -------------------------- | --------- |
| 목차 (Cover/Index)         | ✅ 완성   |
| Project 1: Modube Solution | ✅ 완성   |
| Project 2: 내일배움카드    | 🔄 진행중 |
| Project 3: 모두의러닝      | ⬜ 미시작 |

---

## 2. 포트폴리오 전체 컨셉 (절대 유지)

> **물의 잔잔함과 유연함, 차분하고 깨끗함**

- 감정: 고요함, 신뢰, 정돈됨
- 배경색: `#F8F9FA`
- 메인 텍스트: `#3D405B`
- 폰트: Pretendard (단일 폰트 — KR/EN/Num 모두 사용)
- 전체 너비: 1440px

- 마우스 호버 시: 컬러가 물처럼 퍼지거나, 입체감이 미세하게 찰랑거리는 효과

### 뉴모피즘 그림자 (공통)

```
box-shadow:
  -4px -4px 12px 0px rgba(255,255,255,1),
  4px 4px 12px 0px rgba(61,64,91,0.03),
  inset 1px 1px 2px 1px rgba(255,255,255,0.8)
```

⚠️ 포트폴리오 컨셉(물/차분함)은 프로젝트 브랜드 컬러와 혼합 금지.
프로젝트 내용은 목업 안에서만 브랜드 컬러 사용.

---

## 3. Modube 페이지 구조 (디자인 레퍼런스)

### 실제 확인된 섹션 구조

```
Hero (716px 고정)
  └── page nav: 가운데 정렬
  └── 타이틀
  └── 서브텍스트: 중앙
  └── 오렌지 pill: rgba(224,122,95,0.08) 배경, inset shadow
  └── 태그 배지: 뉴모피즘, border-radius 12px
  └── Floating Nav: 우측 절대좌표 (x:1310, y:297), 아이콘 4개 세로

S1. Problem (전체 너비 뉴모피즘 카드)
S2. Visual (2컬럼 대형 카드 — 각각 UI 목업 포함)
S3. Design System (중앙 정렬, 오렌지 pill 레이블 + Atomic Elements + Design Tokens)
S4. Up Next (중앙 뉴모피즘 카드)
```

### 핵심 스타일 수치

| 항목               | 값                                                                |
| ------------------ | ----------------------------------------------------------------- |
| 섹션 높이          | 716px (고정)                                                      |
| 좌우 패딩          | 64px                                                              |
| 카드 border-radius | 32~40px (대형), 16px (소형)                                       |
| Eyebrow            | Pretendard SemiBold 14px, letterSpacing 21.4%, UPPER, opacity 0.8 |
| Hero Title         | Pretendard Bold 56px, letterSpacing -2.7%                         |
| 카드 그림자        | NEU_SM / NEU_LG 구분 사용                                         |

---

## 4. 공통 프로젝트 흐름 (모든 페이지 동일)

```
① 문제 / 배경
② 기초자산 설계
③ 전략
④ 비주얼
⑤ 디자인 시스템 / AI 이식
⑥ 성과
⑦ Up Next
```

---

## 5. Project 2: 내일배움카드

### 기본 정보

| 항목           | 내용                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| 프로젝트 유형  | 신규 사이트 구축 (B2C)                                                                                  |
| 사이트 URL     | https://ekcls-card.ekcls.kr/                                                                            |
| Figma 참고파일 | 내배카 (eMfYUUzFHLnsXOcrS7wqwx)                                                                         |
| 역할           | BI Design / UX Planning / UI Design / AI Workflow Design / Publishing assist (AI 30%) / B2C 교육 플랫폼 |

### 내용

## **[내일배움카드 프로젝트: AI 워크플로우를 통한 공정 혁신 및 UX 최적화]**

### **1. 프로젝트 배경 및 기회: 시스템 도약을 위한 시점**

- **Context:** 기존 4070 시니어 중심 플랫폼을 2040 직장인 타겟으로 확장하며, 브랜드 이미지뿐만 아니라 **제작 공정 자체의 고도화**가 필요한 시점이었음.
- **Opportunity:** 국가 기관 연동이라는 복잡한 결제 로직을 해결하기 위해, 단순한 UI 수정을 넘어 **'설계의 표준화'**를 통한 비즈니스 성장을 목표로 함.

### **2. Visual Strategy: 타겟 확장을 위한 감각적 스케일링**

- **Active Mood 리빌딩:** 기존의 권위형 무드에서 벗어나 실제 사용자가 마주하는 UI는 **'자기계발의 즐거움'**을 극대화하기 위해 부드러운 라운드와 쾌활한 무드를 채택했습니다. 이는 딱딱한 국비 지원 제도를 친근한 생활 밀착형 서비스로 인지시키기 위한 UX 전략.
- **Strategic Contrast:** 로고의 전통성은 계승하되, 인터페이스는 곡선과 유연한 톤을 사용하여 **'학습에 대한 심리적 허들'을 낮추는 직관적 비주얼** 구축.

### **3. AI Workflow Strategy: 퍼블리싱 패러다임의 전환 (The Innovation)**

- **전략: 더 나은 생산성을 위한 [Design-to-Code] 자동화 파이프라인 개척**
  - **Data-Driven Design:** Figma Variables를 활용한 **디자인 토큰화**와 이를 AI가 해석할 수 있는 **JSON/MD 규격**으로 직접 설계.
- **인사이트:** "단순히 코드를 짜는 시간을 줄이는 것이 아니라, **디자인과 코드가 완벽하게 동기화되는 지속 가능한 아키텍처**를 구축하여 제작시간을 단축함."

### **4. UX Solution: 로직의 수식화를 통한 과업 완결성 확보**

- **Challenge:** 자사 사이트와 고용24를 오가는 불연속적인 결제 프로세스.
- **Solution: [조건문 기반의 로직 트리]를 통한 UX 시각화**
  _ 복잡한 이동 동선을 AI가 이해할 수 있는 **Pseudo-code(의사코드)** 형태로 먼저 정리하고, 이를 기반으로 **진행 상태 동기화 UI** 설계.
  _ 사용자가 외부 기관을 오가며 느끼는 불안함을 **'실시간 상태 배지'**와 **'단계별 가이드'**로 해소하여 결제 완료 성공률 향상.
  결제 동선 : 1,자사사이트에서 수강신청-2.고용24에서 수강등록-3.고용24에서 넘어온 수강등록내용과 수강신청내용 대조-4.자사사이트에서 결제(대조확인되면 카트에 내배카수강강의가 결제가능으로 바뀜)-5.수강

### **5. Achievement & Insight: 기술로 증명한 설계자의 가치**

- **30%:** AI 워크플로우 도입으로 퍼블리싱 리드타임을 30% 단축.
- **규격:** **'코딩 가능한 디자인 규격'**을 수립하여, 디자인/퍼블리싱 제작공수 감소.
- **2040:** 액티브한 리브랜딩과 로직 최적화를 통해 2040 신규 타겟의 유입 및 안정적 정착 기여.

---

## 6. Project 3: 모두의러닝

프로젝트 배경: 보이지 않는 메뉴가 만든 운영의 한계
Context: 시니어 사용자가 주를 이루는 환경에서, 뎁스(Depth) 속에 숨겨진 SNB(LNB) 구조는 심각한 인지 장벽을 유발.
Problem: "수강 중인 강의를 어디서 보나요?", "자료는 어디 있나요?"와 같은 단순 위치 문의가 CS 전화량의 60% 이상을 차지.
Goal: 정보 구조의 수평화(Flattening)와 퀵 액션 배치를 통한 학습 동선 최적화.

2. Information Architecture: 강의 항목을 숨겨진 SNB에서 '노출형 리스트'로
   Navigation Surgery (GNB/SNB 개선):
   기존: 페이지에 들어갔을때만 보이던 SNB 강의 구조 ⇢ 따로 교육컨텐츠 gnb를 빼서 노출형 리스트 UI로 변경하여 한눈에 메뉴 탐색 가능하게 변경.직관적으로 내가 원하는 정보의 강의를 찾게 만듬.
   Quick-Access Strategy: cs의 대부분을 차지했던 자사 서비스 연결 및 내강의실 퀵 버튼을 상단 GNB 영역으로 전진 배치.
3. CS Filtering System: 심리적 동선을 고려한 문의 해결 깔때기
   플로팅 배너의 역할 전환: 단순 상담 연결이 아닌, **'문제 해결 솔루션 가이드'**로 정의.
   사용자의 시선 흐름을 고려하여 플로팅 버튼의 위치를 조정하여 학습장애해결,원격지원,1:1문의 게시판, 카카오톡 상담,전화문의로 배치. 학습장애해결버튼을 누르면 자주 겪는 장애 해결 버튼 나열 섹션으로 이끌어 직접적인 해결을 먼저 시도하게함.
   Footer Safety-Net (푸터의 재발견):
   가장 하단에 **[학습장애 해결 바로가기]**라는 아코디언 섹션 배치(플로팅 학습장애해결과 연결되어 플로팅을 누르면 섹션이 열리게 설정하여 평소의 UI를 해치지 않으면서 문제를 직접적으로 해결할 수 있게 도움)
   Direct Routing: 버튼 클릭 시 해당 문제를 즉시 해결할 수 있는 전용 페이지나 설정창으로 다이렉트 연결.
   💡 포트폴리오 슬라이드 구성을 위한 '설계자의 인사이트'
   "사용자가 길을 잃지 않도록 정보의 층위(Layer)를 없애 시니어 사용자가 '내가 필요한 정보가 어디에 있는지'를 명확하게 인지하도록 도움. **숨겨진 메뉴를 밖으로 꺼내는 [정보 노출 전략]**사용. 이를 통해 운영의 상담 업무를 줄이는 시스템적 UX를 완성.

Before/After Navigation (중요):
기존의 숨겨진 SNB(점선/희미하게)와 리뉴얼된 교육컨텐츠 드롭다운을 나란히 비교. **"3 Depth ⇢ 1 Depth"**이라는 수치를 강조하세요.
CS Funnel 도식:
[GNB 퀵 버튼] ⇢ [플로팅 솔루션 가이드] ⇢ [푸터 자가 해결 센터] ⇢ [전화 문의] 순으로 시선이 흐르며 필터링되는 과정을 보여주세요.

## 7. project : 서브프로젝트

7-1 : 가설 기반의 랜딩페이지 검증 체계 설계
배경: 고관여 제품인 의료기기의 특성상, 단순 노출보다 **'사용자의 증상 페인포인트'**와 **'제품의 솔루션'**이 얼마나 밀착되느냐가 전환의 핵심임.
문제 제기: 모든 유입 고객에게 동일한 페이지를 보여주는 방식은 타겟별 구매 동기를 자극하지 못해 효율이 낮음.
해결 로직 (The Core):
Contextual Landing (맥락적 랜딩): 유입 경로(검색어, 광고 소재 등)에서 파악된 사용자의 '증상 파라미터'를 분석.
Dynamic Sectioning: 파라미터값에 따라 Unbounce의 섹션을 동적으로 스위칭하여, 해당 증상에 가장 공감되는 메시지를 우선 노출하도록 설계.
Event Tracking: 단순히 '페이지 뷰'가 아니라, 특정 CTA 클릭과 스크롤 깊이를 GA4 이벤트와 연동하여 디자인의 유효성을 측정할 수 있는 기술적 환경 구축.
인사이드 : 섹션 위계와 CTA 배치가 사용자 행동 패턴에 미치는 영향을 추적 가능한 구조로 설계함으로써, 비즈니스 전환을 목표로 하는 논리적 디자인 프로세스를 경험

Conversion Logic: A/B 테스트 기반의 실험 인프라 설계
(의료기기 브랜드 사례)
핵심: 유입 경로에 따른 섹션 스위칭 로직 구축.
이미지: A/B안의 히어로 영역 레이아웃 + 로직 다이어그램(파라미터 전달 과정).
인사이트: "디자인 요소를 '테스트 가변값'으로 치환하여, 직관이 아닌 데이터로 디자인의 유효성을 검증하는 정량적 설계 프로세스 확립."

7-2. Performance Creative: 브랜드별 매체 최적화 소재 제작(4개)

### 기본 정보

- Figma 참고파일 별도 존재
- 내용은 추후 업데이트 예정

---

## 7. 기술 스택 및 작업 방식

### 최종 결과물

```
GitHub Pages (무료, 태그 없음)
+ Canvas API 물 파동 효과 (마우스 커서 연동)
+ HTML/CSS/JS
```

### 물 파동 효과 스펙

- Wave equation 격자 시뮬레이션
- 마우스 무브 시 에너지 주입
- 배경색 #F8F9FA 기반 투명 파동
- 감쇠율 0.985

### 작업 흐름

```
Claude Code (VSCode 터미널)에서 HTML/CSS/JS로 디자인&코드화
    ↓
    Figma 디자인 변경
    ↓
GitHub Pages 배포
```

---

## 8. Claude 역할

퍼블리싱+디자인 에이전트

- Figma 플러그인 코드 작성 (code.js)
- Modube 스타일 기준으로 내배카/모두의러닝 재현
- Figma → HTML/CSS/JS 제작
- Canvas API 물 파동 효과
- GitHub Pages 배포 설정
- 참고 파일: 이 MD + 코드 파일들 + Figma MCP

---

### 로컬 플러그인 경로

```
C:\Users\heemo\Desktop\figma-portfolio\
├── manifest.json
└── code.js  ← 이 파일만 수정
```

### Figma MCP 설정

```json
"figma-desktop": {
  "url": "http://127.0.0.1:3845/mcp"
}
```

- Dev Mode (Shift+D) 활성화 필요
- Professional 플랜 Full seat

### 디자인 룰

Primary Button -한 섹션당 1개만 허용
-Primary는 항상 핵심 목표 행동에만 사용 -동일 레벨 행동이 2개 이상이면 Primary 사용 금지 → Secondary로 통일

Secondary Button -보조 행동
-Primary 옆에 배치 가능 -동일 중요도 행동은 Secondary로 그룹화

Tertiary Button -보조 기능 영역에서만 사용

금지 규칙
-Primary 버튼을 나열하지 않는다
-Primary와 위험 액션을 같은 시각 강도로 두지 않는다

\*Spacing System

Base Rule -모든 여백은 4의 배수 -지정 토큰만 사용한다 -허용 spacing 토큰
spacing-04
spacing-08
spacing-12
spacing-16
spacing-24
spacing-group-mo
spacing-group-pc
spacing-section-mo
spacing-section-pc

/Vertical Hierarchy -섹션 간 여백은 spacing-section-mo / spacing-section-pc 사용 -섹션 내부 그룹 간 여백은 spacing-group-mo / spacing-group-pc 사용 -컴포넌트 내부 기본 간격은 spacing-16 이상 -텍스트 간 최소 간격은 spacing-08

금지 규칙 -지정된 토큰 이외의 수 사용 금지 -모바일과 PC의 토큰 체계를 다르게 만들지 않는다 -값만 반응형 토큰으로 전환한다

/Information Hierarchy

행동 수 제한 -한 화면의 핵심 행동은 최대 3개 -한 줄에 버튼 3개 이상 배치 금지

콘텐츠 밀도 기준 -한 섹션 안에 메시지 주제는 1개만 유지

구조 규칙 -제목 → 설명 → 행동 순서 유지 -행동 없이 끝나는 섹션 최소화

/Density Rule

사용자 화면 B2C -정보 블록 5개 초과 시 분리 -한 번에 한 가지 행동만 강조

관리자 화면 B2B -정보 밀도 높음 허용 -테이블 우선 구조 -다중 행동 허용 -버튼 스타일 위계는 반드시 유지

/Output Format

- Pure HTML5, Vanilla CSS, JS only
  -NO React, NO JSX
  -Use class attribute
  -Use external CSS file structure

/Mobile-First Implementation

- CSS는 Mobile-First로 기본 스타일을 작성한다 -기본 스타일 작성 후 아래 순서로 확장한다
  @media (min-width: 768px)
  @media (min-width: 1024px) -반응형 전환은 JavaScript가 아닌 CSS display 및 media query로 처리한다

Container Rule

- container 클래스 사용 금지
- 섹션 간 간격은 section-spacing 사용

/Class Naming Rules

- 시멘틱한 클래스명 사용
- 표준 웹 퍼블리싱 네이밍 관례 준수
- 동일 구조와 스타일은 동일 클래스 재사용
- frame-1, div-5 같은 비의미 클래스명 금지

BEM 변형 사용

- Block 예 header, footer, nav-pc, course-card
- Element 예 header-inner, footer-menu, nav-item-link
- Modifier 예 cmp-header--mo, cmp-header--pc, nav-item-link--admin

Prefix

- cmp- 큰 컴포넌트 단위
- btn- 버튼 컴포넌트
- ico- 아이콘

/Class Generation Rule

- HTML 클래스명은 시멘틱하게 생성한다
  -CSS 내부 스타일 값은 반드시 JSON 토큰 기반 CSS 변수로 작성한다
- 클래스는 자유롭게 생성 가능하나, 값은 토큰 외 사용 금지

/Typography Rule

- 타이포그래피는 JSON 토큰을 CSS 변수로 변환하지 않는다
- 텍스트 스타일은 지정된 Typography Class만 사용한다

절대 금지 -인라인으로 font-size, font-weight, line-height 지정 -임의의 텍스트 전용 클래스 생성

/Design System Source of Truth

- 모든 색상, 간격, 보더, 반지름, 그림자, 사이징, z-index는 JSON 토큰을 기반으로 CSS 변수 생성
- JSON 키 경로의 구분자는 하이픈으로 연결하여 변수명 생성
- JSON 키에 이미 하이픈이 포함된 경우 그대로 사용

예시
brand-color.primary500 → --brand-color-primary500
layout.padding-mo → --layout-padding-mo
spacing-section-mo → --spacing-section-mo

/Token Matching Rule

- 디자인 요소의 색상, 간격, 폰트 크기가 JSON의 값과 일치하거나 유사하면 해당 토큰 이름을 강제로 사용
- 하드코딩된 HEX 값 사용 금지
- 임의 px 값 직접 입력 금지
- 예외는 구조값만 허용한다

/Unit Normalization Rule

- JSON 값에 단위가 없는 숫자일 경우 CSS 변수 생성 시 px 자동 추가

px 자동 적용 대상 타입
spacing
sizing
fontSizes
borderWidth
borderRadius
boxShadow 내부 x y blur spread 값

예외 값
%
auto
none
inherit
0

/Shadow Conversion Rule

- x y blur spread 값은 px 단위로 보정한다
- color 값은 그대로 사용한다

/Responsive & Breakpoint Rules

Breakpoints
-Tablet 768px
-Desktop 1024px

Adaptive Layout Rules

Max-width
-1024px 미만 100%
-1024px 이상 sz-1280 토큰 사용

Container Padding -모바일 layout-padding-mo
-768px 이상 layout-padding-tablet
-1024px 이상 layout-padding-pc

Responsive Spacing -섹션 간격
1024px 미만 spacing-section-mo
1024px 이상 spacing-section-pc

- 그룹 간격
  1024px 미만 spacing-group-mo
  1024px 이상 spacing-group-pc

/Typography Responsive Rule

/SVG Rule

- 인라인 SVG의 stroke 또는 fill 색상은 반드시 CSS 변수 사용
- HEX 하드코딩 금지

/Accessibility Rule

- 버튼 aria-label 필수
- 장식 요소 aria-hidden true 사용
- 링크는 title 속성으로 명확한 설명 제공
- 외부 링크는 target blank 사용 시 rel noopener noreferrer 필수

/Asset Path Rule

- 모든 에셋은 절대 경로 사용
- 상대 경로 사용 금지

파일명 규칙 -이미지 img* 접두사 -아이콘 ico- 접두사 -요소 el* 접두사

/Critical Rules

- HEX 색상 하드코딩 금지
- 토큰 없이 px 직접 입력 금지
- typography 클래스 없이 폰트 지정 금지
- 상대 경로 에셋 금지
- Mobile-First CSS 작성

/클래스 생성 규칙

- HTML 클래스명은 시멘틱하게 생성하되, 내부는 이 JSON 토큰으로 채워라.
