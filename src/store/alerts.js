// alerts.js
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', () => {
    const alerts = reactive([])
    function addAlert(alert) {
        alerts.push({ ...alert, visible: true })
    }
    function removeAlert(alert) {
        const index = alerts.indexOf(alert)
        if (index !== -1) {
            alerts.splice(index, 1)
        }
    }

    return {
        alerts,
        addAlert,
        removeAlert
    }
})
