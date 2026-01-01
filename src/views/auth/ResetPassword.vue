<template>
  <div class="auth-wrapper">
    <form class="auth-card" @submit.prevent="updatePassword">

      <h2>Reset Password</h2>
      <p class="subtitle">
        Enter a new password for your account
      </p>

      <!-- PASSWORD -->
      <div class="input-group">
        <label>New Password</label>
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="••••••••"
            required
          />
          <span @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
      </div>

      <!-- BUTTON -->
      <button class="primary-btn" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update Password' }}
      </button>

      <!-- FOOTER -->
      <router-link to="/auth/login" class="back-link">
        Back to login
      </router-link>

    </form>
  </div>
</template>

<script>
import { supabase } from '/src/lib/supabase'

export default {
  data() {
    return {
      password: '',
      showPassword: false,
      loading: false
    }
  },

  methods: {
    async updatePassword() {
      this.loading = true

      const { error } = await supabase.auth.updateUser({
        password: this.password
      })

      this.loading = false

      if (error) {
        alert(error.message)
        return
      }

      alert('Password updated successfully')
      this.$router.replace('/dashboard')
    }
  }
}
</script>

<style scoped>
/* =====================
   WRAPPER
===================== */
.auth-wrapper {
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

/* =====================
   CARD
===================== */
.auth-card {
  width: 100%;
  max-width: 420px;
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 18px;
  padding: 2rem;
  color: #fff;
  text-align: center;
}

/* =====================
   TEXT
===================== */
.auth-card h2 {
  font-size: 1.7rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #9e9e9e;
  margin-bottom: 1.8rem;
}

/* =====================
   INPUTS
===================== */
.input-group {
  text-align: left;
  margin-bottom: 1.4rem;
}

.input-group label {
  font-size: 0.8rem;
  color: #bdbdbd;
  margin-bottom: 0.4rem;
  display: block;
}

.password-field {
  display: flex;
  align-items: center;
  background: #000;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 0 0.8rem;
}

.password-field input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.7rem 0;
  font-size: 0.95rem;
}

.password-field span {
  cursor: pointer;
  color: #777;
  font-size: 0.9rem;
}

/* =====================
   BUTTON
===================== */
.primary-btn {
  width: 100%;
  background: #fff;
  color: #000;
  border: none;
  padding: 0.8rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.primary-btn:hover {
  background: #e5e5e5;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =====================
   FOOTER
===================== */
.back-link {
  display: inline-block;
  margin-top: 1.3rem;
  font-size: 0.85rem;
  color: #9e9e9e;
  text-decoration: none;
}

.back-link:hover {
  color: #fff;
}

/* =====================
   MOBILE
===================== */
@media (max-width: 480px) {
  .auth-card {
    padding: 1.6rem;
  }
}
</style>
