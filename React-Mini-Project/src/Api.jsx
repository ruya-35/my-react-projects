export async function loadDishes(category, search, signal) {
    const res = await fetch("/Dish.json", { signal });
    
    if (!res.ok) {
        throw new Error("Could not fetch the dishes.");
    }
    
    const data = await res.json();

    return data.filter((dish) => {
        const matchesCategory = category === "All" || dish.category === category;
        
        const dishName = dish.name ? dish.name.toLowerCase() : "";
        const searchTerm = search ? search.trim().toLowerCase() : "";
        const matchesSearch = dishName.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });
}