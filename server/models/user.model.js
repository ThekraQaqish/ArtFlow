const pool = require('../db');

const getProfileModel = async (userId) => {


  const userResponse = await pool.query(
    'SELECT id, name, username, bio, pp, email, role FROM users WHERE id = $1',
    [userId]
  );

  if (userResponse.rows.length === 0) {
    return null;
  }

  const artworksResponse = await pool.query(
    `SELECT a.id, a.name, a.image_url, a.description, 
            COUNT(l.id) AS likes_count
     FROM artworks a
     LEFT JOIN likes l ON l.artwork_id = a.id
     WHERE a.artist_id = $1
     GROUP BY a.id
     ORDER BY a.id DESC`,
    [userId]
  );

  const totalArtworks = artworksResponse.rows.length;

  return {
    ...userResponse.rows[0],
    total_artworks: totalArtworks,
    artworks: artworksResponse.rows
  };
};


const getUserProfilePic = async (userId) => {
  const result = await pool.query(
    'SELECT pp FROM users WHERE id = $1',
    [userId]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0].pp; 
};

const patchProfileModel= async(userID,{ name, username, bio, pp })=>{
    const response = await pool.query('UPDATE users SET name = $1, username = $2, bio = $3, pp = $4 WHERE id = $5 RETURNING *', [name, username, bio, pp, userID]);
    return response.rows[0];
}

const getArtistsModel = async()=>{
    const response = await pool.query('SELECT  name, pp, bio FROM users WHERE role!=$1',['admin']);
    return response.rows;
}
const getUserByIdModel = async (userId) => {
  const query = `
    SELECT 
      u.id, u.name, u.username, u.bio, u.pp, u.role,
      COALESCE(aw.total_arts, 0) as total_artworks,
      COALESCE(aw.artworks, '[]'::json) as artworks
    FROM users u
    LEFT JOIN (
      SELECT 
        a.artist_id, 
        COUNT(*) as total_arts,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', a.id,
            'title', a.name,
            'image_url', a.image_url,
            'description', a.description,
            'likes_count', COALESCE(l.likes_count, 0)
          )
        ) AS artworks
      FROM artworks a
      LEFT JOIN (
        SELECT artwork_id, COUNT(*) as likes_count 
        FROM likes 
        GROUP BY artwork_id
      ) l ON a.id = l.artwork_id
      GROUP BY a.artist_id
    ) aw ON u.id = aw.artist_id
    WHERE u.id = $1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0];
};


const searchArtistsModel = async (searchTerm) => {
  try {
    const result = await pool.query(
      `SELECT id, name, username, pp AS avatar, bio, role 
       FROM users 
       WHERE (name ILIKE $1 OR username ILIKE $1 OR bio ILIKE $1)`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error in searchArtistsModel:', error);
    throw error;
  }
};

const getPaginatedArtists = async (page = 1, limit = 9) => {
  try {
    const offset = (page - 1) * limit;

    const [artistsResult, countResult] = await Promise.all([
      pool.query(
        `SELECT id, name, pp AS avatar, bio FROM users WHERE role != 'admin' ORDER BY name ASC LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query(`SELECT COUNT(*) FROM users WHERE role != 'admin'`)
    ]);

    return {
      artists: artistsResult.rows,
      total: parseInt(countResult.rows[0].count)
    };
  } catch (error) {
    console.error("Error fetching paginated artists:", error);
    throw error;
  }
};




module.exports = {
    getProfileModel,
    patchProfileModel,
    getArtistsModel,
    getUserByIdModel,
    searchArtistsModel,
    getPaginatedArtists,
    getUserProfilePic
}