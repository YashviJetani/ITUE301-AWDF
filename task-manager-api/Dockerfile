# ==========================================
# Practical 11: Backend Express REST API Dockerfile
# ==========================================
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests first for efficient layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose backend REST API port
EXPOSE 5000

# Start Express server
CMD ["node", "server.js"]
