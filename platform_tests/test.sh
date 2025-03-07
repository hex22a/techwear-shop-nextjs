#!/usr/bin/env bash

CONTAINER_NAME=teckwear-shop-pg-test

docker run -d --rm \
  --name ${CONTAINER_NAME} \
  -e POSTGRES_DB=public \
  -e POSTGRES_USER=pg \
  -e POSTGRES_PASSWORD=pg \
  -p 5432:5432 \
  -v "$(pwd)"/schema.sql:/docker-entrypoint-initdb.d/schema.sql \
  postgres:latest

echo "waiting 5s for db to start..."
sleep 5

# Always stop container, but exit with 1 when tests are failing
if cd .. && jest -c jest.config.platform.ts; then
  docker stop ${CONTAINER_NAME}
else
  docker stop ${CONTAINER_NAME} && exit 1
fi
