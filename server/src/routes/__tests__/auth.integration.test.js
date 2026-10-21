// server/src/routes/__tests__/auth.integration.test.js
//
// Lecture 13 exercise: register and log in working together (US-01 and
// US-02) through real HTTP requests, the real services and the real test
// database. No mocks, same setup as posts.integration.test.js.

import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";
import { resetDatabase } from "../../test-utils/fixtures.js";
import { TokenService } from "../../services/token.service.js";

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("a newly registered user can log in with the same password (US-01 + US-02)", async () => {
  // Arrange: register through the real endpoint
  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({ email: "bob@example.com", displayName: "Bob", password: "correcthorse" });
  expect(registerRes.status).toBe(201);
  const registeredId = registerRes.body.user.id;

  // Act: log in with the same email and password
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "bob@example.com", password: "correcthorse" });

  // Assert: the same user comes back, with a token that really belongs to them
  // and without the password hash (D-002)
  expect(loginRes.status).toBe(200);
  expect(loginRes.body.user.id).toBe(registeredId);
  expect(loginRes.body.user.email).toBe("bob@example.com");
  expect(loginRes.body.user.passwordHash).toBeUndefined();
  expect(TokenService.verifyAccessToken(loginRes.body.accessToken).sub).toBe(registeredId);

  // Assert: login really checks the stored hash, a wrong password is refused
  const wrongRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "bob@example.com", password: "wrongpassword" });
  expect(wrongRes.status).toBe(401);
  expect(wrongRes.body.error.code).toBe("INVALID_CREDENTIALS");
});
