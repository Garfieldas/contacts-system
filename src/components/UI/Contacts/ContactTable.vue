<template>
<div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-100 text-left text-sm text-gray-700">
      <tr>
        <th class="px-6 py-3 font-medium">Vardas ir pavardė</th>
        <th class="px-6 py-3 font-medium">Pozicija</th>
        <th class="px-6 py-3 font-medium">Telefono numeris</th>
        <th class="px-6 py-3 font-medium">Elektroninis paštas</th>
        <th class="px-6 py-3 font-medium">Adresas</th>
        <th class="px-6 py-3 font-medium" v-if="hideRow">Veiksmas</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
      <ContactTableRow v-for="employee in employees" :employee="employee" :key="employee.id" @edit-contact="onEdit" @delete-contact="onDelete"/>
    </tbody>
  </table>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ContactTableRow from './ContactTableRow.vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import type { Employee } from '@/types/employeeType';
const props = defineProps(['employees']);
const emit = defineEmits(['edit-contact', 'delete-contact']);
const onEdit = (employee: Employee) => emit('edit-contact', employee);
const onDelete = (employee: Employee) => emit('delete-contact', employee);
const auth = useAuthenticationStore();
const hideRow = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions.edit_employees && auth.user_permissions.delete_employees) {
        return true
    }
    return false;
})
</script>