const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendContactEmail = async (emailData) => {
  const { name, email, subject, message } = emailData;
  
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'qaqishth@gmail.com',
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};