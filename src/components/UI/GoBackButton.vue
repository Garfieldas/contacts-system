<template>
    <button class="bg-white rounded-full shadow-lg shadow-black-500/50 p-4" @click="goBack">
        <img src="../../assets/icons/arrow.png">
    </button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => router.replace({name: 'contacts'});
</script>