<script setup>
    import {reactive} from 'vue'
    import router from '@/router'
    
    const form = reactive({
        name: '',
        description: '',
        salary: '',
        location: '',
        company: ''
    })

    const handleSubmit = async () => {
        const newJob = {
            name: form.name,
            description: form.description,
            salary: form.salary,
            location: form.location,
            company: form.company
        }

        try{
            const res = await fetch('http://localhost:8000/api/jobs', {
                method: "post",
                body: JSON.stringify(newJob),
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            router.push(`/jobs/${data.id}`)
        }catch(err){
            console.log('Error fetching job', err)
        }
    }

</script>
<template>
    <div class="flex items-center justify-center min-h-screen px-4">
        <!-- Form Section -->
        <div class="w-1/2 p-6 bg-white rounded-lg shadow">
            <h2 class="mb-4 text-2xl font-semibold text-center text-gray-900">Job Form</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="jobName" class="block text-sm font-medium text-gray-700">Job Name</label>
                <input v-model='form.name' type="text" id="jobName" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea v-model='form.description' id="description" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
                <label for="salary" class="block text-sm font-medium text-gray-700">Salary</label>
                <input v-model='form.salary' type="number" id="salary" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                <input v-model='form.location' type="text" id="location" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label for="location" class="block text-sm font-medium text-gray-700">Company</label>
                <input v-model='form.company' type="text" id="location" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="text-center">
                <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Submit</button>
            </div>
            </form> 
        </div>
    </div>
</template>