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

Estimate notes for the new stories:

- US-08 (5): the app doesn't send email yet and reset links need tokens that expire, so this is closer in size to the login story than the register one.
- US-09 (3): once US-03 is done most of the pieces already exist, editing is mainly an update route plus loading the old post back into the editor.
