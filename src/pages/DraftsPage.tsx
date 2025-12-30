import { useEffect, useState } from "react";
import { fetchMyDrafts } from "../api/post/postApi";
import type { Post } from "../api/post/types";
import { Card, Stack, Title, Text, Button, Group } from "@mantine/core";

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Post[]>([]);

  useEffect(() => {
    fetchMyDrafts().then(setDrafts);
  }, []);

  return (
    <Stack>
      <Title order={2}>My Drafts</Title>

      {drafts.length === 0 && (
        <Text c="dimmed">No drafts yet.</Text>
      )}

      {drafts.map((draft) => (
        <Card key={draft.id} withBorder>
          <Group justify="space-between">
            <Text fw={600}>{draft.title}</Text>
            <Button size="xs" variant="light">
              Edit
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
