<template>
  <div class="container">
    <form>
      <h2>Create Account</h2>

      <div class="input-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="John Doe"
          required
        />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>

      <div class="input-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>

      <button type="submit">Register</button>

      <!-- LOGIN LINK -->
      <div class="auth-links">
        <span>Already have an account?</span>
        <router-link to="/auth/login">
          Login
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
      loading: false
    }
  },

  methods: {
    async handleRegister() {
      this.loading = true

      const { error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      })

      this.loading = false

      if (error) {
        alert(error.message)
        return
      }

      alert('Check your email to confirm your account')
      this.$router.replace('/auth/login')
    }
  }
}
</script>


<style src="/src/assets/css/auth.css"></style>
