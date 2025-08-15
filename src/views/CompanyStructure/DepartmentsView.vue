<template>
    <teleport defer to="#button" v-if="showEditStructure">
        <AddButton @click="switchComponent(CreateDepartmentForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <DepartmentsTable :departments="departments" @edit-department="(department: Department) => {
        selectDepartment(department); switchComponent(EditDepartmentForm);
    }" @delete-department="(department: Department) => {
        selectDepartment(department); switchComponent(DeleteDepartmentForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
   <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="showEditStructure || showDeleteStructure"
   :hide-close-button="currentForm === DeleteDepartmentForm">
        <component :is="currentForm" @department-submit="handleSubmit" :department="selectedDepartment" @cancel-delete="toggleModal"/>
    </BaseModal>
</template>
<script setup lang="ts">
import DepartmentsTable from '@/components/UI/Departments/DepartmentsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import { getDepartments } from '@/services/departmentsService';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, onMounted, watch, shallowRef } from 'vue';
import CreateDepartmentForm from '@/components/UI/forms/Departments/CreateDepartmentForm.vue';
import type { Department } from '@/types/departmentType';
import EditDepartmentForm from '@/components/UI/forms/Departments/EditDepartmentForm.vue';
import DeleteDepartmentForm from '@/components/UI/forms/Departments/DeleteDepartmentForm.vue';
import { useActions } from '@/composables/useActions';
const departments = ref();
const page = ref(1);
const perPage = ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);

const currentForm = shallowRef<typeof CreateDepartmentForm | typeof EditDepartmentForm | typeof DeleteDepartmentForm>(CreateDepartmentForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}

const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const handleSubmit = () => {
    fetchDepartments();
    showModal.value = false;
}

const selectedDepartment = ref();
const selectDepartment = (department: Department) => selectedDepartment.value = department;

const { showEditStructure, showDeleteStructure } = useActions();

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