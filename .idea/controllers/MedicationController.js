const medicationRepository = require('../database/MedicationRepository');
const emergencyProfileRepository = require('../database/emergencyProfileRepository');
const bcrypt = require("bcrypt");

// TODO: add res for duplicate entry medication in db
const createMedication = async (req, res) => {
    const { emergencyProfileId } = req.params;
    const {name, dosage, description} = req.body;
    const emergencyProfile = await medicationRepository.findEmergencyProfile(id);
    const medication = await medicationRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    if (medication) {
        return res.status(200).json({
            message: 'Medikament existiert bereits.'
        })
    };

    if (!name || !dosage) {
        return res.status(400).json({
            error: 'Medikamentenname wird benötigt.',
        })
    };

    const medicationId =
        await medicationRepository.createMedication(
            emergencyProfileId,
            name,
            dosage,
            description
        );

    res.status(201).json({
        message: 'Medikament erstellt für Notfallmappe ' + emergencyProfileId,
        medicationId: medicationId
    });
}

// TODO: add res for duplicate entry medication in db
const updateMedication = async (req, res) => {
    const { emergencyProfileId, id  } = req.params;
    const {name, dosage, description} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.'
        })
    };

    if (!name || !dosage) {
        return res.status(400).json({
            error: 'Medikamentenname wird benötigt.',
        })
    };

    const medicationId = await medicationRepository.updateMedication(
        id,
        name,
        dosage,
        description
    );

    res.status(201).json({
        message: 'Medikament aktualisiert.',
        medicationId: medicationId
    });
}

module.exports = {
    createMedication,
    updateMedication,
}
