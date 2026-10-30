// server/src/services/post.service.js

import { PostRepository } from "../repositories/post.repository.js";
import { assertNonEmpty } from "../utils/validation.js";
import { SubstringSearchStrategy } from "./search/substring-search.strategy.js";
import { EventBus } from "../events/event-bus.js";

const searchStrategy = SubstringSearchStrategy; // swap this line to change search behavior system-wide

// Lecture 15 exercise (Denial of Service on GET /api/posts): a client may ask
// for a page size, but never more than MAX_PAGE_SIZE posts in one request.
// Anything that isn't a whole number of at least 1 falls back to the default.
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function toSafePageSize(pageSize) {
  const n = Number(pageSize);
  if (!Number.isInteger(n) || n < 1) return DEFAULT_PAGE_SIZE;
  return Math.min(n, MAX_PAGE_SIZE);
}

export const PostService = {
  async publish({ authorId, title, body, tagNames = [] }) {
    assertNonEmpty(title, "title", "MISSING_TITLE");
    assertNonEmpty(body, "body", "MISSING_BODY");
    const post = await PostRepository.createWithTags({
      authorId, title, body, tagNames,
      status: "PUBLISHED",
      publishedAt: new Date(),
    });
    EventBus.emit("post.published", {
      postId: post.id,
      authorId,
      title: post.title,
      tags: tagNames,
    });
    return post;
  },

  async listPublished({ page = 1, pageSize }) {
    const { posts, hasMore } = await PostRepository.findPublished({ page, pageSize: toSafePageSize(pageSize) });
    return { posts, page, hasMore };
  },

  async search({ query, page = 1, pageSize }) {
    return searchStrategy.search(query, { page, pageSize: toSafePageSize(pageSize) });
  },
};
