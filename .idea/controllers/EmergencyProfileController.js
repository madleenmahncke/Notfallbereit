const emergencyProfileRepository = require('../database/EmergencyProfileRepository.js')

const createEmergencyProfile = async (req, res) => {
    const { patientId } = req.params;

    const {firstName, lastName, street, zipCode} = req.body;

    const profileId =
        await emergencyProfileRepository.createEmergencyProfile(
            patientId,
            firstName,
            lastName,
            street,
            zipCode
        );

    res.status(201).json({
        message: 'Notfallmappe erstellt für Benutzer ' + patientId,
        emergencyProfileId: profileId
    });
}

module.exports = {
    createEmergencyProfile,
}
