#!/usr/bin/env sh
if [ -f .env ]; then
  cp .env apps/keystone/.env
fi
