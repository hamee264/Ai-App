<template>
  <div class="settings">

    <!-- HEADER -->
    <div class="settings-header">
      <h1>Settings</h1>
      <p>Personalize your experience and manage sessions</p>
    </div>

    <!-- SETTINGS GRID -->
    <div class="settings-grid">

      <!-- PROFILE -->
      <div class="settings-card">
        <h2>Profile</h2>
        <p class="hint">Basic information associated with your account</p>

        <div class="field">
          <label>Name</label>
          <input type="text" placeholder="Not set" />
        </div>

        <div class="field">
          <label>Email</label>
          <input type="email" placeholder="Not set" disabled />
        </div>

        <button class="ghost-btn">Save</button>
      </div>

      <!-- SECURITY -->
      <div class="settings-card">
        <h2>Security</h2>
        <p class="hint">Change your password if needed</p>

        <div class="field">
          <label>New password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
          />
        </div>

        <div class="field">
          <label>Confirm password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
          />
        </div>

        <div class="toggle">
          <span>Show password</span>
          <input type="checkbox" v-model="showPassword" />
        </div>

        <button class="ghost-btn">Update</button>
      </div>

      <!-- PREFERENCES -->
      <div class="settings-card">
        <h2>Preferences</h2>
        <p class="hint">Control app behavior</p>

        <div class="toggle">
          <span>Notifications</span>
          <input type="checkbox" />
        </div>

        <div class="toggle">
          <span>AI Assistance</span>
          <input type="checkbox" />
        </div>
      </div>

      <!-- SESSION -->
      <div class="settings-card session">
        <h2>Session</h2>
        <p class="hint">
          Log out from this device. You can sign back in anytime.
        </p>

        <button class="logout-btn" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)

const handleLogout = () => {
  // Remove user session
  localStorage.removeItem('user')

  // Redirect to login
  router.replace('/auth/login')

}
</script>

<style scoped>
/* =====================
   BASE
===================== */
.settings {
  background: #000;
  color: #fff;
  min-height: 100vh;
  padding: 2rem 2.25rem;
}

/* =====================
   HEADER
===================== */
.settings-header {
  margin-bottom: 2.2rem;
}

.settings-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.settings-header p {
  color: #9e9e9e;
  font-size: 0.95rem;
}

/* =====================
   GRID
===================== */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

/* =====================
   CARD
===================== */
.settings-card {
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 18px;
  padding: 1.8rem;
}

.settings-card h2 {
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
}

.hint {
  font-size: 0.85rem;
  color: #8d8d8d;
  margin-bottom: 1.4rem;
}

/* =====================
   FORM
===================== */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.1rem;
}

.field label {
  font-size: 0.8rem;
  color: #bdbdbd;
}

.field input {
  background: #000;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 0.65rem 0.8rem;
  color: #fff;
  font-size: 0.9rem;
}

.field input:disabled {
  opacity: 0.5;
}

/* =====================
   TOGGLE
===================== */
.toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #1f1f1f;
}

.toggle span {
  font-size: 0.9rem;
}

/* =====================
   BUTTONS
===================== */
.ghost-btn {
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 0.55rem 1.2rem;
  border-radius: 12px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.ghost-btn:hover {
  border-color: #fff;
}

/* =====================
   SESSION
===================== */
.session {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logout-btn {
  margin-top: 1.5rem;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.7rem 1.2rem;
  border-radius: 14px;
  font-size: 0.9rem;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #fff;
  color: #000;
}

/* =====================
   MOBILE
===================== */
@media (max-width: 600px) {
  .settings-header h1 {
    font-size: 1.6rem;
  }
}
</style>
