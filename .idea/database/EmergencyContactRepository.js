const db = require("./DB")

async function findById(emergencyContactId) {
    const [rows] = await db.query(
        'SELECT * FROM emergency_contacts WHERE id = ?',
        [emergencyContactId],
    );

    return rows[0];
}

async function createEmergencyContact(emergencyProfileId, firstName, lastName, phoneNumber, relationship) {
    const [result] = await db.query(
        `INSERT INTO emergency_contacts (profile_id, first_name, last_name, phone, relationship) VALUES (?, ?, ?, ?, ?)`,
        [emergencyProfileId, firstName, lastName, phoneNumber, relationship]
    );

    return result.insertId;
}

async function updateEmergencyContact(emergencyContactId, firstName, lastName, phoneNumber, relationship) {
    const [result] = await db.query(
        'UPDATE emergency_contacts SET first_name = ?, last_name = ?, phone = ?, relationship = ? WHERE id = ?',
        [firstName, lastName, phoneNumber, relationship, emergencyContactId],
    )

    return result;
}

async function deleteEmergencyContact(emergencyContactId, firstName, lastName) {
    const [result] = await db.query(
        'DELETE FROM emergency_contacts WHERE id = ? AND first_name = ? AND last_name = ?',
        [emergencyContactId, firstName, lastName]
    );

    return result;
}

module.exports = {
    findById,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
}