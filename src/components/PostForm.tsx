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

interface PostFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: PostStatus;
}

interface PostFormProps {
  initialPost?: Post | null;
  onSubmit: (data: PostFormData) => void;
}

export default function PostForm({ initialPost, onSubmit }: PostFormProps) {
  // ----------------------------
  // Basic fields
  // ----------------------------
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [category, setCategory] = useState(initialPost?.category ?? "");

  // ----------------------------
  // Status (draft / published)
  // ----------------------------
  const [status, setStatus] = useState<PostStatus>(
    initialPost?.status ?? "draft"
  );

  // ----------------------------
  // Tag logic (local only)
  // ----------------------------
  const [tags, setTags] = useState<string[]>(initialPost?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (tags.includes(value)) return;

    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // ----------------------------
  // Submit
  // ----------------------------
  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      category,
      tags,
      status,
    });
  };

  // ----------------------------
  // Render
  // ----------------------------
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
      <TextInput
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        placeholder="Category name"
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
