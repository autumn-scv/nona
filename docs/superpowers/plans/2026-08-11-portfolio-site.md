# nona 포트폴리오 사이트 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Figma 로 디자인된 쇼핑몰 컨셉 개인 포트폴리오 사이트를 Vue 3 SPA 로 구현한다.

**Architecture:** Vue 3 + Vite SPA. 라우트 4개(홈/목록/상세/연락). 모든 작업물 콘텐츠는 `src/data/works.js` 단일 파일이 원천이고, 상세 페이지는 공용 템플릿 하나가 데이터로 렌더링한다.

**Tech Stack:** Vue 3, Vite, vue-router 4, Vitest + @vue/test-utils (테스트), 순수 CSS (라이브러리 없음)

## Global Constraints

- 저장소 루트: `C:\Users\SSAFY\Desktop\autumn\PERSONAL\nona` (모든 경로는 여기 기준)
- UI 라이브러리·CSS 프레임워크 금지. 순수 CSS 만.
- 디자인 참조 이미지: `C:\Users\SSAFY\Desktop\autumn\포트폴리오\2250578\` (사이트 시안 PNG). 각 페이지 구현 시 해당 시안을 Read 로 열어 보고 레이아웃·여백·폰트 크기를 맞춘다.
- 콘텐츠 이미지 소스: `C:\Users\SSAFY\Desktop\autumn\포트폴리오\바피 앱 화면\`(79장), `제목 없음\`(책GPT 10장), `2250578\`(굿즈 사진 포함)
- 헤더 아이콘(검색/하트/프로필/장바구니)과 Add to Cart 는 장식 — 클릭 동작 없음
- 커밋 메시지는 한국어, `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` 푸터

---

### Task 1: Vite + Vue 프로젝트 스캐폴드

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.js`, `src/App.vue` (vite 템플릿이 생성)
- Modify: `.gitignore` (node_modules, dist)

**Interfaces:**
- Produces: `npm run dev` / `npm run build` / `npm run test` 가 동작하는 프로젝트 뼈대

- [ ] **Step 1: 스캐폴드 생성**

저장소 루트가 비어있지 않으므로(README, docs) 임시 폴더에 만들어 옮긴다.

```powershell
Set-Location "C:\Users\SSAFY\Desktop\autumn\PERSONAL"
npm create vite@latest nona-tmp -- --template vue
Get-ChildItem nona-tmp -Force | Where-Object Name -ne ".git" | Move-Item -Destination nona
Remove-Item nona-tmp -Recurse -Force
Set-Location nona
npm install
npm install vue-router@4
npm install -D vitest @vue/test-utils jsdom
```

- [ ] **Step 2: vite.config.js 에 테스트 설정 추가**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
  },
})
```

`package.json` scripts 에 추가: `"test": "vitest run"`

- [ ] **Step 3: 동작 확인**

Run: `npm run build`
Expected: `dist/` 생성, 에러 없음

- [ ] **Step 4: Commit**

```powershell
git add -A; git commit -m "chore: Vite + Vue 3 프로젝트 뼈대를 만든다"
```

---

### Task 2: works.js 데이터 모델

**Files:**
- Create: `src/data/works.js`
- Test: `src/data/works.test.js`

**Interfaces:**
- Produces: `works` (배열 default export), `findWork(slug)` — 이후 모든 페이지가 사용
  - work 객체: `{ slug, title, date, category, summary, description, images }`
  - `images`: `src/assets/works/<slug>/` 기준 파일명 배열. 첫 번째가 썸네일.

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// src/data/works.test.js
import { describe, it, expect } from 'vitest'
import works, { findWork } from './works.js'

describe('works 데이터', () => {
  it('모든 작업물이 필수 필드를 갖는다', () => {
    expect(works.length).toBeGreaterThanOrEqual(7)
    for (const w of works) {
      expect(w.slug).toMatch(/^[a-z0-9-]+$/)
      expect(w.title).toBeTruthy()
      expect(w.date).toBeTruthy()
      expect(w.category).toBeTruthy()
      expect(w.description).toBeTruthy()
      expect(w.images.length).toBeGreaterThan(0)
    }
  })
  it('slug 는 중복되지 않는다', () => {
    const slugs = works.map(w => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('findWork 는 slug 로 찾고 없으면 undefined', () => {
    expect(findWork('bappy')?.title).toBe('BAPPY')
    expect(findWork('none')).toBeUndefined()
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test`
Expected: FAIL — `Cannot find module './works.js'`

