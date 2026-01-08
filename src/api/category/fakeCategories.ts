import type { Category } from "./types";

export const fakeCategories: Category[] = [
    { id: crypto.randomUUID(), name: "General", postCount: 10 },
    { id: crypto.randomUUID(), name: "Tech", postCount: 7 },
    { id: crypto.randomUUID(), name: "Lifestyle", postCount: 5 },
];