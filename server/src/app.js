// server/src/app.js
//
// Extracted from index.js so tests (and this file) can import the
// Express app without binding a real port — index.js now only
// handles process startup (app.listen), not app construction.

import express from "express";
import healthRoutes from "./routes/health.routes.js";
import versionRoutes from "./routes/version.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import "./events/listeners/log-published-posts.listener.js"; // Lecture 9's listener registers itself as a side effect on import -- carry it over from index.js
import "./events/listeners/count-published-posts.listener.js"; // Lecture 9 exercise, same reason

export const app = express();

app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api", versionRoutes); // kept from Lecture 1 so GET /api/version still works
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", statsRoutes); // Lecture 9 exercise, GET /api/stats

// Same JSON error-response contract as before (Lecture 6), now from the
// Lecture 16 A05 error handler, which hides internal messages in production.
app.use(errorHandler);
