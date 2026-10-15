"use client";

import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    type ReactNode,
} from "react";

import type { Dish } from "@/types/dish";

type CartAction =
    | { type: "ADD"; dish: Dish }
    | { type: "REMOVE"; dishId: string }
    | { type: "CLEAR" }
    | { type: "LOAD"; items: Dish[] };

type CartContextType = {
    items: Dish[];
    total: number;
    count: number;
    addToCart: (dish: Dish) => void;
    removeFromCart: (dishId: string) => void;
    clearCart: () => void;
};

type CartState = {
    items: Dish[];
};

function cartReducer(
    state: CartState,
    action: CartAction
): CartState {
    switch (action.type) {
    case "ADD":
        return {
        ...state,
        items: [...state.items, action.dish],
        };

    case "REMOVE":
        return {
        ...state,
        items: state.items.filter(
            (dish) => dish.id !== action.dishId
        ),
        };

    case "CLEAR":
        return {
        ...state,
        items: [],
        };

    case "LOAD":
        return {
        ...state,
        items: action.items,
        };

    default:
        return state;
    }
}

const CartContext =
    createContext<CartContextType | null>(null);

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    });

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
    try {
        const savedCart =
        window.localStorage.getItem("addis-eats-cart");

        if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (
            Array.isArray(parsedCart) &&
            parsedCart.every(
            (item) =>
                typeof item.id === "string" &&
                typeof item.name === "string" &&
                typeof item.price === "number"
            )
        ) {
            dispatch({
            type: "LOAD",
            items: parsedCart as Dish[],
            });
        }
        }
    } catch {
        console.error("Could not load the saved cart.");
    } finally {
        setHydrated(true);
    }
    }, []);

    useEffect(() => {
    if (!hydrated) {
        return;
    }

    try {
        window.localStorage.setItem(
        "addis-eats-cart",
        JSON.stringify(state.items)
        );
    } catch {
        console.error("Could not save the cart.");
    }
    }, [state.items, hydrated]);

    const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
    );

    const count = state.items.length;

    function addToCart(dish: Dish) {
    dispatch({ type: "ADD", dish });
    }

    function removeFromCart(dishId: string) {
    dispatch({ type: "REMOVE", dishId });
    }

    function clearCart() {
    dispatch({ type: "CLEAR" });
    }

    return (
    <CartContext.Provider
        value={{
        items: state.items,
        total,
        count,
        addToCart,
        removeFromCart,
        clearCart,
        }}
    >
        {children}
    </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
    throw new Error(
        "useCart must be used inside a CartProvider"
    );
    }

    return context;
}