const db = require("./DB");


async function createEmergencyProfile(userId, firstName, lastName, street, zipCode) {
    const [result] = await db.query(
        `INSERT INTO emergency_profiles (patient_id, first_name, last_name, street, zip_code) VALUES (?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, street, zipCode]
    );

    return result.insertId;
}

module.exports = {
    createEmergencyProfile,
}