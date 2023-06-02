<template>
    <v-avatar :left="left" :color="initialsClass" :size="size">
        <h5 class="font-weight-bold">{{ initials }}</h5>
    </v-avatar>
</template>

<script>
export default {
    props: {
        profilePicture: {
            type: String,
            default: null,
            required: false,
        },
        initials: {
            type: String,
            default: '',
        },
        profilePictureOnly: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 32,
        },
        left: {
            type: Boolean,
            default: false,
        },
    },
	name: 'Avatar',
	data: () => ({}),
    computed: {
        showAvatar() {
            return this.profilePicture || !this.profilePicture
        },
        initialsClass() {
            return 'brown text-white'
        }
    },
}
</script>