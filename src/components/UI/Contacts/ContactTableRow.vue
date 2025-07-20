<template>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4">{{ employee.name }} {{ employee.surname }}</td>
        <td class="px-6 py-4">{{ employee.position }}</td>
        <td class="px-6 py-4">{{ employee.phone_number }}</td>
        <td class="px-6 py-4 text-[#1F3F77]">{{ employee.email }}</td>
        <td class="px-6 py-4">{{ employee.expand.office_id.name }}</td>
      </tr>
</template>
<script setup lang="ts">
const props = defineProps(['employee'])
</script>