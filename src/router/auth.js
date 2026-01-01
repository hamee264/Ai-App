import router from './index'

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  // Route requires auth but user is NOT logged in
  if (to.meta.requiresAuth && !user) {
    return next('/auth/login')
  }

  // User is logged in but tries to access auth pages
  if (
    user &&
    to.path.startsWith('/auth')
  ) {
    return next('/dashboard')
  }

  next()
})
export default router
