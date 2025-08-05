<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 text-gray-700">{{ company.name }}</td>
    <td class="px-6 py-4 text-white flex justify-end pr-4" v-if="hideActions">
      <button class="bg-[#0054A6] rounded-2xl px-10 py-1 mr-4 shadow-md hover:bg-blue-700 transition-colors" @click="emits('edit-company', company)">
        Redaguoti
      </button>
      <button class="bg-[#A61A11] rounded-2xl px-10 py-1 shadow-md hover:bg-red-700 transition-colors" @click="emits('delete-company', company)">
        Ištrinti
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';

const props = defineProps(['company']);
const emits = defineEmits(['edit-company', 'delete-company']);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
  if(auth.isLoggedIn && auth.user_permissions.edit_companies && auth.user_permissions.delete_companies) {
    return true;
  }
  return false;
})
</script>