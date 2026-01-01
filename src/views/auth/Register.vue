<template>
  <div class="container">
    <form @submit.prevent="handleRegister">
      <h2>Create Account</h2>

      <!-- FULL NAME -->
      <div class="input-group">
        <label>Full Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="John Doe"
          required
        />
      </div>

      <!-- EMAIL -->
      <div class="input-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <!-- PASSWORD -->
      <div class="input-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          required
        />
      </div>

      <!-- CONFIRM PASSWORD -->
      <div class="input-group">
        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          required
        />
      </div>

      <!-- ERROR MESSAGE -->
      <p v-if="errorMsg" class="error">
        {{ errorMsg }}
      </p>

      <!-- SUBMIT -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Register' }}
      </button>

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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '/src/lib/supabase'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleRegister = async () => {
  errorMsg.value = ''

  // 🔐 Password validation
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
    return
  }

  loading.value = true

  // ✅ SIGN UP (profile created by DB trigger)
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value // 👈 goes to raw_user_meta_data
      }
    }
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
    return
  }

  // ✅ Redirect after successful signup
  router.replace('/dashboard')
}
</script>

<style src="/src/assets/css/auth.css"></style>
