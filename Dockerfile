#đã bỏ không sử dụngs
# syntax=docker/dockerfile:1

# Base image
FROM node:20

# Get the latest version of Playwrights
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test"]
