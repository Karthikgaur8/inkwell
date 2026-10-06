# Review: PostgreSQL Persistence and Mobile-First Layout (Lecture 8)

**Reviewer prep time:** ~30 minutes

**Defects found:** 8 (1 serious, the other 7 small)

**Outcome:** Accept with follow-ups (not fixed yet)

Self-review of d63f529 and 275bd82 against the PR review checklist (v1). I read the whole diff, then ran the app with the database stopped and again with the API stopped.

Findings:

1. UX, error states (serious): the feed has no error state. With Postgres stopped, GET /api/posts returns 500 and the whole page goes blank, navbar included, because `posts.length` throws on undefined at Feed.jsx:24. With the API stopped it shows "Loading posts…" forever.
2. Design, typed errors: database errors go straight to the client. With the database down, GET /api/posts returns code ECONNREFUSED and login returns 400 BAD_REQUEST, both with Prisma's "Invalid `prisma...()` invocation" text as the message.
3. Architecture: the only file that imports @prisma/client is src/db/client.js, which is outside repositories/. Its comment says that's on purpose and only the repositories import it, so the idea holds, but the checklist line as written fails. The checklist should name this file.
4. UX, keyboard and labels: the new nav links work with Tab and show a focus ring, but they're 20px tall, under the 44px touch size.
5. Design, duplication: NavBar.jsx has the same className function three times (the Log In one is my copy).
6. Process: the commit message doesn't name a backlog item, even though d63f529 is the database work behind US-01 to US-04.
7. Process: docs/BACKLOG.md wasn't updated. US-01 to US-04 still say "Requirements Defined".
8. Not on the checklist: the README's "Running locally" section doesn't mention Postgres, server/.env or the migration. Without .env, npm run dev stops with ".env: not found". The Definition of Done says new setup steps go in the README.

Fine: no route or service changes, clear names, layout checked at 375, 768 and 1280 px in Workshop 8, .env is gitignored and was never committed, and .env.example only has placeholders.
