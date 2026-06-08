const db = require("./db");

async function createUser(email, password) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password, 'PATIENT'],
    );

    return result.insertId;
}

module.exports = {
    createUser
}