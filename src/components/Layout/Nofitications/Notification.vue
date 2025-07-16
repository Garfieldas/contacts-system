<template>
 <div class="bg-white flex items-center justify-between p-4 rounded shadow border"
  :class="{'text-red-900': notification.type === 'error', 'text-teal-900': notification.type === 'success'}">

    <span>{{ notification.message }}</span>

    <button class="text-white px-3 py-1 rounded focus:outline-none focus:ring-2"
  :class="{'bg-red-800 hover:bg-red-700 focus:ring-red-500': notification.type === 'error',
'bg-teal-800 hover:bg-teal-700 focus:ring-teal-500': notification.type === 'success'}"
  @click="$emit('remove-message', notification.id)">X</button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['notification'])
</script>