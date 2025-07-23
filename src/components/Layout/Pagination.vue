<template>
<div class="flex justify-center">
    <div class="bg-[#1F3F77] text-white rounded-lg flex items-center overflow-hidden">
        <button class="px-4 py-3 hover:bg-[#2A4D8A] transition-colors" @click="goBack">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <div class="px-6 py-3 bg-[#0F2A5A] text-center min-w-[120px]">
            <span class="text-sm font-medium">PRAEITAS PUSLAPIS</span>
        </div>
        <div class="px-6 py-3 bg-white text-[#1F3F77] font-semibold min-w-[60px] text-center" v-if="totalPages">
            {{ page }} / {{ totalPages }}
        </div>
        <div class="px-6 py-3 bg-white text-[#1F3F77] font-semibold min-w-[60px] text-center" v-else>
            1 / 1
        </div>
        <div class="px-6 py-3 bg-[#0F2A5A] text-center min-w-[120px]">
            <span class="text-sm font-medium">KITAS PUSLAPIS</span>
        </div>
        <button class="px-4 py-3 hover:bg-[#2A4D8A] transition-colors" @click="goNext">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</div>
</template>
<script setup lang="ts">
const page: any = defineModel('page');
const totalPages: any = defineModel('totalPages');
const goNext = () => {
    if(page.value >= totalPages.value) {
        return;
    }
    page.value++;
}
const goBack = () => {
    if(page.value > 1) {
        page.value--;
    }
}

</script>