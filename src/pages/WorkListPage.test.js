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
