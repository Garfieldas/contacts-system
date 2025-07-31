<template>
      <tr class="hover:bg-gray-50 transition-colors">
        <router-link :to="{name: 'contact-details', params: {id: employee.id}}">
        <td class="px-6 py-4">{{ employee.name.slice(0, 20) }} {{ employee.surname.slice(0, 20) }}</td>
        </router-link>
        <td class="px-6 py-4">{{ employee.position }}</td>
        <td class="px-6 py-4" v-if="employee.phone_number">{{ employee.phone_number.slice(0, 20) }}</td>
        <td class="px-6 py-4" v-else>Nėra informacijos</td>
        <td class="px-6 py-4 text-[#1F3F77] cursor-pointer" v-if="employee.email.length > 30" @click="toggleEmail">
          {{ hideEmail?  employee.email.slice(0, 30) : employee.email }} {{ arrow }}</td>
        <td class="px-6 py-4 text-[#1F3F77]" v-else>{{ employee.email }}</td>
        <td class="px-6 py-4">{{ employee.expand.office_id.name }}</td>
        <td class="px-6 py-4 text-white" v-if="hideButtons">
          <button class="bg-[#0054A6] rounded-2xl px-10 py-1 mr-4">Redaguoti</button>
          <button class="bg-[#A61A11] rounded-2xl px-10 py-1">Ištrinti</button>
        </td>
      </tr>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const props = defineProps(['employee']);
const hideEmail = ref(true);
const arrow = ref('▼');
const auth = useAuthenticationStore();
const toggleEmail = () => {
  hideEmail.value = !hideEmail.value;
  arrow.value = hideEmail.value ? '▼' : '▲'
}
const hideButtons = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions.edit_employees && auth.user_permissions.delete_employees) {
        return true
    }
    return false;
})
</script>