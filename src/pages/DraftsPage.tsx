import { useEffect, useState } from "react";
import { fetchMyDrafts } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import {
    Card,
    Stack,
    Title,
    Text,
    Group,
    Button,
    Container,
} from "@mantine/core";
import { useAuth } from "../auth/AuthContext";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<Post[]>([]);
    const { isAuthenticated, token } = useAuth();

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        fetchMyDrafts(token).then(setDrafts);
    }, [isAuthenticated, token]);

    return (
        <Container size="lg" py="md">
            <Stack>
                <Title order={2}>My Drafts</Title>

                {drafts.length === 0 && (
                    <Text c="dimmed">No drafts yet.</Text>
                )}

                {drafts.map((draft) => (
                    <Card
                        key={draft.id}
                        withBorder
                        component="a"
                        href={`/posts/${draft.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <Group justify="space-between">
                            <Text fw={600}>{draft.title}</Text>

                            <Button
                                size="xs"
                                onClick={(e) => {
                                    e.preventDefault(); // prevent link click
                                }}
                            >
                                Publish
                            </Button>
                        </Group>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}
