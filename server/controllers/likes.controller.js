const likeModel = require('../models/likes.model');

exports.getLikesCount = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const likesCount = await likeModel.getLikesCount(artworkId);
    res.status(200).json({ likes_count: likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const userId = req.user.id;

    const artworkExists = await likeModel.checkArtworkExists(artworkId);
    if (!artworkExists) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    const alreadyLiked = await likeModel.checkUserLike(artworkId, userId);

    if (alreadyLiked) {
      await likeModel.removeLike(artworkId, userId);
      const newCount = await likeModel.getLikesCount(artworkId);
      res.status(200).json({ 
        action: "unliked",
        likes_count: newCount
      });
    } else {
      await likeModel.addLike(artworkId, userId);
      const newCount = await likeModel.getLikesCount(artworkId);
      res.status(200).json({ 
        action: "liked",
        likes_count: newCount
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};