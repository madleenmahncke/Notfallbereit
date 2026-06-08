const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Notfallbereit Backend läuft');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});