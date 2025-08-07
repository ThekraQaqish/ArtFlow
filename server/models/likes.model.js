const pool = require('../db');

exports.getLikesCount = async (artworkId) => {
  const result = await pool.query(
    "SELECT COUNT(*) AS likes_count FROM likes WHERE artwork_id = $1",
    [artworkId]
  );
  return parseInt(result.rows[0].likes_count, 10);
};

exports.checkUserLike = async (artworkId, userId) => {
  const result = await pool.query(
    "SELECT * FROM likes WHERE artwork_id = $1 AND user_id = $2",
    [artworkId, userId]
  );
  return result.rows.length > 0;
};

exports.addLike = async (artworkId, userId) => {
  const result = await pool.query(
    "INSERT INTO likes(created_at, artwork_id, user_id) VALUES (NOW(), $1, $2)",
    [artworkId, userId]
  );
  return result.rows[0];
};

exports.removeLike = async (artworkId, userId) => {
  await pool.query(
    "DELETE FROM likes WHERE user_id = $1 AND artwork_id = $2",
    [userId, artworkId]
  );
};

exports.checkArtworkExists = async (artworkId) => {
  const result = await pool.query('SELECT id FROM artworks WHERE id = $1', [artworkId]);
  return result.rows.length > 0;
};