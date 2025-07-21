<template>
  <button v-if="currentDisplay.__name === 'ContactTable'"
    class="text-white px-2 py-3 rounded-md flex items-center" @click="$emit('toggle')">
    <img src="../../../assets/icons/cardButton.png" class="w-20 h-18" />
  </button>
  <button v-else
    class="text-white px-2 py-3 rounded-md flex items-center" @click="$emit('toggle')">
    <img src="../../../assets/icons/FilterButton2.png" class="w-20 h-18" />
  </button>
</template>
<script setup lang="ts">
const props = defineProps(['currentDisplay']);
</script>
