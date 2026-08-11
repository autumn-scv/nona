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
