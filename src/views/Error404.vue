<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <img src="@/assets/icons/zero-results.svg" alt="Page not found" class="w-64 mb-8" />
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Oops... Puslapis nerastas</h1>
    <p class="text-gray-600 text-lg mb-6">Panašu, kad šis puslapis neegzistuoja arba buvo pašalintas.</p>
    <RouterLink
      to="/"
      class="px-6 py-3 bg-[#1F3F77] text-white rounded-md hover:bg-[#16325c] transition"
    >
      Grįžti į pradžią
    </RouterLink>
  </div>
</template>