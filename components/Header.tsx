"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import "./header.css";

export default function Header() {
  const { items } = useCart();
  const itemCount = items ? items.length : 0;

  return (
    <header className="Header-Stayle">
      <Link href="/" className="logo">
        Addis Eats
      </Link>

      <nav className="nave-stayle">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart ({itemCount})</Link>
      </nav>
    </header>
  );
}