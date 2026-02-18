#!/bin/bash

echo "Stopping application"

pm2 stop frontend || true
pm2 delete frontend || true