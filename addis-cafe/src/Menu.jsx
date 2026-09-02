import { useState } from "react";
import { menu } from "./data";
import { MenuItem } from "./MenuItem";
import { CategoryBar } from "./CatagoryBar";
import { OrderForm } from "./OrderForm";

const categories = ["All", "Main", "Drink", "Dessert"];

export function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [total, setTotal] = useState(0);
    
    function handleAddToCart(price) {
        setTotal(total + price);
    }
    const filteredMenu = selectedCategory === "All"
    ? menu
    : menu.filter((d) => d.category === selectedCategory);
    

    return (
    <div>
        <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        />
        
        <h2>Total Order: {total} ETB</h2>
        
        <div className="menu-grid">
            {filteredMenu.map((d) => (
                <MenuItem
                key={d.id}
                name={d.name}
                price={d.price}
                description={d.description}
                category={d.category}
                onAddToCart={handleAddToCart}
                />
            ))}
        </div>
        
        <hr />
        <OrderForm />
    </div>
    );
}

