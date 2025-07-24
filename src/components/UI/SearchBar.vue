<template>
    <div class="flex flex-row items-center mb-6">
        <div class="relative w-96">
            <input placeholder="Ieškoti kontakto..."
                class="bg-[#F1F2F4] w-full max-w-lg p-3 pl-10 rounded-md border-none outline-none text-gray-700" v-model.trim="searchParam">
            <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <div class="flex flex-row">
            <slot></slot>
        </div>
    </div>
    <div class="text-sm text-gray-600">
        Iš viso rasta: <span class="font-semibold text-[#1F3F77]">{{ totalItems }} kontaktų</span>
    </div>
</template>
<script setup lang="ts">
const searchParam = defineModel('searchParam');
const totalItems = defineModel('totalItems');
</script>