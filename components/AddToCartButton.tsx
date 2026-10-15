"use client";

import { useState } from "react";
import type { Dish } from "@/types/dish";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
    dish: Dish;
};

export default function AddToCartButton({
    dish,
}: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [message, setMessage] = useState("");

    function handleAddToCart() {
        addToCart(dish);
        setMessage(`${dish.name} added to cart!`);
    }

    return (
    <div className="add-to-cart-container">
        <button
        type="button"
        className="add-to-cart-button"
        onClick={handleAddToCart}
        >
            Add to Cart
        </button>

        {message && (
            <p role="status" className="cart-success-message">
            {message}
        </p>
        )}
    </div>
    );
}