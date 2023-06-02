import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Items/Index.vue'),
        meta: {
            requiresAuth: true, 
            title: 'Home',
        },
    }, {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
        meta: {
            requiresAuth: false,
            title: 'Login'
        }
    }]
})

router.beforeEach((to, _, next) => {
    const { requiresAuth, }         = to.meta
    const { isLoggedIn, isAdmin }   = useAuthStore()

    if(requiresAuth && !isLoggedIn) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
    } else if(!requiresAuth && isLoggedIn) {
        next({ name: 'Home' })
    } else {
        next()
    }
})  

export default router
