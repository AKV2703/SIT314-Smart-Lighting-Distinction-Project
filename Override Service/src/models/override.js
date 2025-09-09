// src/models/override.js
const { Schema, model } = require('mongoose');

const OverrideSchema = new Schema(
    {
        sensorId: { type: String, required: true, index: true },
        decision: { type: String, enum: ['ON', 'OFF'], required: true }
    },
    { versionKey: false }
);

module.exports = model('Override', OverrideSchema);