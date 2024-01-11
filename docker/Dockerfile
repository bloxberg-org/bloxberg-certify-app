# Use the official Node.js 20 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Start the Node.js server with the built Next.js application
CMD ["node", "server.js"]
