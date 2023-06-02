// http.js
import { ref, isRef, unref, watchEffect } from 'vue'
import axios from '@/modules/axios.js'
import { useLoaderStore } from '@/store/loader.js';

export async function useHttp(url, method = 'GET', args = {}) {
    const data          = ref(null)
    const error         = ref(null)
    const loader        = useLoaderStore()

    async function doHttp() {
        data.value      = null
        error.value     = null
        const urlUR     = unref(url)
        
        try {
            if (args.loader !== false) {
                loader.setLoading(true)
            }
            
            const res   = await axios[method.toLowerCase()](urlUR, args)
            data.value  = res.data
        } catch (err) {
            error.value = err
        } finally {
            if (args.loader !== false) {
                loader.setLoading(false)
            }
        }
    }
    
    if (!isRef(url)) {
        await doHttp()
    } else {
        watchEffect(doHttp)
    }
    
    return { 
        data, 
        error, 
        retry: doHttp 
    }
}
