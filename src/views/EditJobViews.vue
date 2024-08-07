<script setup>
    import {reactive, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    import router from '@/router'
    
    const route = useRoute()

    const jobId = route.params.id
    
    const form = reactive({
        name: '',
        description: '',
        salary: '',
        location: '',
        company: ''
    })

    const state = reactive({
        job: {},
        isLoading: true
    })

    const handleSubmit = async () => {
        const updateJob = {
            name: form.name,
            description: form.description,
            salary: form.salary,
            location: form.location,
            company: form.company
        }
        try{
            const res = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
                method: "PUT",
                body: JSON.stringify(updateJob),
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            state.job = await res.json()
            console.log(state)
            router.push(`/jobs`)
        }catch(err){
            console.log('Error fetching job', err)
        }finally{
            state.isLoading = false
        }  
    }

    onMounted(async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            state.job = await response.json()
            form.name =  state.job.name
            form.description = state.job.description
            form.salary = state.job.salary
            form.location = state.job.location
            form.company =  state.job.company
        }catch(err){
            console.log('Error fetching job', err)
        }finally{
            state.isLoading = false
        }
    })

</script>
<template>
    <div class="px-4 mt:12 lg:w-1/2">
        <!-- Form Section -->
        <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="mb-4 text-2xl font-semibold text-center text-gray-900">Edit Job Form</h2>
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
                <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Update</button>
            </div>
            </form>
        </div>
    </div>
</template>