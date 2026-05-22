#!/bin/sh
set -eux

node /app/deploy/validate-env.mjs
export NEXT_DEPLOYMENT_ID="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"

pnpm run payload:migrate

if [ ! -d "/app/.next" ] || [ -z "$(ls -A /app/.next)" ]; then
    echo "=== Building Next.js ==="
    # Очищаем содержимое .next, но не удаляем саму папку (чтобы не трогать точку монтирования volume)
    if [ -d "/app/.next" ]; then
        find /app/.next -mindepth 1 -delete
    fi
    # Запускаем next build напрямую, минуя prebuild (который вызывает rm -rf .next)
    pnpm exec next build
fi

exec "$@"
