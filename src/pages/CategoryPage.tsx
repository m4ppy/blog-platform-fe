import { useEffect, useState } from "react";
import { fetchCategories } from "../api/category/categoryApi";
import type { Category } from "../api/category/types";
import { Card, Stack, Title, Text } from "@mantine/core";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <Stack>
            <Title order={2}>Categories</Title>

            {categories.map((category) => (
                <Card key={category.id} withBorder>
                    <Text fw={600}>{category.name}</Text>
                    <Text size="sm" c="dimmed">
                        {category.postCount} posts
                    </Text>
                </Card>
            ))}
        </Stack>
    );
}
