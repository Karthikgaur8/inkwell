## README Verification — Lecture 14

Performed on a fresh clone of this repository (no node_modules, no .env files), following README.md step by step,
with no undocumented prior knowledge assumed:

- [x] `git clone` + steps in "Getting Started" produce a running server
- [x] `git clone` + steps in "Getting Started" produce a running client
- [x] Every environment variable the app actually requires is documented
- [x] Every command shown in the README actually runs without modification (except the Docker ones, see the end)

Result: 5 gaps found.

1. README.md had no "Getting Started" section at all. The only setup text was a "Running locally" section from
   Lecture 1 with npm install and npm run dev, and nothing about PostgreSQL, .env, migrations or the tests. Fixed by
   replacing it with the "Getting Started" section from the Lecture 14 handout.

The new section was then followed on a fresh clone, and that found four more gaps:

2. `cp .env.example .env` copied a placeholder URL (user:password@localhost:5432/dbname), so
   `npx prisma migrate deploy` failed with P1000 (authentication failed). The right URL was only in a comment.
   Fixed by putting the local dev URL in server/.env.example.
3. The server crashed on start with MODULE_NOT_FOUND from @prisma/client, because nothing generated the Prisma
   client. Prisma 7 doesn't do it on npm install or on migrate. Fixed by adding `npx prisma generate` to the server
   steps.
4. `cd server && npm test` stopped with ".env.test: not found". The README never said to create server/.env.test.
   Fixed by adding server/.env.test.example and a step that copies it.
5. `npx playwright test` couldn't run, because nothing had been installed at the repo root and the test browsers
   weren't downloaded. Fixed by adding `npm install` and `npx playwright install` (run once, from the root).

After the fixes the whole section was followed again on a second fresh clone. The server and the client started,
`npm test` passed (17 tests), `npx vitest run` passed (1 test) and `npx playwright test` passed (9 tests: the same 3 tests in Chromium, Firefox and WebKit).

Not checked: the Docker commands (docker run, docker start, docker exec). Docker isn't installed on the machine this
was done on, so a local PostgreSQL 16 with the same user, password, database name and port stood in for the
container. Everything after the database step was run exactly as written.
