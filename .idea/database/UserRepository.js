const db = require("./db");

// creates a user with e-mail and password
// this user specifically is only created via app so it is ALWAYS a patient
async function createUser(email, password) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password, 'PATIENT'],
    );

    return result.insertId;
}

// finds a user by e-mail
async function findByEmail(email) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
    );

    return rows[0];
}

module.exports = {
    createUser,
    findByEmail,
}