#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Frontend Deployment Script (runs on EC2 after CodeDeploy)
#
# CodeBuild already ran:  npm run build:dev (or qa / preprod / prod)
# The build/ folder is already baked with the correct API URL.
# This script just serves it with PM2 on port 3000.
# ─────────────────────────────────────────────────────────────

set -e

cd /var/www/frontend

echo "Serving pre-built frontend with PM2 on port 3000..."
pm2 restart frontend || pm2 serve build 3000 --name frontend --spa

echo "Saving PM2 process list..."
pm2 save

echo "Frontend deployment complete."
