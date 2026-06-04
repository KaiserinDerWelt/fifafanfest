const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/registro', [
  body('nombre').trim().notEmpty().withMessage('Nombre requerido'),
  body('telefono').trim().notEmpty().isMobilePhone().withMessage('Teléfono inválido'),
  body('mensaje').optional().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { nombre, telefono, mensaje } = req.body;
    await pool.query(
      'INSERT INTO registros (nombre, telefono, mensaje) VALUES (?, ?, ?)',
      [nombre, telefono, mensaje || '']
    );
    res.json({ ok: true, mensaje: 'Registro exitoso' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/api/registros', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM registros ORDER BY creado_en DESC');
  res.json(rows);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));