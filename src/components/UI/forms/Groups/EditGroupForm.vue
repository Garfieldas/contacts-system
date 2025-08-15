<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Rėdaguokite naują grupę:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="groupName" class="block text-sm font-normal text-gray-700">Grupės pavadinimas:</label>
          <input type="text" id="groupName" placeholder="Įveskite skyriaus pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="groupName" />
          <div v-if="errors.groupName" class="error-message">{{ errors.groupName }}</div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-4">Skyriai:</h3>
        <div class="relative overflow-y-auto rounded-sm" style="max-height: 250px;">
          <div v-for="(department, index) in departments" :key="department.id" @click="selectDepartment(department)" :class="{
            'bg-[#0054A6] text-white': selectedDepartments.find((item: any)  => item.id === department.id),
            'bg-gray-200 text-gray-800': !selectedDepartments.find((item: any) => item.id === department.id)
          }" class="px-4 py-3 mb-2 cursor-pointer hover:bg-[#0054A6] hover:text-white transition-colors duration-200">
            {{ department.name }}
          </div>
          <div v-if="errors.selectedDepartments" class="error-message">{{ errors.selectedDepartments }}</div>
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
import { onMounted, ref, watch } from "vue";
import type { Department } from "@/types/departmentType";
import { getDepartments } from "@/services/departmentsService";
import { updateGroup } from "@/services/groupsService";
import { createDepartmentsGroup, updateDepartmentsGroup, deleteDepartmentsGroup, getDepartmentsGroups } from "@/services/departmentsGroupsService";

const fetchDepartments = async () => {
  try {
    const response = await getDepartments();
    departments.value = response.items;
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
};

const fetchGroups = async (name: string) => {
  const searchTerm = `(name?~"${name}")`;
  const url = '?filter=' + encodeURIComponent(searchTerm);
  try {
    const response = await getDepartments(url);
    searchedGroups.value = response.items;
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
}

const fetchDepartmentsGroup = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getDepartmentsGroups(url);
        if (response.items.length > 0) {
            departmentsGroupId.value = response.items[0].id;
            const associatedDepartments = response.items[0].expand.department_id;
            selectedDepartments.value = associatedDepartments;
        }
        else {
            selectedDepartments.value = [];
        }
        initialDepartments.value = JSON.parse(JSON.stringify(selectedDepartments.value));
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const groupSchema = z.object({
    groupName: z
        .string()
        .trim()
        .min(1, 'Grupės pavadinimas yra privalomas')
        .min(2, 'Grupės pavadinimas privalo būti bent 2 simbolių')
        .max(50, 'Grupės pavadinimas negali viršyti 50 simbolių')
        .regex(/^[\p{L}\s]+$/gu, "Grupės pavadinimas gali turėti tik raides arba tarpus"),

    selectedDepartments: z.any()
        .optional()
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(groupSchema),

    initialValues: {
        groupName: "",
        selectedDepartments: []
    },
});

const [groupName] = defineField("groupName");
const [selectedDepartments] = defineField("selectedDepartments");
const auth = useAuthenticationStore();
const store = useNotificationStore();
const departments = ref();
const searchedGroups = ref();
const emits = defineEmits(['group-submit', 'cancel-ation']);
const props = defineProps(['group']);
const departmentsGroupId = ref();
const initialGroup = ref();
const initialDepartments = ref();

const selectDepartment = (department: Department) => {
  const exist = selectedDepartments.value.find((item: any) => item.id === department.id);
  if (exist) {
    selectedDepartments.value = selectedDepartments.value.filter((item: any) => item.id !== department.id);
    return;
  }
  selectedDepartments.value.push(department);
};

const onSubmit = handleSubmit(async (values) => {
    if (!auth.isLoggedIn && !auth.user_permissions.edit_structure) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    await fetchGroups(values.groupName);
    const exist = searchedGroups.value.filter((item: any) => item.name.toLowerCase() === values.groupName.toLowerCase());
    if (exist && exist.length > 0) {
        store.addErrorNotification('Tokia grupė jau sukurta!');
        return;
    }
    try {
        await updateGroup(props.group.id, values.groupName);
        const departmentsIds = selectedDepartments.value.map((item: any) => item.id);
        if (departmentsIds.length > 0) {
          if (departmentsGroupId.value) {
              await updateDepartmentsGroup(departmentsGroupId.value ,departmentsIds, props.group.id);
          }
          else {
              await createDepartmentsGroup(departmentsIds, props.group.id);
          }
        }
        else if(departmentsGroupId.value) {
              await deleteDepartmentsGroup(departmentsGroupId.value);
        }
        departmentsGroupId.value = '';
        store.addSuccessNotification('Grupė atnaujinta sėkmingai!');
        resetForm();
        emits('group-submit');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
});

onMounted(() => {
    fetchDepartments();
})

watch(() => props.group, async (newGroup) => {
    initialGroup.value = { ...newGroup };
    groupName.value = newGroup.name;
    await fetchDepartmentsGroup(`?filter=group_id="${newGroup.id}"&expand=department_id&fields=id,expand.department_id`);
}, {immediate: true})

</script>