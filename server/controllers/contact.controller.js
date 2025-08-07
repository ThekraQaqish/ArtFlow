const emailService = require('../services/email.service');

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    await emailService.sendContactEmail({ name, email, subject, message });
    
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};