#!/bin/bash
echo "Installing dependencies"

cd /var/www/frontend

# Remove the old build folder (adjust 'build' to 'dist' if needed)
rm -rf build
npm -f install
npm run buildDev