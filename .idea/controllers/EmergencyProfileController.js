const emergencyProfileRepository = require('../database/EmergencyProfileRepository.js')
const userRepository = require('../database/UserRepository.js')

const createEmergencyProfile = async (req, res) => {
    const {patientId} = req.params;
    const {firstName, lastName, street, zipCode} = req.body;
    const user = await userRepository.findById(patientId);
    const userId = parseInt(patientId);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden.'
        });
    };

    const profileId = await emergencyProfileRepository.createEmergencyProfile(
        userId,
            firstName,
            lastName,
            street,
            zipCode
        );

    res.status(201).json({
        message: 'Notfallmappe erstellt für Benutzer ' + userId,
        userId: userId,
        emergencyProfileId: profileId
    });
}

const updateEmergencyProfile = async (req, res) => {
    const {patientId, id} = req.params;
    const {firstName, lastName, street, zipCode} = req.body;
    const user = await userRepository.findById(patientId);
    const emergencyProfile = await emergencyProfileRepository.findById(id);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden.'
        });
    };

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    const profileId = await emergencyProfileRepository.updateEmergencyProfile(
        id,
        firstName,
        lastName,
        street,
        zipCode
    );

    res.status(201).json({
        message: 'Notfallmappe aktualisiert für Benutzer ' + patientId,
        emergencyProfileId: profileId,
    })
}

module.exports = {
    createEmergencyProfile,
    updateEmergencyProfile,
}
