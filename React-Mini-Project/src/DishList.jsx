import React, { useState, useEffect } from "react";
import { useCartStore } from "./store/cartStore"; 

function DishList() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const addItem = useCartStore((state) => state.addItem);
    
    useEffect(() => {
        fetch("/Dish.json") 
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to load dishes");
            }
            return res.json();
        })
        .then((data) => {
            setDishes(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching dishes:", err);
            setLoading(false);
        });
    }, []);
    
    if (loading) return <p>Loading menu...</p>;
    
    return (
    <div>
        <h2>Menu</h2>
        {dishes.map((dish) => (
            <div key={dish.id} style={{ marginBottom: "10px" }}>
                <span>{dish.name} - {dish.price} ETB</span>
                <button onClick={() => addItem(dish)}>
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
    );
}

export default DishList;