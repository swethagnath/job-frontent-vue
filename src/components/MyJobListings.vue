<script setup>  
    import router from '@/router'
    import {RouterLink} from 'vue-router'
    const props = defineProps({
        job: Object
    })

    const removeJob = async (jobId) => {
      try{
        const res = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
          method: "delete",
          headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'
          }
        })
        router.push('/')
      }catch(err){
        console.log(err)
          console.error('err delete')
      } 
    }
</script>

<template>
   <!-- First Card -->
    <div class="flex flex-col mt-6 space-x-4 md:flex-row">
      <div class="flex flex-col overflow-hidden bg-gray-100 rounded-lg shadow">
        <div class="flex flex-col flex-grow p-6">
          <div class="flex flex-col mb-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ job.name }}</h2>
          </div>
          <p class="flex-grow text-gray-600">{{ job.description }}</p>
        </div>
        <div class="w-1/2">
          <RouterLink  :to="{ name: 'job-detail', params: { id: job.id }}" class="px-6 py-4 text-sm font-medium text-center text-black rounded-md">Read More</RouterLink>
          <!-- <a href="#" class="px-6 py-4 text-sm font-medium text-center text-black rounded-md">Read More</a> -->
        </div>
        <div class="flex flex-col overflow-hidden bg-gray-200 rounded-lg shadow">
          <div class="flex flex-col flex-grow p-6">
            <div class="flex space-x-4">
              <RouterLink :to="`/jobs/edit/${job.id}`" class="block px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-md hover:bg-green-700">Edit Job</RouterLink>
              <button @click="removeJob(job.id)" href="#" class="block px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-700">Delete Job</button>
            </div>
          </div>
      </div>
      </div> 
        <!-- Second Card -->
     
    </div>
</template>