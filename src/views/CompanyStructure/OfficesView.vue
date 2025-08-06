<template>
    <OfficesTable :offices="offices"/>
</template>
<script setup lang="ts">
import OfficesTable from '@/components/UI/Offices/OfficesTable.vue';
import { getOffices } from '@/services/officesService';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, onMounted } from 'vue';

const offices = ref();
const store = useNotificationStore();
const fetchOffices = async (params?:string) => {
    const url = params? `${params}` : '';
    try {
        const response = await getOffices(url);
        console.log(response);
        offices.value = response.items;
        store.addSuccessNotification('Ofisai gauti sėkmingai!');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
onMounted(() => {
    fetchOffices();
})
</script>