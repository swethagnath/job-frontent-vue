<script setup>
    import {reactive} from 'vue'
    import {useAuthStore} from '@/stores/auth'
    import { storeToRefs } from 'pinia';
    
    const {errors} = storeToRefs(useAuthStore())
    const {authenticate} = useAuthStore()
    
    const formData  = reactive({
        email: '',
        password: '',
    })
</script>


<template>
    <main class="flex items-center justify-center min-h-screen">  
        <div class="w-1/2 p-8 bg-white rounded shadow-md">
            <h2 class="mb-6 text-2xl font-bold text-center">Login to your account</h2>
            <form @submit.prevent="() => {authenticate('login', formData)}" action="#" method="POST" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="formData.email" type="email" id="email" name="email" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="formData.password" type="password" id="password" name="password" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
                </div>
                <div>
                    <button type="submit" class="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </div>
            </form>
        </div>
    </main>
</template>