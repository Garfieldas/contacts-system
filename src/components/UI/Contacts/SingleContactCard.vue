<template>
        <div class="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-6">
                    <svg class="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 text-2xl">Vardas Pavardė</h3>
                    <p class="text-lg text-gray-600">Pozicija: pozicijos_pavadinimas</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-base">
                <div>
                    <h4 class="font-bold text-gray-800 mb-3">Kontaktaktinės detalės:</h4>
                    <div class="space-y-2">
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Elektroninis paštas:</span>
                            <a href="mailto:example@teltonika.lt" class="text-[#1F3F77] hover:underline">example@teltonika.lt</a>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Telefono numeris:</span>
                            <span>+00000000000</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-gray-800 mb-3">Kompanijos detalės:</h4>
                    <div class="space-y-2">
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Kompanija:</span>
                            <span>kompanijos_pavyzdys</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Būstinė:</span>
                            <span>būstinės_pavyzdys</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Padalinys:</span>
                            <span>padalinio_pavyzdys</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Skyrius:</span>
                            <span>skyriaus_pavyzdys</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Grupė:</span>
                            <span>grupės_pavyzdys</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>