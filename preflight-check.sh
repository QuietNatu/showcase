#!/bin/bash
set -e

export CI=1
export VITE_E2E=true

npm ci
npm run lint
npm run test
npm run build
npm run e2e

GREEN='\033[0;32m'
echo -e "\n${GREEN}preflight-check success"
