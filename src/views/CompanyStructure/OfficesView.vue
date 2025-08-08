<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton @click="switchComponent(CreateOfficeForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <OfficesTable :offices="offices" @edit-office="(office: Office) => {
      handleEmit(office); switchComponent(EditOfficeForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions">
        <component :is="currentForm" @office-submit="handleSubmit" :office="selectedOffice"/>
    </BaseModal>
</template>
<script setup lang="ts">
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import CreateOfficeForm from '@/components/UI/forms/Offices/CreateOfficeForm.vue';
import EditOfficeForm from '@/components/UI/forms/Offices/EditOfficeForm.vue';
import OfficesTable from '@/components/UI/Offices/OfficesTable.vue';
import { getOffices } from '@/services/officesService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import type { Office } from '@/types/officeType';
import { ref, onMounted, watch, shallowRef, computed } from 'vue';

const offices = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const auth = useAuthenticationStore();

const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_offices && auth.user_permissions.delete_offices) {
        return true;
    }
    return false;
})

const currentForm = shallowRef(CreateOfficeForm);
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