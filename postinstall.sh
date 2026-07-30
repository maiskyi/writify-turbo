#!/usr/bin/env sh
if [ -f .env ]; then
  cp .env apps/keystone/.env
  cp .env apps/strapi/.env
fi
