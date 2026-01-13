import { useEffect, useState } from "react";
import { fetchMyDrafts, deletePost } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import {
    Card,
    Stack,
    Title,
    Text,
    Group,
    ActionIcon,
    Container,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<Post[]>([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) return;

        fetchMyDrafts().then(setDrafts);
    }, [isAuthenticated]);

        const handleDeletePost = async (postId: string) => {
            try {
                await deletePost(postId);

                setDrafts((prev) => prev.filter((draft) => draft.id !== postId));

                notifications.show({
                    message: "Draft deleted successfully",
                    color: "green",
                });
                
            } catch (error: any) {
                notifications.show({
                    message: error.message,
                    color: "red",
                });
            }
            
        }

    return (
        <Container size="md" py="xl">
            <Card withBorder m="md">
            <Stack gap="md">
                <Title order={2}>My Drafts</Title>

                {drafts.length === 0 && (
                    <Text c="dimmed">No drafts yet.</Text>
                )}

                {drafts.map((draft) => (
                    <Card
                        key={draft.id}
                        withBorder
                        component="a"
                        onClick={() => navigate(`/posts/${draft.id}`)}
                        style={{ textDecoration: "none" }}
                    >
                        <Group justify="space-between">
                            <Text fw={600}>{draft.title}</Text>

                            <ActionIcon
                                color="red"
                                variant="subtle"
                                disabled={!isAuthenticated}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(draft.id);
                                }}
                            >
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Group>
                    </Card>
                ))}
            </Stack>
            </Card>
        </Container>
    );
}
