import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Center } from "@mantine/core";
import PostForm from "../components/PostForm";
import type { Post, PostRequest } from "../api/post/types";
import { createPost, updatePost, getPostById } from "../api/post/postApi";
import type { Category } from "../api/category/types";
import { getCategories } from "../api/category/categoryApi";
import type { Tag } from "../api/tag/types";
import { getTags } from "../api/tag/tagApi";

export default function EditPostPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(!!id);

    useEffect(() => {
        if (!id) return;

        getPostById(Number(id)).then((data) => {
            setPost(data);
            setLoading(false);
        });

        getCategories().then(setCategories);

        getTags().then(setTags);
    }, [id]);

    const handleSubmit = async (formData: PostRequest) => {
        let savedPost;

        if (id) {
            savedPost = await updatePost(Number(id), formData);
        } else {
            savedPost = await createPost(formData);
        }

        navigate(`/posts/${savedPost.id}`);
    };

    if (loading) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    return (
        <Container size="md">
            <PostForm 
                initialPost={post} 
                categories={categories} 
                tags={tags}
                onSubmit={handleSubmit} 
            />
        </Container>
    );
}
