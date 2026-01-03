<template>
  <div class="app-layout">

    <!-- MOBILE OVERLAY -->
    <div
      v-if="sidebarOpen"
      class="overlay"
      @click="sidebarOpen = false"
    ></div>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="logo">
        <span>TaskAI</span>
        <button class="close-btn mobile-only" @click="sidebarOpen = false">
          <i class="fas fa-xmark"></i>
        </button>
      </div>

      <nav class="menu">
        <router-link to="/dashboard" @click="sidebarOpen = false">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/todos" @click="sidebarOpen = false">
          <i class="fas fa-list-check"></i>
          <span>Tasks</span>
        </router-link>

        <router-link to="/ai-chat" @click="sidebarOpen = false">
          <i class="fas fa-robot"></i>
          <span>AI Chat</span>
        </router-link>

        <div class="menu-divider"></div>

        <router-link to="/settings" @click="sidebarOpen = false">
          <i class="fas fa-gear"></i>
          <span>Settings</span>
        </router-link>
      </nav>
    </aside>

    <!-- MAIN -->
    <div class="main">

      <!-- NAVBAR -->
      <header class="navbar">
        <div class="nav-left">
          <button class="menu-btn mobile-only" @click="sidebarOpen = true">
            <i class="fas fa-bars"></i>
          </button>
          <span class="page-title">{{ pageTitle }}</span>
        </div>

        <!-- PROFILE -->
        <div class="nav-actions" v-if="!auth.loading && auth.user">
          <button class="icon-btn">
            <i class="fas fa-bell"></i>
          </button>

          <div class="profile">
            <div class="avatar">
              <img v-if="avatarUrl" :src="avatarUrl" />
              <span v-else>{{ initials }}</span>
            </div>

            <span class="username">{{ name }}</span>

            <button class="logout-btn" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- PAGE CONTENT -->
      <main class="content">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '/src/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const sidebarOpen = ref(false)

/* ---------------- INIT AUTH ---------------- */
onMounted(async () => {
  if (auth.loading) {
    await auth.init()
  }

  if (!auth.user) {
    router.replace('/auth/login')
  }
})

/* ---------------- PAGE TITLE ---------------- */
const pageTitle = computed(() => {
  const map = {
    '/dashboard': 'Dashboard',
    '/todos': 'Tasks',
    '/ai-chat': 'AI Chat',
    '/settings': 'Settings'
  }
  return map[route.path] || 'Dashboard'
})

/* ---------------- PROFILE DATA ---------------- */
const name = computed(() => auth.profile?.name || 'User')
const avatarUrl = computed(() => auth.profile?.avatar_url || null)

const initials = computed(() => {
  return name.value
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

/* ---------------- LOGOUT ---------------- */
const logout = async () => {
  await auth.logout()
  router.replace('/auth/login')
}
</script>

<style scoped>
/* =====================
   BASE
===================== */
* {
  box-sizing: border-box;
}

.app-layout {
  display: flex;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

/* =====================
   SIDEBAR
===================== */
.sidebar {
  width: 240px;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.logo {
  padding: 1.75rem 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
}

.menu a {
  color: #fff;
  padding: 0.85rem 1rem;
  margin-bottom: 0.3rem;
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  transition: 0.2s;
}

.menu a:hover,
.menu a.router-link-active {
  background: #fff;
  color: #000;
}

.menu-divider {
  height: 1px;
  background: rgba(255,255,255,0.2);
  margin: 1rem 0;
}

/* =====================
   MAIN
===================== */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* =====================
   NAVBAR
===================== */
.navbar {
  height: 64px;
  padding: 0 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  border-bottom: 1px solid #111;
  position: sticky;
  top: 0;
  z-index: 5;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-weight: 600;
  color: #fff;
}

/* =====================
   NAV ACTIONS
===================== */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-btn {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.45rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
}

.profile {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: #000;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 0.85rem;
  color: #fff;
}

.logout-btn {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
}

/* =====================
   CONTENT
===================== */
.content {
  flex: 1;
  overflow-y: auto;
  background: #000;
}

/* =====================
   OVERLAY
===================== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9;
}

/* =====================
   MOBILE
===================== */
.mobile-only {
  display: none;
}

.menu-btn,
.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .mobile-only {
    display: inline-flex;
  }
}
</style>
