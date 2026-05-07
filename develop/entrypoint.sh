#!/bin/bash

set -eux

pnpm config set store-dir /app/.pnpm-store --global
# Remove pre-populated modules (they may be linked to host pnpm store)
mkdir -p /app/node_modules
find /app/node_modules -mindepth 1 -maxdepth 1 -exec rm -rf {} +
pnpm install --include=optional --store-dir /app/.pnpm-store --force

# Docker Desktop/macOS: file watching через bind mount стабильнее в polling
#export CHOKIDAR_USEPOLLING=true
#export CHOKIDAR_INTERVAL=300
#export WATCHPACK_POLLING=true
#
#pnpm run dev

pnpm run payload:migrate && pnpm run payload:seed
pnpm run build && pnpm run start
