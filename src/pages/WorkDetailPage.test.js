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
