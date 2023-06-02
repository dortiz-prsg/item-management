<script setup>
    import Avatar from '@/components/utils/Avatar.vue'
    import { useAuthStore } from '@/store/auth.js'
    
    const auth = useAuthStore()

</script>
<template>
    <v-menu bottom offset-y transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <Avatar :initials="auth.initials" v-bind="props"></Avatar>
        </template>
        <v-card width="200px" class="box-shadow">
            <v-card-title class="d-flex flex-column align-center pb-0 px-2">
                <Avatar :initials="auth.initials" class="mr-3"></Avatar>
                <div class="font-weight-bold">{{ auth.username }}</div>
                <div class="text-caption">{{ auth.departmentName }}</div>
            </v-card-title>
            <v-card-text class="black--text px-2 justify-center pb-0">
                <v-divider class="my-2"></v-divider>
                <v-list nav dense class="px-0">
                    <v-list-item @click="auth.logout">
                        <template v-slot:prepend>
          <v-icon small>mdi-logout-variant</v-icon>
        </template>


                        <v-list-item-title class="font-weight-bold">Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-menu>
</template>