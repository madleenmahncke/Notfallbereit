const allergyRepository = require('../database/AllergyRepository');
const emergencyProfileRepository = require('../database/EmergencyProfileRepository');
const userRepository = require("../database/UserRepository");
const bcrypt = require("bcrypt");

/**
 * Creates a new allergy for an emergency profile
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const createAllergy = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {name, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    // trim removes spaces in beginning and end
    const trimmedName = name?.trim();
    const trimmedNnotes = notes?.trim();

    if (!trimmedName) {
        return res.status(400).send({
            message: 'Name der Allergie wird benötigt.',
        })
    };

    const allergyId = await allergyRepository.createAllergy(
        emergencyProfileId,
        trimmedName,
        trimmedNnotes
    );

    res.status(201).json({
        message: 'Allergie erstellt für das Notfallprofil ' + emergencyProfileId,
        allergyId: allergyId
    });
}

/**
 * Updates an existing allergy
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const updateAllergy = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {name, notes} = req.body;

    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const allergy = await allergyRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    // ensure allergy belongs to the profile
    if (allergy.profile_id != emergencyProfileId) {
        return res.status(404).json({
            message: 'Allergie gehört nicht zu dieser Notfallmappe.'
        });
    }

    // trim removes spaces in beginning and end
    const trimmedName = name?.trim();
    const trimmedNotes = notes?.trim();

    if (!trimmedName) {
        return res.status(400).send({
            message: 'Name der Allergie wird benötigt.',
        })
    };

    const allergyId = await allergyRepository.updateAllergy(
        id,
        name,
        notes
    );

    res.status(201).json({
        message: 'Allergie aktualisiert für das Notfallprofil ' + emergencyProfileId,
        allergyId: allergyId
    })
}

/**
 * Deletes an existing allergy
 *
 * @param req Express request object
 * @param res Express response object
 * @returns {Promise<*>}
 */
const deleteAllergy = async (req, res) => {
    const {emergencyProfileId, id} = req.params;

    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const allergy = await allergyRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (!allergy) {
        return res.status(404).send({
            message: 'Allergie nicht gefunden.',
        })
    }

    // ensures allergy belongs to profile
    if (allergy.profile_id != emergencyProfileId) {
        return res.status(404).send({
            message: 'Allergie gehört nicht zu dieser Notfallmappe.'
        })
    }

    const result = await allergyRepository.deleteAllergy(
        id
    )

    return res.status(200).json({
        message: 'Allergie wurde gelöscht',
        result: result,
        allergyId: id,
        emergencyProfileId: emergencyProfileId,
    });
}

/**
 * Gets all exisiting allergies
 *
 * @param emergencyProfileId
 * @param userId
 * @returns {Promise<*>}
 */
async function getAllergies(emergencyProfileId, userId) {
    const user = await userRepository.findById(userId);
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    const allergies = await allergyRepository.findByEmergencyProfileId(emergencyProfileId);

    if (!allergies) {
        return res.status(404).send({
            message: 'Es wurden keine Allergien gefunden.',
        })
    }

    res.status(200).json(allergies);
}

module.exports = {
    createAllergy,
    updateAllergy,
    deleteAllergy,
    getAllergies
}