<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Pridėkite naują skyrių:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="divisionName" class="block text-sm font-normal text-gray-700">Skyriaus pavadinimas:</label>
          <input type="text" id="divisionName" placeholder="Įveskite skyriaus pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="departmentName" />
          <div v-if="errors.departmentName" class="error-message">{{ errors.departmentName }}</div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-4">Padaliniai:</h3>
        <div class="relative overflow-y-auto rounded-sm" style="max-height: 250px;">
          <div v-for="(division, index) in divisions" :key="division.id" @click="selectedDivision(division)" :class="{
            'bg-[#0054A6] text-white': selectedDivisions.find((item: any)  => item.id === division.id),
            'bg-gray-200 text-gray-800': !selectedDivisions.find((item: any) => item.id === division.id)
          }" class="px-4 py-3 mb-2 cursor-pointer hover:bg-[#0054A6] hover:text-white transition-colors duration-200">
            {{ division.name }}
          </div>
          <div v-if="errors.selectedDivisions" class="error-message">{{ errors.selectedDivisions }}</div>
        </div>
      </div>
    </div>

    <div class="flex justify-start pt-4">
      <button
        class="ps-20 pe-20 py-2 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        PRIDĖTI
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useNotificationStore } from "@/stores/notificationstore";
import { onMounted, ref } from "vue";
import type { Division } from "@/types/divisionType";
import { getDivisions } from "@/services/divisionsService";
import { getDepartments } from "@/services/departmentsService";

const fetchDivisions = async () => {
    try {
        const response = await getDivisions();
        divisions.value = response.items;
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const fetchDepartments = async (name: string) => {
  const searchTerm = `(name?~"${name}")`;
  const url = '?filter=' + encodeURIComponent(searchTerm);
  try {
    const response = await getDepartments(url);
    searchedDepartments.value = response.items;
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
}

const departmentSchema = z.object({
    departmentName: z
        .string()
        .trim()
        .min(1, 'Skyriaus pavadinimas yra privalomas')
        .min(2, 'Skyriaus pavadinimas privalo būti bent 2 simbolių')
        .max(50, 'Skyriaus pavadinimas negali viršyti 50 simbolių')
        .regex(/^[\p{L}\s]+$/gu, "Padalinio pavadinimas gali turėti tik raides arba tarpus"),

    selectedDivisions: z.any()
        .optional()
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(departmentSchema),

    initialValues: {
        departmentName: "",
        selectedDivisions: []
    },
});

const [departmentName] = defineField("departmentName");
const [selectedDivisions] = defineField("selectedDivisions");
const auth = useAuthenticationStore();
const store = useNotificationStore();
const divisions = ref();
const searchedDepartments = ref();
const emits = defineEmits(['division-submit']);

const selectedDivision = (division: Division) => {
  const exist = selectedDivisions.value.find((item: any) => item.id === division.id);
  if (exist) {
    selectedDivisions.value = selectedDivisions.value.filter((item: any) => item.id !== division.id);
    return;
  }
  selectedDivisions.value.push(division);
};

const onSubmit = handleSubmit(async (values) => {
    if (!auth.isLoggedIn && !auth.user_permissions.edit_structure) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    await fetchDepartments(values.departmentName);
    const filteredDepartments = searchedDepartments.value.filter((item: any) => item.name === values.departmentName);
    if (filteredDepartments.length > 0) {
        store.addErrorNotification('Toks skyrius jau yra sukurtas');
        return;
    }
});

onMounted(() => {
    fetchDivisions();
})

</script>