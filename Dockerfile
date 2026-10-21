FROM node:24.22.0-alpine AS build
WORKDIR /app

ARG VITE_IMAGE_API_KEY
ARG VITE_IMAGE_API_URL

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9 --activate && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 3000
