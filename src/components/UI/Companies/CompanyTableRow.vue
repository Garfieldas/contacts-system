<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 text-gray-700">{{ company.name }}</td>
    <td class="px-6 py-4 text-white flex justify-end pr-4">
      <button class="bg-[#0054A6] rounded-2xl px-10 py-1 mr-4 shadow-md hover:bg-blue-700 transition-colors" @click="emits('edit-company', company)" v-if="showEditCompanies">
        Redaguoti
      </button>
      <button class="bg-[#A61A11] rounded-2xl px-10 py-1 shadow-md hover:bg-red-700 transition-colors" @click="emits('delete-company', company)" v-if="showDeleteCompanies">
        Ištrinti
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { useActions } from '@/composables/useActions';

const props = defineProps(['company']);
const emits = defineEmits(['edit-company', 'delete-company']);
const { showEditCompanies, showDeleteCompanies } = useActions();
</script>