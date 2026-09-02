import { useState, useEffect, useRef } from "react";
import { CategoryBar } from "./CatagoryBar";
import { DishList } from "./DishList";
import { OrderForm } from "./OrderForm";
import { loadDishes } from "./Api";

const categories = ["All", "Main", "Drink", "Dessert"];

export function Menu() {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        loadDishes(category, search, controller.signal)
            .then((data) => {
                setDishes(data);
            })
            .catch((err) => {
                if (err.name === "AbortError" || err.message?.includes("aborted")) {
                    return;
                }
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [category, search]);

    function handleAddToCart(price) {
        setTotal((prevTotal) => prevTotal + price);
    }

    return (
        <div className="menu-container">
            <div className="search-container">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            <CategoryBar
                categories={categories}
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            <h2>Total Order: {total} ETB</h2>

            {loading && <p className="loading-msg">Loading the menu...</p>}
            {error && <p className="error-msg">Error: {error}</p>}
            {!loading && !error && (
                <DishList dishes={dishes} onAddToCart={handleAddToCart} />
            )}

            <hr />
            <OrderForm total={total} />
        </div>
    );
}