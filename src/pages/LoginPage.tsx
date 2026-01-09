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
import { useAuth } from "../auth/AuthContext";
import { login as loginApi } from "../api/auth/authApi";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            // Call backend login API
            const response = await loginApi({
                email,
                password,
            });

            // Store token in AuthContext
            login(response.token);

            // Redirect
            navigate("/");
        } catch (err: any) {
            setError(
                err.response?.data?.message ?? "Login failed"
        );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="xs" py="xl">
            <Card withBorder shadow="sm">
                <Title order={2} ta="center" mb="md">
                    Login
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

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        fullWidth
                        onClick={handleLogin}
                        loading={loading}
                    >
                        Login
                    </Button>
                </Stack>
            </Card>
        </Container>
    );
}

export default LoginPage;
