<template>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal"
        :hide-close-button="currentForm === DeleteCompanyForm">
        <component :is="currentForm" @company-created="handleSubmit" :company="selectedComapny" @company-updated="handleSubmit" @cancel-delete="toggleModal"
        @company-deleted="handleSubmit"
        v-if="showEditCompanies || showDeleteCompanies"/>
    </BaseModal>
    <BaseLayout title="Įmonės">
    <div class="flex flex-row items-center mb-6 gap-12" v-if="showEditCompanies">
        <button @click="switchComponent(CreateCompanyForm)">
        <img src="../assets/icons/Add Contact rounded.png" class="w-15 h-15"/>
        </button>
        <h2>Pridėti naują įmonę</h2>
    </div>
    <div class="text-sm text-gray-600 mb-15">
        Iš viso rasta: <span class="font-semibold text-[#1F3F77]">{{ totalItems }} įmonių</span>
    </div>
    <Spinner v-if="isLoading"/>
    <NoResultsDisplay v-else-if="(!companies || companies.length === 0) && !isLoading"
        title="Nerasta jokių įmonių"
     />
    <CompanyTable v-else :companies="companies" @edit-company="(company) => {
      handleEmit(company); switchComponent(EditCompanyForm);
    }"
    @delete-company="(company) => {
        handleEmit(company); switchComponent(DeleteCompanyForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import CompanyTable from '@/components/UI/Companies/CompanyTable.vue';
import CreateCompanyForm from '@/components/UI/forms/Companies/CreateCompanyForm.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import { useCompanies } from '@/composables/useCompanies';
import { onMounted, shallowRef, watch, ref } from 'vue';
import EditCompanyForm from '@/components/UI/forms/Companies/EditCompanyForm.vue';
import type { Company } from '@/types/companyType';
import DeleteCompanyForm from '@/components/UI/forms/Companies/DeleteCompanyForm.vue';
import { useActions } from '@/composables/useActions';
import { useNotificationStore } from '@/stores/notificationstore';
import Spinner from '@/components/UI/Spinner.vue';
import NoResultsDisplay from '@/components/UI/NoResultsDisplay.vue';
const { companies, fetchCompanies, page, totalPages, totalItems, isLoading } = useCompanies();
const store = useNotificationStore();
const { showEditCompanies, showDeleteCompanies } = useActions();
const currentForm = shallowRef<typeof CreateCompanyForm | typeof EditCompanyForm | typeof DeleteCompanyForm>(CreateCompanyForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}
const switchComponent = (component: any) => {
    currentForm.value = component;
    showModal.value = true;
}
const selectedComapny = ref();
const handleEmit = (company: Company) => selectedComapny.value = company;

const handleSubmit = () => {
    fetchCompanies();
    showModal.value = false;
}

watch(page, () => {
    fetchCompanies();
})
onMounted(async() => {
    const isSuccess = await fetchCompanies();
    if(isSuccess) {
        store.addSuccessNotification('Įmonės gautos sėkmingai!');
    }
})
</script>