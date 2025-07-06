<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
    
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
      
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
          Bem-vindo ao Sistema
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Explore nossos recursos navegando pelo menu abaixo.
        </p>
      </div>

      <div class="flex flex-col gap-4">
        
        <router-link
          to="/about"
          class="group flex items-center justify-center w-full py-3 px-4 rounded-lg bg-blue-600 text-white text-lg font-semibold text-center shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <InformationCircleIcon class="h-6 w-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
          Sobre Nós
        </router-link>
        
        <router-link
          to="/register"
          class="group flex items-center justify-center w-full py-3 px-4 rounded-lg bg-green-600 text-white text-lg font-semibold text-center shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <UserPlusIcon class="h-6 w-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
          Criar Conta
        </router-link>
      </div>

    </div>

    <footer class="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
    </footer>

  </div>
</template>

<script setup>
import { InformationCircleIcon, UserPlusIcon } from '@heroicons/vue/24/solid';
</script>