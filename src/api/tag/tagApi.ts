import axios from "../axiosInstance";
import type { Tag } from "./types"

export async function getTags(): Promise<Tag[]> {
    const res = await axios.get<Tag[]>("/tags");
    return res.data;
}

export async function createTags(names: string[]): Promise<Tag[]> {
  const res = await axios.post<Tag[]>("/tags", {
    names,
  });
  return res.data;
}

export async function deleteTag(id: string): Promise<void> {
  await axios.delete(`/tags/${id}`);
}
