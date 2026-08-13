<template>
  <section class="hero">
    <div class="intro">
      <h1>조가을 Chogaeul</h1>
      <p class="lines">
        화면을 디자인하고, 그 화면을 직접 코드로 만듭니다.<br />
        이 포트폴리오도 Figma 로 그린 뒤 직접 구현해 배포했습니다.<br />
        좋은 서비스는 팀이 같은 단어를 쓸 때 나온다고 믿습니다.<br />
        기능을 만들기 전에 왜 필요한지부터 정리합니다.<br />
        지금은 백엔드에서 데이터가 어긋나지 않는 구조를 연습하고 있습니다.<br />
        나중에 누군가 아플 일을 미리 없애는 데 시간을 씁니다.<br />
        디자인과 개발 사이를 잇는 개발자로 성장하고자 합니다.
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
