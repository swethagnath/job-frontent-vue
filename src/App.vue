<script setup>
  import Navbar from '@/components/Navbar.vue'
  import {RouterView} from 'vue-router'
  import { useAuthStore } from './stores/auth';
  import { onMounted } from 'vue';
  
  const authStore = useAuthStore()

  onMounted(() => {authStore.getUser()})
</script>

<template>
  <Navbar/>
  <RouterView/>
</template>

