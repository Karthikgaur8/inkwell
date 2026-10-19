// server/src/services/__tests__/post.search.test.js
//
// Lecture 12 exercise: test cases for PostService.search() from Lecture 9.
// Only PostRepository is a test double. The real SubstringSearchStrategy
// runs, so these tests also show that search() really goes through the
// strategy to the repository. Row numbers match the test-case table in
// the Workshop 12 report.

import { jest } from "@jest/globals";

const mockPostRepository = {
  searchPublished: jest.fn(),
  findPublished: jest.fn(),
};

jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
  PostRepository: mockPostRepository,
}));

const { PostService } = await import("../post.service.js");

const post = { id: "p1", title: "On Modularity", body: "Some thoughts on cohesion.", status: "PUBLISHED" };

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PostService.search", () => {
  test("returns the matching posts for a query that matches (row 1)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [post], hasMore: false });

    const result = await PostService.search({ query: "modularity" });

    expect(result).toEqual({ posts: [post], hasMore: false });
  });

  test("returns an empty list when nothing matches (row 2)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

    const result = await PostService.search({ query: "zzz" });

    expect(result.posts).toEqual([]);
    expect(result.hasMore).toBe(false);
  });

  test("asks for page 1 with 10 per page when no paging is given (row 3, default values)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

    await PostService.search({ query: "modularity" });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({ query: "modularity", page: 1, pageSize: 10 });
  });

  test("passes page and pageSize through and keeps hasMore (row 4)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [post], hasMore: true });

    const result = await PostService.search({ query: "modularity", page: 2, pageSize: 5 });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({ query: "modularity", page: 2, pageSize: 5 });
    expect(result.hasMore).toBe(true);
  });

  test("goes through the search strategy, not the feed query (row 5, white-box path)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

    await PostService.search({ query: "modularity" });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledTimes(1);
    expect(mockPostRepository.findPublished).not.toHaveBeenCalled();
  });

  test("passes a repository failure up to the caller (row 6, white-box branch)", async () => {
    mockPostRepository.searchPublished.mockRejectedValue(new Error("database is down"));

    await expect(PostService.search({ query: "modularity" })).rejects.toThrow("database is down");
  });
});
