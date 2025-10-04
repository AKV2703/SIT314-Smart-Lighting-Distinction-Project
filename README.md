# Smart Lighting System
---
## Local Deployment Guide

This project implements a **Smart Home Lighting System** using a microservices architecture.  
It automates lighting decisions based on motion and ambient light levels, and supports **manual override** via a Node-RED dashboard.

---
## System Overview

### Microservices
1. **Decision Service** — Determines whether a light should be ON/OFF based on sensor readings.
2. **Logging Service** — Stores all light activity logs in MongoDB Atlas.
3. **Override Service** — Allows manual override of lights (ON/OFF) through Node-RED.
4. **Sensor Simulator** — Generates simulated sensor data (motion, light level, etc.).
5. **Node-RED Dashboard** — Displays real-time data and provides manual control.

---
## Project Structure

```
SIT314-Smart-Lighting-Distinction-Project/
├── Decision Service/
├── Logging Service/
├── Override Service/
├── Sensor Simulator/
├── NodeRED/
└── docker-compose.yml
```

---
## Prerequisites

Make sure you have installed:
- **Docker** and **Docker Compose**
- **Node.js** (v18+) for local testing
- **MongoDB Atlas account** (https://www.mongodb.com/cloud/atlas)

---
## MongoDB Atlas Setup

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Project** → `Smart Lighting System`.
3. Create a **Free Cluster** (M0 tier) → `SmartLightCluster`.
4. In the cluster:
   - Create **Database 1** → `LoggingDB`
   - Create **Database 2** → `OverrideDB`
5. Add a database user:
   - Username: `<your-username>`
   - Password: `<your-password>`
6. Whitelist all IPs: `0.0.0.0/0`
7. Copy your connection string (example):
   ```bash
   mongodb+srv://<username>:<password>@smartlightcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---
## Environment Variables (.env)

Each microservice requires its own `.env` file.

```env
### Decision Service — .env
```bash
   PORT=3001
   DECISION_SECRET=anish-dev
```

### Logging Service — .env
```bash
   PORT=3002
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/LoggingDB?retryWrites=true&w=majority
```

### Override Service — .env
```bash
   PORT=3003
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/OverrideDB?retryWrites=true&w=majority
```

### Sensor Simulator — .env
```bash
   ENDPOINT_URL=http://nodered:1880/sensors
   API_KEY=anish-dev
   NUM_SENSORS=5
   INTERVAL_MS=10000
```

> Do not commit `.env` files to GitHub.

---
## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/SIT314-Smart-Lighting-Distinction-Project.git
   cd SIT314-Smart-Lighting-Distinction-Project
   ```

2. Build and start all containers:
   ```bash
   docker compose up --build
   ```

3. Access services locally:
   - Decision Service → http://localhost:3001/health  
   - Logging Service → http://localhost:3002/health  
   - Override Service → http://localhost:3003/health  
   - Node-RED Dashboard → http://localhost:1880/ui  

4. MongoDB Atlas will handle persistent data for both logging and override services.

---
## Node-RED Dashboard

The dashboard provides:
- **Real-time decision table** (automatic + manual decisions)
- **Manual override controls**
- **Dropdown to select sensors**
- **Visualization of system state**

URL: [http://localhost:1880/ui](http://localhost:1880/ui)

---
## Verification Steps

To verify functionality:

1. Open Node-RED dashboard.  
2. Check sensor data updates in real-time.  
3. Perform override actions (ON/OFF).  
4. Verify logs stored in MongoDB Atlas collections:
   - `LoggingDB.logs`
   - `OverrideDB.overrides`

---
## Stopping Services

To stop all running containers:
```bash
docker compose down
```

To remove all containers and volumes:
```bash
docker compose down -v
```

---
## Troubleshooting

- If `nodered` fails to install dashboard nodes:
  ```bash
  docker exec -it nodered npm install node-red-dashboard
  ```

- Check container logs:
  ```bash
  docker logs <container_name>
  ```

- If MongoDB Atlas connection fails, verify:
  - Correct username/password.
  - Network access set to `0.0.0.0/0`.
  - Proper database name in `.env`.

---
## Author
Developed by **Anish Kumar Vaswani**  
Deakin University — SIT314 Software Scalability (Distinction Project)
