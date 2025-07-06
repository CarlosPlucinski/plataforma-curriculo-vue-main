const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Já está aí, mas vamos reforçar
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const emailRoutes = require('./routes/emailRoutes'); // Importa a nova rota de e-mail
const { dbURI } = require('./config');

const app = express();

app.use(cors());
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear dados de formulário simples (se necessário)

// Rotas existentes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/curriculum', curriculumRoutes);

// Nova rota para envio de e-mail
app.use('/api', emailRoutes); // O prefixo '/api' já está na rota interna do emailRoutes

mongoose.connect(dbURI)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});