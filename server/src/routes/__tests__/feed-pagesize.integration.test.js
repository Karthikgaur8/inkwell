// server/src/routes/__tests__/feed-pagesize.integration.test.js
//
// Lecture 15 exercise: the Denial of Service row for GET /api/posts.
// A client can ask for a page size, but never more than 50 posts at a
// time, so one request can't make the server load and send the whole
// posts table. Real routes, services and test database, no mocks.

import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";
import { createTestUser, resetDatabase } from "../../test-utils/fixtures.js";

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

async function seedPublishedPosts(count) {
  const author = await createTestUser();
  await prisma.post.createMany({
    data: Array.from({ length: count }, (_, i) => ({
      authorId: author.id,
      title: `Seeded post ${i + 1}`,
      body: "Seeded for the pageSize test.",
      status: "PUBLISHED",
      publishedAt: new Date(Date.now() - i * 1000),
    })),
  });
}

test("an oversized pageSize is clamped to 50 posts, for the feed and for search", async () => {
  await seedPublishedPosts(60);

  const feedRes = await request(app).get("/api/posts?page=1&pageSize=100000");
  expect(feedRes.status).toBe(200);
  expect(feedRes.body.posts).toHaveLength(50);
  expect(feedRes.body.hasMore).toBe(true);

  const searchRes = await request(app).get("/api/posts?search=seeded&pageSize=100000");
  expect(searchRes.status).toBe(200);
  expect(searchRes.body.posts).toHaveLength(50);
  expect(searchRes.body.hasMore).toBe(true);
});

test("a normal pageSize is still used as asked", async () => {
  await seedPublishedPosts(12);

  const res = await request(app).get("/api/posts?page=1&pageSize=5");
  expect(res.status).toBe(200);
  expect(res.body.posts).toHaveLength(5);
  expect(res.body.hasMore).toBe(true);
});
