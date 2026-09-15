import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryBar } from "./CatagoryBar";
import { DishList } from "./DishList";
import { loadDishes } from "./Api";

const CATEGORIES = ["All", "Main", "Drink", "Dessert"];

export function Menu() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "All";

    const [searchQuery, setSearchQuery] = useState("");
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);
        setError(null);
        
        loadDishes(activeCategory, searchQuery, abortController.signal)
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
            
        return () => abortController.abort();
    }, [activeCategory, searchQuery]);
    
    function handleCategoryChange(selectedCategory) {
        if (selectedCategory === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: selectedCategory });
        }
    }

    return (
        <div className="menu-container">
            <div className="search-container">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <CategoryBar
                categories={CATEGORIES}
                selectedCategory={activeCategory}
                onSelectCategory={handleCategoryChange}
            />
            
            {loading && <p className="loading-msg">Fetching menu items...</p>}
            {error && <p className="error-msg">Error: {error}</p>}
            {!loading && !error && (
                <DishList dishes={dishes} />
            )}
        </div>
    );
}