# vue-nuxt-example-app

A full-stack Nuxt 4 application demonstrating file-based routing, server API routes, session-based authentication, and Pinia state management — backed by PostgreSQL via Drizzle ORM.

## Prerequisites

- Node.js 20+
- pnpm
- Docker (for the local PostgreSQL database)

## Quick start

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Start the database
docker compose up -d

# 3. Install dependencies
pnpm install

# 4. Push the schema to the database
pnpm schema:push

# 5. Start the dev server
pnpm dev
```

The app is available at `http://localhost:3000`.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NUXT_SESSION_PASSWORD` | Secret for session cookie encryption (min 32 chars) |
| `POSTGRES_USER` | Database user (matches `docker-compose.yml`) |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |

See `.env.example` for a complete template.

## Architecture

```
/app              # Nuxt client (srcDir in Nuxt 4)
  pages/          # File-based routing
  stores/         # Pinia stores (user, tasks)
  middleware/     # auth.ts — guards routes requiring login
  plugins/        # auth.ts — rehydrates user store from session on startup

/server
  api/
    auth/         # login, register, logout, me
    tasks/        # CRUD endpoints (all session-gated, user-scoped)
  utils/
    auth.ts       # scrypt password hashing/verification
    session.ts    # Thin wrapper around H3 useSession()
    db/           # Drizzle schema and database client

/shared
  types/          # UserPublic, Task — shared between client and server
```

### Authentication

Session-based auth using H3's `useSession()` (encrypted cookie).

- `app/plugins/auth.ts` calls `/api/auth/me` on startup to rehydrate the user store.
- Protected pages use `definePageMeta({ middleware: 'auth' })`.
- Server routes call `getUserSession()` and return 401 if no session is present.
- Task endpoints are scoped to the logged-in user — users can only see and modify their own tasks.

## Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm preview          # Preview production build locally
pnpm typecheck        # TypeScript type checking (vue-tsc)
pnpm cleanup          # Clean Nuxt build artifacts

pnpm schema:generate  # Generate Drizzle migration files
pnpm schema:push      # Push schema directly to the database
```
