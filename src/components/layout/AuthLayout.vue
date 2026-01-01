<template>
  <div class="auth-layout">
    <!-- BACK TO HOME -->
    <router-link to="/" class="back-home">
      <div class="link content">
        <i class="fas fa-home"></i>
        <span>Back to Home</span>
      </div>
    </router-link>

    <!-- AUTH PAGES -->
    <router-view />
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
.auth-layout {

  background-color:#0a0a0a;
}
.back-home {
  position: fixed;
  top: 20px;
  left: 20px;
  color: #bdbdbd;
  text-decoration: none;
  font-size: 14px;
  z-index: 1000;
  padding: 8px 12px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  border-radius: 4px;
  gap: 6px;
}
</style>