#!/bin/bash
echo "Installing dependencies"

cd /var/www/frontend

# Skip deleting node_modules to speed up subsequent deployments
# npm install will only update changed dependencies
npm install --prefer-offline --no-audit --no-fund