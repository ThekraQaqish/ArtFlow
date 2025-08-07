const pool = require('../db');

exports.getConversation = async (senderId, receiverId) => {
  const receiver = await pool.query('SELECT name, pp FROM users WHERE id=$1', [receiverId]);
  if (receiver.rows.length === 0) {
    throw new Error('User not found');
  }

  const messages = await pool.query(
    `SELECT * FROM messages 
     WHERE (sender_id=$1 AND receiver_id=$2) 
     OR (sender_id=$2 AND receiver_id=$1) 
     ORDER BY created_at ASC`,
    [senderId, receiverId]
  );

  return {
    receiver: receiver.rows[0],
    messages: messages.rows
  };
};

exports.sendMessage = async (senderId, receiverId, message) => {
  const receiver = await pool.query('SELECT id FROM users WHERE id=$1', [receiverId]);
  if (receiver.rows.length === 0) {
    throw new Error('User not found');
  }

  const result = await pool.query(
    `INSERT INTO messages(sender_id, receiver_id, message, is_read, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [senderId, receiverId, message, false]
  );

  return result.rows[0];
};

exports.getConversationsList = async (userId) => {
  const result = await pool.query(`
    WITH LastMessages AS (
      SELECT
        LEAST(sender_id, receiver_id) AS user1,
        GREATEST(sender_id, receiver_id) AS user2,
        MAX(created_at) AS last_message_time
      FROM messages
      WHERE sender_id = $1 OR receiver_id = $1
      GROUP BY user1, user2
    )
    SELECT
      m.*,
      CASE WHEN lm.user1 = $1 THEN user2_info.name ELSE user1_info.name END AS other_user_name,
      CASE WHEN lm.user1 = $1 THEN user2_info.pp ELSE user1_info.pp END AS other_user_pp
    FROM messages m
    JOIN LastMessages lm
      ON LEAST(m.sender_id, m.receiver_id) = lm.user1
      AND GREATEST(m.sender_id, m.receiver_id) = lm.user2
      AND m.created_at = lm.last_message_time
    JOIN users user1_info ON user1_info.id = lm.user1
    JOIN users user2_info ON user2_info.id = lm.user2
    ORDER BY m.created_at DESC
  `, [userId]);

  return result.rows;
};

exports.markAsRead = async (messageId, userId) => {
  const message = await pool.query(
    'SELECT * FROM messages WHERE id=$1 AND receiver_id=$2',
    [messageId, userId]
  );
  
  if (message.rows.length === 0) {
    throw new Error('Message not found');
  }

  await pool.query(
    'UPDATE messages SET is_read=true WHERE id=$1',
    [messageId]
  );
};

exports.deleteMessage = async (messageId, userId) => {
  const message = await pool.query(
    'SELECT * FROM messages WHERE id=$1 AND (sender_id=$2 OR receiver_id=$2)',
    [messageId, userId]
  );

  if (message.rows.length === 0) {
    throw new Error('Message not found or not authorized');
  }

  await pool.query('DELETE FROM messages WHERE id=$1', [messageId]);
};