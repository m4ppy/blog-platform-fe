import { fakeTags } from "./fakeTags"
import type { Tag } from "./types"

export function fetchTags(): Promise<Tag[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeTags);
        }, 300);
    });
}