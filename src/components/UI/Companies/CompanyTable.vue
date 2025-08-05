<template>
    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium w-3/4">Įmonės pavadinimas</th>
            <th class="px-6 py-3 font-medium w-1/4 text-center pr-4" v-if="hideActions">Veiksmas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            <CompanyTableRow v-for="company in companies" :key="company.id" :company="company" @edit-company="onEdit" @delete-company="onDelete"/>
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import type { Company } from '@/types/companyType';
import CompanyTableRow from './CompanyTableRow.vue';
import { computed } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const props = defineProps(['companies']);
const emits = defineEmits(['edit-company', 'delete-company']);
const onEdit = (company: Company) => emits('edit-company', company);
const onDelete = (company: Company) => emits('delete-company', company);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
  if(auth.isLoggedIn && auth.user_permissions.edit_companies && auth.user_permissions.delete_companies) {
    return true;
  }
  return false;
})
</script>