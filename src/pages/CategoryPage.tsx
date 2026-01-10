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
import { getCategories, createCategory, deleteCategory } from "../api/category/categoryApi";
import type { Category } from "../api/category/types";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [opened, setOpened] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;

        const created = await createCategory(newCategoryName);

        setCategories((prev) => [...prev, created]);
        setNewCategoryName("");
        setOpened(false);
    };


    const handleDeleteCategory = async (id: string) => {
        await deleteCategory(id);

        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <Container fluid>
            <Container size="lg" py="md">
            <Card withBorder m="md">
                {/* Header */}
                <Group justify="space-between" mb="md">
                    <Title order={2}>Categories</Title>
                    <Button onClick={() => setOpened(true)}>Create</Button>
                </Group>

                {/* Category List */}
                <Table withTableBorder highlightOnHover w="100%">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w="60%">Category</Table.Th>
                            <Table.Th w="20%">Posts</Table.Th>
                            <Table.Th ta="right" w="20%">Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {categories.map((category) => (
                            <Table.Tr key={category.id}>
                                <Table.Td>
                                    <Text fw={500}>{category.name}</Text>
                                </Table.Td>
                                <Table.Td>{category.postCount}</Table.Td>
                                <Table.Td ta="right">
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                {/* Create Category Modal */}
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Create Category"
                    centered
                >
                    <Stack>
                        <TextInput
                            label="Category name"
                            placeholder="e.g. React"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />

                        <Group justify="flex-end">
                            <Button variant="default" onClick={() => setOpened(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateCategory}>
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
