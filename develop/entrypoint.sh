#!/bin/sh

set -eux

node /app/deploy/validate-env.mjs

export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm run payload:migrate

exec "$@"
