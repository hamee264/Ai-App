<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h2>Forgot Password</h2>

      <p class="auth-description">
        Enter your email address and we’ll send you a link to reset your password.
      </p>

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

      <button type="submit">Send reset link</button>

      <!-- BACK TO LOGIN -->
      <div class="auth-links">
        <router-link to="/auth/login">
          Back to login
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
      email: ''
    }
  },

  methods: {
    async sendReset() {
      const { error } = await supabase.auth.resetPasswordForEmail(
        this.email,
        {
          redirectTo: 'http://localhost:5173/auth/reset-password'
        }
      )

      if (error) {
        alert(error.message)
        return
      }

      alert('Password reset email sent')
    }
  }
}
</script>

<style src="/src/assets/css/auth.css"></style>
