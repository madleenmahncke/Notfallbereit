const db = require("./DB")

/**
 * Finds an allergy by user id
 *
 * @param allergyId
 * @returns {Promise<*>}
 */
async function findById(allergyId) {
    const [rows] = await db.query(
        'SELECT * FROM allergies WHERE id = ?',
        [allergyId],
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
        'SELECT * FROM allergies WHERE profile_id = ?',
        [emergencyProfileId],
    );

    return rows;
}

/**
 * creates an allergy
 *
 * @param emergencyProfileId
 * @param name
 * @param notes
 * @returns {Promise<number>}
 */
async function createAllergy(emergencyProfileId, name, notes) {
    const [result] = await db.query(
        `INSERT INTO allergies (profile_id, allergen, notes) VALUES (?, ?, ?)`,
        [emergencyProfileId, name, notes]
    );

    return result.insertId;
}

/**
 * updates an exisiting allergy
 *
 * @param allergyId id of allergy
 * @param name name of allergy
 * @param notes notes of allergy
 * @returns {Promise<*>}
 */
async function updateAllergy(allergyId, name, notes) {
    const [result] = await db.query(
        'UPDATE allergies SET allergen = ?, notes = ? WHERE id = ?',
        [name, notes, allergyId]
    )

    return result;
}

/**
 * deletes an exisiting allergy
 *
 * @param allergyId
 * @returns {Promise<*>}
 */
async function deleteAllergy(allergyId) {
    const [result] = await db.query(
        'DELETE FROM allergies WHERE id = ?',
        [allergyId]
    );

    return result;
}

module.exports = {
    findById,
    findByEmergencyProfileId,
    createAllergy,
    updateAllergy,
    deleteAllergy,
}