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
    Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { getCategories, createCategory, deleteCategory } from "../api/category/categoryApi";
import type { Category } from "../api/category/types";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../auth/AuthContext";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [opened, setOpened] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        
        try {
            const created = await createCategory(newCategoryName);
    
            setCategories((prev) => [...prev, created]);
            setNewCategoryName("");
            setOpened(false);

            notifications.show({
                message: "Category created successfully",
                color: "green",
            });
        } catch (error: any) {
            notifications.show({
                message: error.response?.data?.message ?? "Failed to create tag",
                color: "red",
            });
        }

    };


    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
            notifications.show({
                message: "Category deleted successfully",
                color: "green",
            });
            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (error: any) {
            notifications.show({
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
                    <Title order={2}>Categories</Title>
                    <Tooltip 
                        label="Login to create categories"
                        disabled={isAuthenticated}
                    >
                    <Button onClick={() => setOpened(true)} disabled={!isAuthenticated}>Create</Button>
                    </Tooltip>
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
                                    <Tooltip
                                        label="Login to delete categories"
                                        disabled={isAuthenticated}
                                    >
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        disabled={!isAuthenticated}
                                        title={!isAuthenticated ? "Login to delete categories" : undefined}
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                    </Tooltip>
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
    );
}
