@echo off
echo Building aplikacija...
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo Build zavrsен!