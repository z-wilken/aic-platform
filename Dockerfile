# PRODUCTION DOCKERFILE - AIC PULSE PLATFORM
# Turborepo monorepo → Next.js standalone → minimal runner
# ----------------------------------------------------------

# ── Stage 1: Prune the monorepo to only what platform needs ──────────────────
FROM node:22-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo@2
COPY . .
RUN turbo prune platform --docker

# ── Stage 2: Install dependencies from pruned workspace ──────────────────────
FROM node:22-alpine AS installer
WORKDIR /app

# Copy pruned package manifests only (maximises layer cache)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# Install (not production-only — devDeps needed for build)
RUN npm ci

# ── Stage 3: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Build-time env vars (Coolify will pass these via --build-arg)
ARG SENTRY_AUTH_TOKEN
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG ENGINE_URL
ARG NEXT_PUBLIC_GA_ID

ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV ENGINE_URL=$ENGINE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Copy ALL installed node_modules (including workspace-nested ones like apps/platform/node_modules)
COPY --from=installer /app/ .
# Overwrite with actual source files (replaces package manifests with full source)
COPY --from=pruner /app/out/full/ .

RUN npm install -g turbo@2
RUN npx turbo build --filter=platform

# ── Stage 4: Minimal production runner ───────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output (includes its own node_modules)
COPY --from=builder /app/apps/platform/public ./apps/platform/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/platform/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/platform/.next/static ./apps/platform/.next/static

USER nextjs
EXPOSE 3001

CMD ["node", "apps/platform/server.js"]
