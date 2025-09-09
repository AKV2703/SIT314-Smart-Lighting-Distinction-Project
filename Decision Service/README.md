# Decision Service
---
## Local Setup Guide

This microservice decides **ON/OFF** for a light based on motion and light level readings.  
It is part of the Smart Lighting System project.

- Input: `sensorId`, `motion` (boolean), `lightLevel` (number), and optional `timestamp`.
- Rule: **ON** if `motion === true` **and** `lightLevel < 30`, otherwise **OFF**.
- Provides a REST API to evaluate decisions.
- Optional API key check using `DECISION_SECRET`.

## Project Structure

```
Decision Service/
├── server.js
├── .env
├── package.json
└── src/
    ├── app.js
    ├── controllers/
    │   └── decision.controller.js
    └── routes/
        └── decision.routes.js
```

## Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- npm

## Configuration

Create a `.env` file in the root of `Decision Service/` with:

```env
PORT=3001
DECISION_SECRET=anish-dev
```

- `PORT`: the port the service listens on.  
- `DECISION_SECRET`: optional shared secret for requests.  
  If set, every request body must include `"apiKey": "<DECISION_SECRET>"`.  
  If left empty, the service accepts all requests.

## Installation

Run the following inside the `Decision Service/` folder:

```bash
npm install
```

## Running the Project

Start the service:

```bash
npm start
```

For development (with auto-reload using nodemon):

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
{ "ok": true, "service": "decision", "port": 3001 }
```

### Decision
```
POST /decision
Content-Type: application/json
{
  "sensorId": "sensor-1",
  "motion": true,
  "lightLevel": 20,
  "apiKey": "anish-dev"
}
```
Response:
```json
{
  "ok": true,
  "decision": "ON",
  "sensorId": "sensor-1",
  "motion": true,
  "lightLevel": 20,
  "timestamp": "2025-09-07T03:10:00.000Z"
}
```

If `apiKey` is missing or invalid (when `DECISION_SECRET` is set):
```json
{ "ok": false, "error": "Unauthorized" }
```

If inputs are invalid:
```json
{ "ok": false, "error": "Bad payload: require boolean \"motion\" and numeric \"lightLevel\"" }
```

## Verifying Setup

1. Run the Decision Service.  
2. Use curl or Postman to hit the endpoints:  
   ```bash
   curl -s http://localhost:3001/health
   curl -s -X POST http://localhost:3001/decision \\
     -H "Content-Type: application/json" \\
     -d '{"sensorId":"sensor-1","motion":true,"lightLevel":20,"apiKey":"anish-dev"}'
   ```

## Notes

- Keep `.env` out of version control.  
- If `DECISION_SECRET` is not set, the service accepts requests without authentication.  