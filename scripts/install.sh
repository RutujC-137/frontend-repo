#!/bin/bash
cd /var/www/frontend
pm2 restart frontend || pm2 serve build 3000 --name frontend --spa
pm2 save
