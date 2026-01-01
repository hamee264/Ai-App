<template>
  <div class="container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>

      <div class="input-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div class="input-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          required
        />
      </div>

      <p v-if="errorMsg" class="error">
        {{ errorMsg }}
      </p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div class="auth-links">
        <span>No account?</span>
        <router-link to="/auth/register">
          Register
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

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
    return
  }

  // redirect after login
  router.replace('/dashboard')
}
</script>

<style src="/src/assets/css/auth.css"></style>
