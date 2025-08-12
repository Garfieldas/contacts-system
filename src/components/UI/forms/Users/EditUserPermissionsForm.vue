<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Rėdaguoti paskyros teisės:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-lg font-medium mb-4 text-center">Administracinės teisės:</h3>
        <div class="flex flex-col justify-center">
          <div class="mb-4 flex gap-5" v-for="(permission, key) in permissions">
            <input type="checkbox" :id="key" v-model="selectedPermissions[key]"></input>
            <label :for="key" :class="{ 'line-through': selectedPermissions[key] }">{{ permission }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button
        class="ps-20 pe-20 py-2 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Atnaujinti
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, watch } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { getUserPermissions } from '@/services/authenticationService';
import { updateUserPermissions } from '@/services/usersService';

const permissions = ref({
  edit_employees: 'Redaguoti ir kurti kontaktus',
  delete_employees: 'Trinti kontaktus',
  edit_companies: 'Redaguoti ir kurti įmonės',
  delete_companies: 'Trinti įmonės',
  edit_offices: 'Redaguoti ir kurti ofisus',
  delete_offices: 'Trinti ofisus',
  edit_structure: 'Redaguoti ir kurti struktū ras',
  delete_structure: 'Trinti struktūras'
}
)
const store = useNotificationStore();
const auth = useAuthenticationStore();
const selectedPermissions: any = ref({});
const emit = defineEmits(['user-submit']);
const props = defineProps(['user']);

const fetchPermissions = async(id: string) => {
    try {
        const response = await getUserPermissions(id);
        selectedPermissions.value = response;
    }
    catch(error: any) {
        store.addErrorNotification(error);
    }
} 

const onSubmit = async () => {
  if (!auth.isLoggedIn && !auth.user_permissions.edit_permissions) {
    store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
    return;
  }
  try {
    await updateUserPermissions(props.user.permissions_id, selectedPermissions.value);
    store.addSuccessNotification('Teisės sėkmingai atnaujintos!');
    emit('user-submit');
  }
  catch(error: any) {
    store.addErrorNotification(error);
  }
};
watch(() => props.user, async(newUser) => {
    await fetchPermissions(newUser.permissions_id);
}, {immediate: true});
</script>