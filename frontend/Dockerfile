# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./src

# Install dependencies
RUN npm install -g parcel-bundler && npm install

# Copy the rest of the application
COPY . .

# Expose the port Parcel uses
EXPOSE 1234

# Start the development server
CMD ["npm", "start"]
