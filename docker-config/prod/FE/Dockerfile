# Base image for building
FROM node:18 AS build

WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

RUN npm install

# Copy rest of the frontend code
COPY . .

# Build the frontend app
RUN npm run build

# Debug: Check if 'dist' exists
RUN ls -la /app/dist || echo "dist folder not found!"

# Base image for serving
FROM node:18 AS serve

WORKDIR /app

# Copy the built frontend
COPY --from=build /app/dist .

# Install serve
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Start the frontend
CMD ["serve", "-s", ".", "-l", "5173"]
