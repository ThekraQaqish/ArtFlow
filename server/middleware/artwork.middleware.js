const pool = require('../db');

exports.checkArtworkOwnership = async (req, res, next) => {
  try {
    const artworkId = req.params.id;
    const artwork = await pool.query(
      'SELECT artist_id FROM artworks WHERE id = $1', 
      [artworkId]);
    
    if (!artwork.rows.length) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    if (artwork.rows[0].artist_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to modify this artwork' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
