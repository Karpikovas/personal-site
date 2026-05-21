#!/bin/bash

set -eux

node /app/deploy/validate-env.mjs
export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm config set store-dir /app/.pnpm-store --global
# Remove pre-populated modules (they may be linked to host pnpm store)
mkdir -p /app/node_modules
find /app/node_modules -mindepth 1 -maxdepth 1 -exec rm -rf {} +
pnpm install --include=optional --store-dir /app/.pnpm-store --force

# Docker Desktop/macOS: file watching через bind mount стабильнее в polling
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=300
export WATCHPACK_POLLING=true

pnpm dev
