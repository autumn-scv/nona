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
