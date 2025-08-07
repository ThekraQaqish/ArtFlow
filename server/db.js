const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

async function testDB() {
  try {
    const response = await pool.query("SELECT * FROM users WHERE role='admin' ");
    console.log(response.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
  }
}

//testDB();

module.exports = pool;