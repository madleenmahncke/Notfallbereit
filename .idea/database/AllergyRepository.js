const db = require("./DB")

async function findById(allergyId) {
    const [rows] = await db.query(
        'SELECT * FROM allergies WHERE id = ?',
        [allergyId],
    );

    return rows[0];
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

module.exports = {
    findById,
    createAllergy,
    updateAllergy,
}