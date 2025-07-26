<template>
    <div class="flex justify-center px-6 mt-20 ">
    <div class="bg-white">
    <form class="flex flex-col gap-10 p-15 px-40">
        <div class="flex flex-col p-10">
        <h1 class="text-5xl font-medium">Admin Prisijungimas:</h1>
        </div>
        <div class="flex flex-col">
            <label for="email">Elekotrinis paštas:</label>
            <input class="bg-gray-200 p-3 input-icon-email" type="email" id="email"
             placeholder="Įveskite el.pašto adresą..."/>
        </div>
        <div class="flex flex-col">
            <label for="password">Elekotrinis paštas:</label>
            <input class="bg-gray-200 p-3 input-icon-email" type="password" id="password"
             placeholder="Įveskite slaptažodį..."/>
        </div>
        <router-link :to="{name: 'password-reset'}" class="text-sky-700 font-small">
            Slaptažodžio atkūrimas
        </router-link>
        <div class="flex flex-col">
            <button class="bg-[#0054A6] text-white font-medium p-2.5 rounded-sm">Prisijungti</button>
        </div>
        <div class="p-60"></div>
    </form>
    </div>
    </div>
</template>