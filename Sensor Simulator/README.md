# Sensor Simulator
---
## Local Setup Guide

This guide explains how to run the **Sensor Simulator** locally for the Smart Lighting System project.  
The simulator generates random readings and posts them to Node-RED endpoint.

- Motion (boolean)
- Light level (0–100)
- Timestamp
- API key (simple shared secret)

## Project Structure

```
Sensor Simulator/
├── sensor_simulator.js
├── package.json
├── .env
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- npm

## Configuration

Create a `.env` file inside `Sensor Simulator/` with the following content:

```env
ENDPOINT_URL=http://localhost:1880/sensors
API_KEY=anish-dev
```

## Installation

Run the following commands inside the `Sensor Simulator/` folder:

```bash
npm init -y
npm install axios dotenv
```

## Running the Project

To start the simulator with default values (3 sensors, sending every 2000ms):

```bash
node sensor_simulator.js
```

You can also pass arguments to control the number of sensors and interval:

```bash
node sensor_simulator.js <num_sensors> <interval_ms>
```

Examples:

```bash
node sensor_simulator.js 5 1000   # 5 sensors, every 1 second
node sensor_simulator.js 10 5000  # 10 sensors, every 5 seconds
```

## Verifying the Setup

Once the simulator is running:

- Node-RED Flow (receiver): `POST /sensors` at `http://localhost:1880/sensors`  

Expected terminal output:

```
Starting 3 sensors → http://localhost:1880/sensors
Sending data every 2000 ms...

[OK] sensor-1 sent → 200 OK
[OK] sensor-2 sent → 200 OK
[OK] sensor-3 sent → 200 OK
```

## Stopping the Simulator

To stop the simulator, press `Ctrl + C` in the terminal.

## Notes

- Ensure the API key in `.env` matches the check in your Node-RED Function.  
- Update `.env` if Node-RED is running on a different host or port.  