<script setup>
// Left column: heading, description, illustration
</script>

<template>
  <section class="hero">
    <h1 class="hero__title">
      Finish!<br />
      Upload Your Resume
    </h1>
    <p class="hero__desc">
      Upload your resume, the platform will help you parse and optimize, you can
      also edit it later.
    </p>

    <div class="hero__art" aria-hidden="true">
      <!-- Placeholder illustration: replace with the exported asset -->
      <img src="../assets/illustration.svg" alt="" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 420px;
}

.hero__title {
  margin: 0;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.hero__desc {
  margin: 0;
  max-width: 360px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.hero__art {
  margin-top: var(--space-6);
}

.hero__art img {
  width: 100%;
  max-width: 360px;
  height: auto;
  display: block;
}

@media (max-width: 900px) {
  .hero {
    max-width: none;
    text-align: center;
    align-items: center;
  }

  .hero__art {
    margin-top: var(--space-4);
  }
}
</style>
