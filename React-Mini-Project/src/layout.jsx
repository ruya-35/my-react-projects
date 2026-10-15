import { Outlet, NavLink } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
    return (
        <div className="app-layout">
            <Header />
            
            <nav className="nav-bar">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>Menu</NavLink>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>Cart</NavLink>
                <NavLink to="/checkout" className={({ isActive }) => (isActive ? "active" : "")}>Checkout</NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Sign In</NavLink>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}