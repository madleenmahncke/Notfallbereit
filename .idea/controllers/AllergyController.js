const allergyRepository = require('../database/AllergyRepository');
const emergencyProfileRepository = require('../database/EmergencyProfileRepository');
const userRepository = require("../database/UserRepository");
const bcrypt = require("bcrypt");

// TODO: add res for duplicate entry allergy in db
const createAllergy = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {name, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    if (!name) {
        return res.status(400).send({
            message: 'Name der Allergie wird benötigt.',
        })
    };

    const allergyId = await allergyRepository.createAllergy(
        emergencyProfileId,
        name,
        notes
    );

    res.status(200).json({
        message: 'Allergie erstellt für das Notfallprofil ' + emergencyProfileId,
        allergyId: allergyId
    });
}

const updateAllergy = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {name, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const allergy = await allergyRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (allergy.profile_id != emergencyProfileId) {
        return res.status(400).json({
            message: 'Allergie gehört nicht zu dieser Notfallmappe.'
        });
    }

    const allergyId = await allergyRepository.updateAllergy(
        id,
        name,
        notes
    );

    res.status(200).json({
        message: 'Allergie aktualisiert für das Notfallprofil ' + emergencyProfileId,
        allergyId: allergyId
    })
}

const deleteAllergy = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {name} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const allergy = await allergyRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (!allergy) {
        return res.status(400).send({
            message: 'Allergie nicht gefunden.',
        })
    }

    if (allergy.profile_id != emergencyProfileId) {
        return res.status(400).send({
            message: 'Allergie gehört nicht zu dieser Notfallmappe.'
        })
    }

    const allergyId = await allergyRepository.deleteAllergy(
        id,
        name
    )

    return res.status(200).json({
        message: 'Allergie wurde gelöscht',
        allergyId: allergyId
    });
}

async function getAllergies(emergencyProfileId, userId) {
    const user = await userRepository.findById(userId);
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    const allergies = await allergyRepository.findByEmergencyProfileId(emergencyProfileId);

    if (!allergies) {
        return res.status(400).send({
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