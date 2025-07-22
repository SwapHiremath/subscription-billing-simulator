# Use official Node.js LTS image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (development only)
RUN npm install --development

# Copy the rest of the application code
COPY . .

# Expose the port (default 3000)
EXPOSE 3000

# Set environment variable for development
ENV NODE_ENV=development

# Start the application
CMD ["node", "src/server.js"] 