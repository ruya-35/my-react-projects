import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Layout } from "./Layout";
import { Menu } from "./Menu";
import { DishDetail } from "./DishDetail";
import { RequireAuth } from "./RequireAuth";
import { OrderForm } from "./OrderForm";

function Home() {
    return (
        <div className="home-page">
            <h2>Welcome to Addis Café</h2>
            <p>Explore our menu and place your order online.</p>
        </div>
    );
}

function CartPage({ cart }) {
    if (!cart || cart.length === 0) {
        return (
            <div className="cart-page">
                <h2>Your Shopping Cart</h2>
                <p>No items added yet.</p>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {cart.map((item, index) => (
                    <li key={index}>
                        <strong>{item.name}</strong> - {item.price} ETB
                    </li>
                ))}
            </ul>
            <h3>Total: {total} ETB</h3>
        </div>
    );
}

function Checkout() {
    return (
        <div className="checkout-page">
            <h2>Order Checkout</h2>
            <p>Complete your payment here.</p>
            <OrderForm />
        </div>
    );
}

function Login({ onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/menu";

    const handleSignIn = () => {
        onLogin();
        navigate(from, { replace: true });
    };

    return (
        <div className="login-page">
            <h2>Sign In</h2>
            <p>Please authenticate to access checkout.</p>
            <button onClick={handleSignIn} className="login-btn">Login as Guest</button>
        </div>
    );
}

function NotFound() {
    return (
        <div className="not-found-page">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState([]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleAddToCart = (dish) => {
        setCart((prevCart) => [...prevCart, dish]);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="menu" element={<Menu onAddToCart={handleAddToCart} />} />
                    <Route path="menu/:id" element={<DishDetail />} />
                    <Route path="cart" element={<CartPage cart={cart} />} />
                    <Route
                        path="checkout"
                        element={
                            <RequireAuth isAuthenticated={isAuthenticated}>
                                <Checkout />
                            </RequireAuth>
                        }
                    />
                    <Route path="login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}