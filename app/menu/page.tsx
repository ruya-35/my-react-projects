
"use client";
import { useState } from "react";
import "./menu.css";
import { dishes } from "@/lib/dishes";
import DishCard from "@/components/DishCard";
type Category =| "All" | "Breakfast" | "Main Course"| "Vegetarian"| "Drinks";
const categories: Category[] = ["All","Breakfast","Main Course","Vegetarian","Drinks",];
export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] =useState<Category>("All");
  const filteredDishes =
    selectedCategory === "All"? dishes: dishes.filter(
          (dish) => dish.category === selectedCategory
        );
  return (
    <section className="menu-page">
      <div className="menu-heading">
        <p className="section-label">OUR MENU</p>
        <h1>Discover Ethiopian Food</h1>
        <p>
          Explore traditional Ethiopian dishes prepared
          with delicious flavors and spices.
        </p>
      </div>
      <div className="category-filters">
        {categories.map((category) => (
          <button key={category} type="button" className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
