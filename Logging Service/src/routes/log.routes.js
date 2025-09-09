const express = require('express');
const ctrl = require('../controllers/log.controller');

const router = express.Router();

// health check
router.get('/health', ctrl.health);

// create one log
router.post('/log', ctrl.createLog);

// fetch recent logs
router.get('/logs', ctrl.getLogs);

module.exports = router;