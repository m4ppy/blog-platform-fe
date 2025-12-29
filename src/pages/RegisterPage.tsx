import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div>
            <h1>Register</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Username</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
    );
}

export default RegisterPage;