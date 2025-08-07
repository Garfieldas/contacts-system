<template>
    <div class="fixed top-0 left-0 bg-[#000000] opacity-25 w-[100vw] h-[100vh] z-20" :class="{'hidden': !showOverlay}"></div>
</template>
<script setup lang="ts">
const props = defineProps(['showOverlay'])
</script>