import { useEffect, useState } from "react";
import {
    Title,
    Button,
    Group,
    Table,
    Text,
    Modal,
    TagsInput,
    Container,
    Stack,
    ActionIcon,
    Card,
    Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { getTags, createTags, deleteTag } from "../api/tag/tagApi";
import type { Tag } from "../api/tag/types";
import { useAuth } from "../auth/AuthContext";

export default function TagPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [opened, setOpened] = useState(false);
    const [newTagNames, setNewTagNames] = useState<string[]>([]);

    const { isAuthenticated } = useAuth();


    useEffect(() => {
        getTags().then(setTags);
    }, []);

    const handleCreateTags = async () => {
        if (newTagNames.length === 0) return;

        const created = await createTags(newTagNames);

        setTags((prev) => {
            const map = new Map(prev.map(t => [t.id, t]));
            created.forEach(t => map.set(t.id, t));
            return Array.from(map.values());
        });

        setNewTagNames([]);
        setOpened(false);

        notifications.show({
            message: "Tags created successfully",
            color: "green",
        });
    };

    const handleDeleteTag = async (id: string) => { 
        try {
            await deleteTag(id);
            notifications.show({
                message: "Tag deleted successfully",
                color: "green",
            });
            setTags((prev) => prev.filter((t) => t.id !== id)); 
        } catch (error: any) {
            notifications.show({
                title: "Delete Failed",
                message: error.response?.data?.message ?? "Failed to delete tag",
                color: "red",
            });
        }
        
    };

    return (
        <Container size="md" py="xl">
            <Card withBorder m="md">
                {/* Header */}
                <Group justify="space-between" mb="md">
                    <Title order={2}>Tags</Title>
                    <Tooltip 
                        label="Login to create tags"
                        disabled={isAuthenticated}
                    >
                        <Button onClick={() => setOpened(true)} disabled={!isAuthenticated}>Create</Button>
                    </Tooltip>
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
                                    <Tooltip 
                                        label="Login to delete tags"
                                        disabled={isAuthenticated}
                                    >
                                        <ActionIcon
                                            color="red"
                                            variant="subtle"
                                            disabled={!isAuthenticated}
                                            title={isAuthenticated ? "Login to delete tags" : undefined}
                                            onClick={() => handleDeleteTag(tag.id)}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                {/* Create Tag Modal */}
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Create Tags"
                    centered
                >
                    <Stack>
                        <TagsInput
                            label="Tags"
                            placeholder="Type and press Enter"
                            value={newTagNames}
                            onChange={setNewTagNames}
                            clearable
                        />

                        <Group justify="flex-end">
                        <Button variant="default" onClick={() => setOpened(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTags}>
                            Create
                        </Button>
                        </Group>
                    </Stack>
                </Modal>
            </Card>
        </Container>
    );
}
