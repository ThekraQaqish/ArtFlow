const pool = require('../db');

const getProfileModel=async(userId)=>{
    const response= await pool.query(
            'SELECT id, name, username, bio, pp, email, role FROM users WHERE id = $1',
            [userId]
        );
        return response.rows[0];
}

const patchProfileModel= async(userID,{ name, username, bio, pp })=>{
    const response = await pool.query('UPDATE users SET name = $1, username = $2, bio = $3, pp = $4 WHERE id = $5 RETURNING *', [name, username, bio, pp, userID]);
    return response.rows[0];
}

const getArtistsModel = async()=>{
    const response = await pool.query('SELECT  name, pp, bio FROM users WHERE role!=$1',['admin']);
    return response.rows;
}
const getUserByIdModel = async (userId) => {
    const response = await pool.query(
        'SELECT id, name, username, bio, pp, role FROM users WHERE id = $1',
        [userId]
    );
    return response.rows[0];
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



module.exports = {
    getProfileModel,
    patchProfileModel,
    getArtistsModel,
    getUserByIdModel,
    searchArtistsModel
}