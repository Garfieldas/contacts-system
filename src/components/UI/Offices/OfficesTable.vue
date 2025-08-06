<template>
    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium w-3/6">Pavadinimas</th>
            <th class="px-6 py-3 font-medium w-3/4">Adresas</th>
            <th class="px-6 py-3 font-medium w-1/4 text-center pr-4">Veiksmas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            <OficesTableRow v-for="office in offices" :key="office.id" :office="office"/>
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import OficesTableRow from './OficesTableRow.vue';
const props = defineProps(['offices']);
</script>