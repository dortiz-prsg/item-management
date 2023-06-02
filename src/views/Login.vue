<script setup>
    import { ref, reactive, computed } from 'vue'
    import { useAuthStore } from '@/store/auth.js'
    import { useRules } from '@/modules/rules.js'
    const { getRules }  = useRules()
    const loading       = ref(false)
    const auth          = useAuthStore()
    const valid         = ref(false)
    const showPassword  = ref(false)
    const user          = reactive({
        username: '',
        password: '', 
        email: '',
    })

    const inputType = computed(() => {
        return showPassword.value ? 'text' : 'password'
    })
    const inputIcon = computed(() => {
        return showPassword.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
    })

    async function handleLogin() {
        if (!valid.value) {
            return
        }

        user.email      = `${user.username}@prsupplies.com`
        loading.value   = true
        await auth.login(user).finally(() => {
            loading.value = false
        })
    }

</script>
<template>
    <v-col cols="12" md="6">
        <v-form v-model="valid" @submit.prevent="handleLogin" ref="form">
            {{ auth }}
            <v-card class="mt-5 text-center" style="padding: 5% 10%">
                <v-card-title class="pb-0">
                    <img src="@/assets/images/logo.png" height="70">
                    <h4 class="font-weight-bold">Item Management</h4>
                </v-card-title>
                <v-card-subtitle class="font-weight-medium">Login</v-card-subtitle>
                <v-card-text class="mt-5 pb-1 d-flex justify-space-between">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="user.username" label="Username" :rules="getRules({ label: 'Username', rules: ['required'], maxLength: 64 })" hide-details density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="user.password" label="Password" :rules="getRules({ label: 'Password', rules: ['required'], maxLength: 64 })" :type="inputType" @click:append-inner="showPassword = !showPassword" :append-inner-icon="inputIcon" hide-details density="compact" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-center pt-5">
                    <v-btn type="submit" :disabled="!valid" :loading="loading" color="blue-lighten-3" variant="tonal" prepend-icon="mdi-login-variant" class="btn px-3">Login</v-btn>
                </v-card-actions>
                <v-card-text>
                    <v-divider class="mb-3"></v-divider>
                    <small class="font-weight-medium">&copy; Copyright {{ new Date().getFullYear() }}, Puerto Rico Supplies Group</small>
                </v-card-text>
            </v-card>
        </v-form>
    </v-col>
</template>