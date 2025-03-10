#!/usr/bin/env bash

CONTAINER_NAME=teckwear-shop-pg-test

# Determine if we're in the root directory or platform_tests
if [ -d "platform_tests" ]; then
  # We're in the root directory
  SCHEMA_PATH="$(pwd)/platform_tests/schema.sql"

  # No need to cd anywhere
else
  # We're in the platform_tests directory
  SCHEMA_PATH="$(pwd)/schema.sql"
  # Need to cd to parent directory to run tests
  cd ..
fi

docker run -d --rm \
  --name ${CONTAINER_NAME} \
  -e POSTGRES_DB=public \
  -e POSTGRES_USER=pg \
  -e POSTGRES_PASSWORD=pg \
  -p 5432:5432 \
  -v "${SCHEMA_PATH}":/docker-entrypoint-initdb.d/schema.sql \
  postgres:latest

echo "waiting 5s for db to start..."
sleep 5

# Always stop container, but exit with 1 when tests are failing
if pnpm test:platform; then
  docker stop ${CONTAINER_NAME}
else
  docker stop ${CONTAINER_NAME} && exit 1
fi
