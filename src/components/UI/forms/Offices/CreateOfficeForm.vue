<template>
  <form>
    <h2 class="text-3xl font-normal mb-6">Pridėkite naują ofisą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="officeName" class="block text-sm font-normal text-gray-700"
            >Pavadinimas:</label
          >
          <input
            type="text"
            id="officeName"
            placeholder="Įveskite ofiso pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="street" class="block text-sm font-normal text-gray-700"
            >Gatvė:</label
          >
          <input
            type="text"
            id="street"
            placeholder="Įveskite gatvės pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="mb-6">
          <label for="street_number" class="block text-sm font-normal text-gray-700"
            >Pastato numeris:</label
          >
          <input
            type="text"
            id="street_number"
            placeholder="Įveskite pastato numerį..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="mb-6">
          <label for="city" class="block text-sm font-normal text-gray-700"
            >Miestas:</label
          >
          <input
            type="text"
            id="city"
            placeholder="Įveskite miestą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div class="mb-6">
          <label for="country" class="block text-sm font-normal text-gray-700"
            >Šalis:</label
          >
          <input
            type="text"
            id="country"
            placeholder="Įveskite šalį..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
    </div>
      
      <div>
        <h3 class="text-lg font-medium mb-4">Įmonės:</h3>
        <div class="relative overflow-y-auto rounded-sm" style="max-height: 250px;">
          <div
            v-for="(company, index) in companies"
            :key="company.id"
            @click="selectCompany(company)"
            :class="{ 
              'bg-[#0054A6] text-white': selectedCompany && selectedCompany.id === company.id,
              'bg-gray-200 text-gray-800': !selectedCompany || selectedCompany.id !== company.id
            }"
            class="px-4 py-3 mb-2 cursor-pointer hover:bg-[#0054A6] hover:text-white transition-colors duration-200"
          >
            {{ company.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-start pt-4">
      <button
        class="ps-20 pe-20 py-2 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        PRIDĖTI
      </button>
    </div>
  </form>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { companies, fetchCompanies } = useCompanies();
const selectedCompany = ref(null);
const selectCompany = (company) => {
  if (selectedCompany.value && selectedCompany.value.id === company.id) {
    selectedCompany.value = null;
  } else {
    selectedCompany.value = company;
  }
};

const createSchema = z.object({
  officeName: z
    .string()
    .trim()
    .min(1, "Ofiso pavadinimas yra privalomas")
    .min(3, "Ofiso pavadinimas privalo būti bent 3 simbolių")
    .max(60, "Ofiso pavadinimas privalo neviršyti 60 simbolių"),

  street: z
    .string()
    .trim()
    .min(1, "Gatvė privaloma")
    .min(4, "Gatvė privalo būti bent 4 simbolių")
    .max(20, "Gatvė privalo neviršyti 20 simbolių"),

  street_number: z
    .string()
    .trim()
    .min(1, "Gatvės numeris privalomas")
    .min(3, "Gatvės numeris privalo būti bent 3 simbolių")
    .max(50, "Gatvės numeris privalo neviršyti 50 simbolių"),

  city: z
    .string()
    .trim()
    .min(1, "Miestas privalomas")
    .min(12, "Miestas privalo būti bent 12 simbolių")
    .max(60, "Miestas negali viršyti 60 simbolių"),

  country: z
    .string()
    .trim()
    .min(1, "Šalis privalomas")
    .min(12, "Šalis privalo būti bent 12 simbolių")
    .max(60, "Šalis negali viršyti 60 simbolių"),

});

onMounted(() => {
    fetchCompanies();
})
</script>