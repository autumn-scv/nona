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
