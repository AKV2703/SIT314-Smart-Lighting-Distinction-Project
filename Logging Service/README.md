# Logging Service
---
## Local Setup Guide

This microservice stores sensor readings and final decisions into MongoDB for the Smart Lighting System project.

- Records each decision (ON/OFF) with **sensorId**, **motion**, **lightLevel**, **source** (automatic/manual), and **timestamp**.
- Provides a REST API to insert logs and fetch recent logs.
- TTL index automatically deletes logs older than **7 days**.

## Project Structure

```
Logging Service/
├── server.js
├── .env
├── package.json
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── log.controller.js
    ├── models/
    │   └── log.js
    └── routes/
        └── log.routes.js
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or MongoDB Atlas)

## Configuration

Create a `.env` file in the root of `Logging Service/` with:

```env
PORT=3002
MONGO_URI=mongodb://127.0.0.1:27017/smartlight
```

For MongoDB Atlas, replace with your connection string:

```env
PORT=3002
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smartlight?retryWrites=true&w=majority
```

Do **not** commit `.env` to GitHub.

## Installation

Inside the `Logging Service/` folder:

```bash
npm install
```

## Running the Project

Start the service:

```bash
npm start
```

For development (auto-reload with nodemon):

```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET /health
```
Response:
```json
{ "ok": true, "service": "logging" }
```

### Create a Log
```
POST /log
Content-Type: application/json
{
  "sensorId": "sensor-1",
  "motion": true,
  "lightLevel": 20,
  "decision": "ON",
  "source": "automatic",
  "timestamp": "2025-09-07T03:10:00Z"
}
```
Notes:
- `source` must be `"automatic"` (Decision Service) or `"manual"` (Override Service).
- `timestamp` is optional; server defaults to current time.

Response:
```json
{ "ok": true, "id": "<mongoId>" }
```

### Fetch Recent Logs
```
GET /logs?limit=5&sensorId=sensor-1&source=manual
```
All query params are optional:
- `limit` (default 20, max 200)
- `sensorId` (filters to a single sensor)
- `source` (`automatic` or `manual`)

Example response:
```json
{
  "ok": true,
  "items": [
    {
      "_id": "65000...",
      "sensorId": "sensor-1",
      "motion": true,
      "lightLevel": 20,
      "decision": "ON",
      "source": "automatic",
      "timestamp": "2025-09-07T03:10:00.000Z"
    }
  ]
}
```

## Verifying Setup

1. Start MongoDB. 
2. Run the Logging Service.  
3. Try the endpoints:
   ```bash
   curl -s http://localhost:3002/health

   # should fail (missing source)
   curl -s -X POST http://localhost:3002/log      -H "Content-Type: application/json"      -d '{"sensorId":"sensor-1","motion":true,"lightLevel":20,"decision":"ON"}'

   # should pass (automatic)
   curl -s -X POST http://localhost:3002/log      -H "Content-Type: application/json"      -d '{"sensorId":"sensor-1","motion":true,"lightLevel":20,"decision":"ON","source":"automatic"}'

   # fetch recent
   curl -s "http://localhost:3002/logs?limit=5&sensorId=sensor-1&source=automatic"
   ```

## Notes

- TTL index auto-deletes documents **7 days** after their `timestamp`.
- Ensure MongoDB is running before starting the service.
- `lightLevel` is constrained between **0–100** in the model.
