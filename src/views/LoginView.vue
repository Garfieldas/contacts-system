<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-[#1F3F77] relative">

    <div class="absolute top-20 left-20">
      <GoBackButton />
    </div>

    <LoginForm />

  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/UI/forms/LoginForm.vue';
import GoBackButton from '@/components/UI/GoBackButton.vue';
</script>