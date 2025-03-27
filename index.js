const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar conexión a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Ruta para probar la conexión a la base de datos
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Conexión exitosa', time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Tu API está funcionando 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
