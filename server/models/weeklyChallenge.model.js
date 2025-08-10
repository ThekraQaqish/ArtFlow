const pool = require('../db');

exports.getActiveChallenge = async () => {
  const result = await pool.query(
    `SELECT * FROM weekly_challenges 
     WHERE start_date <= NOW() AND end_date >= NOW() 
     ORDER BY created_at DESC -- أو id DESC 
     LIMIT 1`
  );
  return result.rows[0];
};


exports.getSubmissions = async (challengeId) => {
  const result = await pool.query(
    `SELECT s.*, u.username, u.name 
     FROM challenge_submissions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.challenge_id = $1`,
    [challengeId]
  );
  return result.rows;
};

exports.createSubmission = async (userId, challengeId, { title, description, image_url }) => {
  const result = await pool.query(
    `INSERT INTO challenge_submissions 
     (user_id, challenge_id, title, description, image_url) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, challengeId, title, description, image_url]
  );
  return result.rows[0];
};

exports.getSubmissionById = async (submissionId) => {
  const result = await pool.query(
    `SELECT s.*, u.username, u.name 
     FROM challenge_submissions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.id = $1`,
    [submissionId]
  );
  return result.rows[0];
};