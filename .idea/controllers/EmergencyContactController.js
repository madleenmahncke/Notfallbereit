const emergencyContactRepository = require('../database/EmergencyContactRepository.js');
const emergencyProfileRepository = require('../database/EmergencyProfileRepository');
const allergyRepository = require("../database/AllergyRepository");

// TODO: add res for duplicate entry EmergencyContact in db
const createEmergencyContact = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {firstName, lastName, phoneNumber, relationship} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).send({
            message: 'Vollständiger Name und Telefonnummer des Notfallkontakts werden benötigt.',
        })
    };

    const emergencyContactId = await emergencyContactRepository.createEmergencyContact(
        emergencyProfileId,
        firstName,
        lastName,
        phoneNumber,
        relationship
    );

    res.status(200).json({
        message: 'Notfallkontakt erstellt für das Notfallprofil ' + emergencyProfileId,
        emergencyContactId: emergencyContactId
    });
}

const updateEmergencyContact = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {firstName, lastName, phoneNumber, relationship} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const emergencyContact = await emergencyContactRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (emergencyContact.profile_id != emergencyProfileId) {
        return res.status(400).json({
            message: 'Notfallkontakt gehört nicht zu dieser Notfallmappe.'
        });
    }

    const emergencyContactId = await emergencyContactRepository.updateEmergencyContact(
        id,
        firstName,
        lastName,
        phoneNumber,
        relationship
    );

    res.status(200).json({
        message: 'Notfallkontakt aktualisiert für das Notfallprofil ' + emergencyProfileId,
        emergencyContactId: emergencyContactId
    })
}

const deleteEmergencyContact = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {firstName, lastName, phoneNumber, relationship} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const emergencyContact = await emergencyContactRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (!emergencyContact) {
        return res.status(400).send({
            message: 'Notfallkontakt nicht gefunden.',
        })
    }

    if (emergencyContact.profile_id != emergencyProfileId) {
        return res.status(400).json({
            message: 'Notfallkontakt gehört nicht zu dieser Notfallmappe.'
        })
    }

    const emergencyContactId = await emergencyContactRepository.deleteEmergencyContact(
        id,
        firstName,
        lastName
    )

    return res.status(200).json({
        message: 'Notfallkontakt wurde gelöscht',
        emergencyContactId: emergencyContactId
    });
}

module.exports = {
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact
}