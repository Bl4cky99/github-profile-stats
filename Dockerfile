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

CMD ["bun", "run", "app.js"]
