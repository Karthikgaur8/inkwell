// server/src/services/stats.service.js
//
// Lecture 9 exercise: a count of posts published since the server
// started. It only lives in memory, so it goes back to 0 whenever the
// server restarts (node --watch restarts it on every file save too).
// The count-published-posts listener updates it, PostService doesn't
// know it exists.

let postsPublished = 0;

export const StatsService = {
  recordPostPublished() {
    postsPublished += 1;
  },

  getStats() {
    return { postsPublished };
  },
};
