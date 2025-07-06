<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-blue-50">
    <div class="bg-white rounded-lg shadow p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold mb-6 text-blue-700">Login</h1>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="E-mail"
          class="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          class="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Entrar
        </button>
      </form>
      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        const res = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password,
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/profile");
        } else {
          this.error = "Login inválido.";
        }
      } catch (err) {
        this.error =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Erro ao fazer login.";
      }
    },
  },
};
</script>