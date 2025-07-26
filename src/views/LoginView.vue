<template>
    <LoginForm />
</template>
<script setup lang="ts">
import LoginForm from '@/components/UI/forms/LoginForm.vue';
import { onMounted, onUnmounted } from 'vue';
onMounted(() => {
    document.body.style.backgroundColor = '#1F3F77'
})
onUnmounted(() => {
    document.body.style.backgroundColor = '';
})
</script>