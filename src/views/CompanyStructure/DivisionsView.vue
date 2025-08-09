<template>
    <teleport defer to="#button">
        <AddButton/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <BaseLayout>
        <DivisionsTable :divisions="divisions"/>
        <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AddButton from '@/components/UI/AddButton.vue';
import DivisionsTable from '@/components/UI/Divisions/DivisionsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import { getDivisions } from '@/services/divisionsService';
import { useNotificationStore } from '@/stores/notificationstore';
import { onMounted, ref, watch } from 'vue';

const divisions = ref();
const page = ref(1);
const perPage=ref(1);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);

const fetchDivisions = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getDivisions(url);
        divisions.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        if(isFirstLoad.value) {
            store.addSuccessNotification('Padaliniai gauti sėkmingai!');
            isFirstLoad.value = false;
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

watch(page, () => {
    fetchDivisions();
})
onMounted(() => {
    fetchDivisions();
})
</script>