export function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
    return (
    <div className="category-bar">
        {categories.map((cat) => (
            <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onSelectCategory(cat)}
            >
            {cat}
        </button>
    ))}
    </div>
    );
}