<template>
    <Overlay :show-overlay="showModal" @click="toggleModal"/>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl
    p-6 bg-white rounded-lg shadow-lg z-30" :class="{'hidden': !showModal}">
    <div class="flex flex-row justify-end">
    <button class="top-1" @click="toggleModal"><img class="w-22" src="../../assets/icons/Close button.png"/></button>
    </div>
    <slot></slot>
</div>
</template>
<script setup lang="ts">
import Overlay from './Overlay.vue';
const showModal = defineModel('showModal');
const emits = defineEmits(['toggle-modal']);
const toggleModal = () => {
    showModal.value = !showModal.value
    emits('toggle-modal')
}
</script>