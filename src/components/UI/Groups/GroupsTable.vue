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
            <GroupsTableRow v-for="group in groups" :key="group.id" :group="group"
            @edit-group="(group) => emits('edit-group', group)"
            @delete-group="(group) => emits('delete-group', group)"/>
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';
import GroupsTableRow from './GroupsTableRow.vue';
const props = defineProps(['groups']);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});
const emits = defineEmits(['edit-group', 'delete-group']);
</script>