const db = require("./DB")

/**
 * Finds an emergency contact by user id
 *
 * @param emergencyContactId
 * @returns {Promise<*>}
 */
async function findById(emergencyContactId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_contacts WHERE id = ?',
        [emergencyContactId],
    );

    return rows[0];
}

/**
 * finds an emergency profile by emergency profile id
 *
 * @param emergencyProfileId
 * @returns {Promise<*>}
 */
async function findByEmergencyProfileId(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_contacts WHERE profile_id = ?',
        [emergencyProfileId],
    );

    return rows;
}

/**
 * creates an emergency contact
 *
 * @param emergencyProfileId
 * @param firstName
 * @param lastName
 * @param phoneNumber
 * @param relationship
 * @returns {Promise<number>}
 */
async function createEmergencyContact(emergencyProfileId, firstName, lastName, phoneNumber, relationship) {
    const [result] = await db.query(
        `INSERT INTO emergency_contacts (profile_id, first_name, last_name, phone, relationship) VALUES (?, ?, ?, ?, ?)`,
        [emergencyProfileId, firstName, lastName, phoneNumber, relationship]
    );

    return result.insertId;
}

/**
 * updates an existing emergency contact
 *
 * @param emergencyContactId
 * @param firstName
 * @param lastName
 * @param phoneNumber
 * @param relationship
 * @returns {Promise<*>}
 */
async function updateEmergencyContact(emergencyContactId, firstName, lastName, phoneNumber, relationship) {
    const [result] = await db.query(
        'UPDATE emergency_contacts SET first_name = ?, last_name = ?, phone = ?, relationship = ? WHERE id = ?',
        [firstName, lastName, phoneNumber, relationship, emergencyContactId],
    )

    return result;
}

/**
 * deletes an existing emergency contact
 *
 * @param emergencyContactId
 * @returns {Promise<*>}
 */
async function deleteEmergencyContact(emergencyContactId) {
    const [result] = await db.query(
        'DELETE FROM emergency_contacts WHERE id = ?',
        [emergencyContactId]
    );

    return result;
}

module.exports = {
    findById,
    findByEmergencyProfileId,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
}