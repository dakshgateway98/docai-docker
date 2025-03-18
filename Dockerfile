# # Base image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json first (for better caching)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # # Copy the rest of the backend code
# COPY . .

# EXPOSE 8080

# # Copy the backend_start.sh script and give it execute permissions
# COPY backend_start.sh /app/backend_start.sh
# RUN chmod +x /app/backend_start.sh

# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for auto-restart
RUN npm install -g nodemon

# Copy the rest of the backend code
COPY . .

EXPOSE 8080

# Start backend using nodemon for hot reloading
CMD ["npm", "run", "local-start"]
