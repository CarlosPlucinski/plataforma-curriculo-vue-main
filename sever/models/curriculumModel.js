const mongoose = require('mongoose');

// --- Schema para Dados Pessoais ---
const personalDataSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  linkedin: { type: String, trim: true },
  github: { type: String, trim: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
});

// --- Schema para Experiência Profissional ---
const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Deixe em branco se for o emprego atual
  description: { type: String, required: true },
});

// --- Schema para Formação Acadêmica ---
const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true }, // Ex: Bacharelado em Ciência da Computação
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

// --- Schema Principal do Currículo ---
const curriculumSchema = new mongoose.Schema({
  // Referência ao usuário dono deste currículo
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true, // Cada usuário só pode ter um currículo
  },
  
  // Seção de Dados Pessoais (incorporado)
  personalData: {
    type: personalDataSchema,
    required: true,
  },

  // Resumo Profissional
  summary: {
    type: String,
    trim: true,
    maxlength: 1000,
  },

  // Array de Experiências Profissionais
  experiences: [experienceSchema],

  // Array de Formações Acadêmicas
  education: [educationSchema],

  // Habilidades (um array de strings)
  skills: [{ type: String, trim: true }],

  // Idiomas
  languages: [{
    language: String,
    proficiency: String, // Ex: Básico, Intermediário, Avançado, Fluente
  }],

  // Timestamps de criação e atualização
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para atualizar o campo 'updatedAt' antes de salvar
curriculumSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Curriculum', curriculumSchema);