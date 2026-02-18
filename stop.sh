#!/bin/bash

echo "Stopping application"

pm2 stop all || true
