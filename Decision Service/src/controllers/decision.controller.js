// src/controllers/decision.controller.js
const SECRET = process.env.DECISION_SECRET;

// helpers
function ok(res, data) {
    return res.status(200).json({ ok: true, ...data });
}
function err(res, code, message) {
    return res.status(code).json({ ok: false, error: message });
}
function toNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// GET /health
exports.health = (_req, res) => {
    const port = Number(process.env.PORT);
    return ok(res, { service: 'decision', port });
};

// POST /decision
exports.decide = (req, res) => {
    const p = req.body || {};

    if (SECRET && p.apiKey !== SECRET) {
        return err(res, 401, 'Unauthorized');
    }

    // validate inputs
    const motionIsBool = typeof p.motion === 'boolean';
    const lightLevel = toNumber(p.lightLevel);
    if (!motionIsBool || lightLevel === null) {
        return err(res, 400, 'Bad payload: require boolean "motion" and numeric "lightLevel"');
    }

    // rule: ON if motion && light < 30
    const decision = (p.motion === true && lightLevel < 30) ? 'ON' : 'OFF';

    // reply
    return ok(res, {
        decision,
        sensorId: p.sensorId || null,
        motion: p.motion,
        lightLevel,
        timestamp: p.timestamp || new Date().toISOString()
    });
};
