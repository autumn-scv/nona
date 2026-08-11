# nona 개발 컨벤션

혼자 하는 프로젝트라 규칙은 최소한만 둔다. 규칙이 현실과 안 맞으면 규칙을 고친다.

## 커밋

- 메시지는 한국어, 현재형으로 끝낸다: "~를 추가한다", "~를 구현한다"
- 접두어: `feat:` 기능 / `fix:` 수정 / `docs:` 문서 / `chore:` 설정·잡일 / `style:` 코드 정리 / `test:` 테스트
- 한 커밋 = 한 가지 일. 데이터 수정과 페이지 구현을 한 커밋에 섞지 않는다
- `git add -A` 대신 파일을 지정해서 스테이징한다 (의도하지 않은 파일이 섞이는 사고 방지)

## 브랜치

- `master` 단일 브랜치. push가 곧 배포(Vercel 자동 배포)이므로
  push 전에 반드시 `npm run test` 와 `npm run build` 를 통과시킨다
- 협업자가 생기면 그때 브랜치 전략을 정한다 — 미리 만들지 않는다

## 코드

- 페이지는 `src/pages/`, 이름은 `~Page.vue` (예: `WorkListPage.vue`)
- 재사용 조각은 `src/components/`, PascalCase (예: `WorkCard.vue`)
- `<script setup>` + Composition API 로 통일
- 스타일은 컴포넌트 안 `<style scoped>`. 전역 스타일은 `src/style.css` 에만
- UI 라이브러리·CSS 프레임워크 금지 — 디자인이 이미 확정돼 있어 순수 CSS 로 충분하다

## 콘텐츠(데이터)

- 모든 작업물 정보는 `src/data/works.js` 가 단일 원천이다.
  페이지에 제목·날짜·설명을 하드코딩하지 않는다
- 작업물 추가 = works.js 에 객체 하나 + `src/assets/works/<slug>/` 이미지 폴더
- slug 는 영문 소문자와 하이픈만 (`bappy`, `business-card`)
- 이미지 파일명은 `순번-내용.png` (예: `01-main.png`) — images 배열 첫 번째가 썸네일
- 디자인상 가격 자리에는 작업 날짜(`date`, `YYYY.MM`)를 표시한다

## 테스트

- 프레임워크: Vitest + @vue/test-utils. 실행은 `npm run test`
- 페이지·컴포넌트를 새로 만들면 렌더링 스모크 테스트 1개는 남긴다
  (동작이 없는 순수 마크업 페이지는 예외)
- 테스트가 깨진 채로 커밋하지 않는다

## 하지 않는 것

- TypeScript 전환, 상태관리 라이브러리(Pinia), SSR — 지금 규모에 불필요
- 실제로 필요해지는 시점에 다시 판단한다
