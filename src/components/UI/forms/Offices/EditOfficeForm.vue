<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Rėdaguoti naują ofisą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="officeName" class="block text-sm font-normal text-gray-700">Pavadinimas:</label>
          <input type="text" id="officeName" placeholder="Įveskite ofiso pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="officeName" />
          <div v-if="errors.officeName" class="error-message">{{ errors.officeName }}</div>
        </div>

        <div class="mb-4">
          <label for="street" class="block text-sm font-normal text-gray-700">Gatvė:</label>
          <input type="text" id="street" placeholder="Įveskite gatvės pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="street" />
          <div v-if="errors.street" class="error-message">{{ errors.street }}</div>
        </div>

        <div class="mb-6">
          <label for="street_number" class="block text-sm font-normal text-gray-700">Pastato numeris:</label>
          <input type="text" id="street_number" placeholder="Įveskite pastato numerį..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="street_number" />
          <div v-if="errors.street_number" class="error-message">{{ errors.street_number }}</div>
        </div>

        <div class="mb-6">
          <label for="city" class="block text-sm font-normal text-gray-700">Miestas:</label>
          <input type="text" id="city" placeholder="Įveskite miestą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="city" />
          <div v-if="errors.city" class="error-message">{{ errors.city }}</div>
        </div>

        <div class="mb-6">
          <label for="country" class="block text-sm font-normal text-gray-700">Šalis:</label>
          <input type="text" id="country" placeholder="Įveskite šalį..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model.trim="country" />
          <div v-if="errors.country" class="error-message">{{ errors.country }}</div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Įmonės:</h3>
        <div class="relative overflow-y-auto rounded-sm" style="max-height: 250px;">
          <div v-for="(company, index) in companies" :key="company.id" @click="selectCompany(company)" :class="{
            'bg-[#0054A6] text-white': selectedCompanies.find((item: any) => item.id === company.id),
            'bg-gray-200 text-gray-800': !selectedCompanies.find((item: any) => item.id === company.id)
          }" class="px-4 py-3 mb-2 cursor-pointer hover:bg-[#0054A6] hover:text-white transition-colors duration-200">
            {{ company.name }}
          </div>
          <div v-if="errors.selectedCompanies" class="error-message">{{ errors.selectedCompanies }}</div>
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
import { onMounted, ref, watch } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { Company } from '@/types/companyType';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { getOffices, updateOffice } from '@/services/officesService';
import { getCompaniesOffices, createCompaniesOffices, updateCompaniesOffices, deleteCompaniesOffices } from '@/services/companiesOfficesService';

const { companies, fetchCompanies } = useCompanies();
const auth = useAuthenticationStore();
const store = useNotificationStore();
const searchedOffices = ref();
const props = defineProps(['office']);
const emit = defineEmits(['office-submit']);
const companiesOfficesId = ref('');

const selectCompany = (company: Company) => {
  const exist = selectedCompanies.value.find((item: any) => item.id === company.id);
  if (exist) {
    selectedCompanies.value = selectedCompanies.value.filter((item: any) => item.id !== company.id);
    return;
  }
  selectedCompanies.value.push(company);
};

const editSchema = z.object({
  officeName: z.string()
    .trim()
    .min(1, "Ofiso pavadinimas yra privalomas")
    .min(3, "Ofiso pavadinimas privalo būti bent 3 simbolių")
    .max(80, "Ofiso pavadinimas privalo neviršyti 80 simbolių"),

  street: z.string()
    .trim()
    .min(1, "Gatvė privaloma")
    .min(3, "Gatvė privalo būti bent 3 simbolių")
    .max(50, "Gatvė privalo neviršyti 50 simbolių"),

  street_number: z.string()
    .trim()
    .min(1, "Gatvės numeris privalo būti bent 1 simbolio")
    .max(4, "Gatvės numeris privalo neviršyti 4 simbolių"),

  city: z.string()
    .trim()
    .min(1, "Miestas privalomas")
    .min(4, "Miestas privalo būti bent 4 simbolių")
    .max(22, "Miestas negali viršyti 22 simbolių")
    .regex(/^[\p{L}\s]+$/gu, "Miesto pavadinimas gali turėti tik raides arba tarpus"),

  country: z.string()
    .trim()
    .min(1, "Šalis privalomas")
    .min(4, "Šalis privalo būti bent 4 simbolių")
    .max(60, "Šalis negali viršyti 60 simbolių")
    .regex(/^[\p{L}\s]+$/gu, "Šalies pavadinimas gali turėti tik raides arba tarpus"),

  selectedCompanies: z.any()
    .optional()

});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(editSchema),

  initialValues: {
    officeName: '',
    street: '',
    street_number: '',
    city: '',
    country: '',
    selectedCompanies: []
  }
});

const [officeName] = defineField('officeName');
const [street] = defineField('street');
const [street_number] = defineField('street_number');
const [city] = defineField('city');
const [country] = defineField('country');
const [selectedCompanies] = defineField('selectedCompanies');

const fetchOffices = async (street: string, street_number: string, city: string, country: string) => {
  const searchTerm = `(street?~"${street}" && street_number?~"${street_number}" && city?~"${city}" && country?~"${country}")`;
  const url = '?filter=' + encodeURIComponent(searchTerm);
  try {
    const response = await getOffices(url);
    searchedOffices.value = response.items;
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
}

const fetchCompaniesOffices = async (params?: string) => {
  const url = params ? `${params}` : '';
  try {
    const response = await getCompaniesOffices(url);

    if (response.items.length > 0) {
      companiesOfficesId.value = response.items[0].id;
      const associatedCompanies = response.items[0].expand.company_id;
      selectedCompanies.value = associatedCompanies;
    } else {
      selectedCompanies.value = [];
    }
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_offices) {
    store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.')
    return;
  }

  await fetchOffices(values.street, values.street_number, values.city, values.country);

  if (searchedOffices.value.length > 1) {
    store.addErrorNotification('Toks ofisas jau egizstuoja')
    return;
  }

  try {
    await updateOffice(props.office.id, values.officeName, values.street, values.street_number, values.city, values.country);
    const companies_ids = selectedCompanies.value.map((company: Company)=> company.id);
    if (!companiesOfficesId.value) {
        await createCompaniesOffices(companies_ids, props.office.id);
    }
    else if(companiesOfficesId.value && selectedCompanies.value.length === 0) {
        await deleteCompaniesOffices(companiesOfficesId.value)
    }
    else {
        await updateCompaniesOffices(companiesOfficesId.value, companies_ids, props.office.id)
    }
    store.addSuccessNotification('Ofisas atnaujintas sėkmingai!');
    resetForm();
    emit('office-submit');
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }

})

onMounted(() => {
  fetchCompanies();
});

watch(() => props.office, async (newOffice) => {
    if (!newOffice) return;

    officeName.value = newOffice.name;
    street.value = newOffice.street;
    street_number.value = newOffice.street_number;
    city.value = newOffice.city;
    country.value = newOffice.country;

    await fetchCompaniesOffices(`?filter=office_id="${newOffice.id}"&expand=company_id&fields=id,expand.company_id`);
  },{ immediate: true });
</script>