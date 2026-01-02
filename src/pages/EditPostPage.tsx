import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Center } from "@mantine/core";
import PostForm from "../components/PostForm";
import type { Post } from "../api/post/types";
import { fakeFetchPostById, savePost } from "../api/post/fakePostApi";

export default function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(!!postId);

  // ----------------------------------
  // Load post when editing
  // ----------------------------------
  useEffect(() => {
    if (!postId) return;

    fakeFetchPostById(postId).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [postId]);

  // ----------------------------------
  // Submit handler (create or update)
  // ----------------------------------
  const handleSubmit = async (formData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    status: "draft" | "published";
  }) => {
    const savedPost = await savePost({
      id: post?.id,
      ...formData,
    });

    navigate(`/posts/${savedPost.id}`);
  };

  // ----------------------------------
  // Loading state
  // ----------------------------------
  if (loading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  // ----------------------------------
  // Render
  // ----------------------------------
  return (
    <Container size="md">
      <PostForm initialPost={post} onSubmit={handleSubmit} />
    </Container>
  );
}
