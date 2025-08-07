const pool = require('../db');

const getArtworkByIdModel = async (id) => {
  try{
    const result = await pool.query(
    `SELECT artworks.*, users.name AS artist_name 
     FROM artworks JOIN users ON artworks.artist_id = users.id 
     WHERE artworks.id = $1`, [id]);
  return result.rows[0];
  }
  catch(error){
    console.log(error);
    throw new Error("Failed to fetch artworks");
  }
};

const getAllArtworksModel = async () => {
  try {
    const result = await pool.query(
    `SELECT artworks.id, artworks.name, artworks.image_url, 
     users.name AS artist_name FROM artworks 
     JOIN users ON artworks.artist_id = users.id`);
  return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch artworks");
  }
};

const createArtworkModel = async (artworkData, artistId) => {
  try{
    const { name, description, image_url, category, artwork_date } = artworkData;
  if (!name || !image_url || !category) {
      throw new Error("Missing required fields");
  }
  const result = await pool.query(
    `INSERT INTO artworks 
     (name, description, image_url, category, artwork_date, artist_id) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, description, image_url, category, artwork_date, artistId]);
  return result.rows[0];
  }
  catch(error){
    console.log(error);
    throw new Error("Failed to create artwork");
  }
};


const getPaginatedArtworks = async (page = 1, limit = 10) => {
  try{
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // تنفيذ الاستعلامات بشكل متوازي
    const [artworksResult, countResult] = await Promise.all([
      pool.query(
        `SELECT artworks.*, users.name AS artist_name 
         FROM artworks JOIN users ON artworks.artist_id = users.id
         ORDER BY artworks.created_at DESC
         LIMIT $1 OFFSET $2`, 
        [limit, offset]),
      pool.query(`SELECT COUNT(*) FROM artworks JOIN users ON artworks.artist_id = users.id`)
    ]);
    
    return {
      artworks: artworksResult.rows,
      total: parseInt(countResult.rows[0].count)
    };
  }
  catch(error){
    console.error("Error fetching artworks:", error);
    throw error;
  }
};

const updateArtworkModel = async (id, updates) => {
  try {
    const { name, description, image_url, category, artwork_date } = updates;
    if (!name && !description && !image_url && !category && !artwork_date) {
      throw new Error("No valid fields to update");
    }
    const result = await pool.query(
      `UPDATE artworks SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      image_url = COALESCE($3, image_url),
      category = COALESCE($4, category),
      artwork_date = COALESCE($5, artwork_date)
      WHERE id = $6 RETURNING *`,
      [name, description, image_url, category, artwork_date, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update artwork");
  }
};

const deleteArtworkModel = async (id) => {
  try {
    const result =await pool.query('DELETE FROM artworks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete  artwork");
  }
};

const getAllFilterOptions = async () => {
  try {
    // جلب كل الفئات الفريدة
  const categories = await pool.query(`
    SELECT DISTINCT category 
    FROM artworks 
    WHERE category IS NOT NULL
    ORDER BY category
  `);

  // جلب كل الفنانين
  const artists = await pool.query(`
    SELECT DISTINCT u.id, u.name
    FROM users u
    JOIN artworks a ON u.id = a.artist_id
    WHERE u.role = 'artist'
    ORDER BY u.name
  `);

  return {
    categories: categories.rows.map(c => c.category).filter(Boolean),
    artists: artists.rows.filter(a => a.id && a.name)
  };
  } catch (error) {
    console.error('Error getting filter options:', error);
    throw error;
  }
};

const filterArtworksModel = async (filters) => {
  try {
    const { 
    categories = [],
    artist_ids = [],
    sort = 'newest',
    page = 1,
    limit = 20
  } = filters;

  const offset = (page - 1) * limit;
  
  let query = `
    SELECT 
      a.*, 
      u.name AS artist_name,
      u.pp AS artist_avatar,
      COUNT(l.id) AS likes_count
    FROM artworks a
    JOIN users u ON a.artist_id = u.id
    LEFT JOIN likes l ON a.id = l.artwork_id
  `;

  const whereClauses = [];
  const queryParams = [];

  // فلترة حسب الفئات
  if (categories.length > 0) {
    whereClauses.push(`a.category = ANY($${queryParams.length + 1})`);
    queryParams.push(categories);
  }

  // فلترة حسب الفنانين
  if (artist_ids.length > 0) {
    whereClauses.push(`a.artist_id = ANY($${queryParams.length + 1})`);
    queryParams.push(artist_ids);
  }

   if (filters.start_date) {
    whereClauses.push(`a.created_at >= $${queryParams.length + 1}`);
    queryParams.push(filters.start_date);
  }
  if (filters.end_date) {
    whereClauses.push(`a.created_at <= $${queryParams.length + 1}`);
    queryParams.push(filters.end_date);
  }
  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`;
  }
  query += ` GROUP BY a.id, u.id`;
  if (filters.min_likes) {
    query += ` HAVING COUNT(l.id) >= $${queryParams.length + 1}`;
    queryParams.push(filters.min_likes);
  }


  // الترتيب
  switch (sort) {
    case 'oldest':
      query += ` ORDER BY a.created_at ASC`;
      break;
    case 'popular':
      query += ` ORDER BY likes_count DESC`;
      break;
    case 'commented':
      query += ` ORDER BY (
        SELECT COUNT(*) FROM comments WHERE artwork_id = a.id
      ) DESC`;
      break;
    default: // newest
      query += ` ORDER BY a.created_at DESC`;
  }

  query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(limit, offset);

  const result = await pool.query(query, queryParams);
  return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update artwork");
  }
};

const searchArtworksModel = async (searchTerm) => {
  try {
    const result = await pool.query(
      `SELECT artworks.*, users.name AS artist_name 
       FROM artworks 
       JOIN users ON artworks.artist_id = users.id
       WHERE artworks.name ILIKE $1 
       OR artworks.description ILIKE $1 
       OR users.name ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error in searchArtworksModel:', error);
    throw error;
  }
};

module.exports = {
  getArtworkByIdModel,
  getAllArtworksModel,
  createArtworkModel,
  getPaginatedArtworks,
  deleteArtworkModel,
  updateArtworkModel,
  getAllFilterOptions,
  filterArtworksModel,
  searchArtworksModel
};