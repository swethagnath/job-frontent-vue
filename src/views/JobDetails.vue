<script setup>
    import {reactive, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    
    const route = useRoute()

    const jobId = route.params.id
    
    const state = reactive({
        job: {},
        isLoading: true
    })
 
    onMounted(async () => {
        try{
            const res = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'
            }
        })
            state.job = await res.json()
        }catch(err){
            console.log('error fetching jobs', err)
        }finally{
            state.isLoading = false
        }
    })
    console.log(state)
</script>

<template>
    <div>
    <div v-if="!state.isLoading" class="py-12">
      <div class="max-w-full px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8"> 
        <div class="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
            <div class="overflow-hidden">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-gray-900">{{ state.job.name }}</h2>
                    <p class="mt-4 text-gray-600">{{ state.job.description }}</p>
                    <p class="mt-4 text-gray-600">{{ state.job.location }}</p>
                    <p class="mt-4 text-gray-600">{{ state.job.country }}</p>
                    <p class="mt-4 text-gray-600">{{ state.job.company }}</p>
                    <p class="mt-4 text-gray-600">Salary ${{ state.job.salary }}</p>
                </div>
             </div>   
        </div>
      </div>
    </div>
</div>
</template>