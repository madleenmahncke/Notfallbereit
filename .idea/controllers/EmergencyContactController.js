const emergencyContactRepository = require('../database/EmergencyContactRepository.js');
const emergencyProfileRepository = require('../database/EmergencyProfileRepository');
const allergyRepository = require("../database/AllergyRepository");
const userRepository = require("../database/UserRepository");

// TODO: add res for duplicate entry EmergencyContact in db
const createEmergencyContact = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {firstName, lastName, phoneNumber, relationship} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).send({
            message: 'Vollständiger Name und Telefonnummer des Notfallkontakts sind Pflichtfelder.',
        })
    };

    const emergencyContactId = await emergencyContactRepository.createEmergencyContact(
        emergencyProfileId,
        firstName,
        lastName,
        phoneNumber,
        relationship
    );

    res.status(201).json({
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
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (emergencyContact.profile_id != emergencyProfileId) {
        return res.status(404).json({
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

    res.status(201).json({
        message: 'Notfallkontakt aktualisiert für das Notfallprofil ' + emergencyProfileId,
        emergencyContactId: emergencyContactId
    })
}

const deleteEmergencyContact = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const emergencyContact = await emergencyContactRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (!emergencyContact) {
        return res.status(404).send({
            message: 'Notfallkontakt nicht gefunden.',
        })
    }

    if (emergencyContact.profile_id != emergencyProfileId) {
        return res.status(404).json({
            message: 'Notfallkontakt gehört nicht zu dieser Notfallmappe.'
        })
    }

    const emergencyContactId = await emergencyContactRepository.deleteEmergencyContact(
        id
    )

    return res.status(200).json({
        message: 'Notfallkontakt wurde gelöscht',
        emergencyContactId: emergencyContactId
    });
}

async function getEmergencyContacts(emergencyProfileId, userId) {
    const user = await userRepository.findById(userId);
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    const emergencyContacts = await emergencyContactRepository.findByEmergencyProfileId(emergencyProfileId);

    if (!medications) {
        return res.status(404).send({
            message: 'Es wurden keine Notfallkontakte gefunden.',
        })
    }

    res.status(200).json(medications);
}

module.exports = {
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    getEmergencyContacts,
}