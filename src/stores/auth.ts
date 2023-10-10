import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: '',
            user: null
        }
    },
    getters: {
        getToken: (state) => state.token,
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUser(user) {
            this.user = user
        },
    },
    persist: true,
})
