// resourceAvailability.js
import { useHttp } from '@/modules/http.js'

export function useResourceAvailability() {
    async function checkResourceAvailability(resource, identifier) {
        const { data } = await useHttp(`/${resource}/check-availability/${identifier}`, 'GET', { loader: false,})
        return data.value?.available
    }

    return {
        checkResourceAvailability,
    }
}
