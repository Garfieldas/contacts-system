<template>
    <teleport defer to="#button">
        <AddButton @click="switchComponent(CreateOfficeForm)"/>
    </teleport>
    <OfficesTable :offices="offices"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal">
        <component :is="currentForm" @office-created="handleSubmit"/>
    </BaseModal>
</template>
<script setup lang="ts">
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import CreateOfficeForm from '@/components/UI/forms/Offices/CreateOfficeForm.vue';
import OfficesTable from '@/components/UI/Offices/OfficesTable.vue';
import { getOffices } from '@/services/officesService';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, onMounted, watch, shallowRef } from 'vue';

const offices = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();

const currentForm = shallowRef(CreateOfficeForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}
const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const fetchOffices = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getOffices(url);
        offices.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        store.addSuccessNotification('Ofisai gauti sėkmingai!');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const handleSubmit = () => {
    page.value = 1;
    fetchOffices();
    showModal.value = false;
}

watch(page, () => {
    fetchOffices();
})
onMounted(() => {
    fetchOffices();
})
</script>