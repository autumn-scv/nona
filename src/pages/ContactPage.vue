<template>
  <section class="contact">
    <div class="header">
      <h1>Contact</h1>
      <p class="subtitle">You can contact me through the channels below.</p>
    </div>
    <div class="contact-grid">
      <a href="https://www.linkedin.com/in/autumnrkf/" target="_blank" rel="noopener" class="contact-card">
        <div class="icon" aria-hidden="true">💼</div>
        <div class="label">linkedin.com/in/autumnrkf</div>
      </a>
      <a href="mailto:whgaeul@gmail.com" class="contact-card">
        <div class="icon" aria-hidden="true">💬</div>
        <div class="label">whgaeul@gmail.com</div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: #999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.label {
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
