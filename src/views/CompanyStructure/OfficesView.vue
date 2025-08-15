<template>
    <teleport defer to="#button" v-if="showEditOffices">
        <AddButton @click="switchComponent(CreateOfficeForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <OfficesTable :offices="offices" @edit-office="(office: Office) => {
      handleEmit(office); switchComponent(EditOfficeForm);
    }"
    @delete-office="(office: Office) => {
        handleEmit(office); switchComponent(DeleteOfficeForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="showEditOffices || showDeleteOffices"
        :hide-close-button="currentForm === DeleteOfficeForm">
        <component :is="currentForm" @office-submit="handleSubmit" :office="selectedOffice" @cancel-delete="toggleModal" @cancel-action="toggleModal"/>
    </BaseModal>
</template>
<script setup lang="ts">
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import CreateOfficeForm from '@/components/UI/forms/Offices/CreateOfficeForm.vue';
import DeleteOfficeForm from '@/components/UI/forms/Offices/DeleteOfficeForm.vue';
import EditOfficeForm from '@/components/UI/forms/Offices/EditOfficeForm.vue';
import OfficesTable from '@/components/UI/Offices/OfficesTable.vue';
import { getOffices } from '@/services/officesService';
import { useNotificationStore } from '@/stores/notificationstore';
import type { Office } from '@/types/officeType';
import { ref, onMounted, watch, shallowRef } from 'vue';
import { useActions } from '@/composables/useActions';

const offices = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);

const { showEditOffices, showDeleteOffices } = useActions();

const currentForm = shallowRef<typeof CreateOfficeForm | typeof EditOfficeForm | typeof DeleteOfficeForm>(CreateOfficeForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}
const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const selectedOffice = ref();
const handleEmit = (office: Office) => selectedOffice.value = office;

const fetchOffices = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getOffices(url);
        offices.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        if (isFirstLoad.value) {
            store.addSuccessNotification('Ofisai gauti sėkmingai!');
            isFirstLoad.value = false;
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const handleSubmit = () => {
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