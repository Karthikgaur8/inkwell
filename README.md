# Inkwell

A Medium-like blog publishing platform, built incrementally over CS 415/515
(Software Design and Development).

## Status

**Lecture 1 — repository scaffold.** No database, no authentication, no routing,
no data fetching yet. Today's increment only proves that the two halves of the
system run and that the repository is under version control.

## Structure

```
inkwell/
├── .gitignore
├── README.md
├── docs/
│   └── BACKLOG.md   # product backlog
├── client/          # React SPA (presentation tier)
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       └── App.jsx
└── server/          # Express API (logic tier)
    ├── package.json
    └── src/
        └── index.js
```

The data tier (PostgreSQL via Prisma) arrives in a later increment.

## Getting Started

### Prerequisites
- Node.js >= 22 (see server/package.json's engines field)
- Docker (for local PostgreSQL)

### Database
```
docker run --name inkwell-postgres \
  -e POSTGRES_USER=inkwell \
  -e POSTGRES_PASSWORD=inkwell \
  -e POSTGRES_DB=inkwell_dev \
  -p 5432:5432 \
  -d postgres:16
```
Already created this container once? Use `docker start inkwell-postgres` instead.

### Server
```
cd server
npm install
cp .env.example .env   # DATABASE_URL="postgresql://inkwell:inkwell@localhost:5432/inkwell_dev"
npx prisma migrate deploy
npx prisma generate    # Prisma 7 doesn't generate the client on install or migrate
npm run dev
# → Inkwell API listening on port 4000
```

### Client
```
cd client
npm install
npm run dev
# → Local: http://localhost:5173
```

### Running the tests
The integration tests run against a separate inkwell_test database (never the dev one), created once:
```
docker exec inkwell-postgres psql -U inkwell -d inkwell_dev -c "CREATE DATABASE inkwell_test;"
cd server && DATABASE_URL="postgresql://inkwell:inkwell@localhost:5432/inkwell_test" npx prisma migrate deploy
cd server && cp .env.test.example .env.test   # npm test reads DATABASE_URL from this file
```
Playwright is installed at the repo root, so run these once from the root folder:
```
npm install
npx playwright install             # downloads the test browsers
```
```
cd server && npm test              # Jest: unit + integration
cd client && npx vitest run        # Vitest: component tests
npx playwright test                # Playwright: E2E (needs both dev servers running)
```

## API

| Method | Endpoint       | Response                                     |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/api/health`  | `{ "status": "ok", "service": "inkwell-api" }` |
| GET    | `/api/version` | `{ "version": "0.1.0" }`                      |

Verify with:

```
curl -i http://localhost:4000/api/health
curl -i http://localhost:4000/api/version
```

## Definition of Done

A backlog item is Done when:

- [ ] Code is committed with a descriptive message
- [ ] It runs locally per the relevant lecture's Code Walkthrough
- [ ] It does not break previously-passing verification steps
- [ ] New setup steps are documented here

## Process

Inkwell follows an incremental process: one lecture, one increment.
See docs/BACKLOG.md for the current product backlog.
