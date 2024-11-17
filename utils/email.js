const nodemailer = require("nodemailer");

// Função para envio de email
const enviarEmail = async (destinatario, assunto, texto) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: assunto,
    text: texto,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
};

module.exports = enviarEmail;
