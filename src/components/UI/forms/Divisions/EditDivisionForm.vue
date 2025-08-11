<template>
    <form @submit.prevent="onSubmit">
        <h2 class="text-3xl font-normal mb-6">Rėdaguoti naują padalinį:</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="mb-4">
                    <label for="divisionName" class="block text-sm font-normal text-gray-700">Padalinio
                        pavadinimas:</label>
                    <input type="text" id="divisionName" placeholder="Įveskite padalinio pavadinimą..."
                        class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        v-model.trim="divisionName" />
                    <div v-if="errors.divisionName" class="error-message">{{ errors.divisionName }}</div>
                </div>
            </div>
            <div>
                <h3 class="text-lg font-medium mb-4">Ofisai:</h3>
                <div class="relative overflow-y-auto rounded-sm" style="max-height: 250px;">
                    <div v-for="(office, index) in offices" :key="office.id" @click="selectOffice(office)" :class="{
                        'bg-[#0054A6] text-white': selectedOffices.find((item: any) => item.id === office.id),
                        'bg-gray-200 text-gray-800': !selectedOffices.find((item: any) => item.id === office.id)
                    }" class="px-4 py-3 mb-2 cursor-pointer hover:bg-[#0054A6] hover:text-white transition-colors duration-200">
                        {{ office.name }}
                    </div>
                    <div v-if="errors.selectedOffices" class="error-message">{{ errors.selectedOffices }}</div>
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
import { getOffices } from "@/services/officesService";
import type { Office } from "@/types/officeType";
import { getDivisions, updateDivision } from "@/services/divisionsService";
import { createOfficesDivision, deleteOfficesDivision, getOfficessDivisions, updateOfficesDivision } from "@/services/officesDivisionsService";

const divisionSchema = z.object({
    divisionName: z
        .string()
        .trim()
        .min(1, 'Padalinio pavadinimas yra privalomas')
        .min(2, 'Padalinio pavadinimas privalo būti bent 2 simbolių')
        .max(50, 'Padalinio pavadinimas negali viršyti 50 simbolių')
        .regex(/^[\p{L}\s]+$/gu, "Padalinio pavadinimas gali turėti tik raides arba tarpus"),

    selectedOffices: z.any()
        .optional()
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(divisionSchema),

    initialValues: {
        divisionName: "",
        selectedOffices: []
    },
});

const props = defineProps(['division'])
const [divisionName] = defineField("divisionName");
const [selectedOffices] = defineField("selectedOffices");
const auth = useAuthenticationStore();
const store = useNotificationStore();
const offices = ref();
const searchedDivisions = ref();
const emits = defineEmits(['division-submit']);
const officesDivisionsId = ref();

const selectOffice = (office: Office) => {
    const exist = selectedOffices.value.find((item: any) => item.id === office.id);
    if (exist) {
        selectedOffices.value = selectedOffices.value.filter((item: any) => item.id !== office.id);
        return;
    }
    selectedOffices.value.push(office);
};

const fetchOfficesDivisions = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getOfficessDivisions(url);
        if (response.items.length > 0) {
            officesDivisionsId.value = response.items[0].id;
            const associatedOffices = response.items[0].expand.office_id;
            selectedOffices.value = associatedOffices;
        }
        else {
            selectedOffices.value = [];
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const fetchOffices = async () => {
    try {
        const response = await getOffices();
        offices.value = response.items;
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const fetchDivisions = async (name: string) => {
    const searchTerm = `(name?~"${name}")`;
    const url = '?filter=' + encodeURIComponent(searchTerm);
    try {
        const response = await getDivisions(url);
        searchedDivisions.value = response.items;
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const onSubmit = handleSubmit(async (values) => {
    if (!auth.isLoggedIn && !auth.user_permissions.edit_structure) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    await fetchDivisions(values.divisionName);
    const exist = searchedDivisions.value.filter((item: any) => item.name.toLowerCase() === values.divisionName.toLowerCase());
    if (exist && exist.length > 0) {
        store.addErrorNotification('Toks padalinys jau yra sukurtas!');
        return;
    }
    try {
        await updateDivision(props.division.id, values.divisionName);
        const offices_ids = selectedOffices.value.map((office: Office) => office.id);
        if (offices_ids.length > 0) {
            if (officesDivisionsId.value) {
                await updateOfficesDivision(officesDivisionsId.value, offices_ids, props.division.id)
            }
            else {
                await createOfficesDivision(offices_ids, props.division.id);
            }
        }
        else if(officesDivisionsId.value) {
                await deleteOfficesDivision(officesDivisionsId.value)
        }
        officesDivisionsId.value = '';
        resetForm();
        emits('division-submit');
        store.addSuccessNotification('Padalinys sėkmingai atnaujintas!');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
})

onMounted(() => {
    fetchOffices();
})

watch(() => props.division, async (newDivision) => {

    divisionName.value = newDivision.name;
    await fetchOfficesDivisions(`?filter=division_id="${newDivision.id}"&expand=office_id&fields=id,expand.office_id`);
}, {immediate: true})

</script>