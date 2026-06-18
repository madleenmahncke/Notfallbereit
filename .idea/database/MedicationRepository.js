const db = require("./DB");

async function findById(medicationId) {
    const [rows] = await db.query(
        'SELECT * FROM medications WHERE id = ?',
        [medicationId],
    );

    return rows[0];
}

async function findByEmergencyProfileId(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM medications WHERE profile_id = ?',
        [emergencyProfileId],
    );

    return rows;
}

async function createMedication(emergencyProfileId, name, dosage, notes) {
    const [result] = await db.query(
        `INSERT INTO medications (profile_id, name, dosage, notes) VALUES (?, ?, ?, ?)`,
        [emergencyProfileId, name, dosage, notes]
    );

    return result.insertId;
}

async function updateMedication(medicationId, name, dosage, notes) {
    const [result] = await db.query(
        'UPDATE medications SET name = ?, dosage = ?, notes = ? WHERE id = ?',
        [name, dosage, notes, medicationId]
    )

    return result;
}

async function deleteMedication(medicationId, name, dosage) {
    const [result] = await db.query(
        'DELETE FROM medications WHERE id = ? AND name = ? AND dosage = ?',
        [medicationId, name, dosage]
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