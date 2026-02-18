#!/bin/bash

echo "Starting application"

cd /var/www/frontend

pm2 start npm --name "frontend" -- start --port 3000
pm2 save
