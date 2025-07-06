<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div class="text-lg font-bold">Sistema Basico de cadastro </div>
      <button @click="toggleMenu" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul
        :class="{'block': menuOpen, 'hidden': !menuOpen}"
        class="md:flex md:space-x-6 md:items-center md:block">
        <li><router-link to="/" class="block py-2 md:py-0 hover:underline">Início</router-link></li>
        <li><router-link to="/about" class="block py-2 md:py-0 hover:underline">Sobre</router-link></li>
        <li><router-link to="/register" class="block py-2 md:py-0 hover:underline">Registrar-se</router-link></li>
        <li><router-link to="/curriculum" class="block py-2 md:py-0 hover:underline">Currículo</router-link></li>
        <li v-if="isAuthenticated">
          <router-link to="/profile" class="block py-2 md:py-0 hover:underline">Perfil</router-link>
        </li>
        <li v-else>
          <button @click="goToLogin" class="block py-2 md:py-0 hover:underline focus:outline-none bg-blue-700 px-4 rounded">
            Login
          </button>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="block py-2 md:py-0 hover:underline focus:outline-none bg-red-600 px-4 rounded ml-2">
            Sair
          </button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-center py-4 text-gray-600">
      &copy; 2025 Sistema Básico de Cadastro. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      isAuthenticated: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.removeItem('token');
      this.updateAuth();
      this.$router.push('/');
    },
    updateAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  },
  mounted() {
    this.updateAuth();
  },
  watch: {
    $route() {
      this.updateAuth();
    }
  }
};
</script>