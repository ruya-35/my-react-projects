import { MenuItem } from "./MenuItem";

export function DishList({ dishes, onAddToCart }) {
    if (dishes.length === 0) {
        return <p className="empty-msg">No dishes found in this selection.</p>;
    }

    return (
        <div className="menu-grid">
            {dishes.map((dish) => (
                <MenuItem key={dish.id} {...dish} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}