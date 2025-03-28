// Forzamos el puerto para pruebas antes de importar la app
process.env.PORT = 4000;
process.env.DB_HOST = process.env.DB_HOST || 'db';  // Asegúrate de que coincida con el nombre del servicio en docker-compose
process.env.DB_USER = process.env.DB_USER || 'postgres';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'password';
process.env.DB_NAME = process.env.DB_NAME || 'miapp';
process.env.DB_PORT = process.env.DB_PORT || 5432;

const request = require('supertest');
const { app, server, pool } = require('./index');

describe('Pruebas de la API', () => {
  it('GET / debe responder con un mensaje indicando que corre en el puerto 4000', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('4000');
  });
});

// Cierra el servidor después de que los tests terminen
afterAll(() => {
  server.close();
  // Si abres conexiones a la base de datos, puedes cerrarlas también
  pool.end();
});
