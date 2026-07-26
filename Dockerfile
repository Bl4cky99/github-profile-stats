FROM oven/bun:latest AS build

WORKDIR /build

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /build/out/app.js .
COPY fonts ./fonts

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD bun -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["bun", "run", "app.js"]
