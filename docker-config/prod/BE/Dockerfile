# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# # Copy the rest of the backend code
COPY . .

# Copy the backend_start.sh script and give it execute permissions
COPY backend_start.sh /app/backend_start.sh
RUN chmod +x /app/backend_start.sh

RUN npm run build

# Expose the port
EXPOSE 8080

# Start the backend
CMD ["sh", "-c", "./backend_start.sh"]