import { useContext, useState } from "react";
import { login } from "../api/auth/authApi";
import { AuthContext } from "../auth/AuthContext";
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
import { setAuthStorage } from "../auth/authStorage";
import { fakeLoginApi } from "../api/auth/authApi";

function LoginPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error("AuthContext is not available");
    }

    const { setAuth } = authContext;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const response = await login({ email, password });

        localStorage.setItem("accessToken", response.accessToken);

        setAuthStorage(response.accessToken, response.user);
        setAuth({ 
            accessToken: response.accessToken,
            user: response.user,
        });

        navigate("/");
    };

    // Fake login for testing without backend
    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await fakeLoginApi({
                email: email.trim(),
                password: password.trim(),
            });

            setAuthStorage(response.accessToken, response.user);
            setAuth({ 
                accessToken: response.accessToken,
                user: response.user,
            });

            navigate("/", { replace: true });
        } catch (e) {
            console.error("Login failed", e);
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
                        onClick={handleSubmit}
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
