const pool = require('../db');

exports.getArtworkComments = async (artworkId) => {
  const artworkResult = await pool.query(
    'SELECT name FROM artworks WHERE id = $1', 
    [artworkId]
  );
  
  if (artworkResult.rows.length === 0) {
    throw new Error('Artwork not found');
  }

  const commentsResult = await pool.query(
    `SELECT comments.comment, comments.created_at, users.name AS username 
     FROM comments 
     JOIN users ON comments.user_id = users.id 
     WHERE comments.artwork_id = $1 
     ORDER BY comments.created_at DESC`,
    [artworkId]
  );

  return {
    artwork_name: artworkResult.rows[0].name,
    comments: commentsResult.rows
  };
};

exports.createComment = async (artworkId, userId, comment) => {
  const result = await pool.query(
    `INSERT INTO comments(comment, created_at, artwork_id, user_id) 
     VALUES ($1, NOW(), $2, $3) RETURNING *`,
    [comment, artworkId, userId]
  );
  return result.rows[0];
};