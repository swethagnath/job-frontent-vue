import {createRouter, createWebHistory} from 'vue-router'
import HomeView from  '@/views/HomeViews.vue'
import JobView from  '@/views/JobViews.vue'
import JobDetails from  '@/views/JobDetails.vue'
import AddJobView from '@/views/AddJobViews.vue'
import EditJobView from '@/views/EditJobViews.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView, 
            meta:   {auth: true}
        },
        {
            path: '/jobs/:id',
            name: 'job-detail',
            component: JobDetails,
            meta:   {auth: true}
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobView,
            meta:   {auth: true}
        },
        {
            path: '/jobs/add',
            name: 'add-job',
            component: AddJobView,
            meta:   {auth: true}
        },
        {
            path: '/jobs/edit/:id',
            name: 'edit-job',
            component: EditJobView,
            meta:   {auth: true}
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: {guest: true}
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {guest: true}
        }
]
})


router.beforeEach(async(to, from) => {
    
    const authstore = useAuthStore()
    await authstore.getUser()
    
    if(authstore.user && to.meta.guest){
        return {name: "home"}
    }
    if(!authstore.user && to.meta.auth){
        return {name: "login"}
    }
})

export default router