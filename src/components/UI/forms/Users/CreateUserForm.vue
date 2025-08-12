<template>
  <form @submit.prevent="onSubmit">
    <h2 class="text-3xl font-normal mb-6">Pridėkite naują admin paskyrą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-normal text-gray-700">Vardas:</label>
          <input type="text" id="name" v-model.trim="name" placeholder="Įveskite padalinio pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-normal text-gray-700">Elektroninis paštas:</label>
          <input type="text" id="email" v-model.trim="email" placeholder="Įveskite padalinio pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="flex flex-col mb-4 mt-20">
          <label v-if="!selectedAvatar" for="avatar"
            class="cursor-pointer inline-block px-4 py-1 self-start bg-[#0054A6] text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Įkelti nuotrauką
          </label>
          <label v-else class="cursor-pointer inline-block px-10 py-1 self-start bg-red-500 text-white text-sm rounded"
            @click="handleFileCancelation">
            Atšaukti
          </label>
          <input type="file" id="avatar" class="hidden" accept="image/png, image/jpeg, image/svg+xml, image/webp"
            @change="handleFileChange" />
          <span class="text-gray-500 text-sm" :class="{ 'break-all': selectedAvatar }">{{
            displayAvatar
            }}</span>
          <div v-if="errors.selectedAvatar" class="error-message">{{ errors.selectedAvatar }}</div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-4 text-center">Administracinės teisės:</h3>
        <div class="flex flex-col justify-center">
          <div class="mb-4 flex gap-5" v-for="(permission, key) in permissions">
            <input type="checkbox" :id="key" v-model="selectedPermissions[key]"></input>
            <label :for="key" :class="{ 'line-through': selectedPermissions[key] }">{{ permission }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button
        class="ps-20 pe-20 py-2 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        PRIDĖTI
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationstore';
import { ref } from 'vue';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { createUser, createUserPermissions, getUsers } from '@/services/usersService';

const displayAvatar = ref("Nuotrauka nėra įkėlta");
const permissions = ref({
  edit_employees: 'Redaguoti ir kurti kontaktus',
  delete_employees: 'Trinti kontaktus',
  edit_companies: 'Redaguoti ir kurti įmonės',
  delete_companies: 'Trinti įmonės',
  edit_offices: 'Redaguoti ir kurti ofisus',
  delete_offices: 'Trinti ofisus',
  edit_structure: 'Redaguoti ir kurti struktūras',
  delete_structure: 'Trinti struktūras'
}
)
const store = useNotificationStore();
const auth = useAuthenticationStore();
const selectedPermissions: any = ref({});
const searchedUsers = ref();
const permissionsId = ref();
const emit = defineEmits(['user-submit']);

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

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Vardas privalomas")
    .min(3, "Vardas privalo būti bent 3 simbolių")
    .max(50, "Vardas privalo neviršyti 50 simbolių")
    .regex(/^[\p{L}\s]+$/gu, "Vardas gali turėti tik raides"),

  email: z
    .string()
    .trim()
    .min(1, "El.paštas privalomas")
    .email("El.paštas privalo būti valydus")
    .min(12, "El.paštas privalo būti bent 12 simbolių")
    .max(60, "El.paštas negali viršyti 60 simbolių"),

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
  validationSchema: toTypedSchema(userSchema),

  initialValues: {
    name: "",
    email: "",
  },
});

const [name] = defineField("name");
const [email] = defineField("email");
const [selectedAvatar] = defineField("selectedAvatar");

const fetchUsers = async (email: string) => {
  const searchTerm = `(email?~"${email}")`;
  const url = '?filter=' + encodeURIComponent(searchTerm);
  try {
    const response = await getUsers(url);
    searchedUsers.value = response.items;
  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!auth.isLoggedIn && !auth.user_permissions.edit_permissions) {
    store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
    return;
  }
  await fetchUsers(values.email);
  const exist = searchedUsers.value.filter((item: any) => item.email.toLowerCase() === values.email.toLowerCase());
  if (exist && exist.length > 0) {
    store.addErrorNotification('Toks vartotojas jau egzistuoja');
    return;
  }
  try {
    const response = await createUserPermissions(selectedPermissions.value);
    permissionsId.value = response.id;
    await createUser(values.name, values.email, permissionsId.value, selectedAvatar.value);
    resetForm();
    store.addSuccessNotification('Vartotojas sukurtas sėkmingai!');
    emit('user-submit');

  }
  catch (error: any) {
    store.addErrorNotification(error);
  }
});

</script>