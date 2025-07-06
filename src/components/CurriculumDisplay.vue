<template>
  <div ref="exportableContent" class="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto my-8">
    
    <div class="text-right mb-4 flex justify-end gap-2"> <button @click="exportToPDF" class="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-sm">
        Exportar para PDF
      </button>
      <button @click="sendPDFByEmail" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm">
        Enviar por E-mail
      </button>
    </div>

    <header class="text-center mb-8 border-b pb-6">
      <h1 class="text-4xl font-bold text-gray-800">{{ curriculum.personalData.fullName }}</h1>
      <div class="flex justify-center gap-6 mt-4 text-gray-600">
        <span>{{ curriculum.personalData.email }}</span>
        <span>{{ curriculum.personalData.phone }}</span>
        <a v-if="curriculum.personalData.linkedin" :href="curriculum.personalData.linkedin" target="_blank" class="text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </header>

    <section v-if="curriculum.summary" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Resumo Profissional</h2>
      <p class="text-gray-700 whitespace-pre-wrap">{{ curriculum.summary }}</p>
    </section>

    <section v-if="curriculum.experiences && curriculum.experiences.length" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Experiência Profissional</h2>
      <div v-for="exp in curriculum.experiences" :key="exp._id" class="mb-6">
        <h3 class="text-xl font-bold text-gray-800">{{ exp.jobTitle }}</h3>
        <p class="text-lg text-gray-600">{{ exp.company }}</p>
        <p class="text-sm text-gray-500 mb-2">
          {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Presente' }}
        </p>
        <p class="text-gray-700 whitespace-pre-wrap">{{ exp.description }}</p>
      </div>
    </section>

    <section v-if="curriculum.education && curriculum.education.length" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Formação Acadêmica</h2>
      <div v-for="edu in curriculum.education" :key="edu._id" class="mb-4">
        <h3 class="text-xl font-bold text-gray-800">{{ edu.degree }}</h3>
        <p class="text-lg text-gray-600">{{ edu.institution }}</p>
        <p class="text-sm text-gray-500">
          {{ edu.fieldOfStudy }} | {{ formatDate(edu.startDate) }} - {{ edu.endDate ? formatDate(edu.endDate) : 'Concluído' }}
        </p>
      </div>
    </section>

    <section v-if="curriculum.skills && curriculum.skills.length">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Habilidades</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in curriculum.skills" :key="skill" class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {{ skill }}
        </span>
      </div>
    </section>

  </div>
</template>

<script>
import jsPDF from 'jspdf';
import axios from 'axios'; // Importe o axios para fazer a requisição HTTP

export default {
  props: {
    curriculum: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
    },

    generatePdfDocument() {
      const doc = new jsPDF('p', 'pt', 'a4');
      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const usableWidth = pageWidth - (margin * 2);
      let y = margin;

      // --- Cabeçalho ---
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(this.curriculum.personalData.fullName, pageWidth / 2, y, { align: 'center' });
      y += 20;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const contactInfo = `${this.curriculum.personalData.email} | ${this.curriculum.personalData.phone}`;
      doc.text(contactInfo, pageWidth / 2, y, { align: 'center' });
      y += 30;

      // --- Resumo Profissional ---
      if (this.curriculum.summary) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Resumo Profissional', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const summaryLines = doc.splitTextToSize(this.curriculum.summary, usableWidth);
        doc.text(summaryLines, margin, y);
        y += (summaryLines.length * 12) + 20;
      }

      // --- Experiência Profissional ---
      if (this.curriculum.experiences && this.curriculum.experiences.length) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Experiência Profissional', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        this.curriculum.experiences.forEach(exp => {
          if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
          }
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(exp.jobTitle, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.text(`${exp.company} | ${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Presente'}`, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          const expLines = doc.splitTextToSize(exp.description, usableWidth);
          doc.text(expLines, margin, y);
          y += (expLines.length * 12) + 20;
        });
      }

      // --- Formação Acadêmica (Adicionei a lógica para o PDF aqui, pois não estava na sua função original) ---
      if (this.curriculum.education && this.curriculum.education.length) {
        if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Formação Acadêmica', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        this.curriculum.education.forEach(edu => {
          if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
          }
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(edu.degree, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.text(`${edu.institution} | ${edu.fieldOfStudy} | ${this.formatDate(edu.startDate)} - ${edu.endDate ? this.formatDate(edu.endDate) : 'Concluído'}`, margin, y);
          y += 14; // Espaço após a linha de formação
        });
        y += 10; // Espaço extra após a última formação
      }

      // --- Habilidades (Adicionei a lógica para o PDF aqui, pois não estava na sua função original) ---
      if (this.curriculum.skills && this.curriculum.skills.length) {
        if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Habilidades', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const skillsText = this.curriculum.skills.join(', ');
        const skillsLines = doc.splitTextToSize(skillsText, usableWidth);
        doc.text(skillsLines, margin, y);
        y += (skillsLines.length * 12) + 20;
      }
      
      return doc;
    },

    exportToPDF() {
      const doc = this.generatePdfDocument();
      doc.save(`curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`);
    },

    async sendPDFByEmail() {
      try {
        const doc = this.generatePdfDocument();
        // Converte o PDF para um Blob ou ArrayBuffer para enviar
        const pdfBlob = doc.output('blob'); // 'blob' é ideal para FormData

        const formData = new FormData();
        formData.append('pdf', pdfBlob, `curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`);
        formData.append('recipientEmail', this.curriculum.personalData.email); // O e-mail para onde enviar
        formData.append('fullName', this.curriculum.personalData.fullName); // Nome para o corpo do e-mail

        // URL do seu endpoint de backend para envio de e-mail
        const response = await axios.post('/api/send-curriculum-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Importante para enviar arquivos
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Se você usar autenticação
          }
        });

        if (response.status === 200) {
          alert('Currículo enviado para o seu e-mail com sucesso!');
        } else {
          alert('Ocorreu um erro ao enviar o currículo. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao enviar o PDF por e-mail:', error);
        alert('Ocorreu um erro ao enviar o currículo. Verifique o console para mais detalhes.');
      }
    }
  }
};
</script>

<style scoped>
/* Seu CSS existente */
</style>