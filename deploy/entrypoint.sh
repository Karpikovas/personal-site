#!/bin/sh
set -eux

node /app/deploy/validate-env.mjs
export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm config set store-dir /app/.pnpm-store --global

mkdir -p /app/node_modules
find /app/node_modules -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
pnpm install --include=optional --store-dir /app/.pnpm-store --force

pnpm run payload:migrate

echo "=== Building Next.js (production) ==="

if [ -d "/app/.next/cache" ]; then
  rm -rf /app/.next/cache
fi

if ! pnpm exec next build; then
  echo "❌ NEXT BUILD FAILED"
  exit 1
fi

echo "✅ Build completed. Starting server..."

exec "$@"
