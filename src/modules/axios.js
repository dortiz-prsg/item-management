import axios from 'axios'
import { useAlertsStore } from '@/store/alerts.js'

axios.defaults.baseURL = import.meta.env.VITE_ROOT_API
axios.defaults.withCredentials = true

axios.interceptors.response.use((res) => {
    const { type = 'success', message } = res.data
    if (message) {
        useAlertsStore().addAlert({ type, message })
    }
    return Promise.resolve(res)
}, (err) => {
    const { type = 'error', message = 'Internal server error' } = err.response?.data
    useAlertsStore().addAlert({ type, message })
    return Promise.reject(err)
})

export default axios