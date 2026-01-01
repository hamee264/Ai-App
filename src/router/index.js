import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '/src/lib/supabase'

// layouts
import PublicLayout from '/src/components/layout/PublicLayout.vue'
import AppLayout from '/src/components/layout/AppLayout.vue'
import AuthLayout from '/src/components/layout/AuthLayout.vue'

// public pages
import Home from '/src/views/public-components/Home.vue'
import Faq from '/src/views/public-components/Faq.vue'
import Features from '/src/views/public-components/Features.vue'

// auth pages
import Login from '/src/views/auth/Login.vue'
import Register from '/src/views/auth/Register.vue'
import ForgotPassword from '/src/views/auth/ForgotPassword.vue'
import ResetPassword from '/src/views/auth/ResetPassword.vue'

// private pages
import Dashboard from '/src/views/app-components/Dashboard.vue'
import Todos from '/src/views/app-components/Todos.vue'
import AiChat from '/src/views/app-components/AiChat.vue'
import Settings from '/src/views/app-components/Settings.vue'

/* ================= ROUTES ================= */
const routes = [
  /* -------- PUBLIC -------- */
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'faq', component: Faq },
      { path: 'features', component: Features }
    ]
  },

  /* -------- AUTH -------- */
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'reset-password', component: ResetPassword }
    ]
  },

  /* -------- APP (PROTECTED) -------- */
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'todos', component: Todos },
      { path: 'ai-chat', component: AiChat },
      { path: 'settings', component: Settings }
    ]
  }
]

/* ================= ROUTER ================= */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/* ================= SUPABASE AUTH GUARD ================= */
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const session = data.session

  // Not logged in → trying to access protected page
  if (to.meta.requiresAuth && !session) {
    next('/auth/login')
    return
  }

  // Logged in → trying to access auth pages
  if (to.path.startsWith('/auth') && session) {
    next('/dashboard')
    return
  }

  next()
})

export default router
