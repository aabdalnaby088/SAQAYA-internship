import type { Product, StoredCartItem } from "../types/product";


export function getCart(): StoredCartItem[] {
  const data = localStorage.getItem("cart");
  
  return data ? JSON.parse(data) : [];
}

export function saveCart(items: StoredCartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}
