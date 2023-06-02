<script setup>
    import { RouterLink } from 'vue-router'
    import { useThemeStore } from '@/store/theme.js'
    import UserMenu from '@/components/navigation/UserMenu.vue'
    const theme = useThemeStore()
</script>
<template>
    <v-toolbar density="compact" class="px-4">
        <v-app-bar-nav-icon density="compact" class="mx-0"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <RouterLink to="/" class="d-flex align-center">
                <img class="mr-3" alt="logo" contain src="@/assets/images/logo.png" transition="scale-transition" size="30px" width="30">
                <h3 class="font-weight-bold">M3</h3>
            </RouterLink>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-magnify" variant="text" class="btn">Search
                <template v-slot:append>
                    <div class="d-flex align-center px-1" style="border-left: 1px solid #666">
                        <v-icon size="small">mdi-apple-keyboard-command</v-icon>
                        <span>K</span>
                    </div>
                    
                </template>
        </v-btn>
        <v-divider vertical inset class="mx-5"></v-divider>
        <v-btn @click="theme.toggle" :icon="theme.icon" density="compact" class="mr-5"></v-btn>
        <div class="d-flex align-center">

                <!-- <v-te/xt-field variant="solo" label="Search" prepend-inner-icon="mdi-magnify" single-line density="compact" hide-details></v-text-field> -->
            <!-- <v-switch :value="theme.isDark"  :true-value="true" :false-value="false" :false-icon="theme.icon" :true-icon="theme.icon" inset class="switch mx-5" :class="{ 'dark-switch': theme.isDark }" @change="theme.toggle" density="compact" hide-details></v-switch> -->
        </div>
        <UserMenu></UserMenu>
    </v-toolbar>
    <v-divider></v-divider>
    <v-toolbar density="compact" color="lue-darken-3" class="py-0 px-4 tb-2">
        <RouterLink to="/" class="d-flex align-center">
            <v-toolbar-title to="/" class="mx-1">
                <h6 class="font-weight-bold">Item Management</h6>
            </v-toolbar-title>
        </RouterLink>
    </v-toolbar>
</template>
<style>
.switch .v-input__control .v-selection-control .v-selection-control__wrapper {
    /* color: grey */
    color: rgb(60, 60, 67, 0.75) !important;
}

.dark-switch .v-input__control .v-selection-control .v-selection-control__wrapper {
    /* color: grey */
    color: #FFF !important;
}

.switch .v-input__control .v-selection-control .v-selection-control__wrapper .v-switch__track {
  border: 1px solid rgb(60, 60, 67, 0.75) !important;
  background-color: transparent;
}

.dark-switch .v-input__control .v-selection-control .v-selection-control__wrapper .v-switch__track {
  border: 1px solid #111 !important;
  /* background-color: #111827; */
}
.switch .v-selection-control__input > .v-icon {
    opacity: unset;
  font-size: 18px;
}

.switch .v-switch__thumb {
    position: absolute;
    z-index: -1;
}

.switch .v-switch__thumb {
    display: unset !important;
    background-color: #FFFFFF;
    width: 22px;
    height: 22px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06) !important;
}

.dark-switch .v-switch__thumb {
    background-color: transparent;
}
</style>