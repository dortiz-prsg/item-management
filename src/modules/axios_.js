// useCounter.js
import { ref, computed } from "vue";
import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
axios.defaults.baseURL          = import.meta.env.VITE_ROOT_API
export default function () {
    const count = ref(0);
    const double = computed(() => count.value * 2)

    function GET(url, args = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, args)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            }).finally(() => {
            })
        })   
    }
    // POST(url, args = {}, opts = {}, lKey = 'loading') {
    //     this[lKey] = true
    //     if (args.emit !== false) {
    //         args.emit = true
    //     }
    //     return new Promise((resolve, reject) => {
    //         axios.post(url, args, opts)
    //         .then((res) => {
    //             Object.keys(res.data).forEach((key) => {
    //                 if (Object.hasOwn(this, key)) {
    //                     this[key] = res.data[key]
    //                 }
    //             })
    //             resolve(res)
    //         })
    //         .catch((err) => {
    //             reject(err)
    //         }).finally(() => {
    //             this[lKey]=false
    //             if (args.emit) {
    //                 this.$emit('refresh')
    //             }
    //         })
    //     })   
    // },
    // PUT(url, args = {}, lKey = 'loading') {
    //     this[lKey] = true
    //     return new Promise((resolve, reject) => {
    //         axios.put(url, args)
    //         .then((res) => {
    //             Object.keys(res.data).forEach((key) => {
    //                 if (Object.hasOwn(this, key)) {
    //                     this[key] = res.data[key]
    //                 }
    //             })
    //             resolve(res)
    //         })
    //         .catch((err) => {
    //             reject(err)
    //         }).finally(() => {
    //             this[lKey]=false
    //             this.$emit('refresh')
    //         })
    //     })   
    // },
    // DELETE(url, args = {}, lKey = 'loading') {
    //     this[lKey] = true
    //     return new Promise((resolve, reject) => {
    //         axios.delete(url, args)
    //         .then((res) => {
    //             Object.keys(res.data).forEach((key) => {
    //                 if (Object.hasOwn(this, key)) {
    //                     this[key] = res.data[key]
    //                 }
    //             })
    //             resolve(res)
    //         })
    //         .catch((err) => {
    //             reject(err)
    //         }).finally(() => {
    //             this[lKey]=false
    //             this.$emit('refresh')
    //         })
    //     })   
    // }
  return {
 GET
  }
}




// const debounce = (fn, wait) => {
//     let timer
//     return function(...args) {
//         if(timer) {
//             clearTimeout(timer)
//         }

//         const context = this
//         timer = setTimeout(()=>{
//             fn.apply(context, args)
//         }, wait)
//     }
// }

// const logOut    = debounce(() => { 
//     store.dispatch('logout', { redirect: router.currentRoute.path }) 
// }, 100)
// const alert     = debounce((status, message) => {
//     store.dispatch('alerts/add', { status, message }) 
// }, 100)


// axios.defaults.withCredentials  = true

// axios.interceptors.response.use((res) => {
//     const { status = 'success', message } = res.data
//     if (message) {
//         alert(status, message)
//     }
//     return Promise.resolve(res)
// }, (err) => {
//     if (err.response?.status === 401) {
//         logOut()
//     } else if (err.response?.status === 403) {
//         router.push('/')
//     }
    
//     const { status = 'error', message = 'Internal server error' } = err.response.data
//     alert(status, message)
//     return Promise.reject(err)
// })