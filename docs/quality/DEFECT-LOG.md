# Inkwell Defect Log

| ID | Found During | Cause Category | Description | Remediation |
|----|---------------|-----------------|--------------|-------------|
| D-001 | Lecture 10 review | Compatibility | Nullish-coalescing assignment used without a documented minimum Node version | Added engines field to package.json |
| D-002 | Lecture 7 exercise | Security | Register and login responses included the user's passwordHash | Responses now only send id, email, displayName and createdAt (64622f1) |
| D-003 | Lecture 8 walkthrough | Functional | Publishing from the editor fails because PostEditor never sends an authorId | Open |
| D-004 | Lecture 9 walkthrough | Security | POST /api/posts takes authorId from the request body and ignores the token, so anyone can publish as any user | Open |
| D-005 | Lecture 9 walkthrough | Error handling | GET /api/posts?page=abc returns 500 with Prisma's error text (the old route fell back to page 1) | Open |
| D-006 | Lecture 9 walkthrough | API contract | Search results have no page field, unlike the feed and docs/design/api-contract.md | Open |
| D-007 | Lecture 10 self-review | Error handling | Feed has no error state: blank page when the database is down, stuck on "Loading posts…" when the API is down | Open |
| D-008 | Lecture 10 self-review | Error handling | Database errors reach the client untyped (code ECONNREFUSED, login answers 400 BAD_REQUEST) | Open |
| D-009 | Lecture 10 self-review | Documentation | Checklist says only repositories/ import @prisma/client, but src/db/client.js does on purpose | Open |
| D-010 | Lecture 10 self-review | Accessibility | Nav links are 20px tall, under the 44px touch size | Open |
| D-011 | Lecture 10 self-review | Maintainability | NavBar.jsx repeats the same className function three times | Open |
| D-012 | Lecture 10 self-review | Process | Lecture 8 commit message doesn't name its backlog items (US-01 to US-04) | Open |
| D-013 | Lecture 10 self-review | Process | docs/BACKLOG.md statuses not updated, US-01 to US-04 still "Requirements Defined" | Open |
| D-014 | Lecture 10 self-review | Documentation | README has no setup steps for Postgres, server/.env or the migrations | Open |
| D-015 | Lecture 10 walkthrough | Compatibility | engines ">=22.0.0" still allows Node 22.0 to 22.11, which Prisma 7.10 doesn't support (it needs ^20.19, ^22.12 or >=24) | Open |

D-002 to D-015 were found before this log existed and are copied in from the workshop reports. D-007 to D-014 are the findings in docs/reviews/2026-lecture-08-persistence-layout.md.
