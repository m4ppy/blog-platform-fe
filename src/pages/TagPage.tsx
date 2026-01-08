import { useEffect, useState } from "react";
import {
    Title,
    Button,
    Group,
    Table,
    Text,
    Modal,
    TextInput,
    Container,
    Stack,
    ActionIcon,
    Card,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { fetchTags } from "../api/tag/tagApi";
import type { Tag } from "../api/tag/types";

export default function TagPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [opened, setOpened] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    useEffect(() => {
        fetchTags().then(setTags);
    }, []);

    // fake create (frontend only)
    const handleCreateTag = () => {
        if (!newTagName.trim()) return;

        const newTag: Tag = {
            id: crypto.randomUUID(),
            name: newTagName,
            postCount: 0,
        };

        setTags((prev) => [...prev, newTag]);
        setNewTagName("");
        setOpened(false);
    };

    // fake delete (frontend only)
    const handleDeleteTag = (id: string) => {
        setTags((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <Container fluid>
            <Container size="lg" py="md">
            <Card withBorder m="md">
                {/* Header */}
                <Group justify="space-between" mb="md">
                    <Title order={2}>Tags</Title>
                    <Button onClick={() => setOpened(true)}>Create</Button>
                </Group>

                {/* Tag List */}
                <Table withTableBorder highlightOnHover w="100%">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w="60%">Tag</Table.Th>
                            <Table.Th w="20%">Posts</Table.Th>
                            <Table.Th ta="right" w="20%">Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {tags.map((tag) => (
                            <Table.Tr key={tag.id}>
                                <Table.Td>
                                    <Text fw={500}>{tag.name}</Text>
                                </Table.Td>
                                <Table.Td>{tag.postCount}</Table.Td>
                                <Table.Td ta="right">
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => handleDeleteTag(tag.id)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                {/* Create Tag Modal */}
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Create Tag"
                    centered
                >
                    <Stack>
                        <TextInput
                            label="Tag name"
                            placeholder="e.g. React"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                        />

                        <Group justify="flex-end">
                            <Button variant="default" onClick={() => setOpened(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateTag}>
                                Create
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </Card>
            </Container>
        </Container>
    );
}
