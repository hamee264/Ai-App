<template>
  <div class="settings">

    <!-- HEADER -->
    <header class="settings-header">
      <h1>Settings</h1>
      <p>Manage your account</p>
    </header>

    <!-- PROFILE -->
    <section class="card">

      <h2>Profile</h2>

      <div class="avatar-row">
        <img
          v-if="profile.avatar_url"
          :src="profile.avatar_url"
          class="avatar"
        />

        <div v-else class="avatar placeholder">
          {{ initials }}
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="handleAvatarUpload"
        />

        <button class="image-btn" @click="fileInput.click()">
          Choose image
        </button>
      </div>

      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label>Username</label>
          <input v-model="profile.username" required />
        </div>

        <div class="form-group">
          <label>Bio</label>
          <textarea v-model="profile.bio" />
        </div>

        <button class="save-btn" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save changes' }}
        </button>
      </form>

    </section>

    <!-- ACCOUNT -->
    <section class="card danger">

      <h2>Account</h2>

      <button class="logout-btn" @click="logout">
        Log out
      </button>

      <button class="delete-btn" @click="deleteAccount">
        Delete account
      </button>

    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '/src/lib/supabase'

const router = useRouter()
const fileInput = ref(null)
const saving = ref(false)

const profile = ref({
  id: '',
  username: '',
  bio: '',
  avatar_url: ''
})

/* ---------------- INITIALS ---------------- */
const initials = computed(() => {
  return profile.value.username
    ? profile.value.username[0].toUpperCase()
    : '?'
})

/* ---------------- LOAD PROFILE ---------------- */
const loadProfile = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (data) profile.value = data
}

/* ---------------- SAVE PROFILE ---------------- */
const saveProfile = async () => {
  saving.value = true

  const { data: { session } } = await supabase.auth.getSession()

  await supabase.from('profiles').upsert({
    id: session.user.id,
    username: profile.value.username,
    bio: profile.value.bio,
    avatar_url: profile.value.avatar_url,
    updated_at: new Date()
  })

  saving.value = false
}

/* ---------------- AVATAR UPLOAD (FIXED) ---------------- */
const handleAvatarUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const ext = file.name.split('.').pop()
  const filePath = `${session.user.id}.${ext}`

  // Upload
  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (error) {
    console.error(error)
    return
  }

  // Get public URL + cache buster
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  profile.value.avatar_url =
    `${data.publicUrl}?t=${Date.now()}`

  await saveProfile()
}

/* ---------------- LOGOUT ---------------- */
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/auth/login')
}

/* ---------------- DELETE ACCOUNT ---------------- */
const deleteAccount = async () => {
  const confirmDelete = confirm(
    'This will permanently delete your account. Continue?'
  )
  if (!confirmDelete) return

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  // Remove avatar
  await supabase.storage
    .from('avatars')
    .remove([`${session.user.id}.png`, `${session.user.id}.jpg`])

  // Remove profile
  await supabase
    .from('profiles')
    .delete()
    .eq('id', session.user.id)

  // Remove auth user
  await supabase.auth.admin.deleteUser(session.user.id)

  router.push('/')
}

onMounted(loadProfile)
</script>

<style scoped>
.settings {
  background: #000;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
}

.settings-header {
  margin-bottom: 2rem;
}

.card {
  max-width: 520px;
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 18px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
}

.avatar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.placeholder {
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.image-btn {
  background: #1f1f1f;
  border: 1px solid #2a2a2a;
  color: white;
  padding: 0.45rem 0.9rem;
  border-radius: 10px;
  cursor: pointer;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}

input,
textarea {
  background: #000;
  border: 1px solid #1f1f1f;
  border-radius: 12px;
  padding: 0.7rem;
  color: white;
}

.save-btn {
  width: 100%;
  background: #6366f1;
  border: none;
  border-radius: 14px;
  padding: 0.75rem;
  font-weight: 600;
}

.logout-btn {
  width: 100%;
  border: 1px solid #ef4444;
  color: #ef4444;
  background: transparent;
  padding: 0.7rem;
  border-radius: 14px;
  margin-bottom: 0.7rem;
}

.delete-btn {
  width: 100%;
  background: #ef4444;
  border: none;
  padding: 0.7rem;
  border-radius: 14px;
  font-weight: 600;
}
</style>
