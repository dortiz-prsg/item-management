<template>
    <v-dialog v-model="dialog" max-width="750px" scrollable>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-item>
                    <div class="d-flex align-center justify-space-between">
                        <span class="text-h66 font-weight-bold">Item 0_0_0_</span>
                        <v-btn @click="close()" density="compact" icon="mdi-close" variant="plain"></v-btn>
                    </div>
                    <div class="d-flex align-center">
                        <v-icon icon="mdi-information-outline" size="18" class="mr-1"></v-icon>
                        <span class="text-captionn font-weight-medium">Help</span>
                    </div>
                    <v-divider class="my-3"></v-divider>
                </v-card-item>


        <v-card-text  style="height: 300px">
            <v-tabs
          v-model="activeTab"
        >
          <v-tab density="compact"
            v-for="tab in tabs"
            :key="tab.title"
            :value="tab.value" class="text-none"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
        <v-row>
            <v-col v-for="f in allowedFields" md="6">

                <v-text-field v-model="f.defaultValue" :label="f.description"  :key="f.field" density="compact" variant="outlined" counter></v-text-field>
            </v-col>
        </v-row>

        </v-card-text>
        <!-- <v-window v-model="tab">
      <v-window-item
        v-for="tab in tabs"
        :key="item"
        :value="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-window-item>
    </v-window> -->
        <!-- <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </template>
  
<script setup>
    import { ref, reactive, computed, onBeforeMount } from 'vue'
    import { useRules } from '@/modules/rules.js'
    import { useHttp } from '@/modules/http.js'

    // TODO: get fields/rules from API
    const emit      = defineEmits(['refresh'])

    const dialog = ref(true)
    const activeTab = ref(0)
    const fields = ref([])
    const tabs = [
        { title: 'Purchasing', value: 2, },
        { title: 'Marketing', value: 3, },
        { title: 'Finance', value: 4, },
        { title: 'Inventory', value: 5, },
        { title: 'Admin', value: 1, },
    ]

    onBeforeMount(async () => {
        await getData()
    })

    async function getData() {
        const { data } = await useHttp('/items/jjmm', 'GET', { loader: false, })
        fields.value = data.value.fields
    }

    function close() {
        this.dialog = false
    }

    const allowedFields = computed(() => {
        console.log(activeTab.value)
        return fields.value.filter((f) => f.departmentId === activeTab.value)
    })

  </script>
  