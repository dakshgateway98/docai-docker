# # Stage 1: Build Stage
# FROM node:18 AS build

# WORKDIR /app

# # Copy only package.json and package-lock.json first (for caching layers)
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the frontend app (since Dockerfile is already in 'FE_doc_ai/')
# COPY . .  

# # Build the project
# RUN npm run build

# # Debug: Ensure 'dist' exists
# RUN ls -la /app/dist || echo "dist folder not found!"

# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# # Copy the built frontend from the previous build stage
# COPY --from=build /app/dist .  

# # Expose port 80 for serving the frontend
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


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
