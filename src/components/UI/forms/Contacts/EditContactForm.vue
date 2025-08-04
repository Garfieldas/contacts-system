<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Redaguoti kontaktą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-normal text-gray-700"
            >Vardas:</label
          >
          <input
            type="text"
            id="firstName"
            placeholder="Įveskite vardą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="name"
          />
          <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="mb-4">
          <label for="lastName" class="block text-sm font-normal text-gray-700"
            >Pavardė:</label
          >
          <input
            type="text"
            id="lastName"
            placeholder="Įveskite pavardę..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="surname"
          />
          <div v-if="errors.surname" class="error-message">
            {{ errors.surname }}
          </div>
        </div>

        <div class="mb-6">
          <label for="position" class="block text-sm font-normal text-gray-700"
            >Pozicija:</label
          >
          <input
            type="text"
            id="position"
            placeholder="Įveskite poziciją..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="position"
          />
          <div v-if="errors.position" class="error-message">
            {{ errors.position }}
          </div>
        </div>

        <h3 class="text-lg font-medium mb-4">Kontaktinė informacija:</h3>

        <div class="mb-4">
          <label for="email" class="block text-sm font-normal text-gray-700"
            >Elektroninis paštas:</label
          >
          <input
            type="email"
            id="email"
            placeholder="&#xf0e0; Įveskite el.paštą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="email"
          />
          <div v-if="errors.email" class="error-message">
            {{ errors.email }}
          </div>
        </div>

        <div class="mb-4">
          <label
            for="phone_number"
            class="block text-sm font-normal text-gray-700"
            >Telefono numeris:</label
          >
          <input
            type="text"
            id="phone_number"
            placeholder="&#xf098; Įveskite telefono numerį..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="phone_number"
          />
          <div v-if="errors.phone_number" class="error-message">
            {{ errors.phone_number }}
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Įmonės detalės:</h3>

        <div class="mb-4">
          <label for="company" class="block text-sm font-normal text-gray-700"
            >Įmonė:</label
          >
          <select
            id="company"
            class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            v-model="selectedCompany"
            @change="handleCompanyChange"
          >
            <option value="" selected>Pasirinkite įmonę...</option>
            <option v-for="company in companies" :value="company.id">
              {{ company.name }}
            </option>
          </select>
          <div v-if="errors.selectedCompany" class="error-message">
            {{ errors.selectedCompany }}
          </div>
        </div>

        <div class="mb-4">
          <label for="office" class="block text-sm font-normal text-gray-700"
            >Offisas:</label
          >
          <select
            id="office"
            class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            v-model="selectedOffice"
            @change="handleOfficeChange"
          >
            <option value="" selected>Pasirinkite ofisą...</option>
            <option v-for="office in displayOffice" :value="office.id">
              {{ office.name }}
            </option>
          </select>
          <div v-if="errors.selectedOffice" class="error-message">
            {{ errors.selectedOffice }}
          </div>
        </div>

        <div class="mb-4">
          <label for="division" class="block text-sm font-normal text-gray-700"
            >Skyrius:</label
          >
          <select
            id="division"
            class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            v-model="selectedDivision"
            @change="handleDivisionChange"
          >
            <option value="" selected>Pasirinkite skyrių...</option>
            <option v-for="division in displayDivision" :value="division.id">
              {{ division.name }}
            </option>
          </select>
          <div v-if="errors.selectedDivision" class="error-message">
            {{ errors.selectedDivision }}
          </div>
        </div>

        <div class="mb-4">
          <label
            for="department"
            class="block text-sm font-normal text-gray-700"
            >Padalinys:</label
          >
          <select
            id="department"
            class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            v-model="selectedDepartment"
            @change="handleDepartmentChange"
          >
            <option value="" selected>Pasirinkite padalinį...</option>
            <option
              v-for="department in displayDepartment"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label for="group" class="block text-sm font-normal text-gray-700"
            >Grupė:</label
          >
          <select
            id="group"
            class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            v-model="selectedGroup"
          >
            <option value="" selected>Pasirinkite grupę...</option>
            <option v-for="group in displayGroup" :value="group.id">
              {{ group.name }}
            </option>
          </select>
        </div>

        <div class="flex items-center space-x-4 mb-8">
          <label
            v-if="!selectedAvatar"
            for="avatar"
            class="cursor-pointer inline-block pe-20 ps-20 py-1 bg-[#0054A6] text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Įkelti nuotrauką
          </label>
          <label
            v-else
            class="cursor-pointer inline-block pe-20 ps-20 py-1 bg-red-500 text-white text-sm rounded"
            @click="handleFileCancelation"
          >
            Atšaukti
          </label>
          <input
            type="file"
            id="avatar"
            class="hidden"
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            @change="handleFileChange"
          />
          <div v-if="errors.selectedAvatar" class="error-message">
            {{ errors.selectedAvatar }}
          </div>
          <span class="text-gray-500 text-sm" :class="{'break-all': selectedAvatar}" v-else>{{
            displayAvatar
          }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button
        class="ps-20 pe-20 py-1 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        PRIDĖTI
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useCompanies } from "@/composables/useCompanies";
import { useOffices } from "@/composables/useOffices";
import { useDivisions } from "@/composables/useDivisions";
import { useDepartments } from "@/composables/useDepartments";
import { useGroups } from "@/composables/useGroups";
import { useEmployees } from "@/composables/useEmployees";
import type { expandOffice } from "@/types/officeType";
import type { expandDivision } from "@/types/divisionType";
import type { expandDepartment } from "@/types/departmentType";
import type { expandGroup } from "@/types/groupType";
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { updateEmployee } from "@/services/employeesService";
import { useNotificationStore } from "@/stores/notificationstore";

