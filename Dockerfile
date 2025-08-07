# syntax=docker/dockerfile:1
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

FROM base AS build
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
COPY . . 
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 nextjs
COPY --from=build /app/.next/standalone ./ 
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
