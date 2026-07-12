const db = require("./db");

// creates a user with e-mail and password
// this user specifically is only created via app so it is ALWAYS a patient
async function createUser(email, password, sessionCode) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role, session_code) VALUES (?, ?, ?, ?)',
        [email, password, 'PATIENT', sessionCode],
    );

    return result.insertId;
}

async function createParamedic(email, password, paramedicCode) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role, paramedic_code, must_change_password) VALUES (?, ?, ?, ?, ?)',
        [email, password, 'PARAMEDIC', paramedicCode, true],
    );

    return result.insertId;
}

async function getParamedicCode(paramedicId) {
    const [result] = await db.query(
        'SELECT paramedic_code FROM users WHERE id = ?',
        [paramedicId],
    )

    return result[0].paramedic_code;
}

async function getEMail(id) {
    const[result] = await db.query(
        'SELECT email FROM users WHERE id = ?',
        [id]
    )

    return result[0].email;
}

async function findById(userId) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
    );

    return rows[0];
}

// finds a user by e-mail
async function findByEmail(email) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
    );

    return rows[0];
}

async function updateUser(userId, email, password) {
    const [result] = await db.query(
        'UPDATE users SET email = ?, password_hash = ? WHERE id = ?',
        [email, password, userId]
    );

    return result;
}

async function setSessionCode(sessionCode, userId) {
    await db.query(
        'UPDATE users SET session_code = ? WHERE id = ?',
        [sessionCode, userId],
    );
}

async function deleteUser(userId) {
    const [result] = await db.query(
        'DELETE FROM users WHERE id = ?',
        [userId]
    );

    return result;
}

module.exports = {
    createUser,
    createParamedic,
    getParamedicCode,
    getEMail,
    findById,
    findByEmail,
    updateUser,
    setSessionCode,
    deleteUser
}