import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {

    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        //If already in cart, increment quantity
        const alreadyExistingItem = items.find(
            (item) => item.product === product && item.size === size
        )

        if (alreadyExistingItem) {
            updateQuantity(alreadyExistingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(), // Generate ID
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }

        setItems([newCartItem, ...items]);
    };
    //Update Quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map((item) =>
            item.id != itemId ? item : { ...item, quantity: item.quantity + amount }
        ).filter((item) => item.quantity > 0);
        setItems(updatedItems);
    }
    console.log(items)
    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;