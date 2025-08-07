const pool = require('../db');

exports.createWeeklyChallenge = async (challengeData) => {
  const { title, description, start_date, end_date } = challengeData;
  
  const result = await pool.query(
    `INSERT INTO weekly_challenges 
     (title, description, start_date, end_date, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [title, description, start_date, end_date]
  );
  
  return result.rows[0];
};