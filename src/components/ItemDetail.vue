<script setup>
    import { ref, reactive, onBeforeMount } from 'vue'
    import { useRules } from '@/modules/rules.js'
    import { useHttp } from '@/modules/http.js'

    // TODO: get fields/rules from API
    const emit      = defineEmits(['refresh'])
    const dialog    = ref(false)
    const valid     = ref(false)
    const item      = reactive({})
    const fields    = ref([])
    const { getRules } = useRules()

    onBeforeMount(async () => {
        await getData()
        
    })

    async function getData() {
        const { data } = await useHttp('/items/create', 'GET', { loader: false, })
        fields.value = data.value.fields
    }
 
    async function submit() {
        if (!valid.value) {
            return
        }

        await useHttp('/items', 'POST', { item: item, loader: false, })
        close(true)
    }

    function close(reset = false) {
        dialog.value = false

        if (reset) {
            emit('refresh')
            setTimeout(() => {
            }, 500)
        }
    }
</script>
<template>
    <v-dialog v-model="dialog" width="575">
        <template v-slot:activator="{ props }">
            <v-btn color="blue-lighten-3" variant="outlined" prepend-icon="mdi-shape-square-rounded-plus" class="btn" v-bind="props">Add Item</v-btn>
        </template>
        <v-form v-model="valid" @submit.prevent="submit" fast-fail ref="form">
            <v-card>
                <v-card-item>
                    <div class="d-flex align-center justify-space-between">
                        <span class="text-h66 font-weight-bold">Add Item</span>
                        <v-btn @click="close()" density="compact" icon="mdi-close" variant="plain"></v-btn>
                    </div>
                    <div class="d-flex align-center">
                        <v-icon icon="mdi-information-outline" size="18" class="mr-1"></v-icon>
                        <span class="text-captionn font-weight-medium">Help</span>
                    </div>
                    <v-divider class="my-3"></v-divider>
                </v-card-item>
                <v-card-text>
                    <div class="font-weight-medium mb-5">Basic Information</div>
                    <v-text-field v-model="item[f.key]" :label="f.label" v-for="f in fields" :key="f.key" :rules="getRules({ label: f.label, rules: f.rules, maxLength: f.maxLength })" density="compact" variant="outlined" v-bind="f.bind" counter></v-text-field>
                </v-card-text>
                <v-card-actions class="px-4 pb-4 justify-end">
                    <v-btn type="submit" variant="text" color="green-darken-1" class="btn">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>