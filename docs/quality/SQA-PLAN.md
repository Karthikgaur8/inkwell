# Inkwell SQA Plan — v1

## Standards
- All code changes follow the PR checklist (docs/reviews, .github/PULL_REQUEST_TEMPLATE.md)
- Architecture conformance per ADR-001 (docs/architecture/adr-001-modular-monolith.md)
- API contract conventions per docs/design/api-contract.md

## Reviews
- Every merged change is self-reviewed (author) then peer-reviewed before merge
- Review findings logged in docs/reviews/

## Testing (expanded in Lecture 12-14)
- Unit tests: Services and Repositories (Jest) — starting Lecture 12
- Integration tests: Routes (Supertest) — starting Lecture 13
- End-to-end tests: critical user flows (Playwright) — starting Lecture 14

## Defect Tracking
- All discovered defects (via review, testing, or manual use) recorded in docs/quality/DEFECT-LOG.md
- Each entry records: cause category, discovery stage, and remediation

## Metrics Tracked
- Defects per lecture/increment
- Defect cause category distribution
- Review turnaround (informal, tracked qualitatively at this project's scale)

## Metrics Snapshot (2026-10-07)
- Commits: 22 on main, counting the commit that adds this section (`git rev-list --count HEAD`)
- Logged defects: 15 in DEFECT-LOG.md, 2 fixed and 13 open
- Backlog items at "Requirements Defined" or later: 6 of 11 (US-01 to US-04 are "Requirements Defined", US-10 and US-11 are "In Progress"). US-01 to US-04 are really further along than that, see D-013.

## Ownership
- For this course project: the student/team implementing Inkwell owns SQA plan adherence.
