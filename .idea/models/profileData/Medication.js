/**
 * represents a medication
 */
class Medication {
    constructor(id, name, dosage, notes) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
        this.notes = notes;
    }
}

module.exports = Medication;