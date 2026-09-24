import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./Layout";
import { RequireAuth } from "./RequireAuth";
import { OrderForm } from "./OrderForm";
import Login from "./Login";


import { useCartStore } from "./store/cartStore";
import { useUserStore } from "./store/userStore";

const Menu = lazy(() => import("./Menu"));
const DishDetail = lazy(() => import("./DishDetail"));

function Home() {
    return (
        <div className="home-page" style={{ textAlign: "center", padding: "30px" }}>
            <h2>Welcome to Addis Eats</h2>
            <p>Explore our fresh menu and place your order online.</p>
        </div>
    );
}

function CartPage() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const clear = useCartStore((state) => state.clear);

    if (!items || items.length === 0) {
        return (
            <div className="cart-page" style={{ textAlign: "center", padding: "20px" }}>
                <h2>Your Shopping Cart</h2>
                <p>No items added yet.</p>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-page" style={{ maxWidth: "600px", margin: "20px auto" }}>
            <h2>Your Shopping Cart</h2>
            <ul className="cart-list">
                {items.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="cart-item">
                        <span><strong>{item.name}</strong> - {item.price} ETB</span>
                        <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: {total} ETB</h3>
            <button 
                className="add-btn" 
                onClick={clear}
                style={{ backgroundColor: "#dc3545", marginTop: "15px" }}
            >
                Clear Cart
            </button>
        </div>
    );
}

function Checkout() {
    return (
        <div className="checkout-page">
            <h2>Order Checkout</h2>
            <OrderForm />
        </div>
    );
}

function NotFound() {
    return (
        <div className="not-found-page" style={{ textAlign: "center", padding: "30px" }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

export default function App() {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = Boolean(user);

    return (
        <BrowserRouter>
            <Suspense fallback={<div className="loading-msg">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="menu/:id" element={<DishDetail />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route 
                            path="checkout"  
                            element={
                                <RequireAuth isAuthenticated={isAuthenticated}>
                                    <Checkout />
                                </RequireAuth>
                            } 
                        />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}