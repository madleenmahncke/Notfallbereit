const express = require('express');
const db = require('./.idea/database/DB');

const authRoutes = require('./.idea/routes/AuthRoutes');
const userRoutes = require('./.idea/routes/UserRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

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