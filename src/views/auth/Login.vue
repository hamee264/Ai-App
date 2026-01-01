<template>
  <div class="container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>

      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="input-group">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <div class="input-group remember">
        <input type="checkbox" v-model="rememberMe" />
        <label>Remember me</label>
      </div>

      <!-- LOGIN BUTTON -->
      <button type="submit" class="btn btn-primary btn-block">
        Login
      </button>

      <!-- AUTH LINKS -->
      <div class="auth-links">
        <router-link to="/auth/forgot-password">
          Forgot password?
        </router-link>

        <div class="divider"></div>

        <span>Don’t have an account?</span>
        <router-link to="/auth/register">
          Create one
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from '/src/lib/supabase'

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false
    }
  },

  methods: {
    async handleLogin() {
      this.loading = true

      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })

      this.loading = false

      if (error) {
        alert(error.message)
        return
      }

      // replace prevents back navigation
      this.$router.replace('/dashboard')
    }
  }
}
</script>

<style src="/src/assets/css/auth.css"></style>
