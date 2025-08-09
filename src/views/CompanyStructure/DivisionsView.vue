<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton @click="switchComponent(CreateDivisionForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <DivisionsTable :divisions="divisions" @edit-division="(division: Division) => {
        selectDivision(division); switchComponent(EditDivisionForm);
    }" @delete-division="(division: Division) => {
        selectDivision(division); switchComponent(DeleteDivisionForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions"
        :hide-close-button="currentForm === DeleteDivisionForm">
        <component :is="currentForm" @division-submit="handleSubmit" :division="selectedDivision" @cancel-delete="toggleModal"/>
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
import type { Division } from '@/types/divisionType';
import EditDivisionForm from '@/components/UI/forms/Divisions/EditDivisionForm.vue';
import DeleteDivisionForm from '@/components/UI/forms/Divisions/DeleteDivisionForm.vue';

const divisions = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});

const currentForm = shallowRef<typeof CreateDivisionForm | typeof EditDivisionForm | typeof DeleteDivisionForm>(CreateDivisionForm);
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
const selectedDivision = ref();
const selectDivision = (division: Division) => selectedDivision.value = division;

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