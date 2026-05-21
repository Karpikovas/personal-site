#!/bin/bash

set -eu

cd "$(dirname "$0")/.."

docker run -d \
  --name site_next \
  --restart always \
  --network shared \
  --env-file .env \
  -e NODE_OPTIONS=--max-old-space-size=1536 \
  --log-opt max-size=100m \
  site:latest
