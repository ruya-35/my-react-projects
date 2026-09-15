import { useCartStore } from "./cartStore";

export function CartBadge() {
    const count = useCartStore((state) => state.items.length);

    return <span>🛒 {count}</span>;
}