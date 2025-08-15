<template>
    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium w-3/6">Vardas</th>
            <th class="px-6 py-3 font-medium w-3/4">El.paštas</th>
            <th class="px-6 py-3 font-medium w-1/4 text-center pr-4" v-if="hideActions">Veiksmas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            <UsersTableRow v-for="user in users" :key="user.id" :user="user"
            @edit-permissions="(user) => emits('edit-permissions', user)"
            @edit-user="(user) => emits('edit-user', user)"
            @delete-user="(user) => emits('delete-user', user)"/>
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { computed } from 'vue';
import UsersTableRow from './UsersTableRow.vue';

const props = defineProps(['users']);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_permissions && auth.user_permissions.delete_permissions) {
        return true;
    }
    return false;
});
const emits = defineEmits(['edit-permissions', 'edit-user', 'delete-user']);
</script>