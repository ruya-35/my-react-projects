import Link from "next/link";

export default function DishNotFound() {
    return (
    <section className="dish-not-found">
        <h1>Dish Not Found</h1>

        <p>Sorry, we couldn't find that dish on our menu.</p>

        <Link href="/menu" className="back-to-menu">
            Return to Menu
        </Link>
    </section>
    );
}