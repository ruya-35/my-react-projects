import React, { useState, useRef } from "react";
import { useCartStore } from "./cartStore";
import { DishModal } from "./DishModal";

export const MenuItem = React.memo(function MenuItem({ id, name, price, description, category, forceError }) {
    if (forceError) {
        throw new Error(`Forced render error in ${name}!`);
    }

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const addItem = useCartStore((state) => state.addItem);

    return (
    <div className={`menu-card ${category ? category.toLowerCase() : ""}`}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{price} ETB</p>
        <div className="menu-card-actions">
            <button ref={buttonRef} onClick={() => setIsOpen(true)} className="view-btn">View Details</button>
            <button onClick={() => addItem({ id, name, price, description, category })} className="add-btn">Add</button>
        </div>
        
        {isOpen && (
            <DishModal
            dish={{ id, name, price, description, category }}
            onClose={() => setIsOpen(false)}
            triggerRef={buttonRef}
        />
        )}
    </div>
    );
});