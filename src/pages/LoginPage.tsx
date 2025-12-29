import { useContext, useState } from "react";
import { login } from "../api/auth/authApi";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "../auth/authStorage";
import { fakeLoginApi } from "../api/auth/authApi";
import { Button, TextInput, Paper, Title } from "@mantine/core";

function LoginPage(){
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error("AuthContext is not available");
    }
    
    const { setAuth } = authContext;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        const response = await login({ email, password });
        
        localStorage.setItem("accessToken", response.accessToken);
        
        saveAccessToken(response.accessToken);
        setAuth({ accessToken: response.accessToken });

        navigate("/");
    };

    // Fake login for testing without backend
    const handleSubmit = async () => {
    try {
        const response = await fakeLoginApi({
            email: email.trim(),
            password: password.trim(),
        });

        saveAccessToken(response.accessToken);
        setAuth({ accessToken: response.accessToken });

        navigate("/", { replace: true });
    } catch (e) {
        console.error("Login failed", e);
    }
};

    return (
        <Paper w={400} mx="auto" mt="xl" p="md" withBorder>
            <Title order={3} mb="md">Login</Title>

            <form>
                <TextInput
                    type="email" 
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextInput
                    type="password" 
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button fullWidth mt="md" type="button" onClick={handleSubmit}>Login</Button>
            </form>
        </Paper>
    );
}

export default LoginPage;