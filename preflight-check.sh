#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

set -e

export CI=1

# change to pnpm ci once it is implemented
pnpm i --frozen-lockfile
pnpm exec playwright install
pnpm run lint
pnpm run test
pnpm run build
pnpm run vrt
pnpm run lighthouse-mobile
pnpm run lighthouse-desktop
pnpm run e2e

echo -e "\n${GREEN}preflight-check success"
