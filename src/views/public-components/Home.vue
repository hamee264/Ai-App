<template>
  <div class="home">

    <!-- HERO -->
    <HeroPage />

    <!-- FEATURES SECTION -->
    <section id="features">
      <Features />
    </section>

    <!-- FAQ SECTION -->
    <section id="faq">
      <Faq />
    </section>
    <!-- FOOTER -->
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import HeroPage from './HeroPage.vue'
import Features from './Features.vue'
import Faq from './Faq.vue'
import Footer from './Footer.vue';
</script>

<style>
/* Optional spacing between sections */
#features,
#faq {
  scroll-margin-top: 80px; /* prevents navbar overlap */
}
</style>
