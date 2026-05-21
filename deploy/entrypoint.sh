#!/bin/sh

set -eux

pnpm run payload:migrate
pnpm run build

exec "$@"
