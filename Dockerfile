# --- Stage 1: Base (Node 24 LTS) ---
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /src

# --- Stage 2: Development ---
FROM base AS development
# Install git for VS Code and curl for healthchecks
RUN apt-get update && apt-get install -y git curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Set up non-root permissions for the VM environment
RUN mkdir -p /src/node_modules /pnpm && \
    chown -R node:node /src /pnpm
USER node

# High-performance pnpm cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store

EXPOSE 3000
CMD ["sleep", "infinity"]

# --- Stage 3: Build ---
FROM base AS build
COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile && pnpm run build

# --- Stage 4: Debug (Node 24 + Shell) ---
FROM gcr.io/distroless/nodejs24-debian12:debug AS debug
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /src/.output ./
USER nonroot
EXPOSE 3000
CMD ["server/index.mjs"]

# --- Stage 5: Production (Node 24 Distroless) ---
FROM gcr.io/distroless/nodejs24-debian12 AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /src/.output ./
USER nonroot
EXPOSE 3000
CMD ["server/index.mjs"]ł