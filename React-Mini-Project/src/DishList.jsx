import { useCartStore } from "./store/cartStore";
import { Link } from "react-router-dom";

export function DishList({ dishes }) {
    const addItem = useCartStore((state) => state.addItem);

    if (!dishes || dishes.length === 0) {
        return <p className="loading-msg">No dishes found.</p>;
    }

    return (
        <div className="menu-grid">
            {dishes.map((dish) => {
                const categoryClass = dish.category ? `menu-card ${dish.category.toLowerCase()}` : "menu-card";
                
                return (
                    <div key={dish.id} className={categoryClass}>
                        <Link to={`/menu/${dish.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <h3>{dish.name}</h3>
                        </Link>
                        <p>{dish.description}</p>
                        <p><strong>{dish.price} ETB</strong></p>
                        <button className="add-btn" onClick={() => addItem(dish)}>
                            Add to Cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default DishList;