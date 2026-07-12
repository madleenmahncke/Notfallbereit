const db = require("./DB");

async function findById(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE id = ?',
        [emergencyProfileId],
    );

    return rows[0];
}

async function findByUserId(userId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE patient_id = ?',
        [userId],
    );

    return rows[0];
}

async function findByUuid(uuid) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_profiles WHERE qr_code_uuid = ?',
        [uuid],
    )

    return rows[0];
}

async function createEmergencyProfile(userId, firstName, lastName, streetNumber, location, uuid) {
    const [result] = await db.query(
        `INSERT INTO emergency_profiles (patient_id, first_name, last_name, street_and_number, location, qr_code_uuid) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, streetNumber, location, uuid]
    );

    return result.insertId;
}

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