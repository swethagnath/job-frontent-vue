<script setup>
    import { ref, onMounted } from 'vue'
    import {RouterLink} from 'vue-router'
    import { useAuthStore } from '@/stores/auth';
    
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }
    const authStore = useAuthStore()

    onMounted(() => {authStore.getUser()})
    
</script>

<template>
    <div>
        <nav class="bg-gray-800">
            <div class="px-2 mx-w-full sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center text-white">
                    Workflow
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                    <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <svg v-if="!isMenuOpen" class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                        <svg v-else class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="flex items-center justify-end flex-1 sm:items-stretch sm:justify-end">
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <div v-if="authStore.user">
                                <form @submit.prevent="authStore.logout" action="">
                                    <button class="text-white">Logout</button>
                                    <RouterLink to="/" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Home</RouterLink>
                                    <RouterLink to="/jobs" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">My Jobs</RouterLink>
                                    <RouterLink to="/jobs/add" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Add Jobs</RouterLink>
                                </form>
                            </div>
                            <div v-else>
                                <RouterLink to="/login" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Login</RouterLink>
                                <RouterLink to="/register" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Register</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div v-if="isMenuOpen" class="sm:hidden" id="mobile-menu">
                <div class="flex flex-col items-center px-2 pt-2 pb-3 space-y-1">
                    <div v-if="authStore.user">
                        <RouterLink :to="{name: 'home'}" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Home</RouterLink>
                        <RouterLink :to="{name: 'jobs'}" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Jobs</RouterLink>
                        <RouterLink :to="{name: 'add-job'}" class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Add Jobs</RouterLink>
                    </div>
                    <div v-else>
                        <RouterLink to="/login" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Login</RouterLink>
                        <RouterLink to="/register" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Register</RouterLink>
                    </div>
                </div>
            </div>
        </nav> 
    </div>
</template>

