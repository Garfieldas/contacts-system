<template>
    <BaseLayout title="Struktūra">
    <div class="flex flex-row items-center mb-6 gap-12">
        <button>
        <img src="../../assets/icons/Add Contact rounded.png" class="w-15 h-15"/>
        </button>
        <h2>Pridėti naują struktūrą:</h2>
    </div>
    <div class="flex flex-row text-white gap-2">
        <RouterLink :to="{name: 'offices'}">
        <button class="bg-[#0054A6] border-2 border-transparent p-1.5 px-10 rounded-xl
         hover:bg-white hover:text-[#0054A6] hover:border-[#0054A6]">Ofisai</button>
         </RouterLink>

        <RouterLink :to="{name: 'departments'}">
        <button class="bg-[#0054A6] border-2 border-transparent p-1.5 px-10 rounded-xl
        hover:bg-white hover:text-[#0054A6] hover:border-[#0054A6]">Padaliniai</button>
        </RouterLink>

        <RouterLink :to="{name: 'divisions'}">
        <button class="bg-[#0054A6] border-2 border-transparent p-1.5 px-10 rounded-xl
        hover:bg-white hover:text-[#0054A6] hover:border-[#0054A6]">Skyriai</button>
        </RouterLink>
        
        <RouterLink :to="{name: 'groups'}">
        <button class="bg-[#0054A6] border-2 border-transparent p-1.5 px-10 rounded-xl
        hover:bg-white hover:text-[#0054A6] hover:border-[#0054A6]">Grupės</button>
        </RouterLink>
    </div>
    <RouterView></RouterView>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
</script>