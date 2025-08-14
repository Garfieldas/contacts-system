<template>
    <div class="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium w-3/6">Pavadinimas</th>
            <th class="px-6 py-3 font-medium w-1/4 text-center pr-4" v-if="showEditStructure || showDeleteStructure">Veiksmas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            <DivisionsTableRow v-for="division in divisions" :key="division.id" :division="division"
            @edit-division="(division) => {
              emits('edit-division', division)
            }"
            @delete-division="(division) => {
              emits('delete-division', division)
            }"
            />
        </tbody>
      </table>
    </div>
</template>
<script setup lang="ts">
import DivisionsTableRow from './DivisionsTableRow.vue';
import { useActions } from '@/composables/useActions';

const props = defineProps(['divisions']);
const emits = defineEmits(['edit-division', 'delete-division']);
const { showEditStructure, showDeleteStructure } = useActions();
</script>