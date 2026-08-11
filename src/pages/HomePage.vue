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
