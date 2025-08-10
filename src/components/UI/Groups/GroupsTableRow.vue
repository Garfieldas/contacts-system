<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 text-gray-700">{{ group.name }}</td>
    <td class="px-6 py-4 text-white flex justify-end pr-4" v-if="hideActions">
      <button class="bg-[#0054A6] rounded-2xl px-10 py-1 mr-4 shadow-md hover:bg-blue-700 transition-colors" @click="emits('edit-group', group)">
        Redaguoti
      </button>
      <button class="bg-[#A61A11] rounded-2xl px-10 py-1 shadow-md hover:bg-red-700 transition-colors" @click="emits('delete-group', group)">
        Ištrinti
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
const props = defineProps(['group']);
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});
const emits = defineEmits(['edit-group', 'delete-group']);
</script>