#!/bin/sh

set -eux

pnpm run payload:migrate

if [ ! -f .next/BUILD_ID ]; then
  find /app/.next -mindepth 1 -delete 2>/dev/null || true
  pnpm exec next build
else
  echo 'Skip build: .next/BUILD_ID exists'
fi

exec "$@"