- [ ] **Step 3: works.js 구현**

```js
// src/data/works.js
// 작업물 추가 = 객체 하나 + assets/works/<slug>/ 이미지. 코드 수정 없음.
const works = [
  {
    slug: 'bappy',
    title: 'BAPPY',
    date: '2025.09',
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
    date: '2025.09',
    category: 'Goods',
    summary: '개인 브랜드 명함 디자인',
    description: '개인 브랜드 아이덴티티를 담은 명함 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'ecobag',
    title: '에코백',
    date: '2025.09',
    category: 'Goods',
    summary: '브랜드 굿즈 에코백',
    description: '일러스트를 활용한 브랜드 굿즈 에코백 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'phone-case',
    title: '핸드폰 케이스',
    date: '2025.09',
    category: 'Goods',
    summary: '브랜드 굿즈 핸드폰 케이스',
    description: '일러스트를 활용한 핸드폰 케이스 시리즈입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'poster',
    title: '포스터',
    date: '2025.09',
    category: 'Graphic',
    summary: '그래픽 포스터',
    description: '브랜드 무드를 담은 그래픽 포스터 작업입니다.',
    images: ['placeholder.png'],
  },
  {
    slug: 'album',
    title: '음반',
    date: '2025.09',
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
```

주의: `images` 는 Task 7(이미지 큐레이션)에서 채운다. 이 시점의 테스트는
`images.length > 0` 을 요구하므로 **Task 7 전까지는 각 배열에 임시로
`'placeholder.png'` 1개를 넣고**, Task 7 에서 실제 파일명으로 교체한다.
(설명·가격 문구는 실제 시안 PNG 를 보고 다르면 시안 쪽으로 맞춘다)

- [ ] **Step 4: 통과 확인**

Run: `npm run test`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```powershell
git add src/data; git commit -m "feat: 작업물 데이터 모델을 추가한다"
```

---

### Task 3: 라우터와 앱 셸 (헤더/푸터)

**Files:**
- Create: `src/router.js`, `src/components/SiteHeader.vue`, `src/components/SiteFooter.vue`, `src/pages/HomePage.vue`, `src/pages/WorkListPage.vue`, `src/pages/WorkDetailPage.vue`, `src/pages/ContactPage.vue` (페이지는 우선 제목만 있는 스텁)
- Modify: `src/main.js`, `src/App.vue`, `src/style.css` (vite 기본 스타일 제거 후 재작성)
- Test: `src/router.test.js`

**Interfaces:**
- Consumes: 없음
- Produces: 라우트 `/`(HomePage), `/works`(WorkListPage), `/works/:slug`(WorkDetailPage, props: slug), `/contact`(ContactPage). 이후 Task 가 각 페이지 스텁을 완성본으로 교체.

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// src/router.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router.js'

async function mountAt(path) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push(path)
  await router.isReady()
  return mount(App, { global: { plugins: [router] } })
}

