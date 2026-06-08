const db = require("./db");

async function createUser(email, password) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password, 'PATIENT'],
    );

    return result.insertId;
}

async function findByEmail(email) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
    );

    return rows[0];
}

module.exports = {
    createUser
}