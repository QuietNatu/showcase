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
# pnpm run vrt
# # it seems there is some conflict with lighthouse when running without a filter and turbo has bugs when using concurrency=1
# pnpm run lighthouse-mobile --filter @natu/rotom
# pnpm run lighthouse-mobile --filter @natu/smeargle
# pnpm run lighthouse-desktop --filter @natu/rotom
# pnpm run lighthouse-desktop --filter @natu/smeargle
# pnpm run e2e

echo -e "\n${GREEN}preflight-check success"
