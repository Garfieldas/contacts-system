<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton @click="switchComponent(CreateDepartmentForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <DepartmentsTable :departments="departments"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
   <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions">
        <component :is="currentForm" />
    </BaseModal>
</template>
<script setup lang="ts">
import DepartmentsTable from '@/components/UI/Departments/DepartmentsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import { getDepartments } from '@/services/departmentsService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, onMounted, watch, computed, shallowRef } from 'vue';
import CreateDepartmentForm from '@/components/UI/forms/Departments/CreateDepartmentForm.vue';
import type { Department } from '@/types/departmentType';
const departments = ref();
const page = ref(1);
const perPage = ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const auth = useAuthenticationStore();
const isFirstLoad = ref(true);

const currentForm = shallowRef(CreateDepartmentForm);
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
    fetchDepartments();
    showModal.value = false;
}

const selectedDepartment = ref();
const selectDepartment = (department: Department) => selectedDepartment.value = department;

const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});
const fetchDepartments = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getDepartments(url);
        departments.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        if(isFirstLoad.value) {
            store.addSuccessNotification('Skyriai gauti sėkmingai!');
            isFirstLoad.value = false;
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
watch(page, () => {
    fetchDepartments();
})
onMounted(() => {
    fetchDepartments();
})
</script>