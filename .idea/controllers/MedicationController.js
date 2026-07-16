const medicationRepository = require('../database/MedicationRepository');
const emergencyProfileRepository = require('../database/emergencyProfileRepository');
const userRepository = require("../database/UserRepository");

const createMedication = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {name, dosage, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    const trimmedName = name?.trim();
    const trimmedDosage = dosage?.trim();

    if (!trimmedName || !trimmedDosage) {
        return res.status(400).json({
            error: 'Medikamentenname und -dosis werden benötigt.',
        })
    };

    const medicationId = await medicationRepository.createMedication(
        emergencyProfileId,
        trimmedName,
        trimmedDosage,
        notes
    );

    res.status(201).json({
        message: 'Medikament erstellt für das Notfallprofil ' + emergencyProfileId,
        medicationId: medicationId
    });
}

const updateMedication = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {name, dosage, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const medication = await medicationRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.'
        })
    };

    if (medication.profile_id != emergencyProfileId) {
        return res.status(404).json({
            message: 'Medikament gehört nicht zu dieser Notfallmappe.'
        });
    }

    const trimmedName = name?.trim();
    const trimmedDosage = dosage?.trim();

    if (!trimmedName || !trimmedDosage) {
        return res.status(400).json({
            error: 'Medikamentenname und -dosis werden benötigt.',
        })
    };

    const medicationId = await medicationRepository.updateMedication(
        id,
        trimmedName,
        trimmedDosage,
        notes
    );

    res.status(201).json({
        message: 'Medikament aktualisiert für das Notfallprofil .' + medicationId,
        medicationId: medicationId
    });
}

const deleteMedication = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const medication = await medicationRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    if (!medication) {
        return res.status(404).send({
            message: 'Medikament nicht gefunden.',
        })
    }

    if (medication.profile_id != emergencyProfileId) {
        return res.status(404).json({
            message: 'Medikament gehört nicht zu dieser Notfallmappe.'
        });
    }

    const medicationId = await medicationRepository.deleteMedication(
        id
    )

    return res.status(200).json({
        message: 'Medikament wurde gelöscht',
        medicationId: medicationId
    });
}

async function getMedications(emergencyProfileId, userId) {
    const user = await userRepository.findById(userId);
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(404).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    }

    const medications = await medicationRepository.findByEmergencyProfileId(emergencyProfileId);

    if (!medications) {
        return res.status(404).send({
            message: 'Es wurden keine Medikamente gefunden.',
        })
    }

    res.status(200).json(medications);
}

module.exports = {
    createMedication,
    updateMedication,
    deleteMedication,
    getMedications
}
