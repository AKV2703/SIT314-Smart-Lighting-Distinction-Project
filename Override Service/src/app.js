// src/app.js
const express = require('express');
const cors = require('cors');
require('./config/db'); // connect to MongoDB
const routes = require('./routes/override.routes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./openapi.json');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/', routes);

// Swagger UI at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// 404 handler
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// global error handler
app.use((err, _req, res, _next) => {
  console.error('[override] Unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

module.exports = app;