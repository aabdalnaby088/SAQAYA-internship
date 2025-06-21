import type { CartState } from "../store/modules/cart";

function getCart(): CartState["items"] {
  const items = localStorage.getItem("cart");
  if (items) {
    try {
      return JSON.parse(items);
    } catch {
      localStorage.removeItem("cart");
    }
  }
  return [];
}

function saveCart(items: CartState["items"]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export { getCart, saveCart };
