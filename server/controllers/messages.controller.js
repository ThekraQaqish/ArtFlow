const messageModel = require('../models/messages.model');

exports.getConversation = async (req, res) => {
  try {
    const conversation = await messageModel.getConversation(
      req.user.id,
      req.params.id
    );
    res.json(conversation);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, message } = req.body;
    
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is empty" });
    }

    const newMessage = await messageModel.sendMessage(
      req.user.id,
      receiver_id,
      message
    );
    
    res.status(201).json(newMessage);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getConversationsList = async (req, res) => {
  try {
    const conversations = await messageModel.getConversationsList(req.user.id);
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await messageModel.markAsRead(req.params.id, req.user.id);
    res.json({ message: "Message has been read" });
  } catch (error) {
    if (error.message === 'Message not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await messageModel.deleteMessage(req.params.id, req.user.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    if (error.message === 'Message not found or not authorized') {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};