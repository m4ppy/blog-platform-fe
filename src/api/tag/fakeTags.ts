import type { Tag } from "./types";

export const fakeTags: Tag[] = [
  { id: crypto.randomUUID(), name: "TDD", postCount: 3 },
  { id: crypto.randomUUID(), name: "JWT", postCount: 2 },
  { id: crypto.randomUUID(), name: "REST", postCount: 4 },
  { id: crypto.randomUUID(), name: "Security", postCount: 2 },
];

