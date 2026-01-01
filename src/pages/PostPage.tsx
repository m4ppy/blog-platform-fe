import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Title,
    Text,
    Group,
    Stack,
    Badge,
    Divider,
    Loader,
    Center,
    Button,
} from "@mantine/core";
//import { getPostById } from "../api/posts/postApi";  // TODO
import { fakeFetchPostById } from "../api/post/fakePostApi"; // FOR TESTING
import type { Post } from "../api/post/types";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fakeFetchPostById(Number(id))
            .then(setPost)
            .catch(() => setError("Failed to load post"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Center mt="xl">
                <Loader />
            </Center>
        );
    }

    if (error || !post) {
        return (
            <Center mt="xl">
                <Text c="red">{error ?? "Post not found"}</Text>
            </Center>
        );
    }

    return (
        <Container size="md" py="xl">
            <Stack gap="md">
                {/* Title */}
                <Title order={1}>{post.title}</Title>

                {/* Meta info */}
                <Group gap="sm">
                    <Text size="sm" c="dimmed">
                        By {post.author.name}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </Text>

                    {post.category && (
                        <Badge variant="light">{post.category}</Badge>
                    )}
                </Group>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <Group gap="xs">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                                #{tag}
                            </Badge>
                        ))}
                    </Group>
                )}

                <Divider />

                {/* Content */}
                <Text size="md" lh={1.7}>
                    {post.content}
                </Text>

                <Button
                    variant="outline"
                    mt="md"
                    onClick={() => navigate(`/posts/${post.id}/edit`)}
                >Edit Post</Button>
                <Button variant="light" mt="md" onClick={() => window.history.back()}>
                    Back
                </Button>
            </Stack>
        </Container>
    );
}
