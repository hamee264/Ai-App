<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '/src/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.init()
})
</script>

<template>
  <router-view />
</template>
