# syntax=docker/dockerfile:1
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

# ---- Stage deps: install hanya production deps ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ---- Stage build: install devDeps & build Next.js ----
FROM base AS build
# Salin node_modules hasil stage deps
COPY --from=deps /app/node_modules ./node_modules
# Salin seluruh source code
COPY . .
# Install devDependencies untuk build
RUN pnpm install --frozen-lockfile
# Build aplikasi
RUN pnpm run build

# ---- Stage runner: hanya runtime sekaligus standalone output ----
FROM node:18-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable

# Buat user non-root
RUN addgroup -S -g 1001 nodejs \
 && adduser -S -u 1001 nextjs

# Salin standalone bundle & static assets
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
