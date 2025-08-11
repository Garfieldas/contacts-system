<template>
    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium w-3/6">Pavadinimas</th>
            <th class="px-6 py-3 font-medium w-1/4 text-center pr-4" v-if="hideActions">Veiksmas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            <DepartmentsTableRow v-for="department in departments" :key="department.id" :department="department"
            @edit-department="(department) => emits('edit-department', department)"
            @delete-department="(department) => emits('delete-department', department)"/>
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';
import DepartmentsTableRow from './DepartmentsTableRow.vue';

const props = defineProps(['departments']);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});
const emits = defineEmits(['edit-department', 'delete-department']);
</script>