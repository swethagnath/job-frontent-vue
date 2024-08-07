<script setup>
    import {defineProps} from 'vue'
    const props = defineProps({
        job: Object
    })

    const {job} = props
</script>

<template>
    <div class="overflow-hidden bg-gray-200 rounded-lg shadow">
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ job.name }}</h2>
            <p class="mt-4 text-gray-600">{{ job.description }}</p>
            <RouterLink  :to="{ name: 'job-detail', params: { id: job.id }}" class="text-sm font-medium rounded-md text-black-300">Read More</RouterLink>
        </div>
    </div>                        
</template>