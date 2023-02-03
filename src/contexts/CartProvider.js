import { createContext, useContext, useMemo } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const cart = [];

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
