# Use the official Node.js 14 image as the base
FROM node:14.21.3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use an Nginx image to serve the built React app
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx public directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
