// controllers/comments.controller.js
const commentModel = require('../models/comment.model');

exports.getComments = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const commentsData = await commentModel.getArtworkComments(artworkId);
    res.status(200).json(commentsData);
  } catch (error) {
    if (error.message === 'Artwork not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const userId = req.user.id;
    const { comment } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const newComment = await commentModel.createComment(artworkId, userId, comment);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};