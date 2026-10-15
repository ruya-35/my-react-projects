export function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
    return (
    <div className="category-bar">
        {categories.map((item) => (
            <button
            key={item}
            className={selectedCategory === item ? "active" : ""}
            onClick={() => onSelectCategory(item)}
            >
            {item}
        </button>
    ))}
    </div>
    );
}