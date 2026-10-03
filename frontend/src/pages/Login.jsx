import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
    "https://flux-0b5p.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            setMessage("Unable to connect to server.");
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-glow"></div>

            <div className="auth-card">

                <div className="brand">FLUX</div>

                <div className="auth-heading">
                    <h1>Welcome back</h1>
                    <p>Sign in to continue to your dashboard.</p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {message && (
                        <div className="auth-message">
                            {message}
                        </div>
                    )}

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="auth-footer">
                    <span>Don't have an account?</span>

                    <a href="/register">
                        Create account
                    </a>
                </div>

            </div>

        </div>
    );
}

export default Login;