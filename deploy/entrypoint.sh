#!/bin/sh

set -eux

node /app/deploy/validate-env.mjs

export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm run payload:migrate

find /app/.next -mindepth 1 -delete 2>/dev/null || true
pnpm exec next build

exec "$@"
