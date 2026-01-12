import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Title,
    TextInput,
    PasswordInput,
    Button,
    Stack,
    Alert,
} from "@mantine/core";
import { register as registerApi } from "../api/auth/authApi";
import { useAuth } from "../auth/AuthContext";
import { notifications } from "@mantine/notifications";

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await registerApi({
                email: email.trim(),
                name: name.trim(),
                password: password.trim(),
            });

            // Store token in AuthContext
            login(response.token);

            notifications.show({
                message: "Registration successful. Please log in.",
                color: "green"
            });

            navigate("/");
        } catch (error: any) {
            setError(error.response?.data?.message ?? "Registration failed. Please try again.");

            notifications.show({
                message: error.response?.data?.message ?? "Registration failed. Please try again.",
                color: "red"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="xs" py="xl">
            <Card withBorder shadow="sm">
                <Title order={2} ta="center" mb="md">
                    Register
                </Title>

                <Stack>
                    {error && (
                        <Alert color="red" variant="light">
                            {error}
                        </Alert>
                    )}

                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextInput
                        label="Name"
                        placeholder="your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Register
                    </Button>
                </Stack>
            </Card>
        </Container>
    );
}

export default RegisterPage;
