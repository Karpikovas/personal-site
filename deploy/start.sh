#!/bin/bash

# TODO: healthcheck
docker run --log-opt max-size=100m --name site_next --network shared -d --restart=always site:latest
