import { useState } from "react";
const currency = "ETB";

export function MenuItem({ name, price, description, category, onAddToCart}) {
    const [count, setCount] = useState(0);
    
    function handleAdd() {
        setCount(count + 1);
        onAddToCart(price); 
    }

    const categoryClass = category.toLowerCase();
    return (
    <div className={`menu-card ${categoryClass}`}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{category}</p>
        <p>{price} {currency}</p>
        <p>Price with tax: {(price * 1.15).toFixed(2)} {currency}</p>
        <p>Quantity: {count}</p>
        <button onClick={handleAdd}>Add</button>
    </div>
    );
}