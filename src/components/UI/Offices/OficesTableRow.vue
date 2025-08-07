<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 text-gray-700">{{ office.name }}</td>
    <td class="px-6 py-4 text-gray-700">{{ office.street }}, {{ office.street_number }}, {{ office.city }}, {{ office.country }}</td>
    <td class="px-6 py-4 text-white flex justify-end pr-4" v-if="hideActions">
      <button class="bg-[#0054A6] rounded-2xl px-10 py-1 mr-4 shadow-md hover:bg-blue-700 transition-colors" @click="emits('edit-office', office)">
        Redaguoti
      </button>
      <button class="bg-[#A61A11] rounded-2xl px-10 py-1 shadow-md hover:bg-red-700 transition-colors" @click="emits('delete-office', office)">
        Ištrinti
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps(['office']);
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';

const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_offices && auth.user_permissions.delete_offices) {
        return true;
    }
    return false;
})
const emits = defineEmits(['edit-office', 'delete-office']);
</script>