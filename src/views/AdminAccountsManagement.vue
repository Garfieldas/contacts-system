<template>
    <BaseLayout title="Admin paskyros">
    <div class="flex items-center mb-6 gap-12" id="button">
        <AddButton/>
        <h2>Sukūrti naują admin paskyrą:</h2>
    </div>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AddButton from '@/components/UI/AddButton.vue';
</script>