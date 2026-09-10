// server/src/routes/version.routes.js
//
// GET /api/version was added in Lecture 1 and has to keep working after
// this refactor, so it moves into the routes layer alongside health
// instead of staying in index.js. Same exception as health: no Service
// to call yet, the response is a constant.

import { Router } from "express";

const router = Router();

router.get("/version", (req, res) => {
  res.status(200).json({ version: "0.1.0" });
});

export default router;
