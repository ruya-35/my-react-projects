import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "@/lib/dishes";
import "./detail.css";

type DishPageProps = {params: Promise<{id: string;}>;};
export default async function DishPage({params,}: DishPageProps) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);
  if (!dish) {
    notFound();
  }
  return (
    <section className="dish-detail-page">
      <Link href="/menu" className="back-to-menu">← Back to Menu</Link>
      <article className="dish-detail-card">
        <div className="dish-detail-image">
          <span>🍽</span>
        </div>
        <div className="dish-detail-info">
          <p className="dish-category">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="dish-detail-description">
            {dish.description}
          </p>
          <p className="dish-detail-price">
            {dish.price} ETB
          </p>
          <Link href="/menu" className="back-to-menu">Explore More Dishes </Link>
        </div>
      </article>
    </section>
  );
}