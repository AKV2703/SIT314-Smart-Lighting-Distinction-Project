# Smart Lighting System

## Overview
This project implements a **Smart Home Lighting System** using a microservices architecture. It automates lighting decisions based on motion and ambient light levels and supports **manual override** via a Node-RED dashboard.

You can deploy this system in **two ways**:
1. **Docker Compose** – quick local container-based deployment.
2. **Kubernetes** (Minikube locally, or EKS in the cloud) – scalable, production-style deployment.

> If you use **Docker Compose**, follow the *Docker Deployment* section.  
> If you use **Kubernetes**, follow the *Kubernetes Deployment* section and carefully read `K8s-Manifests/secrets/README.md` for secrets.

---

## Common Prerequisites (for Docker & Kubernetes)
- **Docker** (latest stable)
- **Node.js** v18+ (useful for local testing/debugging)
- **MongoDB Atlas account** (free M0 tier is sufficient): https://www.mongodb.com/cloud/atlas

### MongoDB Atlas Setup (used by both Docker & Kubernetes)
1. Create a **Project** (e.g., `Smart Lighting System`) and a **Free Cluster (M0)**.
2. Create two databases:
   - `LoggingDB` (for the Logging Service)
   - `OverrideDB` (for the Override Service)
3. Create a database user and allow network access from `0.0.0.0/0` (or a tighter range if preferred).
4. Obtain a connection string like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   ```
   You will use different database names for each service (e.g., `LoggingDB` and `OverrideDB`).

---

## Repository Structure
```
SIT314-Smart-Lighting-Distinction-Project/
├── Decision Service/
├── Logging Service/
├── Override Service/
├── Sensor Simulator/
├── NodeRED/
├── docker-compose.yml
└── K8s-Manifests/
    ├── namespaces/
    ├── deployments/
    ├── services/
    ├── autoscaling/
    ├── configmaps/
    └── secrets/
        └── README.md 
```

---

## Docker Deployment

### Environment (.env) files (Docker only)
Create a `.env` file inside each service directory as shown below. **Do not commit** these files.

**Decision Service – `.env`**
```
PORT=3001
DECISION_SECRET=anish-dev
```

**Logging Service – `.env`**
```
PORT=3002
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/LoggingDB?retryWrites=true&w=majority
```

**Override Service – `.env`**
```
PORT=3003
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/OverrideDB?retryWrites=true&w=majority
```

**Sensor Simulator – `.env`**
```
ENDPOINT_URL=http://nodered:1880/sensors
API_KEY=anish-dev
NUM_SENSORS=5
INTERVAL_MS=10000
```

### Run with Docker Compose
```bash
docker compose up --build
```

### Access (Docker)
- Decision Service → http://localhost:3001/health
- Logging Service → http://localhost:3002/health
- Override Service → http://localhost:3003/health
- Node-RED Dashboard → http://localhost:1880/ui

### Stop (Docker)
```bash
docker compose down        # stop
docker compose down -v     # stop and remove volumes
```

---

## Kubernetes Deployment (Minikube)

### Build local images
Use Minikube’s Docker daemon so the cluster can pull local images:
```bash
minikube start
eval $(minikube docker-env)

docker build -t smart-lighting-decision-service ./Decision\ Service
docker build -t smart-lighting-logging-service  ./Logging\ Service
docker build -t smart-lighting-override-service ./Override\ Service
docker build -t smart-lighting-nodered          ./NodeRED
docker build -t smart-lighting-sensor-simulator ./Sensor\ Simulator
```

### Configure ConfigMaps & Secrets
- **ConfigMaps** (non-sensitive) are included in `K8s-Manifests/configmaps/`.
- **Secrets** are **not** committed. Create them locally by following:
  - `K8s-Manifests/secrets/README.md`

> Kubernetes replaces Docker `.env` files with **ConfigMaps + Secrets**. You do **not** need `.env` files for Kubernetes.

### Deploy
Use the helper script to apply namespace, configmaps, secrets, deployments, services, and HPAs:
```bash
./deploy.sh
```

### Verify
```bash
kubectl get all -n smart-lighting
```

### Access (Kubernetes / Minikube)
Default NodePorts:
- Decision Service → `:30001/health`
- Logging Service  → `:30002/health`
- Override Service → `:30003/health`
- Node-RED Dashboard → `:30004/ui`

To get a usable URL on macOS:
```bash
minikube service node-red-service -n smart-lighting --url
```

### Autoscaling (HPA)
HPAs are configured under `K8s-Manifests/autoscaling/`. Use:
```bash
kubectl get hpa -n smart-lighting
kubectl top pods -n smart-lighting
```

### Cleanup
To fully remove all resources created in the `smart-lighting` namespace:
```bash
./cleanup.sh
```

---

## Notes & Good Practices
- **Never commit real credentials**. The `K8s-Manifests/secrets/` directory is ignored except for its `README.md`.
- For Kubernetes, keep environment under **ConfigMaps** (non-sensitive) and **Secrets** (sensitive).
- The Docker Compose flow is ideal for quick iteration; Kubernetes demonstrates **scalability, load balancing, and self-healing**.

---

## Author
Developed by **Anish Kumar Vaswani**  
_Deakin University — SIT314 Software Scalability (High Distinction Project)_
