import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("Loading...");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            try {
                const response = await fetch(
                    "https://flux-0b5p.onrender.com/api/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                setUser(data.user);
                setMessage(data.message);

            } catch (error) {
                console.error(error);
                setMessage("Unable to connect to server.");
            }
        };

        fetchDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-page">

            <nav className="navbar">
                <div className="logo">FLUX</div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>

            <main className="dashboard-content">

                <div className="welcome-section">
                    <p className="small-label">
                        AUTHENTICATED USER
                    </p>

                    <h1>
                        Welcome to <span>FLUX</span>
                    </h1>

                    <p>
                        Your secure authentication dashboard.
                    </p>
                </div>

                <div className="user-card">

                    <div className="avatar">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="user-info">
                        <p className="card-label">
                            ACCOUNT
                        </p>

                        <h2>
                            {user?.name || "User"}
                        </h2>

                        <p>
                            {user?.email}
                        </p>
                    </div>

                </div>

                <div className="status-card">
                    <div className="status-dot"></div>

                    <div>
                        <strong>Authentication Active</strong>
                        <p>{message}</p>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default Dashboard;