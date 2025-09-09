const express = require('express');
const cors = require('cors');
require('./config/db'); // connect to MongoDB
const logRoutes = require('./routes/log.routes');
const openapiSpec = require('./openapi.json'); 
const swaggerUi = require('swagger-ui-express');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// routes
app.use('/', logRoutes);

// 404 fallback
app.use((_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
});

// global error handler
app.use((err, _req, res, _next) => {
    console.error('[logging] Unhandled error:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
});

module.exports = app;