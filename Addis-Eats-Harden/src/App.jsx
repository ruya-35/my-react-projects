import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./useAuth";
import { ThemeProvider } from "./useTheme";

import { Layout } from "./layout";
import { Menu } from "./Menu";
import { DishDetail } from "./DishDetail";
import { RequireAuth } from "./RequireAuth";
import { ErrorBoundary } from "./components/ErrorBoundary";

const CheckoutForm = lazy(() => import("./checkout/Checkout").then((m) => ({ default: m.Checkout })));
const CartPage = lazy(() => import("./CartPage"));

function Home() {
    return (
    <div className="home-page">
        <h2>Welcome to Addis Café</h2>
        <p>Explore our menu and place your order online.</p>
    </div>
    );
}

function LoadingSkeleton() {
    return <div className="loading-skeleton">Loading screen...</div>;
}

export default function App() {
    return (
    <AuthProvider>
        <ThemeProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                path="menu"
                element={
                    <ErrorBoundary>
                    <Menu />
                    </ErrorBoundary>
                }
                />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route
                path="cart"
                element={
                    <ErrorBoundary>
                    <Suspense fallback={<LoadingSkeleton />}>
                    <CartPage />
                    </Suspense>
                    </ErrorBoundary>
                }
                />

                <Route
                path="checkout"
                element={
                <RequireAuth>
                <Suspense fallback={<LoadingSkeleton />}>
                <CheckoutForm />
                </Suspense>
                </RequireAuth>
                }
                />
                </Route>
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </AuthProvider>
    );
}