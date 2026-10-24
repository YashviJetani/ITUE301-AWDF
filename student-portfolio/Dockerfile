# ==========================================
# Practical 11: Frontend React + Vite Dockerfile
# Multi-Stage Build: Build with Node.js and serve via Vite Preview
# ==========================================

# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies including devDependencies needed to build
RUN npm install

# Copy application source code
COPY . .

# Build production bundle (generates dist/)
RUN npm run build

# Stage 2: Runtime stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built assets and configuration from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.js ./vite.config.js

# Expose Vite preview port
EXPOSE 5173

# Run Vite preview server accessible from all host interfaces
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
