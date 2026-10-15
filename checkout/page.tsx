"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import "./checkout.css";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
    ) {
    event.preventDefault();

    setOrderPlaced(true);
    clearCart();
    }

    if (orderPlaced) {
    return (
        <section className="checkout-page">
        <div className="checkout-message">
            <h1>Thank You!</h1>

            <p>Your demo order has been completed successfully.</p>

            <p>Thank you for choosing Addis Eats,{" "}{customerName}.</p>

            <Link href="/menu" className="checkout-button">
            Return to Menu
            </Link>
        </div>
        </section>
    );
    }

    if (items.length === 0) {
    return (
        <section className="checkout-page">
        <div className="checkout-message">
            <h1>Your cart is empty</h1>

            <p>Add some dishes before checking out.</p>

            <Link href="/menu" className="checkout-button">
            Explore Our Menu
            </Link>
        </div>
        </section>
    );
    }

    return (
    <section className="checkout-page">
        <div className="checkout-heading">
        <p className="section-label">FINAL STEP</p>
        <h1>Checkout</h1>
        <p>Enter your delivery information below.</p>
        </div>

        <div className="checkout-layout">
        <form
            className="checkout-form"
            onSubmit={handleSubmit}
        >
            <label htmlFor="customerName">
            Full Name
            </label>

            <input
            id="customerName"
            name="customerName"
            type="text"
            value={customerName}
            onChange={(event) =>
                setCustomerName(event.target.value)
            }
            required
            />

            <label htmlFor="phone">
            Phone Number
            </label>

            <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) =>
                setPhone(event.target.value)
            }
            placeholder="Enter your phone number"
            required
            />

            <label htmlFor="address">
            Delivery Address
            </label>

            <textarea
            id="address"
            name="address"
            value={address}
            onChange={(event) =>
                setAddress(event.target.value)
            }
            placeholder="Enter your delivery address"
            rows={4}
            required
            />

            <button
            type="submit"
            className="checkout-button"
            >
            Place Demo Order
            </button>

            <p className="checkout-note">
            Demo only: no real order or payment will be
            submitted.
            </p>
        </form>

        <aside className="checkout-summary">
            <h2>Order Summary</h2>

            {items.map((dish, index) => (
            <div
            className="checkout-summary-item"
            key={`${dish.id}-${index}`}
            >
                <span>{dish.name}</span>
                <span>{dish.price} ETB</span>
            </div>
            ))}

            <div className="checkout-total">
            <strong>Total</strong>
            <strong>{total} ETB</strong>
            </div>
        </aside>
        </div>
    </section>
);}