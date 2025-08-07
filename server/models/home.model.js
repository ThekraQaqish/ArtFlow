const pool = require('../db');

exports.getHomeData = async () => {
    try {
        const MostPopularArtists = await pool.query(
            `SELECT users.id, users.name, users.pp, users.bio, 
             COUNT(artworks.id) AS artworks_count 
             FROM users JOIN artworks ON artworks.artist_id = users.id 
             WHERE users.role != 'admin' 
             GROUP BY users.id, users.name, users.pp, users.bio 
             ORDER BY artworks_count DESC 
             LIMIT 3`
        );

        const MostPopularArtworks = await pool.query(
            `SELECT artworks.name, artworks.image_url, 
             artworks.category, users.name AS artist_name 
             FROM artworks JOIN users ON artworks.artist_id = users.id 
             ORDER BY artworks.artwork_date DESC 
             LIMIT 3`
        );

        return {
            MostPopularArtists: MostPopularArtists.rows,
            MostPopularArtworks: MostPopularArtworks.rows
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};