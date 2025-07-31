<template>
    <Overlay :show-overlay="showModal"/>
<div class="bg-gray-200 fixed w-[300px] z-30 top-1/2 left-1/2" :class="{'hidden': !showModal}">
    <div class="flex flex-row justify-end">
    <button class="top-1"><img class="w-22" src="../../assets/icons/Close button.png"/></button>
    </div>
    <slot></slot>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Overlay from './Overlay.vue';
const showModal = ref(false);
</script>