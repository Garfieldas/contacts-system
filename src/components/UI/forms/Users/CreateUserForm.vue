<template>
  <form>
    <h2 class="text-3xl font-normal mb-6">Pridėkite naują admin paskyrą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-normal text-gray-700">Vardas:</label>
          <input type="text" id="name" placeholder="Įveskite padalinio pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-normal text-gray-700">Elektroninis paštas:</label>
          <input type="text" id="email" placeholder="Įveskite padalinio pavadinimą..."
            class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        </div>
        <div class="flex flex-col mb-4 mt-20">
          <label
            v-if="!selectedAvatar"
            for="avatar"
            class="cursor-pointer inline-block px-4 py-1 self-start bg-[#0054A6] text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Įkelti nuotrauką
          </label>
          <label
            v-else
            class="cursor-pointer inline-block px-10 py-1 self-start bg-red-500 text-white text-sm rounded"
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
          <span class="text-gray-500 text-sm" :class="{'break-all': selectedAvatar}">{{
            displayAvatar
          }}</span>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-4 text-center">Administracinės teisės:</h3>
        <div class="mb-4 flex gap-5 justify-center">
          <input type="checkbox"></input>
          <label>Redaguoti ir kurti kontaktus</label>
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
import { ref } from 'vue';

const displayAvatar = ref("Nuotrauka nėra įkėlta");
const selectedAvatar = ref();

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

</script>