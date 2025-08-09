<template>
    <teleport defer to="#button">
        <AddButton/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <BaseLayout>
        <DivisionsTable />
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AddButton from '@/components/UI/AddButton.vue';
import DivisionsTable from '@/components/UI/Divisions/DivisionsTable.vue';
</script>