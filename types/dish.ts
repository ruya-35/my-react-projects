export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Breakfast" | "Main Course" | "Vegetarian" | "Drinks";
  image: string;
};
// we must discribe what type of data b/c it is typeScribt