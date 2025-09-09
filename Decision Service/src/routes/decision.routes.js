const express = require('express');
const ctrl = require('../controllers/decision.controller');

const router = express.Router();

router.get('/health', ctrl.health);
router.post('/decision', ctrl.decide);

module.exports = router;