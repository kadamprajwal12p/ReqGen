# Node.js Backend Dockerfile for Koyeb
FROM node:20-slim

# Install Chromium for PDF generation
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY server ./server
COPY client ./client
COPY shared ./shared
COPY attached_assets ./attached_assets
COPY tsconfig.json ./
COPY drizzle.config.ts ./
COPY vite.config.ts ./

# Build the application
RUN npm run build && npm prune --production

# Expose port
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["node", "dist/index.js"]
