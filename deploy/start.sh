#!/bin/bash
set -eu

cd "$(dirname "$0")/.."

ENCRYPTION_KEY=$(grep NEXT_SERVER_ACTIONS_ENCRYPTION_KEY .env | cut -d '=' -f2)

docker run -d \
  --name site_next \
  --restart always \
  --network shared \
  --env-file .env \
  -e NODE_OPTIONS=--max-old-space-size=1536 \
  -e "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$ENCRYPTION_KEY" \
  --log-opt max-size=100m \
  site:latest
