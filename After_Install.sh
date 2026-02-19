#!/bin/bash
echo "Installing dependencies"

cd /var/www/frontend

# Remove old node_modules to ensure a clean install
rm -rf node_modules
npm install