#!/bin/bash

# TODO: healthcheck
docker run --name site_next --network shared -d --restart=always site:latest
