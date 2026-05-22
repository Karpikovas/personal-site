#!/bin/sh
set -eux

node /app/deploy/validate-env.mjs
export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm run payload:migrate

# Сборка, только если .next пуст
if [ ! -d "/app/.next" ] || [ -z "$(ls -A /app/.next)" ]; then
    echo "=== Building Next.js ==="
    pnpm run build
fi

exec "$@"
