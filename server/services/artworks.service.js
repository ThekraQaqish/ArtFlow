const axios = require('axios');
const pool = require('../db');

const getArtworks = async () => {
  const artistsMap = new Map(); // تخزين مؤقت للفنانين (لتجنب الاستعلام المتكرر)

  for (let i = 1; i <= 100; i++) {
    try {
      // استدعاء API لجلب عمل فني واحد في الصفحة i
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${i}&limit=1`);

      // تأخير 200 مللي ثانية لتجنب ضغط API أو حظر الاتصال
      await new Promise(r => setTimeout(r, 200));

      const artwork = response.data.data[0];
      if (!artwork) continue; // إذا ما في عمل فني تابع للتخطي

      // استخراج بيانات العمل الفني مع قيم افتراضية لو فارغة
      const title = artwork.title || 'No Title';
      const description = artwork.description || 'No description';
      const image_id = artwork.image_id;
      const image_url = image_id ? `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` : null;
      const classification_title = artwork.classification_title;
      const date_display = artwork.date_display;
      const artist_title = artwork.artist_title || 'Unknown';
      const artist_display = artwork.artist_display || 'No Bio';

      // --------- التحقق من وجود الفنان أو إضافته -------------
      let artist_id;
      if (artistsMap.has(artist_title)) {
        artist_id = artistsMap.get(artist_title);
      } else {
        // استعلام عن الفنان في قاعدة البيانات
        const result = await pool.query(
          'SELECT id FROM users WHERE name = $1 AND role = $2 AND auth_type = $3',
          [artist_title, 'user', 'api']
        );

        if (result.rows.length > 0) {
          artist_id = result.rows[0].id;
        } else {
          // إضافة الفنان إذا غير موجود
          const insertArtistQuery = `
            INSERT INTO users (name, bio, role, auth_type, created_at) 
            VALUES ($1, $2, 'user', 'api', NOW()) RETURNING id
          `;
          const insertArtistValues = [artist_title, artist_display];

          const insertResult = await pool.query(insertArtistQuery, insertArtistValues);
          artist_id = insertResult.rows[0].id;
        }
        artistsMap.set(artist_title, artist_id); // حفظ الفنان بالذاكرة المؤقتة
      }

      // --------- التحقق من وجود العمل الفني لتجنب التكرار -------------
      const existingArtwork = await pool.query(
        'SELECT id FROM artworks WHERE name = $1 AND image_url = $2',
        [title, image_url]
      );

      if (existingArtwork.rows.length > 0) {
        console.log(`Artwork "${title}" already exists, skipping...`);
        continue; // تخطي هذا العمل الفني والانتقال للآتي
      }

      // --------- إضافة العمل الفني الجديد -------------
      await pool.query(
        `INSERT INTO artworks 
        (name, description, image_url, category, artwork_date, artist_id, created_at) 
        VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id`,
        [title, description, image_url, classification_title, date_display, artist_id]
      );

    } catch (error) {
      console.error('Error in getArtworks:', error);
    }
  }
};

// getArtworks();

module.exports = { getArtworks };
