<template>
  <div class="public-layout">
    <Navbar />
    <main class="public-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  
import Navbar from '../../views/public-components/Navbar.vue'
</script>
