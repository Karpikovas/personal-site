#!/bin/bash
set -eux

ENCRYPTION_KEY=$(grep NEXT_SERVER_ACTIONS_ENCRYPTION_KEY .env | cut -d '=' -f2)

docker build \
  --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$ENCRYPTION_KEY" \
  --file deploy/Dockerfile \
  --tag site:latest .
