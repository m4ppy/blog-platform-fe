import { useEffect, useState } from "react";
import { fetchTags } from "../api/tag/tagApi";
import type { Tag } from "../api/tag/types";
import { Stack, Title, Group, Badge, Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function TagPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchTags().then(setTags);
  }, []);

  return (
    <Stack>
      <Title order={2}>Tags</Title>

      <Group>
        {tags.map((tag) => (
          <Badge key={tag.id} size="lg" variant="light">
            {tag.name} ({tag.postCount})
          </Badge>
        ))}
      </Group>

      <Button component={Link} to="/tags/new">
        Create
      </Button>
    </Stack>
  );
}
