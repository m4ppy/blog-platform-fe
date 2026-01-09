import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Select,
  Box,
  CloseButton,
} from "@mantine/core";
import type { Post, PostStatus } from "../api/post/types";
import type { Category } from "../api/category/types";
import type { Tag } from "../api/tag/types";

interface PostFormData {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: PostStatus;
}

interface PostFormProps {
  initialPost?: Post | null;
  categories: Category[];
  tags?: Tag[];
  onSubmit: (data: PostFormData) => void;
}

export default function PostForm({ initialPost, categories, tags: allTags = [], onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");

  const [status, setStatus] = useState<PostStatus>(
    initialPost?.status ?? "draft"
  );

  const [categoryId, setCategoryId] = useState(initialPost?.category?.id ?? "");

  const [tags, setTags] = useState<string[]>(initialPost?.tags?.map(tag => tag.name) ?? []);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (tags.includes(value)) return;

    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (tagName: string) => {
    setTags(tags.filter((t) => t !== tagName));
  };

  const handleSubmit = () => {
    const tagIds = tags
      .map(
        (name) =>
          allTags.find((t) => t.name === name)?.id
      )
      .filter((id): id is string => Boolean(id));

    onSubmit({
      title,
      content,
      categoryId,
      tagIds,
      status,
    });
  };

  return (
    <Stack gap="md">
      {/* Title */}
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        required
      />

      {/* Content */}
      <Textarea
        label="Content"
        minRows={12}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        required
      />

      {/* Category */}
      <Select
        label="Category"
        placeholder="Select category"
        value={categoryId}
        onChange={(value) => setCategoryId(value ?? "")}
        data={categories.map((c) => ({
            value: c.id,
            label: c.name,
        }))}
        required
      />

      {/* Tags */}
      <Box>
        <TextInput
          label="Tags"
          placeholder="Type a tag and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />

        <Group mt="xs" gap="xs">
          {tags.map((tag) => (
            <Box
              key={tag}
              px="sm"
              py={4}
              bg="gray.2"
              style={{
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {tag}
              <CloseButton size="sm" onClick={() => removeTag(tag)} />
            </Box>
          ))}
        </Group>
      </Box>

      {/* Status */}
      <Select
        label="Status"
        value={status}
        onChange={(value) => setStatus(value as PostStatus)}
        data={[
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
        ]}
      />

      {/* Submit */}
      <Group justify="flex-end">
        <Button onClick={handleSubmit}>
          {initialPost ? "Save" : "Create"}
        </Button>
      </Group>
    </Stack>
  );
}
