<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Registrar-se</h1>
    <form @submit.prevent="registerUser" class="flex flex-col gap-4">
      <input v-model="name" placeholder="Nome completo"
        class="border rounded p-2" required />
      <input v-model="address" placeholder="Endereço"
        class="border rounded p-2" required />
      <input v-model="email" type="email" placeholder="Email"
        class="border rounded p-2" required />
      <input v-model="password" type="password" placeholder="Senha"
        class="border rounded p-2" required />
      <button type="submit"
        class="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Registrar</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";


export default {
  data() {
    return {
      name: "",
      address: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("/api/auth/register", {
          name: this.name,
          address: this.address,
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/profile");
      } catch (error) {
        alert("Erro ao registrar usuário.");
      }
    },
  },
};
</script>
