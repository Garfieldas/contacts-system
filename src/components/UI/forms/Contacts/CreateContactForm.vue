<template>
    <h2 class="text-3xl font-normal mb-6">Pridėti kontaktą:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>

        <div class="mb-4">
          <label for="firstName" class="block text-sm font-normal text-gray-700">Vardas:</label>
          <input type="text" id="firstName" placeholder="Įveskite vardą..."
                 class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-4">
          <label for="lastName" class="block text-sm font-normal text-gray-700">Pavardė:</label>
          <input type="text" id="lastName" placeholder="Įveskite pavardę..."
                 class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-6">
          <label for="position" class="block text-sm font-normal text-gray-700">Pozicija:</label>
          <input type="text" id="position" placeholder="Įveskite poziciją..."
                 class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <h3 class="text-lg font-medium mb-4">Kontaktinė informacija:</h3>

          <div class="mb-4">
          <label for="email" class="block text-sm font-normal text-gray-700">Elektroninis paštas:</label>
          <input type="email" id="email" placeholder="&#xf0e0; Įveskite el.paštą..."
                 class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

          <div class="mb-4">
          <label for="phone_number" class="block text-sm font-normal text-gray-700">Telefono numeris:</label>
          <input type="text" id="phone_number" placeholder="&#xf098; Įveskite telefono numerį..."
                 class="mt-1 block w-full px-4 py-4 bg-gray-200 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>  
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Įmonės detalės:</h3>

        <div class="mb-4">
          <label for="company" class="block text-sm font-normal text-gray-700">Įmonė:</label>
          <select id="company"
                  class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite įmonę...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="office" class="block text-sm font-normal text-gray-700">Offisas:</label>
          <select id="office"
                  class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite ofisą...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="department" class="block text-sm font-normal text-gray-700">Padalinys:</label>
          <select id="department"
                  class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite padalinį...</option>
            </select>
        </div>

        <div class="mb-4">
          <label for="division" class="block text-sm font-normal text-gray-700">Skyrius:</label>
          <select id="division"
                  class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite skyrių...</option>
            </select>
        </div>

        <div class="mb-6">
          <label for="group" class="block text-sm font-normal text-gray-700">Grupė:</label>
          <select id="group"
                  class="mt-1 block w-full pl-3 pr-10 py-4 text-[#414042] shadow-xl shadow-black-500/100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Pasirinkite grupę...</option>
            </select>
        </div>

        <div class="flex items-center space-x-4 mb-8">
          <button class="pe-20 ps-20 py-1 bg-[#0054A6] text-white text-sm rounded-xs   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Įkelti nuotrauką
          </button>
          <span class="text-black-500 text-sm">No photo uploaded.</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button class="ps-20 pe-20 py-1 bg-[#0054A6] text-white rounded-xs text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        PRIDĖTI
      </button>
    </div> 
</template>