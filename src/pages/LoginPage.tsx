import { useContext, useState } from "react";
import { login } from "../api/auth/authApi";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "../auth/authStorage";
import { fakeLoginApi } from "../api/auth/authApi";

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
        <div>
            <h1>Login</h1>

            <form>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="button" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;