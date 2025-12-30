import { useEffect, useState } from "react";
import { Container, Title, Stack, Card, Text, Anchor } from "@mantine/core";
import { fakeFetchPosts } from "../api/posts/postApi";
import type { PostSummary } from "../api/posts/types";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fakeFetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <Container size="md">
      <Title order={2} mb="md">
        Latest Posts
      </Title>

      <Stack>
        {posts.map((post) => (
          <Card key={post.id} withBorder>
            <Anchor
                component={Link}
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                {post.title}
            </Anchor>

            <Text size="sm" c="dimmed" mt="xs">
              {post.excerpt}
            </Text>

            <Text size="xs" c="dimmed" mt="sm">
              By {post.author} · {post.createdAt}
            </Text>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default HomePage;