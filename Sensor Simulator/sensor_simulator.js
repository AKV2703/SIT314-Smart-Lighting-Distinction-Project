const axios = require("axios"); // library to make HTTP requests
require("dotenv").config(); // load settings from .env file

// Load endpoint and API key from .env file
const ENDPOINT_URL = process.env.ENDPOINT_URL || "http://localhost:1880/sensors";
const API_KEY = process.env.API_KEY || "default-key";

let NUM_SENSORS = 3;      // number of fake sensors
let INTERVAL_MS = 2000;   // how often to send data (milliseconds)

// Check if user passed custom values in terminal
if (process.argv[2]) NUM_SENSORS = parseInt(process.argv[2], 10);
if (process.argv[3]) INTERVAL_MS = parseInt(process.argv[3], 10);

// Helper functions to generate random values
function randomBool(chance = 0.5) {
  return Math.random() < chance; // true about 'chance'% of the time
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // number between min and max
}

// Function that sends one fake reading
async function sendReading(sensorId) {
    const payload = {
        sensorId, // unique sensor name
        motion: randomBool(0.45), // ~45% chance of motion detected
        lightLevel: randomInt(0, 100), // light value between 0–100
        timestamp: new Date().toISOString(), // current time in standard format
        apiKey: API_KEY // simple key for authentication
    };

    try {
        // Send the data to Node-RED
        const res = await axios.post(ENDPOINT_URL, payload);
        console.log(`[OK] ${sensorId} sent → ${res.status} ${res.statusText}`);
    } catch (err) {
        console.error(`[FAIL] ${sensorId} →`, err.message);
    }
}

// Start the simulation
function startSimulation() {
    console.log(`Starting ${NUM_SENSORS} sensors → ${ENDPOINT_URL}`);
    console.log(`Sending data every ${INTERVAL_MS} ms...\n`);

    // Create N fake sensors
    for (let i = 1; i <= NUM_SENSORS; i++) {
        const sensorId = `sensor-${i}`;

        // Send one reading immediately
        sendReading(sensorId);

        // Keep sending readings every INTERVAL_MS
        setInterval(() => sendReading(sensorId), INTERVAL_MS);
    }
}

startSimulation();