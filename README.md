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

## Running locally

Terminal 1 — API server on port 4000:

```
cd server
npm install
npm run dev
```

Terminal 2 — React client on port 5173:

```
cd client
npm install
npm run dev
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
