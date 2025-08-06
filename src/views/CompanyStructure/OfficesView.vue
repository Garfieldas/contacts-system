<template>
    <OfficesTable :offices="offices"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
</template>
<script setup lang="ts">
import Pagination from '@/components/Layout/Pagination.vue';
import OfficesTable from '@/components/UI/Offices/OfficesTable.vue';
import { getOffices } from '@/services/officesService';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, onMounted, watch } from 'vue';

const offices = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();

const fetchOffices = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getOffices(url);
        console.log(response);
        offices.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        store.addSuccessNotification('Ofisai gauti sėkmingai!');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
watch(page, () => {
    fetchOffices();
})
onMounted(() => {
    fetchOffices();
})
</script>