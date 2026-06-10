const express = require('express');
const db = require('./.idea/database/DB');

const authRoutes = require('./.idea/routes/AuthRoutes');
const userRoutes = require('./.idea/routes/UserRoutes');
const emergencyProfileRoutes = require('./.idea/routes/EmergencyProfileRoutes');
const medicationRoutes = require('./.idea/routes/MedicationRoutes');
const allergyRoutes = require('./.idea/routes/AllergyRoutes');
const emergencyContactRoutes = require('./.idea/routes/EmergencyContactRoutes');


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/emergencyProfile', emergencyProfileRoutes)
app.use('/api/medication', medicationRoutes)
app.use('/api/allergy', allergyRoutes)
app.use('/api/emergencyContact', emergencyContactRoutes)

app.get('/notfallbereit', async (req, res) => {

    try {

        const [rows] = await db.query('SELECT 1');

        res.json({
            success: true
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});