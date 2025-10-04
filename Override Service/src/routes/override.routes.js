const express = require('express');
const ctrl = require('../controllers/override.controller');

const router = express.Router();

// health
router.get('/health', ctrl.health);

// get current override
router.get('/override/:sensorId', ctrl.getOverride);

// set override ON/OFF
router.put('/override/:sensorId', ctrl.setOverride);

// clear override
router.delete('/override/:sensorId', ctrl.clearOverride);

module.exports = router;