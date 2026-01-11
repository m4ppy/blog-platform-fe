import { useEffect, useState } from "react";
import {
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    Select,
    MultiSelect,
} from "@mantine/core";
import type { Post, PostStatus } from "../api/post/types";
import type { Category } from "../api/category/types";
import type { Tag } from "../api/tag/types";

interface PostFormData {
    title: string;
    content: string;
    categoryId: string;
    tagIds: string[];
    status: PostStatus;
}

interface PostFormProps {
    initialPost?: Post | null;
    categories: Category[];
    tags?: Tag[];
    onSubmit: (data: PostFormData) => void;
}

export default function PostForm({
    initialPost,
    categories,
    tags: allTags = [],
    onSubmit,
}: PostFormProps) {
    const [title, setTitle] = useState(initialPost?.title ?? "");
    const [content, setContent] = useState(initialPost?.content ?? "");
    const [status, setStatus] = useState<PostStatus>(initialPost?.status ?? "DRAFT");
    const [categoryId, setCategoryId] = useState(initialPost?.category?.id ?? "");
    const [tagIds, setTagIds] = useState<string[]>([]);

    useEffect(() => {
        if (!initialPost) return;

        setTitle(initialPost.title);
        setContent(initialPost.content);
        setStatus(initialPost.status);
        setCategoryId(initialPost.category.id);

        if (!initialPost.tags) return;
        setTagIds(initialPost.tags.map(tag => tag.id));
    }, [initialPost]);


    const handleSubmit = () => {
        onSubmit({
            title,
            content,
            categoryId,
            tagIds,
            status,
        });
    };

    return (
        <Stack gap="md">
            {/* Title */}
            <TextInput
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
            />

            {/* Content */}
            <Textarea
                label="Content"
                minRows={12}
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                required
            />

            {/* Category */}
            <Select
                label="Category"
                placeholder={categories.length ? "Select a category" : "Loading..."}
                searchable
                data={categories.map(c => ({
                    value: c.id.toString(),
                    label: c.name,
                }))}
                value={categoryId}
                onChange={(val) => setCategoryId(val ?? "")}
            />

            {/* Tags */}
            <MultiSelect
                label="Tags"
                placeholder="Select tags"
                searchable
                data={allTags.map(tag => ({
                    value: tag.id,   // UUID string
                    label: tag.name,
                }))}
                value={tagIds}
                onChange={setTagIds}
            />



            {/* Status */}
            <Select
                label="Status"
                value={status}
                onChange={(value) => setStatus(value as PostStatus)}
                data={[
                    { value: "DRAFT", label: "Draft" },
                    { value: "PUBLISHED", label: "Published" },
                ]}
            />

            {/* Submit */}
            <Group justify="flex-end">
                <Button onClick={handleSubmit}>
                    {initialPost ? "Save" : "Create"}
                </Button>
            </Group>
        </Stack>
    );
}
