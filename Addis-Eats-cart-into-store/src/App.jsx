import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./useAuth";
import { ThemeProvider } from "./useTheme";
import { useCartStore } from "./cartStore";

import { Layout } from "./layout";
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

function CartPage() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const clear = useCartStore((state) => state.clear);

    if (!items || items.length === 0) {
        return (
            <div className="cart-page">
                <h2>Your Shopping Cart</h2>
                <p>No items added yet.</p>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <strong>{item.name}</strong> - {item.price} ETB{" "}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: {total} ETB</h3>
            <button onClick={clear}>Clear Cart</button>
        </div>
    );
}

function Checkout() {
    const clearCart = useCartStore((state) => state.clear);

    const handleOrderSuccess = () => {
        clearCart();
    };

    return (
        <div className="checkout-page">
            <h2>Order Checkout</h2>
            <p>Complete your payment here.</p>
            <OrderForm onSuccess={handleOrderSuccess} />
        </div>
    );
}

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/menu";

    const handleSignIn = () => {
        login({ name: "Guest User" });
        navigate(from, { replace: true });
    };

    return (
        <div className="login-page">
            <h2>Sign In</h2>
            <p>Please authenticate to access checkout.</p>
            <button onClick={handleSignIn} className="login-btn">
                Login as Guest
            </button>
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
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="menu" element={<Menu />} />
                            <Route path="menu/:id" element={<DishDetail />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route
                                path="checkout"
                                element={
                                    <RequireAuth>
                                        <Checkout />
                                    </RequireAuth>
                                }
                            />
                            <Route path="login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}