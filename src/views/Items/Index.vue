<script setup>
    import { useHttp } from '@/modules/http.js'
    import { useThemeStore } from '@/store/theme.js'
    import { reactive, computed, onBeforeMount } from 'vue'
    import ItemDetail from '@/components/ItemDetail.vue'
    import Item from '@/components/Item.vue'
    const selectedItems = []
    const theme = useThemeStore()
    const data = reactive({
        headers: [],
        status: [],
        items: [],
        startDate: '2023-01-01',
        endDate: '2023-01-01'
    })

    function getIcon(status) { 
        return status ? 'mdi-check' : 'mdi-close'
    }

    async function getData() {
        const res = await useHttp('/items')
        data.items = res.data.value.items
        data.headers = res.data.value.headers
    }

    const statusHeaders = computed(() => {
        return data.headers.filter((h) => h.statusHeader)
    })

    onBeforeMount(async () => {
        await getData()
    })

</script>
<template>
    <Item ></Item>
    <v-col cols="12" md="3">
        <v-select chips label="Status" :items="status" multiple density="compact" hide-details variant="outlined" class="select"></v-select>
    </v-col>
    <v-col cols="12" md="2">
        <v-text-field v-model="data.startDate" label="Start Date" type="date" density="compact" hide-details variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
        <v-text-field v-model="data.endDate" label="End Date" type="date" density="compact" hide-details variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="12" md="5" class="text-md-right">
        <ItemDetail @refresh="getData"></ItemDetail>
    </v-col>
    <v-col cols="12">
        <v-data-table v-model="selectedItems" :headers="data.headers" :items="data.items" item-value="description" :items-per-page="-1" density="compact" hide-details class="tble">
            <template v-slot:item.itemNumber="{ item }">
                <span :style="`color: ${theme.red}`">{{ item.raw.itemNumber }}</span>
            </template>
            <template v-slot:item.log>
                <v-btn density="compact" variant="plain" icon="mdi-file-outline"></v-btn>
            </template>
            <template v-for="(header, i) in statusHeaders" v-slot:[`item.${header.key}`]="{ item }" :key="`${item.itemNumber}-${header.key}-${i}`">
                <v-icon >{{ getIcon(item.raw[header.key]) }}</v-icon>
            </template>
        </v-data-table>
    </v-col>
</template>
<style>
.select .v-select__selection {
    margin-top: 0;
    margin-bottom: 0;
}
</style>