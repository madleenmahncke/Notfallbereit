const db = require("./DB");

async function findById(medicationId) {
    const [rows] = await db.query(
        'SELECT * FROM medications WHERE id = ?',
        [medicationId],
    );

    return rows[0];
}

async function findEmergencyProfile(medicationId) {
    const [rows] = await db.query(
        'SELECT profile_id FROM medications WHERE id = ?',
        [medicationId],
    );

    return rows[0];
}

async function createMedication(emergencyProfileId, name, dosage, description) {
    const [result] = await db.query(
        `INSERT INTO medications (profile_id, name, dosage, notes) VALUES (?, ?, ?, ?)`,
        [emergencyProfileId, name, dosage, description]
    );

    return result.insertId;
}

async function updateMedication(medicationId, name, dosage, description) {
    const [result] = await db.query(
        'UPDATE medications SET name = ?, dosage = ?, notes = ? WHERE id = ?',
        [name, dosage, description, medicationId]
    )

    return result;
}

module.exports = {
    findById,
    findEmergencyProfile,
    createMedication,
    updateMedication,
}