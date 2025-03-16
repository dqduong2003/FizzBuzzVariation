# Use Node.js as the base image
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's code
COPY . .

# Build the React app for production
RUN npm run build

# Use an Nginx image to serve the app
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's default html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8080 to access the app from outside the container
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]