const { companies, fetchCompanies } = useCompanies();
const { offices, fetchOffices } = useOffices();
const { divisions, fetchDivisions } = useDivisions();
const { departments, fetchDepartments } = useDepartments();
const { groups, fetchGroups } = useGroups();
const { employees, fetchRequest } = useEmployees();

const displayOffice = ref();
const displayDivision = ref();
const displayDepartment = ref();
const displayGroup = ref();
const displayAvatar = ref("Nuotrauka nėra įkėlta");
const store = useNotificationStore();
const emits = defineEmits(['employee-updated']);
const props = defineProps(['employee'])

const handleCompanyChange = async () => {
  selectedOffice.value = "";
  selectedDivision.value = "";
  selectedDepartment.value = "";
  selectedGroup.value = "";
  offices.value = [];
  divisions.value = [];
  departments.value = [];
  groups.value = [];

  if (selectedCompany.value) {
    await fetchOffices(`?filter=company_id="${selectedCompany.value}"&expand=office_id&fields=expand.office_id`);
    displayOffice.value =(offices.value as expandOffice[]).map((item) => item.expand.office_id) ||[];
  } else {
    displayOffice.value = [];
    displayDivision.value = [];
    displayDepartment.value = [];
    displayGroup.value = [];
  }
};

const handleOfficeChange = async () => {
  selectedDivision.value = "";
  selectedDepartment.value = "";
  selectedGroup.value = "";
  divisions.value = [];
  departments.value = [];
  groups.value = [];

  if (selectedOffice.value) {
    await fetchDivisions(`?filter=office_id="${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
    displayDivision.value =
      (divisions.value as expandDivision[]).map((item) => item.expand.division_id) || [];
  } else {
    displayDivision.value = [];
    displayDepartment.value = [];
    displayGroup.value = [];
  }
};

const handleDivisionChange = async () => {
  selectedDepartment.value = "";
  selectedGroup.value = "";
  departments.value = [];
  groups.value = [];

  if (selectedDivision.value) {
    await fetchDepartments(`?filter=division_id="${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
    displayDepartment.value =
      (departments.value as expandDepartment[]).map((item) => item.expand.department_id) || [];
  } else {
    displayDepartment.value = [];
    displayGroup.value = [];
  }
};

const handleDepartmentChange = async () => {
  selectedGroup.value = "";
  groups.value = [];

  if (selectedDepartment.value) {
    await fetchGroups(`?filter=department_id="${selectedDepartment.value}"&expand=group_id&fields=expand.group_id`);
    displayGroup.value =(groups.value as expandGroup[]).map((item) => item.expand.group_id) || [];
  } else {
    displayGroup.value = [];
  }
};

const handleFileChange = (event: Event) => {
  const target = event?.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    displayAvatar.value = "Nuotrauka nėra įkėlta";
    selectedAvatar.value = null;
    return;
  }
  displayAvatar.value = file.name;
  selectedAvatar.value = file;
};

const handleFileCancelation = () => {
  displayAvatar.value = "Nuotrauka nėra įkėlta";
  selectedAvatar.value = null;
};

const createSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Vardas privalomas")
    .min(3, "Vardas privalo būti bent 3 simbolių")
    .max(20, "Vardas privalo neviršyti 20 simbolių"),

  surname: z
    .string()
    .trim()
    .min(1, "Pavardė privaloma")
    .min(4, "Pavardė privalo būti bent 4 simbolių")
    .max(20, "Pavardė privalo neviršyti 20 simbolių"),

  position: z
    .string()
    .trim()
    .min(1, "Pozicija privaloma")
    .min(3, "Pozicija privalo būti bent 3 simbolių")
    .max(50, "Pozicija privalo neviršyti 50 simbolių"),

  email: z
    .string()
    .trim()
    .min(1, "El.paštas privalomas")
    .email("El.paštas privalo būti valydus")
    .min(12, "El.paštas privalo būti bent 12 simbolių")
    .max(30, "El.paštas negali viršyti 30 simbolių"),

  phone_number: z
    .string()
    .trim()
    .max(20, "Telefono numeris negali viršyti 20 simbolių"),

  selectedCompany: z.string().min(1, "Įmonė privaloma"),
  selectedOffice: z.string().min(1, "Ofisas privalomas"),
  selectedDivision: z.string().min(1, "Skyrius privalomas"),
  selectedDepartment: z.string().optional().or(z.literal("")),
  selectedGroup: z.string().optional().or(z.literal("")),


  selectedAvatar: z.any().refine(
    (selectedAvatar: File | null) => {
      if (!selectedAvatar) return true;
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/webp",
      ];
      return (
        selectedAvatar instanceof File &&
        validTypes.includes(selectedAvatar.type) &&
        selectedAvatar.size <= 5 * 1024 * 1024
      );
    },
    {
      message:
        "Prašome įkelti tinkamo formato failą iki 5MB dydžio (PNG, JPG, SVG, WEBP)",
    }
  ),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(createSchema),

  initialValues: {
    name: "",
    surname: "",
    position: "",
    email: "",
    phone_number: "",
    selectedCompany: "",
    selectedOffice: "",
    selectedDivision: "",
    selectedDepartment: "",
    selectedGroup: "",
  },
});

const [name] = defineField("name");
const [surname] = defineField("surname");
const [position] = defineField("position");
const [email] = defineField("email");
const [phone_number] = defineField("phone_number");
const [selectedCompany] = defineField("selectedCompany");
const [selectedOffice] = defineField("selectedOffice");
const [selectedDivision] = defineField("selectedDivision");
const [selectedDepartment] = defineField("selectedDepartment");
const [selectedGroup] = defineField("selectedGroup");
const [selectedAvatar] = defineField("selectedAvatar");

const onSubmit = handleSubmit(async (values) => {
  const searchTerm = values.phone_number ? `(email?~"${values.email}") || phone_number?~"${values.phone_number}"` : `(email?~"${values.email}")`;
  await fetchRequest('&filter=' + encodeURIComponent(searchTerm));

  const existingList = employees.value;

  if (existingList.length > 1) {

    const found = existingList.find((item: any) =>
    item.email === values.email
    );

    if (found) {
      store.addErrorNotification('Toks kontaktas jau egzistuoja');
      return;
    }
}

  try {
    await updateEmployee(
      props.employee.id,
      values.name,
      values.surname,
      values.email,
      values.position,
      values.selectedCompany,
      values.selectedOffice,
      values.selectedDivision,
      values.phone_number,
      values.selectedDepartment,
      values.selectedGroup,
      values.selectedAvatar
    );

    store.addSuccessNotification('Įrašas atnaujintas sėkmingai');
    resetForm();
    emits('employee-updated');
  } catch (error: any) {
    store.addErrorNotification(error);
  }
});

watch(()=> props.employee, (newEmployee) => {
  name.value = newEmployee.name;
  surname.value = newEmployee.surname;
  position.value = newEmployee.position;
  email.value = newEmployee.email;
  phone_number.value = newEmployee.phone_number;
  fetchCompanies();
  selectedCompany.value = newEmployee.expand.company_id.id;
  handleCompanyChange();
  selectedOffice.value = newEmployee.expand.office_id.id;
  handleOfficeChange();
  selectedDivision.value = newEmployee.expand.division_id.id;
  handleDivisionChange();
  if(newEmployee.expand.department_id) {
    selectedDepartment.value = newEmployee.expand.department_id.id;
    handleDepartmentChange();
  }

  if (newEmployee.expand.group_id) {
    selectedGroup.value = newEmployee.expand.group_id.id;
  }
  
}, {immediate: true})
</script>
