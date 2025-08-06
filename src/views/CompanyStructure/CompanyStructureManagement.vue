<template>
    <BaseLayout title="Struktūra">
    <div class="flex flex-row items-center mb-6 gap-12">
        <button>
        <img src="../../assets/icons/Add Contact rounded.png" class="w-15 h-15"/>
        </button>
        <h2>Pridėti naują struktūrą:</h2>
    </div>
    <div class="flex flex-row text-white gap-2 mb-10">
        <RouterLink :to="{name: 'offices'}"
        v-slot="{navigate, isActive}">
        <button class="bg-[#0054A6] p-1.5 px-10 border-2 rounded-xl" @click="navigate"
        :class="{'bg-white text-[#0054A6] border-[#0054A6]': isActive}">Ofisai</button>
         </RouterLink>

        <RouterLink :to="{name: 'departments'}"
        v-slot="{navigate, isActive}">
        <button class="bg-[#0054A6] p-1.5 px-10 border-2 rounded-xl" @click="navigate"
        :class="{'bg-white text-[#0054A6] border-[#0054A6]': isActive}">Padaliniai</button>
         </RouterLink>

        <RouterLink :to="{name: 'divisions'}"
        v-slot="{navigate, isActive}">
        <button class="bg-[#0054A6] p-1.5 px-10 border-2 rounded-xl" @click="navigate"
        :class="{'bg-white text-[#0054A6] border-[#0054A6]': isActive}">Skyriai</button>
         </RouterLink>
        
        <RouterLink :to="{name: 'groups'}"
        v-slot="{navigate, isActive}">
        <button class="bg-[#0054A6] p-1.5 px-10 border-2 rounded-xl" @click="navigate"
        :class="{'bg-white text-[#0054A6] border-[#0054A6]': isActive}">Grupės</button>
         </RouterLink>
    </div>
    <RouterView></RouterView>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
</script>