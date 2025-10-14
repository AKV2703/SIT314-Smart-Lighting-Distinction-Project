# Kubernetes Secrets

This folder contains **Kubernetes Secret manifests** used by the **Smart Lighting System** for storing sensitive credentials such as MongoDB URIs, API keys, and private tokens.

> ⚠️ Actual secret files are **not included in this repository** for security reasons.  
> Use these templates to recreate them locally by replacing placeholder values with your own credentials.

---

## How to Use

1. Copy the example YAMLs below into individual files:
   - `secret-decision.yaml`
   - `secret-logging.yaml`
   - `secret-override.yaml`
   - `secret-sensor-simulator.yaml`

2. Replace all placeholders like:
   ```
   <your-secret-value-here>
   <your-mongodb-uri-here>
   ```

3. Apply all secrets to your Kubernetes cluster:
   ```bash
   kubectl apply -f K8s-Manifests/secrets/
   ```

---

## Example Secret Manifests

### Decision Service
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-decision
  namespace: smart-lighting
type: Opaque
stringData:
  DECISION_SECRET: "<your-secret-value-here>"
```

---

### Logging Service
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-logging
  namespace: smart-lighting
type: Opaque
stringData:
  MONGO_URI: "mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
```

---

### Override Service
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-override
  namespace: smart-lighting
type: Opaque
stringData:
  MONGO_URI: "mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
```

---

### Sensor Simulator
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-sensor-simulator
  namespace: smart-lighting
type: Opaque
stringData:
  API_KEY: "<your-api-key-here>"
```

---

## Notes
- These secrets are automatically mounted into your pods as environment variables.
- They are referenced in the corresponding **Deployment YAMLs** under:
  ```yaml
  envFrom:
    - secretRef:
        name: secret-decision
  ```
- Do **not** commit real credentials or encoded secrets to GitHub.

---

**Summary**

| Secret Name | Used By | Variables | Description |
|--------------|----------|------------|--------------|
| `secret-decision` | Decision Service | `DECISION_SECRET` | API authentication key |
| `secret-logging` | Logging Service | `MONGO_URI` | MongoDB URI for logs |
| `secret-override` | Override Service | `MONGO_URI` | MongoDB URI for override data |
| `secret-sensor-simulator` | Sensor Simulator | `API_KEY` | Key used for authorization to Node-RED |

---

