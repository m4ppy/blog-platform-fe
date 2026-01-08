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
import { fakeRegisterApi } from "../api/auth/authApi";

function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            await fakeRegisterApi({
                email: email.trim(),
                username: username.trim(),
                password: password.trim(),
            });

            navigate("/login");
        } catch (e) {
            setError((e as Error).message);
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
                        label="Username"
                        placeholder="your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
