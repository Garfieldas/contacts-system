<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-[#1F3F77] relative">

    <div class="absolute top-20 left-20">
      <GoBackButton />
    </div>

    <CreateUserPasswordForm :token="token"/>

  </div>
</template>

<script setup lang="ts">
import GoBackButton from '@/components/UI/GoBackButton.vue';
import CreateUserPasswordForm from '@/components/UI/forms/Users/CreateUserPasswordForm.vue';
const props = defineProps(['token'])
</script>