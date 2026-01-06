import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Center } from "@mantine/core";
import PostForm from "../components/PostForm";
import type { Post } from "../api/post/types";
import { fakeCreatePost, fakeUpdatePost, fakeFetchPostById } from "../api/post/postApi";
    
export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);

  // ----------------------------------
  // Load post when editing
  // ----------------------------------
  useEffect(() => {
    if (!id) return;

    fakeFetchPostById(Number(id)).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);
  // ----------------------------------
  // Create / Update handler
  // ----------------------------------
  const handleSubmit = async (formData: Partial<Post>) => {
    let savedPost;

    if (id) {
        // edit mode
        savedPost = await fakeUpdatePost(Number(id), formData);
    } else {
        // create mode
        savedPost = await fakeCreatePost(formData);
    }

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
