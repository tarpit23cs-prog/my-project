import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext"; // SAME FOLDER CHECK KAR

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const auth = useContext(AuthContext);

  const user = auth?.user || null;

  return (
    <CartContext.Provider value={{ user }}>
      {children}
    </CartContext.Provider>
  );
};
