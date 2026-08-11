# nona — Chogaeul 포트폴리오 사이트 설계

2026-08-11 / 조가을

## 목적

Figma 로 디자인해 둔 개인 브랜드 포트폴리오 사이트(쇼핑몰 컨셉: 작업물 = 상품)를
실제 웹으로 구현한다. 풀스택 지원의 프론트 증거이자 제출용 포트폴리오 자체가 된다.

## 범위

- 1차: 프론트만. Vue 3 + Vite + vue-router, UI 라이브러리 없음(순수 CSS).
- 디자인 전 화면 커버. 단, 작업물 상세는 공용 템플릿 1개 + 데이터로 처리한다.
- 백엔드(글 저장, 문의 폼 등)는 2단계 — 이번 범위 아님.
- 배포는 미정 — 결정되면 그때 붙인다.

## 라우팅

| 경로 | 페이지 | 디자인 근거 |
| --- | --- | --- |
| `/` | 메인 (인사말, Play portfolio, Contact Me) | 메인페이지.png |
| `/works` | 작업물 목록 (쇼핑몰 그리드) | 글 리스트.png |
| `/works/:slug` | 작업물 상세 — 공용 템플릿 | 바피 페이지·명함·에코백·폰케이스·포스터·음반 |
| `/contact` | 연락 | 연락.png |

- 헤더(로고 Chogaeul, 검색/하트/프로필/장바구니 아이콘)와 푸터는 공용 컴포넌트.
  아이콘은 1차에서 장식(무동작).
- 상세 템플릿: 좌측 썸네일 리스트 + 큰 이미지, 우측 제목·가격·설명·
  Add to Cart(장식)·접이식 섹션(Size & fit 등).

## 구조

```
src/
├─ main.js, App.vue        공용 Header/Footer
├─ router.js
├─ data/works.js           작업물 데이터 (콘텐츠의 단일 원천)
├─ pages/                  Home / WorkList / WorkDetail / Contact
├─ components/             WorkCard 등
└─ assets/works/<slug>/    이미지
```

## 데이터 모델 (`works.js`)

```js
{ slug: 'bappy', title: 'BAPPY', price: '$10', category: 'Design',
  description: '…', images: ['main.png', …] }
```

- 작업물 추가 = 객체 1개 + 이미지 폴더. 코드 수정 없음.
- 2단계 백엔드 도입 시 이 스키마가 그대로 API 응답이 된다.

## 이미지 소스

`C:\Users\SSAFY\Desktop\autumn\포트폴리오\` 에 Figma 내보내기 완료:

- `2250578/` 39장 — 사이트 화면 시안(구현 참조용) + 굿즈 사진(콘텐츠용)
- `바피 앱 화면/` 79장 — 바피 상세 페이지 콘텐츠
- `제목 없음/` 10장 — 책GPT 화면 (작업물 목록에 포함한다)

시안 이미지는 구현 참조용이고, 콘텐츠 이미지만 `assets/` 로 복사해 쓴다.
바피 79장은 상세 페이지에 전부 넣지 않고 대표 화면을 선별한다.

## 검증

- `npm run build` 통과
- 라우트 4개 렌더 + works 데이터로 상세 페이지가 그려지는지 확인하는
  최소 스모크 테스트 1개 (Vitest)

## 하지 않는 것

- 장바구니/검색/로그인 실동작, CMS, SSR/Nuxt, UI 라이브러리, 다국어
