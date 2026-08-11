// 작업물 추가 = 객체 하나 + assets/works/<slug>/ 이미지. 코드 수정 없음.
const works = [
  {
    slug: 'bappy',
    title: 'BAPPY',
    date: '2026.01',
    category: 'Design',
    summary: '1인 가구를 위한 스마트 공동 주문 플랫폼',
    description:
      '사용자가 직접 후보를 입력해 메뉴 결정을 돕는 음식 추천 룰렛부터, ' +
      '배달비 절감을 위해 주변 이웃과 메뉴를 투표하고 팀을 이루는 공동 주문 매칭까지 제공합니다. ' +
      '사용자 반경 내 매칭과 랜드마크 픽업 장소 지정으로 1인 가구가 안심하고 이용할 수 있는 환경을 구축했습니다. ' +
      '동아대학교 부민캠퍼스를 초기 타겟으로 대학생의 실질적인 생활 문제를 해결하고자 했습니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'chaek-gpt',
    title: '책GPT',
    date: '2026.01',
    category: 'Design',
    summary: '기억으로 잃어버린 책을 찾아주는 AI 검색 서비스',
    description:
      '제목이 기억나지 않는 책을 책에 관한 기억만으로 찾아주는 서비스입니다. ' +
      '기억 조각을 입력하면 AI 와 대화하며 범위를 좁혀 책을 발견하는 3단계 플로우(입력 → 대화 → 발견)를 설계했습니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'business-card',
    title: '명함',
    date: '2025',
    category: 'Goods',
    summary: '개인 브랜드 명함 디자인',
    description: '개인 브랜드 아이덴티티를 담은 명함 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'ecobag',
    title: '에코백',
    date: '2025',
    category: 'Goods',
    summary: '브랜드 굿즈 에코백',
    description: '일러스트를 활용한 브랜드 굿즈 에코백 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'phone-case',
    title: '핸드폰 케이스',
    date: '2025',
    category: 'Goods',
    summary: '브랜드 굿즈 핸드폰 케이스',
    description: '일러스트를 활용한 핸드폰 케이스 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'poster',
    title: '포스터',
    date: '2025',
    category: 'Graphic',
    summary: '그래픽 포스터',
    description: '브랜드 무드를 담은 그래픽 포스터 작업입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'album',
    title: '음반',
    date: '2025',
    category: 'Graphic',
    summary: '음반 아트워크',
    description: '음반 커버 아트워크 디자인 작업입니다.',
    images: ['placeholder.png'],
  },
]

export function findWork(slug) {
  return works.find(w => w.slug === slug)
}

export default works
