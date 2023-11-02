#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

# if ! docker info > /dev/null 2>&1; then
#   echo -e "\n${RED}this script uses docker, and it isn't running - please start docker and try again!"
#   exit 1
# fi

set -e

export CI=1

# change to pnpm ci once it is implemented
pnpm i --frozen-lockfile
pnpm run lint
pnpm run test
pnpm run build

echo -e "\n${GREEN}preflight-check success"
