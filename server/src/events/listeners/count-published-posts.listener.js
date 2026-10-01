// server/src/events/listeners/count-published-posts.listener.js
//
// Second post.published listener (Lecture 9 exercise). Added next to the
// logging listener without changing PostService.publish(). It just bumps
// the in-memory counter that GET /api/stats reads.

import { EventBus } from "../event-bus.js";
import { StatsService } from "../../services/stats.service.js";

EventBus.on("post.published", () => {
  StatsService.recordPostPublished();
});
