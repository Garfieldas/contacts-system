<template>
    <BaseLayout title="Įmonės">
    <div class="flex flex-row items-center mb-6 gap-12" v-if="hideActions">
        <button>
        <img src="../assets/icons/Add Contact rounded.png" class="w-15 h-15"/>
        </button>
        <h2>Pridėti naują įmonę</h2>
    </div>
    <div class="text-sm text-gray-600 mb-15">
        Iš viso rasta: <span class="font-semibold text-[#1F3F77]">{{ totalItems }} kontaktų</span>
    </div>
    <CompanyTable :companies="companies"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import CompanyTable from '@/components/UI/Companies/CompanyTable.vue';
import { useCompanies } from '@/composables/useCompanies';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed, onMounted, watch } from 'vue';
const { companies, fetchCompanies, page, totalPages, totalItems } = useCompanies();
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions.edit_companies && auth.user_permissions.delete_companies) {
        return true;
    }
    return false;
})

watch(page, () => {
    fetchCompanies();
})
onMounted(() => {
    fetchCompanies();
})
</script>