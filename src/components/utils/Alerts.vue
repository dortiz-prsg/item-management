<template>
    <div>
        <v-alert v-for="alert in alerts" :key="alert.id" :type="alert.type" :title="alert.type" :text="alert.message" @click:close="removeAlert(alert)" :icon="getIcon(alert.type)" variant="tonal" closable density="compact" v-show="alert.visible">
        {{ alert }}
    </v-alert>
    </div>
</template>

<script>
import { useAlertsStore } from '@/store/alerts.js';
import { reactive, watchEffect } from 'vue';

export default {
  setup() {
    const alertsStore = useAlertsStore();
    const alerts = reactive(alertsStore.alerts);

    function removeAlert(alert) {
      alertsStore.removeAlert(alert);
    }
    function getIcon(status) {
        switch (status) {
            case 'error': return 'mdi-alert-circle-outline'
        
            default: return 'mdi-check-circle-outline'
        }
    }

    // Function to hide the alert after a certain number of seconds
    function hideAlertAfterDelay(alert) {
      setTimeout(() => {
        alert.visible = false;
      }, 5000); // Change the duration (in milliseconds) as per your requirement
    }

    // Watch for changes in alerts and trigger the hideAlertAfterDelay function
    watchEffect(() => {
        console.log('hehehe')
      alerts.forEach((alert) => {
        alert.hehe = false
        if (alert.visible) {
          hideAlertAfterDelay(alert);
        }
      });
    });



    return {
      alerts,
      removeAlert,
      getIcon
    };
  },
};
</script>
