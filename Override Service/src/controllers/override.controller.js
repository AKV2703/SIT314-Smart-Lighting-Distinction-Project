// src/controllers/override.controller.js
const Override = require('../models/override');

// uniform responses
function ok(res, data) {
    return res.status(200).json({ ok: true, ...data });
}
function err(res, code, message) {
    return res.status(code).json({ ok: false, error: message });
}

// GET /override/:sensorId
exports.getOverride = async (req, res, next) => {
    try {
        const { sensorId } = req.params;
        if (!sensorId) return err(res, 400, 'Missing sensorId');

        const doc = await Override.findOne({ sensorId }).lean();
        if (!doc) return ok(res, { active: false });

        return ok(res, { active: true, decision: doc.decision });
    } catch (e) {
        next(e);
    }
};

// PUT /override/:sensorId
exports.setOverride = async (req, res, next) => {
    try {
        const { sensorId } = req.params;
        const { decision } = req.body;

        if (!sensorId) return err(res, 400, 'Missing sensorId');
        if (!["ON", "OFF"].includes(decision)) {
            return err(res, 400, 'Invalid decision, must be ON or OFF');
        }

        const updated = await Override.findOneAndUpdate(
            { sensorId },
            { sensorId, decision },
            { upsert: true, new: true }
        ).lean();

        return ok(res, { active: true, decision: updated.decision });
    } catch (e) {
        next(e);
    }
};

// DELETE /override/:sensorId (switch back to Automatic)
exports.clearOverride = async (req, res, next) => {
    try {
        const { sensorId } = req.params;
        if (!sensorId) return err(res, 400, 'Missing sensorId');

        await Override.deleteOne({ sensorId });
        return ok(res, { cleared: true });
    } catch (e) {
        next(e);
    }
};

// Health check
exports.health = (_req, res) => ok(res, { service: 'override' });