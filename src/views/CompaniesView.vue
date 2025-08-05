<template>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal"
        :hide-close-button="currentForm === DeleteCompanyForm">
        <component :is="currentForm" @company-created="handleSubmit" :company="selectedComapny" @company-updated="handleSubmit" @cancel-delete="toggleModal"
        @company-deleted="handleSubmit"/>
    </BaseModal>
    <BaseLayout title="Įmonės">
    <div class="flex flex-row items-center mb-6 gap-12" v-if="hideActions">
        <button @click="switchComponent(CreateCompanyForm)">
        <img src="../assets/icons/Add Contact rounded.png" class="w-15 h-15"/>
        </button>
        <h2>Pridėti naują įmonę</h2>
    </div>
    <div class="text-sm text-gray-600 mb-15">
        Iš viso rasta: <span class="font-semibold text-[#1F3F77]">{{ totalItems }} kontaktų</span>
    </div>
    <CompanyTable :companies="companies" @edit-company="(company) => {
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
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed, onMounted, shallowRef, watch, ref } from 'vue';
import EditCompanyForm from '@/components/UI/forms/Companies/EditCompanyForm.vue';
import type { Company } from '@/types/companyType';
import DeleteCompanyForm from '@/components/UI/forms/Companies/DeleteCompanyForm.vue';
const { companies, fetchCompanies, page, totalPages, totalItems } = useCompanies();
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions.edit_companies && auth.user_permissions.delete_companies) {
        return true;
    }
    return false;

})
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
    page.value = 1;
    fetchCompanies();
    showModal.value = false;
}

watch(page, () => {
    fetchCompanies();
})
onMounted(() => {
    fetchCompanies();
})
</script>