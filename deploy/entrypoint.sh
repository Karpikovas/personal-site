#!/bin/sh
set -eux

node /app/deploy/validate-env.mjs

export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm run payload:migrate

# Если папка .next пуста или отсутствует – выполняем сборку
if [ ! -d "/app/.next" ] || [ -z "$(ls -A /app/.next)" ]; then
  echo "=== Building Next.js (first run or cache cleared) ==="
  pnpm exec next build
else
  echo "=== Using existing .next build ==="
fi

exec "$@"
