import type { PostSummary } from "./types";

export function fakeFetchPosts(): Promise<PostSummary[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Understanding Spring Security",
          excerpt: "A beginner-friendly guide to Spring Security concepts...",
          author: "Leon",
          createdAt: "2025-01-01",
        },
        {
          id: 2,
          title: "React + Spring Boot Architecture",
          excerpt: "How to structure a real-world full stack project...",
          author: "m4ppy",
          createdAt: "2025-01-03",
        },
      ]);
    }, 500);
  });
}
