// pages/EditPostPage.tsx
import {
  Button,
  Container,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fakeUpdatePost } from "../api/post/postApi";
import { fakeFetchPostById } from "../api/post/fakePostApi";
import type { Post } from "../api/post/types";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fakeFetchPostById(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!post) return;

    await fakeUpdatePost(post.id, {
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags,
    });

    navigate(`/posts/${post.id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <Container size="sm">
      <Stack>
        <Title order={2}>Edit Post</Title>

        <TextInput
          label="Title"
          value={post.title}
          onChange={(e) =>
            setPost({ ...post, title: e.target.value })
          }
        />

        <TextInput
          label="Category"
          value={post.category}
          onChange={(e) =>
            setPost({ ...post, category: e.target.value })
          }
        />

        <TextInput
          label="Tags (comma separated)"
          value={post.tags?.join(", ") || ""}
          onChange={(e) =>
            setPost({
              ...post,
              tags: e.target.value
                .split(",")
                .map(t => t.trim()),
            })
          }
        />

        <Textarea
          label="Content"
          minRows={10}
          value={post.content}
          onChange={(e) =>
            setPost({ ...post, content: e.target.value })
          }
        />

        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>
    </Container>
  );
}
