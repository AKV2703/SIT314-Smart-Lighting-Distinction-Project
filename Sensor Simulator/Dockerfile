FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
CMD ["sh", "-c", "node sensor_simulator.js ${NUM_SENSORS:-3} ${INTERVAL_MS:-2000}"]