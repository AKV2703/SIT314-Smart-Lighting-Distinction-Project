const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes/decision.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Load OpenAPI
const openapiSpec = require(path.join(__dirname, 'openapi.json'));

// Mount Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Mount API routes
app.use('/', routes);

// 404 fallback
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// Global error handler
app.use((err, _req, res, _next) => {
    console.error('[decision] Unhandled error:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
});

module.exports = app;