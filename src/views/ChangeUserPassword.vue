<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-[#1F3F77] relative">
    <div class="absolute top-20 left-20">
      <GoBackButton />
    </div>
    <UpdatePasswordForm />
</div>
</template>
<script setup lang="ts">
import UpdatePasswordForm from '@/components/UI/forms/UpdatePasswordForm.vue';
import GoBackButton from '@/components/UI/GoBackButton.vue';
</script>