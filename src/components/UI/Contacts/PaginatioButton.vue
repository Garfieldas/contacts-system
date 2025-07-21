<template>
  <div class="relative inline-block">
    <button
      class="text-white px-2 py-3 rounded-md flex items-center"
      @click="toggleDropdown"
    >
      <img src="../../../assets/icons/FilterButton1.png" class="w-20 h-18" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-0 top-[80%] left-4 w-[65px] overflow-hidden"
    >
      <ul class="text-sm text-white">
        <li
          v-for="option in options"
          :key="option"
          class="text-center bg-[#0054A6] cursor-pointer dropdown"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const options = ['5', '10', '25', '50', '100', 'ALL'];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

</script>