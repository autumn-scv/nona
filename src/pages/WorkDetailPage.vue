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
