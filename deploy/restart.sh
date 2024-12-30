#!/bin/bash

set -eux

./deploy/build.sh
./deploy/stop.sh
./deploy/start.sh
