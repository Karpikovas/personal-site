#!/bin/bash

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd "$dir"

set -eux

docker compose -p personal-site down
