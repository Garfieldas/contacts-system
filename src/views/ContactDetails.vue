<template>
    <BaseLayout title="Detalesnė kontakto informacija">
        <div class="mb-8 flex justify-end items-center">
            <GoBackButton />
        </div>
        <SingleContactCard/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import SingleContactCard from '@/components/UI/Contacts/SingleContactCard.vue';
import GoBackButton from '@/components/UI/GoBackButton.vue';
const props = defineProps(['id']);
</script>