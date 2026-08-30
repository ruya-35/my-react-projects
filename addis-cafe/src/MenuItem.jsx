const currency = "ETB";

export function MenuItem({ name, price, description, category }) {
    const categoryClass = category.toLowerCase();
    return (
    <div className={`menu-card ${categoryClass}`}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{category}</p>
        <p>{price} {currency}</p>
        <p>Price with tax: {(price * 1.15).toFixed(2)} {currency}</p>
    </div>
    );
}