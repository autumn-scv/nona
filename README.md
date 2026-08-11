# nona

조가을 개인 포트폴리오 사이트. 쇼핑몰 컨셉(작업물 = 상품)의 Vue 3 SPA.

## 실행

```bash
npm install
npm run dev    # 개발 서버
npm run test   # 테스트
npm run build  # 배포 빌드
```

## 구조

- `src/data/works.js` — 모든 작업물 콘텐츠의 단일 원천.
  작업물 추가 = 객체 하나 + `src/assets/works/<slug>/` 이미지.
- `src/pages/` — 홈 / 목록 / 상세(공용 템플릿) / 연락
- 개발 규칙은 [CONVENTION.md](CONVENTION.md) 참고
- 배포: Vercel (GitHub 연동, push 시 자동 배포)
