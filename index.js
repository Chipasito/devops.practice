const express = require('express');
const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'miapp',
    port: process.env.DB_PORT || 5432,
});

// Conexión a la base de datos (puedes usar async/await o .then/.catch)
pool.connect()
    .then(() => console.log('🔌 Conexión a PostgreSQL exitosa'))
    .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));

const app = express();
// Usa el puerto que definas en la variable de entorno; en producción será 3000, y en tests 4000.
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`¡API funcionando correctamente en el puerto ${PORT}! 🚀`);
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { app, server, pool };
