import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function Authenticated() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <>
            {isAuthenticated == false ? <Login onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
        </>
    );
}

export default Authenticated;