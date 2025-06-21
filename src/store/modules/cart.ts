import { getCart, saveCart } from "../../services/cartService";
import type { Product } from "../../types/product";
import type { RootState } from "../index";
import type { ActionContext } from "vuex/types/index.js";

//  CartState for cart data
export interface CartState {
  items: {
    product: Product;
    quantity: number;
  }[];
  error: string | null;
}

// --- Context Type ---
type CartContext = ActionContext<CartState, RootState>;

// --- Vuex Module ---
const cart = {
  namespaced: true,

  state: (): CartState => ({
    items: getCart(),
    error: null,
  }),

  mutations: {
    setItems(state: CartState, items: CartState["items"]) {
      state.items = items;
      saveCart(items);
    },
    setError(state: CartState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    addItem({ state, commit }: CartContext, item: Product) {
      const exists = state.items.find((i) => i.product.id === item.id);
      const updatedItems = exists
        ? state.items.map((i) =>
            i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...state.items, { product: item, quantity: 1 }];

      commit("setItems", updatedItems);
    },

    removeItem({ state, commit }: CartContext, item: Product) {
      const updated = state.items.filter((i) => i.product.id !== item.id);
      commit("setItems", updated);
    },

    clearCart({ commit }: CartContext) {
      commit("setItems", []);
    },

    incrementQuantity({ state, commit }: CartContext, item: Product) {
      const updated = state.items.map((i) =>
        i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      commit("setItems", updated);
    },

    decrementQuantity({ state, commit }: CartContext, item: Product) {
      const updated = state.items.map((i) => {
        if (i.product.id === item.id && i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });
      commit("setItems", updated);
    },

    setError({ commit }: CartContext, error: string | null) {
      commit("setError", error);
    },
  },

  getters: {
    cartCount(state: CartState): number {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartTotal(state: CartState): number {
      return state.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );
    },
    itemInCart:
      (state: CartState) =>
      (product: Product): boolean => {
        return state.items.some((i) => i.product.id === product.id);
      },
  },
};

export default cart;
