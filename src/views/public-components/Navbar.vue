<template>
  <nav class="navbar">
    <div class="nav-container">

      <!-- LEFT: LOGO -->
      <div class="nav-left">
        <div class="logo-icon"></div>
        <span class="logo-text">TaskAI</span>
      </div>

      <!-- RIGHT -->
      <div class="nav-right">

        <!-- LINKS -->
        <ul class="nav-links" :class="{ open: isOpen }">

          <!-- CLOSE BUTTON (MOBILE) -->
          <li class="close-btn mobile-only">
            <button @click="closeMenu">
              <i class="fas fa-xmark"></i>
            </button>
          </li>

          <!-- HOME -->
          <li>
            <a href="#home" @click="closeMenu">
              <i class="fas fa-house"></i> Home
             </a>
          </li>

          <!-- FEATURES (SCROLL) -->
          <li>
            <a href="#features" @click="closeMenu">
              <i class="fas fa-layer-group"></i> Features
            </a>
          </li>

          <!-- FAQ (SCROLL) -->
          <li>
            <a href="#faq" @click="closeMenu">
              <i class="fas fa-circle-question"></i> FAQ
            </a>
          </li>

          <!-- MOBILE AUTH -->
          <li class="mobile-only">
            <router-link to="/auth/login" @click="closeMenu">
              <i class="fas fa-right-to-bracket"></i> Login
            </router-link>
          </li>

          <li class="mobile-only">
            <router-link to="/auth/register" @click="closeMenu">
              <i class="fas fa-user-plus"></i> Sign up
            </router-link>
          </li>

        </ul>

        <!-- DESKTOP AUTH -->
        <router-link  v-if="!session" to="/auth/login" class="nav-login desktop-only">
          <i class="fas fa-right-to-bracket"></i> Login
        </router-link>

        <router-link to="/auth/register" class="nav-btn desktop-only">
          <i class="fas fa-user-plus"></i> Sign up
        </router-link>

        <!-- HAMBURGER -->
        <button class="menu-btn" @click="openMenu">
          <i class="fas fa-bars"></i>
        </button>

      </div>
    </div>

    <!-- OVERLAY -->
    <div class="nav-overlay" v-if="isOpen" @click="closeMenu"></div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openMenu = () => {
  isOpen.value = true
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped src="/src/assets/css/public-layout-navbar.css"></style>
