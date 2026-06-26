const db = require("./DB")

async function findById(allergyId) {
    const [rows] = await db.query(
        'SELECT * FROM allergies WHERE id = ?',
        [allergyId],
    );

    return rows[0];
}

async function findByEmergencyProfileId(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM allergies WHERE profile_id = ?',
        [emergencyProfileId],
    );

    return rows;
}

async function createAllergy(emergencyProfileId, name, notes) {
    const [result] = await db.query(
        `INSERT INTO allergies (profile_id, allergen, notes) VALUES (?, ?, ?)`,
        [emergencyProfileId, name, notes]
    );

    return result.insertId;
}

async function updateAllergy(allergyId, name, notes) {
    const [result] = await db.query(
        'UPDATE allergies SET allergen = ?, notes = ? WHERE id = ?',
        [name, notes, allergyId]
    )

    return result;
}

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