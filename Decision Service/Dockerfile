FROM node:18-alpine
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "server.js"]