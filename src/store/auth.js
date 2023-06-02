// auth.js
import router from '@/router'
import axios from '@/modules/axios.js'
import { defineStore } from 'pinia'
import { useString } from '@/modules/string.js'
const { getInitials } = useString()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {}
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.user?.id
        },
        username: (state) => {
            return state.user?.username ?? ''
        },
        initials: (state) => {
            return 'DO'
        },
        departmentName: (state) => {
            return state.user?.department?.name ?? ''
        },
    },
    actions: {
        login(user) {
			return new Promise((resolve, reject) => {
				axios.post('/auth/login', { ...user })
                .then((res) => {
                    this.handleAuth({ ...res.data, })
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
			})
        },
        logout(redirect) {
            return new Promise((resolve, reject) => {
				axios.post('/auth/logout')
                .then(() => {
                    this.handleAuth({ redirect })
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
			})
        },
        handleAuth({ user, redirect = undefined }) {
            this.user = user

            if (user) {
                const urlParams = new URLSearchParams(window.location.search)
                const path = urlParams.get('redirect') || '/'
                router.push({ path })
            } else {
                router.push({ path: 'Login', query: { redirect }})
            }
        }
    },
    persist: {
        enabled: true
    }
})
