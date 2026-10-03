import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
    setMessage("Please fill in all fields.");
    return;
}

if (password.length < 8) {
    setMessage("Password must be at least 8 characters.");
    return;
}

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
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

            // Registration successful
            navigate("/");

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

                <div className="brand">
                    FLUX
                </div>

                <div className="auth-heading">
                    <h1>Create your account</h1>
                    <p>Join FLUX and get started.</p>
                </div>

                <form onSubmit={handleRegister}>

                    <div className="input-group">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                            <div className="input-group">
    <label>Password</label>

    <div className="password-wrapper">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
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
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="auth-footer">
                    <span>Already have an account?</span>

                    <a href="/">
                        Sign in
                    </a>
                </div>

            </div>

        </div>
    );
}

export default Register;