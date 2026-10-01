// 작업물 추가 = 객체 하나 + assets/works/<slug>/ 이미지. 코드 수정 없음.
const works = [
  {
    slug: 'gshared',
    title: 'G-shared',
    date: '2026.09',
    category: '개발',
    summary: '유휴 GPU 공유 AI 연산 플랫폼 (SSAFY 특화 프로젝트)',
    description:
      '개인의 유휴 GPU를 AI 파인튜닝 연산에 위탁하고 블록체인 Escrow로 예치·정산하는 플랫폼입니다. ' +
      '6인 팀에서 백엔드와 프론트엔드를 폭넓게 담당하며 develop 브랜치 통합(MR 리뷰·머지)을 맡았습니다. ' +
      '백엔드에서는 동시 재발급·다른 기기 로그인에 세션이 끊기던 문제를 refresh 토큰 기기별 회전(Redis Lua 원자 회전)으로 해결했습니다. ' +
      '프론트에서는 Next.js(App Router)로 온체인 정보 패널, 작업 생성 위저드, GPU 등급 카드 UI, 작업 종료 토스트 알림 등을 구현했습니다.',
    images: [
      'gshared-01-landing.png',
      'gshared-09-token.png',
      'gshared-02-login.png',
      'gshared-03-dashboard.png',
      'gshared-04-jobs.png',
      'gshared-05-job-wizard.png',
      'gshared-06-workers.png',
      'gshared-07-wallet.png',
      'gshared-00-overview.png',
    ],
  },
  {
    slug: 'secome',
    title: 'secome',
    date: '2026.08',
    category: '개발',
    summary: '회의록 기반 문서 협업 플랫폼 (SSAFY 공통 프로젝트)',
    description:
      '회의가 끝나면 회의록과 문서가 남는 협업 플랫폼입니다. 6인 팀에서 문서·폴더 도메인 백엔드를 맡아 ' +
      'Spring Boot·JPA·PostgreSQL로 REST API 8개를 설계·구현했습니다. ' +
      '지우면 끝이던 삭제를 휴지통(deleted_at + 살아 있는 행만 담는 부분 인덱스)으로 바꾸고, ' +
      '회의록은 유니크 제약을 일부러 유지해 재생성은 막고 복구로만 되돌리게 했습니다. ' +
      '문서가 문서를 품던 모델을 폴더 도메인으로 바꾸고 트리 조회가 본문을 읽지 않게 했습니다.',
    images: [
      'secome-00-cover.png',
      'secome-02-trash.png',
      'secome-03-minutes.png',
      'secome-04-folder.png',
      'secome-01-overview.png',
    ],
  },
  {
    slug: 'sonuri',
    title: '혼자소누리',
    date: '2026.06',
    category: '개발',
    summary: '코딩 없이 만드는 노코드 쇼핑몰 빌더 (SSAFY 관통 프로젝트)',
    description:
      '템플릿으로 온라인 쇼핑몰을 만드는 멀티테넌트 플랫폼입니다. 2인 팀에서 Vue 화면 다수와 ' +
      'Django support·community 도메인을 맡았습니다. API 명세를 혼자 바꿔 프론트가 전부 깨진 실수를 ' +
      '역추적·롤백하고, 인터페이스 변경은 사전 공유를 거치는 절차로 만들었습니다.',
    images: [
      'sonuri-01-home.png',
      'sonuri-00-case.png',
      'sonuri-02-login.png',
      'sonuri-05-signup.png',
    ],
  },
  {
    slug: 'bappy',
    title: 'BAPPY',
    date: '2025.09',
    category: '디자인',
    summary: '1인 가구를 위한 스마트 공동 주문 플랫폼',
    description:
      '사용자가 직접 후보를 입력해 메뉴 결정을 돕는 음식 추천 룰렛부터, ' +
      '배달비 절감을 위해 주변 이웃과 메뉴를 투표하고 팀을 이루는 공동 주문 매칭까지 제공합니다. ' +
      '사용자 반경 내 매칭과 랜드마크 픽업 장소 지정으로 1인 가구가 안심하고 이용할 수 있는 환경을 구축했습니다. ' +
      '동아대학교 부민캠퍼스를 초기 타겟으로 대학생의 실질적인 생활 문제를 해결하고자 했습니다.',
    images: [
      '01-main.png',
      '02-roulette.png',
      '03-search.png',
      '04-delivery-share.png',
      '05-cart.png',
      '06-login.png',
      '07-mypage.png',
      '08-customer-center.png',
    ],
  },
  {
    slug: 'chaek-gpt',
    title: '책GPT',
    date: '2026.01',
    category: '디자인',
    summary: '기억으로 잃어버린 책을 찾아주는 AI 검색 서비스',
    description:
      '제목이 기억나지 않는 책을 책에 관한 기억만으로 찾아주는 서비스입니다. ' +
      '기억 조각을 입력하면 AI 와 대화하며 범위를 좁혀 책을 발견하는 3단계 플로우(입력 → 대화 → 발견)를 설계했습니다.',
    images: [
      '01-search-main.png',
      '02-search-results.png',
      '03-search-history.png',
      '04-chat-hint.png',
      '05-final-result.png',
      '06-library.png',
      '07-wishlist.png',
    ],
  },
  {
    slug: 'business-card',
    title: '명함',
    date: '2025.09',
    category: '굿즈',
    summary: '개인 브랜드 명함 디자인',
    description: '개인 브랜드 아이덴티티를 담은 명함 시리즈입니다.',
    images: ['01.png', '02.png', '03.png'],
  },
  {
    slug: 'ecobag',
    title: '에코백',
    date: '2025.09',
    category: '굿즈',
    summary: '브랜드 굿즈 에코백',
    description: '일러스트를 활용한 브랜드 굿즈 에코백 시리즈입니다.',
    images: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'],
  },
  {
    slug: 'phone-case',
    title: '핸드폰 케이스',
    date: '2025.09',
    category: '굿즈',
    summary: '브랜드 굿즈 핸드폰 케이스',
    description: '일러스트를 활용한 핸드폰 케이스 시리즈입니다.',
    images: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'],
  },
  {
    slug: 'poster',
    title: '포스터',
    date: '2025.09',
    category: '그래픽',
    summary: '그래픽 포스터',
    description: '브랜드 무드를 담은 그래픽 포스터 작업입니다.',
    images: ['01.png'],
  },
  {
    slug: 'album',
    title: '음반',
    date: '2025.09',
    category: '그래픽',
    summary: '음반 아트워크',
    description: '음반 커버 아트워크 디자인 작업입니다.',
    images: ['01.png'],
  },
]

export function findWork(slug) {
  return works.find(w => w.slug === slug)
}

export default works
