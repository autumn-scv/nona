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
