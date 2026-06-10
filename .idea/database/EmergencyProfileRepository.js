const db = require("./DB");

async function findById(emergencyProfileId) {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [emergencyProfileId],
    );

    return rows[0];
}

async function createEmergencyProfile(userId, firstName, lastName, street, zipCode) {
    const [result] = await db.query(
        `INSERT INTO emergency_profiles (patient_id, first_name, last_name, street, zip_code) VALUES (?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, street, zipCode]
    );

    return result.insertId;
}

module.exports = {
    findById,
    createEmergencyProfile,
}