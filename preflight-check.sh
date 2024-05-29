#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

set -e

export CI=1

# change to pnpm ci once it is implemented
pnpm i --frozen-lockfile
pnpm run lint
pnpm run test
pnpm run build
pnpm run vrt

echo -e "\n${GREEN}preflight-check success"
