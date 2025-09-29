# Use Node 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose ports 5500 and 5501
EXPOSE 5500 5501

# Start the application with dynamic port
CMD ["sh", "-c", "npm start -- --port ${PORT:-5500}"]
