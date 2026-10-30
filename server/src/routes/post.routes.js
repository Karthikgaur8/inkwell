// server/src/routes/post.routes.js
//
// Wires PostService's publish() and listPublished() to
// the API contract's POST /api/posts and GET /api/posts (Lecture 4).
// Same thin-route discipline as auth.routes.js: no business rules here.

import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/posts", requireAuth, async (req, res) => {
  try {
    // Never trust client-supplied identity fields — derive
    // authorId from the authenticated request, not the request body.
    const post = await PostService.publish({
      ...req.body,
      authorId: req.user.id, // set by requireAuth middleware from the verified JWT
    });
    res.status(201).json(post);
  } catch (err) {
    // Kept from before: validation errors stay 400. Handing them to next(err)
    // like the handout does would turn a missing title into a 500.
    res.status(400).json({
      error: { code: err.code || "VALIDATION_ERROR", message: err.message },
    });
  }
});

router.get("/posts", async (req, res, next) => {
  try {
    const { page = 1, search, pageSize } = req.query;
    const result = search
      ? await PostService.search({ query: search, page: Number(page), pageSize })
      : await PostService.listPublished({ page: Number(page), pageSize });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
