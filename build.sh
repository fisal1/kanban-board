#!/bin/bash

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install

# Install Vite globally
echo "Installing Vite globally..."
npm install -g vite @vitejs/plugin-react

# Build the client
echo "Building client..."
npm run build

# Install server dependencies
echo "Installing server dependencies..."
cd ../server
npm install

echo "Build process completed!"