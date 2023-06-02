// theme.js
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
    const theme     = useTheme()
    const isDark    = computed(() => {
        return theme.global.current.value.dark
    })
    
    const icon      = computed(() => {
        return isDark.value ? 'mdi-weather-night' : 'mdi-lightbulb-on-10'
    })
    
    const red       = computed(() => {
        return isDark.value ? 'salmon' : '#B10D0D'
    })


    function toggle() {
        theme.global.name.value = isDark.value ? 'light' : 'dark'
    }

    return { theme, isDark, red, icon, toggle }
})
