import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Center } from "@mantine/core";
import PostForm from "../components/PostForm";
import type { Post } from "../api/post/types";
import { fakeSavePost } from "../api/post/postApi";
import { fakeFetchPostById } from "../api/post/fakePostApi";

export default function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const numericPostId = postId ? Number(postId) : null;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(!!numericPostId);

  // ----------------------------------
  // Load post when editing
  // ----------------------------------
  useEffect(() => {
    if (!numericPostId) return;

    fakeFetchPostById(numericPostId).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [numericPostId]);

  // ----------------------------------
  // Create / Update handler
  // ----------------------------------
  const handleSubmit = async (formData: Partial<Post>) => {
    const savedPost = await fakeSavePost(numericPostId, formData);
    navigate(`/posts/${savedPost.id}`);
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="md">
      <PostForm initialPost={post} onSubmit={handleSubmit} />
    </Container>
  );
}
