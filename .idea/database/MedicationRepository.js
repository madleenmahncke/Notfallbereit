const db = require("./DB");

/**
 * finds a medication by id
 *
 * @param medicationId
 * @returns {Promise<*>}
 */
async function findById(medicationId) {
    const [rows] = await db.query(
        'SELECT * FROM medications WHERE id = ?',
        [medicationId],
    );

    return rows[0];
}

/**
 * finds medications by emergency profile id
 *
 * @param emergencyProfileId
 * @returns {Promise<*>}
 */
async function findByEmergencyProfileId(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM medications WHERE profile_id = ?',
        [emergencyProfileId],
    );

    return rows;
}

/**
 * creates a medication
 *
 * @param emergencyProfileId
 * @param name
 * @param dosage
 * @param notes
 * @returns {Promise<number>}
 */
async function createMedication(emergencyProfileId, name, dosage, notes) {
    const [result] = await db.query(
        `INSERT INTO medications (profile_id, name, dosage, notes) VALUES (?, ?, ?, ?)`,
        [emergencyProfileId, name, dosage, notes]
    );

    return result.insertId;
}

/**
 * updates an existing medication
 *
 * @param medicationId
 * @param name
 * @param dosage
 * @param notes
 * @returns {Promise<*>}
 */
async function updateMedication(medicationId, name, dosage, notes) {
    const [result] = await db.query(
        'UPDATE medications SET name = ?, dosage = ?, notes = ? WHERE id = ?',
        [name, dosage, notes, medicationId]
    )

    return result;
}

/**
 * deletes an existing medication
 *
 * @param medicationId
 * @returns {Promise<*>}
 */
async function deleteMedication(medicationId) {
    const [result] = await db.query(
        'DELETE FROM medications WHERE id = ?',
        [medicationId]
    );

    return result;
}

module.exports = {
    findById,
    findByEmergencyProfileId,
    createMedication,
    updateMedication,
    deleteMedication,
}