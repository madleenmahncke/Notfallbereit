const db = require("./DB");

/**
 * finds an emergency profile by id
 *
 * @param emergencyProfileId
 * @returns {Promise<*>}
 */
async function findById(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE id = ?',
        [emergencyProfileId],
    );

    return rows[0];
}

/**
 * finds an emergency profile by user id
 *
 * @param userId
 * @returns {Promise<*>}
 */
async function findByUserId(userId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE patient_id = ?',
        [userId],
    );

    return rows[0];
}

/**
 * finds an emergency profile by uuid
 *
 * @param uuid
 * @returns {Promise<*>}
 */
async function findByUuid(uuid) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE qr_code_uuid = ?',
        [uuid],
    )

    return rows[0];
}

/**
 * creates an emergency profile
 *
 * @param userId
 * @param firstName
 * @param lastName
 * @param streetNumber
 * @param location
 * @param uuid
 * @returns {Promise<number>}
 */
async function createEmergencyProfile(userId, firstName, lastName, streetNumber, location, uuid) {
    const [result] = await db.query(
        `INSERT INTO emergency_profiles (patient_id, first_name, last_name, street_and_number, location, qr_code_uuid) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, streetNumber, location, uuid]
    );

    return result.insertId;
}

/**
 * updates an existing emergency profile
 *
 * @param emergencyProfileId
 * @param firstName
 * @param lastName
 * @param streetNumber
 * @param location
 * @returns {Promise<*>}
 */
async function updateEmergencyProfile(emergencyProfileId, firstName, lastName, streetNumber, location) {
    const [result] = await db.query(
        'UPDATE emergency_profiles SET first_name = ?, last_name = ?, street_and_number = ?, location = ? WHERE id = ?',
        [firstName, lastName, streetNumber, location, emergencyProfileId]
    )
}

module.exports = {
    findById,
    findByUserId,
    findByUuid,
    createEmergencyProfile,
    updateEmergencyProfile,
}