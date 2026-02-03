FROM oven/bun:latest AS build

WORKDIR /build

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS prod

WORKDIR /app

COPY --from=build /build/out/app.js .

CMD ["bun", "run", "app.js"]