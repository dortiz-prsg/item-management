import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)

// pinia.use(createPersist(), {
//     // Configuration options for the plugin
//     // For example, to persist state to localStorage:
//     storage: window.localStorage,
//     key: 'itemManagement'
// })

export default pinia
