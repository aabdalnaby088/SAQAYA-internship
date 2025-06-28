import type { Product, StoredCartItem,  } from "../types/product";

//  getProducts function for getting cart items from local storage
export function getCart(): StoredCartItem[] {
  const data = localStorage.getItem("cart");

  return data ? JSON.parse(data) : [];
}

//  saveCart function for saving cart items to local storage
export function saveCart(items: StoredCartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}
