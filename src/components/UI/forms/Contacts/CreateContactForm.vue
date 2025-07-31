<template>
    <h2 class="text-xl font-semibold mb-6">Pridėti kontaktą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-lg font-medium mb-4">Kontaktinė informacija:</h3>

        <div class="mb-4">
          <label for="firstName" class="block text-sm font-normal text-black-700">Vardas:</label>
          <input type="text" id="firstName" placeholder="Įveskite vardą..."
                 class="mt-1 block w-full px-4 py-2 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-4">
          <label for="lastName" class="block text-sm font-normal text-black-700">Pavardė:</label>
          <input type="text" id="lastName" placeholder="Įveskite pavardę..."
                 class="mt-1 block w-full px-4 py-2 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-6">
          <label for="position" class="block text-sm font-normal text-black-700">Pozicija:</label>
          <input type="text" id="position" placeholder="Įveskite poziciją..."
                 class="mt-1 block w-full px-4 py-2 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <h3 class="text-lg font-medium mb-4">Kontaktinė informacija:</h3>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Elektroninis paštas:</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6v6m0 0H9m3 0h3" />
              </svg>
            </div>
            <input type="email" id="email" placeholder="Įveskite el. paštą..."
                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Telefono numeris:</label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.284 1.142a1 1 0 00-.44 1.41l.012.012a12.005 12.005 0 005.626 5.626l.012.012a1 1 0 001.41-.44l1.142-2.284a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input type="tel" id="phone" placeholder="Įveskite telefono numerį..."
                   class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Įmonės detalės:</h3>

        <div class="mb-4">
          <label for="company" class="block text-sm font-medium text-gray-700">Įmonė:</label>
          <select id="company"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite įmonę...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="office" class="block text-sm font-medium text-gray-700">Offisas:</label>
          <select id="office"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite ofisą...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="department" class="block text-sm font-medium text-gray-700">Padalinys:</label>
          <select id="department"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite padalinį...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="division" class="block text-sm font-medium text-gray-700">Skyrius:</label>
          <select id="division"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite skyrių...</option>
            </select>
        </div>

        <div class="mb-6">
          <label for="group" class="block text-sm font-medium text-gray-700">Grupė:</label>
          <select id="group"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite grupę...</option>
            </select>
        </div>

        <div class="flex items-center space-x-4 mb-8">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            KELTI NUOTRAUKĄ
          </button>
          <span class="text-gray-500 text-sm">No photo uploaded.</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4 border-t border-gray-200 mt-4">
      <button class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        PRIDĖTI
      </button>
    </div> 
</template>