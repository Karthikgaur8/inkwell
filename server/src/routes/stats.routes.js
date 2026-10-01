// server/src/routes/stats.routes.js
//
// GET /api/stats (Lecture 9 exercise). Goes through StatsService like the
// other routes go through their services, instead of reading the
// listener's variable directly.

import { Router } from "express";
import { StatsService } from "../services/stats.service.js";

const router = Router();

router.get("/stats", (req, res) => {
  res.status(200).json(StatsService.getStats());
});

export default router;
