#!/bin/bash

set -eux

docker build --file deploy/Dockerfile --tag site:latest .
