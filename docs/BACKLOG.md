# Inkwell Product Backlog

Definition of Done: see README.md

| ID | User Story | Priority | Points | Status | Notes |
|----|------------|----------|--------|--------|-------|
| US-01 | As a visitor, I want to register an account, so that I can publish and interact with content | High | 3 | Requirements Defined | See requirements/use-cases.md |
| US-02 | As a registered user, I want to log in and stay logged in securely, so that I don't have to re-authenticate constantly | High | 5 | Requirements Defined | See requirements/use-cases.md |
| US-03 | As an author, I want to write and publish a post, so that readers can see my writing | High | 5 | Requirements Defined | Scope negotiated: plain text only, see Section 1.4 |
| US-04 | As a reader, I want to browse a public feed of posts, so that I can discover new writing | High | 3 | Requirements Defined | See requirements/use-cases.md |
| US-05 | As a reader, I want to comment on a post, so that I can engage with the author | Medium | 3 | Backlog | |
| US-06 | As a reader, I want to follow an author, so that I see their new posts more prominently | Medium | 3 | Backlog | |
| US-07 | As an author, I want to see basic analytics on my posts, so that I understand my audience | Low | 5 | Backlog | |
| US-08 | As a registered user, I want to reset my password through an email link, so that I can get back into my account when I forget it | Medium | 5 | Backlog | |
| US-09 | As an author, I want to edit a post after it is published, so that I can fix typos and update it without deleting the whole thing | Medium | 3 | Backlog | |
| US-10 | As an author, I want to tag my post with one or more topics, so that readers can discover it by subject | Medium | 3 | In Progress | Lecture 9 handout's US-08. API only so far (tagNames on POST /api/posts), no UI yet |
| US-11 | As a reader, I want to search posts by keyword or tag, so that I can find content relevant to me | Medium | 3 | In Progress | Lecture 9 handout's US-09. GET /api/posts?search= checks title and body, not tags yet |

Estimate notes for the new stories:

- US-08 (5): the app doesn't send email yet and reset links need tokens that expire, so this is closer in size to the login story than the register one.
- US-09 (3): once US-03 is done most of the pieces already exist, editing is mainly an update route plus loading the old post back into the editor.

Lecture 9 added two more stories. The handout numbers them US-08 and US-09, but those IDs were already taken by the two stories above, so they got the next free IDs instead.

- US-10 (3): needs a Tag table and a join table, plus tagNames on publish. Not much code, but it changes the schema so it needs a migration.
- US-11 (3): reuses the feed query with an extra filter. Matching on tag names still needs a join through PostTag, which isn't done yet.
