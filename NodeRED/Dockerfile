# Base Node-RED image
FROM nodered/node-red:3.1

# Work inside /data for user files
WORKDIR /data

# Install dashboard
RUN npm install --no-update-notifier --no-fund --only=production node-red-dashboard

# Copy Node-RED flows, UI, and settings
COPY flows.json /data/flows.json
COPY settings.js /data/settings.js
COPY package.json /data/package.json

# Expose Node-RED port
EXPOSE 1880

# Switch back to Node-RED app directory before start
WORKDIR /usr/src/node-red

# Default command (uses built-in entrypoint)
CMD ["npm", "start", "--", "--userDir", "/data"]