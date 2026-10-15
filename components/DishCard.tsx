
import Link from "next/link";
import type { Dish } from "@/types/dish";

type DishCardProps = {dish: Dish;};
export default function DishCard({ dish }: DishCardProps) {
  return (
    <article className="dish-card">
      <div className="dish-image-placeholder">
        <span>🍽️</span>
      </div>
      <div className="dish-card-content">
        <p className="dish-category">{dish.category}</p>
        <h2>{dish.name}</h2>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-card-bottom">
          <p className="dish-price">{dish.price} ETB</p>
          <Link href={`/menu/${dish.id}`}className="dish-button"> View Details</Link>
        </div>
      </div>
    </article>
  );
}
