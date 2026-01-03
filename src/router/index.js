import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '/src/stores/auth'

/* ================= LAYOUTS ================= */
import PublicLayout from '/src/components/layout/PublicLayout.vue'
import AppLayout from '/src/components/layout/AppLayout.vue'
import AuthLayout from '/src/components/layout/AuthLayout.vue'

/* ================= PUBLIC ================= */
import Home from '/src/views/public-components/Home.vue'
import Faq from '/src/views/public-components/Faq.vue'
import Features from '/src/views/public-components/Features.vue'

/* ================= AUTH ================= */
import Login from '/src/views/auth/Login.vue'
import Register from '/src/views/auth/Register.vue'
import ForgotPassword from '/src/views/auth/ForgotPassword.vue'
import ResetPassword from '/src/views/auth/ResetPassword.vue'

/* ================= APP ================= */
import Dashboard from '/src/views/app-components/Dashboard.vue'
import Todos from '/src/views/app-components/Todos.vue'
import AiChat from '/src/views/app-components/AiChat.vue'
import Settings from '/src/views/app-components/Settings.vue'

/* ================= ROUTES ================= */
const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'faq', component: Faq },
      { path: 'features', component: Features }
    ]
  },

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
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

/* ================= ROUTER ================= */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/* ================= AUTH GUARD ================= */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // wait until auth is ready
  if (auth.loading) {
    next()
    return
  }

  // protected route → not logged in
  if (to.meta.requiresAuth && !auth.user) {
    next('/auth/login')
    return
  }

  // logged in → block auth pages
  if (to.path.startsWith('/auth') && auth.user) {
    next('/dashboard')
    return
  }

  next()
})

export default router
