<template>
    <form class="flex flex-col justify-center p-4" @submit.prevent="onSubmit">
        <div class="flex mb-10">
            <h2 class="text-4xl font-normal">Pridėkite naują įmonę</h2>
        </div>
        <div class="flex flex-col">
            <label class="text-gray-600">Įmonės pavadinimas</label>
            <input v-model.trim="companyName" type="text" placeholder="Įveskite įmonės pavadinimą..."
                class="bg-gray-200 w-80 py-2 p-4" />
            <div v-if="errors.companyName" class="error-message">{{ errors.companyName }}</div>
        </div>
        <div class="flex flex-row mt-10">
            <button class="bg-[#0054A6] text-white px-30 py-2 uppercase font-medium hover:bg-sky-400">Pridėti</button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { createCompany } from "@/services/companiesService";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useNotificationStore } from "@/stores/notificationstore";
import { useCompanies } from "@/composables/useCompanies";

const companySchema = z.object({
    companyName: z
        .string()
        .trim()
        .min(1, 'Įmonės pavadinimas yra privalomas')
        .min(3, 'Įmonės pavadinimas privalo būti bent 3 simbolių')
        .max(30, 'Įmonės pavadinimas negali viršyti 50 simbolių')
        .regex(/^[a-zA-Z\s]+$/, "Pavadinimas gali turėti tik raides ir tarpus"),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(companySchema),

    initialValues: {
        companyName: "",
    },
});

const [companyName] = defineField("companyName");
const auth = useAuthenticationStore();
const store = useNotificationStore();
const { companies, fetchCompanies } = useCompanies();
const emit = defineEmits(['company-created']);

const onSubmit = handleSubmit(async (values) => {
    if (!auth.isLoggedIn && !auth.user_permissions.edit_companies) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    const searchTerm = `(name?~"${values.companyName}")`;
    await fetchCompanies('&filter=' + encodeURIComponent(searchTerm));

    const existingList = companies.value;
    const found = existingList.find((item: any) => 
        item.name === values.companyName
    );

    if (found) {
        store.addErrorNotification('Tokia įmonė jau yra sukurta');
        return;
    }
    
    try {
        await createCompany(values.companyName);
        resetForm();
        store.addSuccessNotification('Įmonė sėkmingai sukurta!');
        emit('company-created');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
})

</script>