# Override Service
---
## Local Setup Guide

This microservice manages **manual overrides** for the Smart Lighting System.

- **Manual mode**: force a sensor's decision to ON/OFF.
- **Automatic mode**: clear the override so Decision Service decides.
- REST API to set, read, and clear overrides.

## Project Structure

```
Override Service/
├── server.js
├── .env
├── package.json
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── override.controller.js
    ├── models/
    │   └── override.js
    └── routes/
        └── override.routes.js
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or MongoDB Atlas)

## Configuration

Create a `.env` file in the root of `Override Service/` with:

```env
PORT=3003
MONGO_URI=mongodb://127.0.0.1:27017/smartlight
```

Do **not** commit `.env` to GitHub.

## Installation

Inside the `Override Service/` folder:

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
{ "ok": true, "service": "override" }
```

### Set/Replace Override (Manual mode)
```
POST /override
Content-Type: application/json
{
  "sensorId": "sensor-1",
  "decision": "ON"
}
```
Response:
```json
{
  "ok": true,
  "override": {
    "_id": "6500...",
    "sensorId": "sensor-1",
    "decision": "ON"
  }
}
```

### Get Override Status
```
GET /override/:sensorId
```
Responses:
```json
{ "ok": true, "active": false }
```
or
```json
{ "ok": true, "active": true, "decision": "OFF" }
```

### Clear Override (Automatic mode)
```
DELETE /override/:sensorId
```
Response:
```json
{ "ok": true, "cleared": true }
```

## Notes

- This model has **no TTL**: manual overrides persist until you clear them (Automatic mode).
- Use a consistent `sensorId` across Simulator, Override, Decision, and Logging.
