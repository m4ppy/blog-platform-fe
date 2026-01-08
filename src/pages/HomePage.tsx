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
    Button,
} from "@mantine/core";
import { fetchPublishedPosts } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import { Link } from "react-router-dom";

function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublishedPosts().then((data) => {
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
                                {post.updatedAt}
                            </Text>

                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">
                                    By {post.author.name}
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
                <Button component={Link} to="/posts/new">
                    Create
                </Button>
            </Stack>
        </Container>
    );
}

export default HomePage;
