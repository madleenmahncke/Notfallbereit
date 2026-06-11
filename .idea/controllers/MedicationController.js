const medicationRepository = require('../database/MedicationRepository');
const emergencyProfileRepository = require('../database/emergencyProfileRepository');

// TODO: add res for duplicate entry medication in db
const createMedication = async (req, res) => {
    const {emergencyProfileId} = req.params;
    const {name, dosage, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.',
        })
    };

    if (!name || !dosage) {
        return res.status(400).json({
            error: 'Medikamentenname wird benötigt.',
        })
    };

    const medicationId = await medicationRepository.createMedication(
            emergencyProfileId,
            name,
            dosage,
            notes
        );

    res.status(201).json({
        message: 'Medikament erstellt für das Notfallprofil ' + emergencyProfileId,
        medicationId: medicationId
    });
}

// TODO: add res for duplicate entry medication in db
const updateMedication = async (req, res) => {
    const {emergencyProfileId, id} = req.params;
    const {name, dosage, notes} = req.body;
    const emergencyProfile = await emergencyProfileRepository.findById(emergencyProfileId);
    const medication = await medicationRepository.findById(id);

    if (!emergencyProfile) {
        return res.status(400).send({
            message: 'Notfallprofil nicht gefunden.'
        })
    };

    if (medication.profile_id != emergencyProfileId) {
        return res.status(400).json({
            message: 'Medikament gehört nicht zu dieser Notfallmappe.'
        });
    }

    if (!name || !dosage) {
        return res.status(400).json({
            error: 'Medikamentenname wird benötigt.',
        })
    };

    const medicationId = await medicationRepository.updateMedication(
        id,
        name,
        dosage,
        notes
    );

    res.status(201).json({
        message: 'Medikament aktualisiert für das Notfallprofil .' + medicationId,
        medicationId: medicationId
    });
}

module.exports = {
    createMedication,
    updateMedication,
}
