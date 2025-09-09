// src/controllers/log.controller.js
const Log = require('../models/log');

// simple number parser
function toNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// uniform responses
function ok(res, data) {
    return res.status(200).json({ ok: true, ...data });
}
function err(res, code, message) {
    return res.status(code).json({ ok: false, error: message });
}

// GET /health
exports.health = (_req, res) => ok(res, { service: 'logging' });

// POST /log
exports.createLog = async (req, res, next) => {
    try {
        const { sensorId, motion, lightLevel, decision, source, timestamp } = req.body || {};

        const light = toNumber(lightLevel);
        const motionIsBool = typeof motion === 'boolean';
        const decisionValid = decision === 'ON' || decision === 'OFF';
        const lightValid = light !== null;
        const sourceValid = source === 'automatic' || source === 'manual';

        if (!motionIsBool || !lightValid || !decisionValid || !sourceValid) {
        return err(
            res,
            400,
            'Invalid payload: need boolean "motion", numeric "lightLevel", decision "ON|OFF", source "automatic|manual"'
        );
        }

        const doc = await Log.create({
        sensorId: sensorId || null,
        motion,
        lightLevel: light,
        decision,
        source,
        // if timestamp not provided, model default (Date.now) is used
        timestamp: timestamp ? new Date(timestamp) : undefined
        });

        return ok(res, { id: doc._id.toString() });
    } catch (e) {
        next(e);
    }
};

// GET /logs?limit=5&sensorId=sensor-1&source=manual
exports.getLogs = async (req, res, next) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 20, 200);

        const query = {};
        if (req.query.sensorId) query.sensorId = req.query.sensorId;
        if (req.query.source === 'automatic' || req.query.source === 'manual') {
        query.source = req.query.source;
        }

        const items = await Log.find(query)
        .sort({ timestamp: -1 })
        .limit(limit)
        .lean();

        return ok(res, { items });
    } catch (e) {
        next(e);
    }
};