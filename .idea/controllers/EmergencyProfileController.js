const emergencyProfileRepository = require('../database/EmergencyProfileRepository.js')
const userRepository = require('../database/UserRepository.js')
const allergyController = require('../controllers/AllergyController.js')
const medicationController = require('../controllers/MedicationController.js')
const emergencyContactController = require('../controllers/EmergencyContactController.js')
const allergyRepository = require("../database/AllergyRepository");
const medicationRepository = require("../database/MedicationRepository");
const emergencyContactRepository = require("../database/EmergencyContactRepository");
const {v4: uuidv4} = require("uuid");

/**
 * creates a new emergency profile
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const createEmergencyProfile = async (req, res) => {
    const {firstName, lastName, streetNumber, location} = req.body;
    const patientId = req.user.id;

    const user = await userRepository.findById(patientId);
    const userId = parseInt(patientId);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden!'
        });
    };

    // trim removes spaces in beginning and end
    const trimmedFirstName = firstName?.trim();
    const trimmedLastName = lastName?.trim();
    const trimmedStreetNumber = streetNumber?.trim();
    const trimmedLocation = location?.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedStreetNumber || !trimmedLocation) {
        return res.status(400).json({
            message: 'Alle Felder müssen ausgefüllt werden!'
        });
    }

    // generates new uuid
    const uuid = uuidv4();

    const profileId = await emergencyProfileRepository.createEmergencyProfile(
        userId,
        trimmedFirstName,
        trimmedLastName,
        trimmedStreetNumber,
        trimmedLocation,
        uuid
    );

    res.status(201).json({
        message: 'Notfallmappe erstellt!',
        userId: userId,
        emergencyProfileId: profileId
    });
}

/**
 * updates an exisiting emergency profile
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const updateEmergencyProfile = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, streetNumber, location} = req.body;
    const patientId = req.user.id;

    const user = await userRepository.findById(patientId);
    const emergencyProfile = await emergencyProfileRepository.findById(id);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden.'
        });
    };

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallmappe nicht gefunden.',
        })
    };

    await emergencyProfileRepository.updateEmergencyProfile(
        id,
        firstName,
        lastName,
        streetNumber,
        location
    );

    res.status(200).json({
        message: 'Notfallmappe aktualisiert!',
        emergencyProfileId: id,
    })
}

/**
 * deletes an exisiting emergency profile
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const getEmergencyProfile = async (req, res) => {
    const {id} = req.params;
    const patientId = req.user.id;

    const user = await userRepository.findById(patientId);
    const emergencyProfile = await emergencyProfileRepository.findById(id);

    if (!user) {
        return res.status(404).json({
            message: 'Benutzer nicht gefunden.'
        });
    };

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallmappe nicht gefunden.',
        })
    };

    const allergies = await allergyRepository.findByEmergencyProfileId(id);
    const medications = await medicationRepository.findByEmergencyProfileId(id);
    const emergencyContacts = await emergencyContactRepository.findByEmergencyProfileId(id);

    res.status(201).json({
        message: 'Notfallmappe gefunden!',
        emergencyProfile: emergencyProfile,
        allergies: allergies,
        medications: medications,
        emergencyContacts: emergencyContacts
    })
}

/**
 * gets an exisiting emergency profile via uuid
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
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

    // only paramedics can get a emergency profile via uuid
    if (user.role != "PARAMEDIC") {
        return res.status(401).send({
            message: 'Benutzer nicht zugelassen.'
        })
    }

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallmappe nicht gefunden.',
        })
    };

    // load data
    const allergies = await allergyRepository.findByEmergencyProfileId(emergencyProfile.id);
    const medications = await medicationRepository.findByEmergencyProfileId(emergencyProfile.id);
    const emergencyContacts = await emergencyContactRepository.findByEmergencyProfileId(emergencyProfile.id);

    res.status(201).json({
        message: 'Notfallmappe gefunden!',
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
