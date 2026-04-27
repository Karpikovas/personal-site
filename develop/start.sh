#!/bin/bash

if [[ $(docker container inspect -f "{{.State.Health.Status}}" personal-site 2>/dev/null || true) == "healthy" ]]; then
  echo "develop already started"
  exit 0
fi

if ! test -f .env; then
  env_created=false
  if test -f .env.default; then
    cp .env.default .env
    env_created=true
  elif test -f .env.example; then
    cp .env.example .env
    env_created=true
  fi
  if [[ "$env_created" == "true" ]]; then
    echo ".env file has been created."
  fi
fi

if ! test -f develop/entrypoint.sh; then
  cp develop/entrypoint.default.sh develop/entrypoint.sh
  echo "entrypoint.sh file has been created."
fi

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd "$dir"

set -eux

docker compose -p personal-site up --build
