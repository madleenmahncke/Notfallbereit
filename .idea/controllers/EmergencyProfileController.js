const emergencyProfileRepository = require('../database/EmergencyProfileRepository.js')
const userRepository = require('../database/UserRepository.js')

const allergyController = require('../controllers/AllergyController.js')
const medicationController = require('../controllers/MedicationController.js')
const emergencyContactController = require('../controllers/EmergencyContactController.js')
const allergyRepository = require("../database/AllergyRepository");
const medicationRepository = require("../database/MedicationRepository");
const emergencyContactRepository = require("../database/EmergencyContactRepository");
const {v4: uuidv4} = require("uuid");

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

    const uuid = uuidv4();

    const profileId = await emergencyProfileRepository.createEmergencyProfile(
        userId,
        firstName,
        lastName,
        street,
        zipCode,
        uuid
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

const getEmergencyProfile = async (req, res) => {
    const {patientId, id} = req.params;
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

    const allergies = await allergyRepository.findByEmergencyProfileId(id);
    const medications = await medicationRepository.findByEmergencyProfileId(id);
    const emergencyContacts = await emergencyContactRepository.findByEmergencyProfileId(id);

    res.status(201).json({
        message: 'Notfallmappe von Benutzer ' + patientId,
        emergencyProfile: emergencyProfile,
        allergies: allergies,
        medications: medications,
        emergencyContacts: emergencyContacts
    })
}

const getEmergencyProfileWithUuid = async (req, res) => {
    const {uuid} = req.params;
    const paramedicId = req.user.id;

    const user = await userRepository.findById(paramedicId);
    const emergencyProfile = await emergencyProfileRepository.findByUuid(uuid);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden.'
        });
    };

    if (user.role != "PARAMEDIC") {
        return res.status(400).send({
            message: 'Benutzer nicht zugelassen.'
        })
    }

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    const allergies = await allergyRepository.findByEmergencyProfileId(emergencyProfile.id);
    const medications = await medicationRepository.findByEmergencyProfileId(emergencyProfile.id);
    const emergencyContacts = await emergencyContactRepository.findByEmergencyProfileId(emergencyProfile.id);

    res.status(201).json({
        message: 'Notfallmappe von Benutzer ' + emergencyProfile.patient_id,
        emergencyProfile: emergencyProfile,
        allergies: allergies,
        medications: medications,
        emergencyContacts: emergencyContacts
    })
}

module.exports = {
    createEmergencyProfile,
    updateEmergencyProfile,
    getEmergencyProfile,
    getEmergencyProfileWithUuid
}
