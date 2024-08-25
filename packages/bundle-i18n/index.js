#!/usr/bin/env node

// https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bin
// This file is required because bin executables will be registered during pnpm install.
// If not file exists (because it was still not built) the executable will not be registered.

import './dist/index.js';
