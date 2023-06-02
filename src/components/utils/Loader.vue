<script setup>
    import { useLoaderStore } from '@/store/loader.js'
    const loader = useLoaderStore()
</script>
<template>
    <v-dialog v-model="loader.loading" width="300" persistent>
        <v-card color="blue-darken-4" class="pb-3">
            <v-card-title class="pb-0 font-weight-bold">Loading...</v-card-title>
            <v-card-text>
                <v-progress-linear height="5" indeterminate></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
  </template>
  