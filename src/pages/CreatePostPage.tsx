import { Container, Title } from "@mantine/core";
import PostForm from "../components/PostForm";

export default function CreatePostPage() {
  const handleSubmit = (data: any, action: any) => {
    console.log("CREATE", action, data);
    // later → call createPost / saveDraft API
  };

  return (
    <Container size="md">
      <Title order={2} mb="md">
        Create Post
      </Title>

      <PostForm mode="create" onSubmit={handleSubmit} />
    </Container>
  );
}
