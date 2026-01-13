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
    Card,
} from "@mantine/core";
import { getPostById, deletePost } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../auth/AuthContext";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadPost = async () => {
        try {
            const post = await getPostById(id);
            setPost(post);
        } catch {
            setError("Failed to load post");
            notifications.show({
                message: "Failed to load post",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    loadPost();

    }, [id]);

    const handleDeletePost = async () => {
        if (!id) return;

        if (!isAuthenticated) {
            notifications.show({
                message: "Please log in to delete this post",
                color: "yellow",
            });
            return;
        }

        try {
            await deletePost(id);
            notifications.show({
                message: "Post deleted successfully",
                color: "green",
            });
            navigate("/");
        } catch (error: any) {
            notifications.show({
                message: error.message,
                color: "red",
            });
        }
        
    }

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
            <Card withBorder m="md">
            <Stack gap="xs">
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
                        <Badge variant="light">{post.category.name}</Badge>
                    )}
                </Group>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <Group gap="xs">
                        {post.tags.map((tag) => (
                            <Badge key={tag.id} variant="outline">
                                #{tag.name}
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
                    disabled={!isAuthenticated}
                    onClick={() => navigate(`/posts/${post.id}/edit`)}
                >Edit Post</Button>
                <Button 
                    variant="outline"
                    mt="md"
                    disabled={!isAuthenticated}
                    onClick={handleDeletePost}
                >Delete Post</Button>
                <Button variant="light" mt="md" onClick={() => {
                    if (post.status === "PUBLISHED") {
                        navigate("/");
                    } else {
                        navigate("/drafts");
                    }
                }}>
                    Back
                </Button>
            </Stack>
            </Card>
        </Container>
    );
}
