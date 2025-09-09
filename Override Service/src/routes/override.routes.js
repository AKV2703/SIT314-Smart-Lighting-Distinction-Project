const express = require('express');
const ctrl = require('../controllers/override.controller');

const router = express.Router();

router.get('/health', ctrl.health);
router.post('/override', ctrl.setOverride);         // Manual
router.get('/override/:sensorId', ctrl.getOverride);
router.delete('/override/:sensorId', ctrl.clearOverride); // Automatic

module.exports = router;