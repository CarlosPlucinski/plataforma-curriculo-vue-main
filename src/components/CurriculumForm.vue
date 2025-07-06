<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md mt-4">

    <fieldset class="border p-4 rounded-lg">
      <legend class="text-xl font-semibold px-2">Dados Pessoais</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="formData.personalData.fullName" placeholder="Nome Completo" class="border rounded p-2"
          required />
        <input v-model="formData.personalData.email" type="email" placeholder="Email de Contato"
          class="border rounded p-2" required />
        <input v-model="formData.personalData.phone" placeholder="Telefone" class="border rounded p-2" required />
        <input v-model="formData.personalData.linkedin" placeholder="URL do LinkedIn" class="border rounded p-2" />
      </div>
    </fieldset>

    <fieldset class="border p-4 rounded-lg">
      <legend class="text-xl font-semibold px-2">Resumo Profissional</legend>
      <textarea v-model="formData.summary" placeholder="Fale um pouco sobre sua carreira..."
        class="border rounded p-2 w-full h-24"></textarea>
    </fieldset>

    <fieldset class="border p-4 rounded-lg">
      <legend class="text-xl font-semibold px-2">Experiência Profissional</legend>
      <div v-for="(exp, index) in formData.experiences" :key="index" class="relative border-t pt-4 mt-4">
        <input v-model="exp.jobTitle" placeholder="Cargo" class="border rounded p-2 w-full mb-2" required />
        <input v-model="exp.company" placeholder="Empresa" class="border rounded p-2 w-full mb-2" required />

        <div class="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label class="text-sm">Data de Início</label>
            <input v-model="exp.startDate" type="date" class="border rounded p-2 w-full" required />
          </div>
          <div>
            <label class="text-sm">Data de Término (opcional)</label>
            <input v-model="exp.endDate" type="date" class="border rounded p-2 w-full" />
          </div>
        </div>
        <textarea v-model="exp.description" placeholder="Descrição das atividades"
          class="border rounded p-2 w-full h-20 mb-2" required></textarea>
        <button @click.prevent="removeExperience(index)"
          class="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">X</button>
      </div>
      <button @click.prevent="addExperience" class="mt-2 bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">Adicionar
        Experiência</button>
    </fieldset>

    <button type="submit" class="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Salvar
      Currículo</button>
  </form>
</template>

<script>
import axios from 'axios';

// Estrutura inicial do formulário, baseada no seu Model
const initialFormData = {
  personalData: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: ''
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
};

export default {
  props: {
    // Recebe dados existentes para o modo de edição
    existingData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // Clona os dados para evitar modificar a prop diretamente
      // Se não houver dados, usa a estrutura inicial
      formData: this.existingData ? JSON.parse(JSON.stringify(this.existingData)) : JSON.parse(JSON.stringify(initialFormData)),
    };
  },
  methods: {
    // Métodos para adicionar/remover itens dos arrays
    addExperience() {
      this.formData.experiences.push({ jobTitle: '', company: '', startDate: null, endDate: null, description: '' });
    },
    removeExperience(index) {
      this.formData.experiences.splice(index, 1);
    },

    async handleSubmit() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/curriculum', this.formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('Currículo salvo com sucesso!');
        this.$emit('saved'); // Avisa o componente pai que os dados foram salvos
      } catch (error) {
        console.error('Erro ao salvar o currículo:', error);
        alert('Ocorreu um erro ao salvar seu currículo.');
      }
    }
  }
};
</script>