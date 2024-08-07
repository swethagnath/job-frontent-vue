<script setup>
    import {defineProps} from 'vue'
    defineProps({
        title: {
            type: String,
            default: "Become  a vue dev"
        },
        subtitle: {
            type: String,
            default: "Find jobs that fit your skills and needs"
        }
    })
</script>
<template>
    <!-- Landing Page Section -->
    <div class="py-20 bg-blue-50">
        <div class="max-w-full px-4 mx-auto lg:max-w-108rem sm:px-6 lg:px-8">
            <div class="text-center">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">{{title}}</h1>
            <p class="mt-4 text-lg text-gray-600">{{subtitle}}</p>
            </div>
        </div>
    </div>
</template>