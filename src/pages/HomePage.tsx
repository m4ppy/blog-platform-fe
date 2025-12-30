import { useEffect, useState } from "react";
import {
    Container,
    Title,
    Stack,
    Card,
    Text,
    Group,
    Center,
    Loader,
} from "@mantine/core";
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
        return (
            <Center mt="xl">
                <Loader />
            </Center>
        );
    }

    return (
        <Container size="md" py="xl">
            <Stack gap="md">
                {posts.map((post) => (
                    <Card
                        key={post.id}
                        withBorder
                        radius="md"
                        component={Link}
                        to={`/posts/${post.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <Stack gap="xs">
                            <Title order={3}>{post.title}</Title>

                            <Text c="dimmed" size="sm">
                                {post.excerpt}
                            </Text>

                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">
                                    By {post.author}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {new Date(
                                        post.createdAt,
                                    ).toLocaleDateString()}
                                </Text>
                            </Group>
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}

export default HomePage;
