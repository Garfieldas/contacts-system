<template>
      <tr class="hover:bg-gray-50 transition-colors">
        <router-link :to="{name: 'contact-details', params: {id: employee.id}}">
        <td class="px-6 py-4">{{ employee.name.slice(0, 20) }} {{ employee.surname.slice(0, 20) }}</td>
        </router-link>
        <td class="px-6 py-4">{{ employee.position }}</td>
        <td class="px-6 py-4">{{ employee.phone_number.slice(0, 20) }}</td>
        <td class="px-6 py-4 text-[#1F3F77]">{{ employee.email.slice(0, 30) }}</td>
        <td class="px-6 py-4">{{ employee.expand.office_id.name }}</td>
      </tr>
</template>
<script setup lang="ts">
const props = defineProps(['employee']);
</script>