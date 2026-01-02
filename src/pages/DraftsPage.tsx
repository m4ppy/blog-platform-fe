import { useContext, useEffect, useState } from "react";
import { fetchMyDrafts } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import { Card, Stack, Title, Text, Group, Button } from "@mantine/core";
import { AuthContext } from "../auth/AuthContext";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<Post[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext?.auth.user) return;

        fetchMyDrafts(authContext.auth.user.id).then(setDrafts);
    }, [authContext]);

    const handlePublish = (draftId: number) => {
        
    };
        

    return (
        <Stack>
            <Title order={2}>My Drafts</Title>

            {drafts.length === 0 && <Text c="dimmed">No drafts yet.</Text>}

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
                        <Button size="xs" onClick={() => {}}>
                            Publish
                        </Button>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
}
