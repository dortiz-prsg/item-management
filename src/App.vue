<script setup>
    import { useAuthStore } from '@/store/auth.js'
    import { RouterView } from 'vue-router'
    import Alerts from '@/components/utils/Alerts.vue'
    import Loader from '@/components/utils/Loader.vue'
    import Navbar from '@/components/navigation/Navbar.vue'

    const auth = useAuthStore()
</script>

<template>
<v-app>
    <Navbar v-if="auth.isLoggedIn"></Navbar>
    <Alerts></Alerts>
    <Loader></Loader>
    <v-container fluid class="px-5">
        <v-row justify="center">
            <RouterView></RouterView>
        </v-row>
    </v-container>
</v-app>
</template>
