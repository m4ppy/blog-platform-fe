import { fakeCategories } from "./fakeCategories";
import type { Category } from "./types";

export function fetchCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeCategories);
    }, 300);
  });
}
