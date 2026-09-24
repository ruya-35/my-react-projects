import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "./store/userStore"; 

export function Login() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    const login = useUserStore((state) => state.login);
    
    const from = location.state?.from?.pathname || "/checkout";

    function handleSubmit(e) {
        e.preventDefault();
        if (username.trim()) {
            login({ name: username });
            navigate(from, { replace: true });
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your name"
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Login;