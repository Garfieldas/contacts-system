<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton @click="switchComponent(CreateDivisionForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <DivisionsTable :divisions="divisions"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions">
        <component :is="currentForm" @division-submit="handleSubmit"/>
    </BaseModal>
</template>
<script setup lang="ts">
import AddButton from '@/components/UI/AddButton.vue';
import DivisionsTable from '@/components/UI/Divisions/DivisionsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import { getDivisions } from '@/services/divisionsService';
import { useNotificationStore } from '@/stores/notificationstore';
import { onMounted, ref, watch, computed, shallowRef } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import CreateDivisionForm from '@/components/UI/forms/Divisions/CreateDivisionForm.vue';

const divisions = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_offices && auth.user_permissions.delete_offices) {
        return true;
    }
    return false;
});

const currentForm = shallowRef(CreateDivisionForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}
const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const handleSubmit = () => {
    page.value = 1;
    fetchDivisions();
    showModal.value = false;
}

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