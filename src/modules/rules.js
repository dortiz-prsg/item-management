// rules.js
import { useResourceAvailability } from '@/modules/resourceAvailability.js'
export function useRules() {
    const { checkResourceAvailability } = useResourceAvailability()

    const rules =  {
        required: ({ label }) => {
            return (v) => (!!v || v === 0) || `${label} is required`
        },
        maxLength({ label, maxLength = 255 }) {
            return (v) => v && v.length <= maxLength || `${label} must not exceede ${maxLength} characters`
        },
        available: ({ label, resource }) => {
            return async (v) => await checkResourceAvailability(resource, v) || `${label} already exists`
        },
        numeric({ label }) {
            return (v) => !isNaN(v) || `${label} must only contain digits`
        },
    }

    function getRules(opts = {}) {
        return opts.rules?.flatMap((r) => rules[r](opts))
    }

    return { 
        getRules 
    }
}