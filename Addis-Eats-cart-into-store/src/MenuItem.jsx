import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

const currency = "ETB";

export function MenuItem({ id, name, price, description, category }) {
    const [count, setCount] = useState(0);

    const addItem = useCartStore((state) => state.addItem);

    function handleAdd() {
        setCount(count + 1);
        addItem({ id, name, price, description, category });
    }

    const categoryClass = category ? category.toLowerCase() : "";
    return (
        <div className={`menu-card ${categoryClass}`}>
            <Link to={`/menu/${id}`}>
                <h3>{name}</h3>
            </Link>
            <p>{description}</p>
            <p>{category}</p>
            <p>{price} {currency}</p>
            <p>Price with tax: {(price * 1.15).toFixed(2)} {currency}</p>
            <p>Quantity: {count}</p>
            <button onClick={handleAdd} className="add-btn">Add</button>
        </div>
    );
}