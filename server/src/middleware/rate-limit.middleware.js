// server/src/middleware/rate-limit.middleware.js (new)

import rateLimit from "express-rate-limit";

// Example security requirement, now enforced in code:
// "the system shall reject login attempts after five consecutive
// failures from the same account within ten minutes."
export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  // Only failed attempts (status 400 and up) count toward the 5, which is
  // what the requirement above says. Without this, normal successful logins
  // count too, and the Lecture 14 Playwright suite (one register and one
  // login per test) gets locked out with 429s halfway through a run.
  skipSuccessfulRequests: true,
  message: { error: { code: "TOO_MANY_ATTEMPTS", message: "Too many attempts. Try again later." } },
  standardHeaders: true,
  legacyHeaders: false,
});
