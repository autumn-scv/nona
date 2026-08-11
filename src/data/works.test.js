import { describe, it, expect } from 'vitest'
import works, { findWork } from './works.js'

describe('works 데이터', () => {
  it('모든 작업물이 필수 필드를 갖는다', () => {
    expect(works.length).toBeGreaterThanOrEqual(7)
    for (const w of works) {
      expect(w.slug).toMatch(/^[a-z0-9-]+$/)
      expect(w.title).toBeTruthy()
      expect(w.price).toBeTruthy()
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
