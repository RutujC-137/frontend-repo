#!/bin/bash
echo "Installing dependencies"

cd /var/www/frontend

# Remove the old build folder
rm -rf build node_modules
npm install
npm run build:dev