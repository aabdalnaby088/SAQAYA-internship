import { defineStore } from "pinia";
import { getCart, saveCart } from "../../services/cartService";
import type { Product } from "../../types/product";
import { useProductsStore } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  error: string | null;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    error: null,
  }),

  getters: {
    cartCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ),
    itemInCart: (state) => (product: Product) =>
      state.items.some((i) => i.product.id === product.id),
  },

  actions: {
    setItems(items: CartItem[]) {
      this.items = items;
      saveCart(items.map((i) => ({ id: i.product.id, quantity: i.quantity })));
    },

    setError(error: string | null) {
      this.error = error;
    },

    addItem(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) {
        this.items = this.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this.save();
    },

    removeItem(product: Product) {
      this.items = this.items.filter((i) => i.product.id !== product.id);
      this.save();
    },

    clearCart() {
      this.setItems([]);
    },

    incrementQuantity(product: Product) {
      this.items = this.items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      this.save();
    },

    decrementQuantity(product: Product) {
      this.items = this.items.map((i) => {
        if (i.product.id === product.id && i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });
      this.save();
    },

    initializeCart() {
      const stored = getCart(); // [{ id, quantity }]

      const productStore = useProductsStore();
      const fullItems = stored
        .map(({ id, quantity }) => {
          const product = productStore.items.find((p) => p.id === id);
          return product ? { product, quantity } : null;
        })
        .filter(Boolean) as CartItem[];

      this.setItems(fullItems);
    },

    save() {
      const toStore = this.items.map((i) => ({
        id: i.product.id,
        quantity: i.quantity,
      }));
      saveCart(toStore);
    },
  },
});