describe('라우팅', () => {
  it('4개 라우트가 모두 렌더링된다', async () => {
    for (const path of ['/', '/works', '/works/bappy', '/contact']) {
      const wrapper = await mountAt(path)
      expect(wrapper.find('main').exists()).toBe(true)
    }
  })
  it('헤더 로고가 모든 페이지에 있다', async () => {
    const wrapper = await mountAt('/works')
    expect(wrapper.text()).toContain('Chogaeul')
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test`
Expected: FAIL — `Cannot find module './router.js'`

- [ ] **Step 3: 구현**

```js
// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import WorkListPage from './pages/WorkListPage.vue'
import WorkDetailPage from './pages/WorkDetailPage.vue'
import ContactPage from './pages/ContactPage.vue'

export const routes = [
  { path: '/', component: HomePage },
  { path: '/works', component: WorkListPage },
  { path: '/works/:slug', component: WorkDetailPage, props: true },
  { path: '/contact', component: ContactPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
```

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './style.css'

createApp(App).use(router).mount('#app')
```

```vue
<!-- src/App.vue -->
<template>
  <SiteHeader />
  <main><router-view /></main>
  <SiteFooter />
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
```

```vue
<!-- src/components/SiteHeader.vue -->
<template>
  <header class="site-header">
    <button class="icon-btn" aria-label="메뉴">☰</button>
    <router-link to="/" class="logo">Chogaeul</router-link>
    <nav class="icons">
      <span class="icon-btn" aria-hidden="true">🔍</span>
      <span class="icon-btn" aria-hidden="true">♡</span>
      <span class="icon-btn" aria-hidden="true">👤</span>
      <span class="icon-btn" aria-hidden="true">🛍</span>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 2rem;
}
.logo {
  font-size: 1.4rem; font-weight: 700; color: inherit; text-decoration: none;
  position: absolute; left: 50%; transform: translateX(-50%);
}
.icons { display: flex; gap: 1rem; }
.icon-btn { background: none; border: none; font-size: 1.1rem; cursor: default; }
</style>
```

```vue
<!-- src/components/SiteFooter.vue -->
<template>
  <footer class="site-footer">
    <p>© 2026 Chogaeul</p>
  </footer>
</template>

<style scoped>
.site-footer { padding: 3rem 2rem; text-align: center; color: #999; font-size: 0.85rem; }
</style>
```

```vue
<!-- src/pages/HomePage.vue (스텁 — Task 4 에서 교체) -->
<template><h1>Home</h1></template>
```

WorkListPage / WorkDetailPage / ContactPage 도 같은 형태의 h1 스텁으로 만든다
(각각 `<h1>Works</h1>`, `<h1>Work Detail</h1>`, `<h1>Contact</h1>`).

```css
/* src/style.css — vite 기본 내용을 전부 지우고 교체 */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  color: #1a1a1a; background: #fff; line-height: 1.6;
}
main { min-height: 70vh; }
img { max-width: 100%; display: block; }
a { color: inherit; }
```

vite 템플릿이 만든 `src/components/HelloWorld.vue`, `src/assets/vue.svg` 는 삭제한다.

- [ ] **Step 4: 통과 확인**

Run: `npm run test`
Expected: PASS (works 2 + router 2)

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: 라우터와 앱 셸(헤더·푸터)을 만든다"
```

---

### Task 4: 홈 페이지

**Files:**
- Modify: `src/pages/HomePage.vue` (스텁 교체)
- Create: `src/assets/profile.png` (시안의 얼굴 일러스트 — `2250578/` 에서 복사)

**Interfaces:**
- Consumes: 라우터 (`/works`, `/contact` 링크)

- [ ] **Step 1: 시안 확인**

`C:\Users\SSAFY\Desktop\autumn\포트폴리오\2250578\메인페이지.png` 를 Read 로 열어
문구·배치를 확인한다. 일러스트 이미지 파일(`Group 1.png` 로 추정)을 확인해
`src/assets/profile.png` 로 복사한다.

- [ ] **Step 2: 구현**

```vue
<!-- src/pages/HomePage.vue -->
<template>
  <section class="hero">
    <div class="intro">
      <h1>조가을 Chogaeul</h1>
      <p class="lines">
        브랜드가 가진 이야기를 시각적으로 풀어내는 브랜드 마케터를 지향합니다.<br />
        일관된 메시지와 경험이 브랜드 신뢰를 만든다고 믿습니다.<br />
        타겟과 맥락을 이해하는 것에서 모든 마케팅은 시작된다고 생각합니다.<br />
        콘텐츠와 디자인을 통해 브랜드의 성격을 명확히 드러내고자 합니다.<br />
        단기적인 반응보다, 오래 기억되는 인상을 만드는 데 집중합니다.<br />
        브랜드 관점에서 고민하고, 사용자 관점에서 검증합니다.<br />
        결국 선택받는 브랜드를 만드는 마케터로 성장하고자 합니다.
      </p>
      <div class="actions">
        <router-link to="/works" class="play">▶ Play portfolio</router-link>
        <router-link to="/contact" class="contact">Contact Me →</router-link>
      </div>
    </div>
    <img class="portrait" src="../assets/profile.png" alt="조가을 일러스트" />
  </section>
</template>

<style scoped>
.hero {
  display: flex; align-items: center; justify-content: center; gap: 6rem;
  padding: 6rem 2rem; flex-wrap: wrap;
}
.intro h1 { font-size: 2.6rem; margin-bottom: 1.5rem; }
.lines { color: #555; margin-bottom: 2rem; }
.actions { display: flex; align-items: center; gap: 1.5rem; }
.play { color: #5b6ee1; text-decoration: none; font-weight: 600; }
.contact {
  background: #f5c518; padding: 0.7rem 1.4rem; border-radius: 6px;
  text-decoration: none; font-weight: 600;
}
.portrait { width: 300px; }
</style>
```

문구는 시안 PNG 와 대조해 다르면 시안을 따른다.

- [ ] **Step 3: 육안 확인**

Run: `npm run dev` 후 `/` 접속, 시안 `메인페이지.png` 와 비교. 여백·정렬을 CSS 로 맞춘다.

- [ ] **Step 4: 테스트·빌드 확인 후 Commit**

Run: `npm run test` → PASS, `npm run build` → 성공

```powershell
git add -A; git commit -m "feat: 홈 페이지를 구현한다"
```

---

### Task 5: 작업물 목록 페이지 (쇼핑몰 그리드)

**Files:**
- Modify: `src/pages/WorkListPage.vue` (스텁 교체)
- Create: `src/components/WorkCard.vue`
- Test: `src/pages/WorkListPage.test.js`

**Interfaces:**
- Consumes: `works` (default export), work 객체의 `slug/title/date/category/summary/images[0]`
- Produces: `WorkCard` (props: `work`)

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// src/pages/WorkListPage.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import WorkListPage from './WorkListPage.vue'
import { routes } from '../router.js'
import works from '../data/works.js'

describe('작업물 목록', () => {
  it('모든 작업물이 카드로 나온다', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    const wrapper = mount(WorkListPage, { global: { plugins: [router] } })
    const cards = wrapper.findAll('[data-test="work-card"]')
    expect(cards.length).toBe(works.length)
    expect(wrapper.text()).toContain('BAPPY')
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test`
Expected: FAIL — 카드 0개

- [ ] **Step 3: 구현**

```vue
<!-- src/components/WorkCard.vue -->
<template>
  <router-link :to="`/works/${work.slug}`" class="card" data-test="work-card">
    <img :src="thumb" :alt="work.title" />
    <div class="meta">
      <span class="category">{{ work.category }}</span>
      <h3>{{ work.title }}</h3>
      <p class="price">{{ work.date }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ work: { type: Object, required: true } })
const thumb = computed(
  () => new URL(`../assets/works/${props.work.slug}/${props.work.images[0]}`, import.meta.url).href,
)
</script>

<style scoped>
.card { text-decoration: none; display: block; }
.card img { aspect-ratio: 3 / 4; object-fit: cover; width: 100%; background: #f4f4f4; }
.meta { padding: 0.8rem 0.2rem; }
.category { font-size: 0.75rem; color: #999; text-transform: uppercase; }
h3 { font-size: 1rem; margin: 0.2rem 0; }
.price { color: #555; font-size: 0.9rem; }
</style>
```

```vue
<!-- src/pages/WorkListPage.vue -->
<template>
  <section class="list">
    <h1>Works</h1>
    <div class="grid">
      <WorkCard v-for="w in works" :key="w.slug" :work="w" />
    </div>
  </section>
</template>

<script setup>
import WorkCard from '../components/WorkCard.vue'
import works from '../data/works.js'
</script>

<style scoped>
.list { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
h1 { font-size: 1.6rem; margin-bottom: 2rem; }
.grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 2rem;
}
</style>
```

시안 `글 리스트.png` 를 열어 그리드 열 수·카드 비율을 맞춘다.

- [ ] **Step 4: 통과 확인 후 Commit**

Run: `npm run test` → PASS

```powershell
git add -A; git commit -m "feat: 작업물 목록 페이지를 구현한다"
```

---

### Task 6: 작업물 상세 페이지 (공용 템플릿)

**Files:**
- Modify: `src/pages/WorkDetailPage.vue` (스텁 교체)
- Test: `src/pages/WorkDetailPage.test.js`

**Interfaces:**
- Consumes: `findWork(slug)`, 라우터 props `slug`

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// src/pages/WorkDetailPage.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import WorkDetailPage from './WorkDetailPage.vue'
import { routes } from '../router.js'

function mountWith(slug) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  return mount(WorkDetailPage, { props: { slug }, global: { plugins: [router] } })
}

describe('작업물 상세', () => {
  it('slug 에 맞는 작업물을 렌더링한다', () => {
    const wrapper = mountWith('bappy')
    expect(wrapper.text()).toContain('BAPPY')
    expect(wrapper.text()).toContain('Add to Cart')
  })
  it('없는 slug 면 안내 문구를 보여준다', () => {
    const wrapper = mountWith('no-such-work')
    expect(wrapper.text()).toContain('작업물을 찾을 수 없습니다')
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npm run test`
Expected: FAIL

- [ ] **Step 3: 구현**

```vue
<!-- src/pages/WorkDetailPage.vue -->
<template>
  <section v-if="work" class="detail">
    <nav class="breadcrumb">
      <router-link to="/">Home</router-link> ›
      <router-link to="/works">{{ work.category }}</router-link> ›
      <span>{{ work.title }}</span>
    </nav>
    <div class="body">
      <div class="gallery">
        <div class="thumbs">
          <img
            v-for="(img, i) in work.images" :key="img" :src="imageUrl(img)"
            :class="{ active: i === current }" :alt="`${work.title} ${i + 1}`"
            @click="current = i"
          />
        </div>
        <img class="main-image" :src="imageUrl(work.images[current])" :alt="work.title" />
      </div>
      <div class="info">
        <span class="badge">Best!</span>
        <h1>{{ work.title }}</h1>
        <p class="price">{{ work.date }}</p>
        <p class="summary">{{ work.summary }}</p>
        <p class="description">{{ work.description }}</p>
        <button class="cart" type="button">Add to Cart</button>
        <button class="wish" type="button">♡ Add to Wishlist</button>
        <details><summary>Size &amp; fit</summary><p>{{ work.summary }}</p></details>
        <details><summary>Care</summary><p>디지털 작업물입니다.</p></details>
        <details><summary>Composition</summary><p>{{ work.category }}</p></details>
      </div>
    </div>
  </section>
  <section v-else class="not-found">
    <p>작업물을 찾을 수 없습니다.</p>
    <router-link to="/works">목록으로</router-link>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { findWork } from '../data/works.js'

const props = defineProps({ slug: { type: String, required: true } })
const work = computed(() => findWork(props.slug))
const current = ref(0)
watch(() => props.slug, () => { current.value = 0 })

function imageUrl(name) {
  return new URL(`../assets/works/${props.slug}/${name}`, import.meta.url).href
}
</script>

<style scoped>
.detail { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.breadcrumb { font-size: 0.85rem; color: #888; margin-bottom: 2rem; }
.breadcrumb a { text-decoration: none; }
.body { display: flex; gap: 4rem; flex-wrap: wrap; }
.gallery { display: flex; gap: 1rem; flex: 1 1 480px; }
.thumbs { display: flex; flex-direction: column; gap: 0.5rem; width: 64px; overflow-y: auto; max-height: 640px; }
.thumbs img { border: 1px solid #eee; cursor: pointer; }
.thumbs img.active { border-color: #1a1a1a; }
.main-image { flex: 1; object-fit: contain; max-height: 640px; }
.info { flex: 1 1 360px; }
.badge { background: #eee; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px; }
h1 { font-size: 2.2rem; margin: 0.5rem 0 0; }
.price { font-size: 1.6rem; font-weight: 700; margin: 0.5rem 0 1rem; }
.summary { font-weight: 600; margin-bottom: 0.8rem; }
.description { color: #555; margin-bottom: 1.5rem; }
.cart {
  width: 100%; background: #4a90e2; color: #fff; border: none; padding: 0.9rem;
  border-radius: 6px; font-size: 1rem; font-weight: 600; margin-bottom: 0.8rem;
}
.wish { width: 100%; background: none; border: none; padding: 0.5rem; color: #555; margin-bottom: 1.5rem; }
details { border-top: 1px solid #eee; padding: 0.8rem 0; }
summary { cursor: pointer; font-weight: 600; }
details p { padding-top: 0.5rem; color: #666; }
</style>
```

시안 `바피 페이지1.png` 를 열어 배치를 맞춘다.

- [ ] **Step 4: 통과 확인 후 Commit**

Run: `npm run test` → PASS

```powershell
git add -A; git commit -m "feat: 작업물 상세 페이지 공용 템플릿을 구현한다"
```

---

### Task 7: 콘텐츠 이미지 큐레이션

**Files:**
- Create: `src/assets/works/<slug>/*.png` (slug 7개 폴더)
- Modify: `src/data/works.js` 의 각 `images` 배열 (placeholder 제거)

**Interfaces:**
- Consumes: works.js 의 slug 목록
- Produces: 모든 작업물의 실제 이미지. `images[0]` 이 목록 썸네일이 된다.

- [ ] **Step 1: 소스 이미지 확인·선별**

각 폴더의 PNG 를 Read 로 열어 내용을 확인하고 선별한다:

- `바피 앱 화면\` 79장 → 대표 8~12장 (메인, 룰렛, 맛집검색, 배달쉐어, 장바구니, 로그인, 마이페이지, 고객센터 등 기능이 잘 드러나는 화면). `bappy/01-main.png` 처럼 순번-내용 이름으로 복사
- `제목 없음\` 10장 → 책GPT 대표 5~8장 → `chaek-gpt/`
- `2250578\` 중 명함1~3 → `business-card/`, 에코백1~6 → `ecobag/`, 핸드폰케이스1~6 → `phone-case/`, 포스터·포스터걸어요 → `poster/`, 음반 → `album/`

복사 예시:

```powershell
New-Item -ItemType Directory -Force "src/assets/works/bappy"
Copy-Item "C:\Users\SSAFY\Desktop\autumn\포트폴리오\바피 앱 화면\1.png" "src/assets/works/bappy/01-main.png"
```

- [ ] **Step 2: works.js 의 images 배열을 실제 파일명으로 교체**

각 slug 의 `images: []`(임시 placeholder) 를 복사한 파일명 배열로 바꾼다.
예: `images: ['01-main.png', '02-roulette.png', …]`

- [ ] **Step 3: 확인**

Run: `npm run test` → PASS (works 테스트의 `images.length > 0` 충족)
Run: `npm run dev` → `/works` 썸네일, 상세 갤러리가 실제 이미지로 보이는지 육안 확인

- [ ] **Step 4: Commit**

```powershell
git add -A; git commit -m "feat: 작업물 이미지를 추가한다"
```

---

### Task 8: 연락 페이지

**Files:**
- Modify: `src/pages/ContactPage.vue` (스텁 교체)

**Interfaces:**
- Consumes: 없음

- [ ] **Step 1: 시안 확인**

`2250578\연락.png` 를 Read 로 열어 항목(이메일, 깃허브, 인스타그램 등)을 확인한다.

- [ ] **Step 2: 구현**

```vue
<!-- src/pages/ContactPage.vue -->
<template>
  <section class="contact">
    <h1>Contact</h1>
    <ul>
      <li><span>Email</span><a href="mailto:chogaeull@gmail.com">chogaeull@gmail.com</a></li>
      <li><span>GitHub</span><a href="https://github.com/autumn-scv" target="_blank" rel="noopener">github.com/autumn-scv</a></li>
      <li><span>Instagram</span><a href="https://www.instagram.com/lets__survive" target="_blank" rel="noopener">@lets__survive</a></li>
    </ul>
  </section>
</template>

<style scoped>
.contact { max-width: 720px; margin: 0 auto; padding: 4rem 2rem; }
h1 { font-size: 1.6rem; margin-bottom: 2rem; }
ul { list-style: none; }
li { display: flex; gap: 2rem; padding: 1rem 0; border-bottom: 1px solid #eee; }
li span { width: 100px; color: #999; }
li a { text-decoration: none; }
</style>
```

시안과 항목이 다르면 시안을 따른다.

- [ ] **Step 3: 테스트·빌드 확인 후 Commit**

Run: `npm run test` → PASS, `npm run build` → 성공

```powershell
git add -A; git commit -m "feat: 연락 페이지를 구현한다"
```

---

### Task 9: 마무리 — README, 최종 점검, push

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: 전체

- [ ] **Step 1: README 작성**

```markdown
# nona

조가을 개인 포트폴리오 사이트. 쇼핑몰 컨셉(작업물 = 상품)의 Vue 3 SPA.

## 실행

​```bash
npm install
npm run dev    # 개발 서버
npm run test   # 테스트
npm run build  # 배포 빌드
​```

## 구조

- `src/data/works.js` — 모든 작업물 콘텐츠의 단일 원천.
  작업물 추가 = 객체 하나 + `src/assets/works/<slug>/` 이미지.
- `src/pages/` — 홈 / 목록 / 상세(공용 템플릿) / 연락
- 배포: Vercel (GitHub 연동, push 시 자동 배포)
```

- [ ] **Step 2: 전체 라우트 육안 점검**

Run: `npm run dev` → `/`, `/works`, `/works/bappy`, `/works/album`, `/contact`, 존재하지 않는 `/works/xxx` 를 확인. 각 화면을 시안 PNG 와 비교해 어긋난 여백·색을 수정.

- [ ] **Step 3: 최종 확인 후 Commit & push**

Run: `npm run test` → PASS, `npm run build` → 성공

```powershell
git add -A; git commit -m "docs: README 를 실제 프로젝트에 맞게 쓴다"
git push origin master
```

push 후 사용자가 Vercel 에서 GitHub 연동으로 저장소를 임포트하면 배포 완료.
