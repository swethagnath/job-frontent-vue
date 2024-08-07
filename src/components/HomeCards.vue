<script setup>
   import JobListing from '@/components/JobListing.vue'
  import {onMounted, reactive} from 'vue'
  
   const state =  reactive([{    
        jobs: [],
        isLoading: true
    }])

    onMounted(async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/jobs`,  {headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'}
            })
            state.jobs = await response.json()
        }catch(err){
            console.log('error fetching jobs', err)
        }finally{
            state.isLoading = false
        }
    })
</script>

<template>
    <div class="py-12 bg-white">
      <div class="max-w-full px-4 mx-auto lg:max-w-108rem sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> 
            <div v-if="state.jobs && !state.jobs.length">Please add jobs</div>
            <JobListing v-for="job in state.jobs" :key="job.id"  :job="job"/>
        </div>
      </div>
    </div>
</template>

