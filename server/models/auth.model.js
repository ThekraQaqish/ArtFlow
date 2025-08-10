const pool = require('../db');

const createUser = async (name,email, hashedPassword) => {
    const response =await pool.query(
        'INSERT INTO users(name,email, password) VALUES ($1, $2,$3) RETURNING id, email',  
        [name,email , hashedPassword]);
    return response.rows[0];
}

const findUserByEmail = async(email) =>{
    const response =await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
        );
    return response.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail
}