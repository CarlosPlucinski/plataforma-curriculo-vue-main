<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Perfil</h1>
    <div v-if="user.email" class="space-y-2">
      <p><strong>Nome:</strong> {{ user.name }}</p>
      <p><strong>Endereço:</strong> {{ user.address }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button @click="exportToPDF"
        class="mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">Exportar para PDF</button>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    try {
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data;
    } catch (error) {
      alert("Você precisa estar logado para acessar o perfil.");
      this.$router.push("/login");
    }
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF();
      doc.text(`Nome: ${this.user.name}`, 10, 10);
      doc.text(`Endereço: ${this.user.address}`, 10, 20);
      doc.text(`Email: ${this.user.email}`, 10, 30);
      doc.save("perfil.pdf");
    },
  },
};
</script>