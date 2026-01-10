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
        
        setLoading(true);
        
        if (id) {
            console.log("EditPostPage mounted, id =", id);

            getPostById(Number(id))
                .then((data) => {
                    console.log("post response", data);
                    setPost(data);
                })
                .catch((e) => console.error("post error", e));
        }

        getCategories()
        .then((data) => {
            console.log("categories response", data);
            setCategories(data);
            })
            .catch((e) => console.error("categories error", e));

        getTags()
            .then((data) => {
                console.log("tags response", data);
                setTags(data);
            })
            .catch((e) => console.error("tags error", e));

        setLoading(false);
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

    const isEdit = Boolean(id);

    if (loading) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    if (isEdit && !post) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    if (categories.length === 0 || tags.length === 0) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    return (
        <Container size="md">
            <PostForm 
                initialPost={post ?? undefined} 
                categories={categories} 
                tags={tags}
                onSubmit={handleSubmit} 
            />
        </Container>
    );
}
