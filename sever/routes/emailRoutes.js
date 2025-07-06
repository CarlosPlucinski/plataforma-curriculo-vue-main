const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer'); // Para lidar com upload de arquivos
const router = express.Router();

// Configuração do Multer para lidar com o arquivo PDF
const upload = multer(); // Não salva em disco, mantém na memória (buffer)

// Configuração do Nodemailer (substitua com suas credenciais)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Host do Gmail
  port: 587, // Porta padrão para TLS/STARTTLS
  secure: false, // Use 'true' se a porta for 465 (SSL/TLS), 'false' para 587 com STARTTLS
  auth: {
    user: 'carlosplucinski1@gmail.com', // Seu e-mail
    pass: 'cvqgcorvrjsyhrfq', // Sua senha de aplicativo (sem espaços)
  },
  tls: {
      rejectUnauthorized: false // Apenas para desenvolvimento, NÃO use em produção sem entender os riscos
  }
});

// Rota para enviar o currículo por e-mail
router.post('/send-curriculum-email', upload.single('pdf'), async (req, res) => {
  const { recipientEmail, fullName } = req.body;
  const pdfBuffer = req.file.buffer; // O PDF em formato de buffer
  const pdfFilename = req.file.originalname; // Nome original do arquivo

  if (!pdfBuffer || !recipientEmail || !fullName) {
    return res.status(400).json({ message: 'Dados incompletos para enviar o e-mail.' });
  }

  try {
    await transporter.sendMail({
      from: 'Seu Criador de Currículos <carlosplucinski1@gmail.com>', // Remetente (pode ser o seu nome ou o nome da aplicação)
      to: recipientEmail, // Destinatário (o próprio usuário)
      subject: `Seu Currículo Criado - ${fullName}`,
      html: `
        <p>Olá ${fullName},</p>
        <p>Segue em anexo o currículo que você acabou de gerar em nossa plataforma.</p>
        <p>Atenciosamente,</p>
        <p>Sua Equipe de Criação de Currículos</p>
      `,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar o e-mail.', error: error.message });
  }
});

module.exports = router;