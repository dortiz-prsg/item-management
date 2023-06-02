import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
    const loading = ref(false)
    
    function setLoading(v) {
        loading.value = v
    }

    return { 
        loading, 
        setLoading 
    }
})
