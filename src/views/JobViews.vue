<script setup>
    import {reactive, onMounted} from 'vue'
    import JobListings from '@/components/MyJobListings.vue'
   
    const state = reactive({
        jobs: [],
        isLoading: true
    })
    
    onMounted(async () => {
        try{
            const response = await fetch('http://localhost:8000/api/myjobs', {headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'}
            })
            const {job} = await response.json()
            state.jobs = job
        }catch(err){
            console.log('error fetching jobs', err)
        }finally{
            state.isLoading = false
        }
    })
</script>

<template>
    <div>

    <div v-if="!state.isLoading" class="py-12 bg-white">
      <div class="max-w-full px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8"> 
        <div class="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
            <h1 v-if="state.jobs && !state.jobs.length">Please add jobs</h1>
            <JobListings v-for="job in state.jobs" :key="job.id"  :job="job"/>
        </div>
      </div>
    </div>
    <div v-else="state.isLoading" class="py-6 text-center text-gray-500">
        <!-- <PulseLoader /> -->
    </div> 
</div>
</template>