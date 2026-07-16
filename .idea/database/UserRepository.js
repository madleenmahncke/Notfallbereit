const db = require("./db");

/**
 * creates a patient user
 *
 * @param email
 * @param password
 * @param sessionCode
 * @returns {Promise<number>}
 */
async function createUser(email, password, sessionCode) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role, session_code) VALUES (?, ?, ?, ?)',
        [email, password, 'PATIENT', sessionCode],
    );

    return result.insertId;
}

/**
 * creates a paramedic user
 *
 * @param email
 * @param password
 * @param paramedicCode
 * @returns {Promise<number>}
 */
async function createParamedic(email, password, paramedicCode) {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash, role, paramedic_code, must_change_password) VALUES (?, ?, ?, ?, ?)',
        [email, password, 'PARAMEDIC', paramedicCode, true],
    );

    return result.insertId;
}

/**
 * gets a paramedic code
 *
 * @param paramedicId
 * @returns {Promise<*>}
 */
async function getParamedicCode(paramedicId) {
    const [result] = await db.query(
        'SELECT paramedic_code FROM users WHERE id = ?',
        [paramedicId],
    )

    return result[0].paramedic_code;
}

/**
 * gets a user's email
 *
 * @param id
 * @returns {Promise<*>}
 */
async function getEMail(id) {
    const[result] = await db.query(
        'SELECT email FROM users WHERE id = ?',
        [id]
    )

    return result[0].email;
}

/**
 * finds a user by id
 *
 * @param userId
 * @returns {Promise<*>}
 */
async function findById(userId) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
    );

    return rows[0];
}

/**
 * finds a user by email
 *
 * @param email
 * @returns {Promise<*>}
 */
async function findByEmail(email) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
    );

    return rows[0];
}

/**
 * updates an existing user
 *
 * @param userId
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
async function updateUser(userId, email, password) {
    const [result] = await db.query(
        'UPDATE users SET email = ?, password_hash = ? WHERE id = ?',
        [email, password, userId]
    );

    return result;
}

/**
 * updates a user's session code
 *
 * @param sessionCode
 * @param userId
 * @returns {Promise<void>}
 */
async function setSessionCode(sessionCode, userId) {
    await db.query(
        'UPDATE users SET session_code = ? WHERE id = ?',
        [sessionCode, userId],
    );
}

/**
 * deletes an existing user
 *
 * @param userId
 * @returns {Promise<*>}
 */
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