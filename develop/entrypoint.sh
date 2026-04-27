#!/bin/bash

set -eux

pnpm install

# Docker Desktop/macOS: file watching через bind mount стабильнее в polling
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=300
export WATCHPACK_POLLING=true

pnpm dev
