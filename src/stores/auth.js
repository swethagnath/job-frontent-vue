import {defineStore} from 'pinia'

export const useAuthStore = defineStore("authstore", {
    state: () => {
        return {
            user: null,
            errors: {}
        }
    },

    actions: {
        // get authenticated User
        async getUser(){
            if(localStorage.getItem('token')){
                const res = await fetch(`http://localhost:8000/api/user`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await res.json()
                if(res.ok){
                    this.user = data
                }
                
            }
        },
        // login or register user
        async authenticate(apiRoute, formData){
            const res = await fetch(`http://localhost:8000/api/${apiRoute}`, {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            try{
                const data = await res.json()
                if(data.errors){    
                    this.errors = data.errors
                }else{
                    this.errors = {}
                    localStorage.setItem('token', data.token)
                    this.user = data.token
                    this.router.push({name: "home"})
                }
            }catch(err){
                this.errors = "Invalid password / email"
            }
        },  
        async logout(){
            console.log(localStorage.getItem("token"))
            const res = await fetch(`http://localhost:8000/api/logout`, {
                method: 'post',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            await res.json()
            if(res.ok){
                this.user = null
                this.errors = {}
                localStorage.removeItem('token')
                this.router.push({name: "login"})
            }
        }
    }
})