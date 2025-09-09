const { Schema, model } = require('mongoose');

const LogSchema = new Schema(
    {
        sensorId: { type: String, index: true },
        motion: { type: Boolean, required: true },
        lightLevel: { type: Number, required: true, min: 0, max: 100 },
        decision: { type: String, enum: ['ON', 'OFF'], required: true },
        source:     { type: String,  enum: ['automatic', 'manual'], required: true },
        // TTL: documents auto-delete 7 days after this timestamp
        timestamp: {
            type: Date,
            default: Date.now,
            expires: '7d' // TTL
        }
    },
    { versionKey: false }
);

// faster queries per sensor over time
LogSchema.index({ sensorId: 1, timestamp: -1 });

module.exports = model('Log', LogSchema);