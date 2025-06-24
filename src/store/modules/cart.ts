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
    items: [] as CartState["items"],
    error: null,
  }),

  mutations: {
    // set items mutation for items state avd save cart to local storage
    setItems(state: CartState, items: CartState["items"]) {
      state.items = items;

      const toStore = items.map((i) => ({
        id: i.product.id,
        quantity: i.quantity,
      }));
      saveCart(toStore);
    },

    setError(state: CartState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    // add item action for adding item to cart and commit mutation to save cart to local storage
    addItem({ state, commit }: CartContext, item: Product) {
      const exists = state.items.find((i) => i.product.id === item.id);
      const updatedItems = exists
        ? state.items.map((i) =>
            i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...state.items, { product: item, quantity: 1 }];

      commit("setItems", updatedItems);
    },
    // remove item action for removing item from cart and commit mutation to save cart to local storage
    removeItem({ state, commit }: CartContext, item: Product) {
      const updated = state.items.filter((i) => i.product.id !== item.id);
      commit("setItems", updated);
    },
    // clear cart action for clearing cart and commit mutation to save cart to local storage
    clearCart({ commit }: CartContext) {
      commit("setItems", []);
    },
    // increment quantity action for incrementing quantity of item in cart and commit mutation to save cart to local storage
    incrementQuantity({ state, commit }: CartContext, item: Product) {
      const updated = state.items.map((i) =>
        i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      commit("setItems", updated);
    },
    // decrement quantity action for decrementing quantity of item in cart and commit mutation to save cart to local storage
    decrementQuantity({ state, commit }: CartContext, item: Product) {
      const updated = state.items.map((i) => {
        if (i.product.id === item.id && i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });
      commit("setItems", updated);
    },
    // set error action for setting error state and commit mutation to save error to local storage
    setError({ commit }: CartContext, error: string | null) {
      commit("setError", error);
    },
    // initialize cart action for initializing cart from local storage when our app loads
    initializeCart({ commit, rootState }: CartContext) {
      const stored = getCart(); // [{ id, quantity }]
      const fullItems = stored
        .map(({ id, quantity }) => {
          const product = rootState.products.items.find((p) => p.id === id);
          return product ? { product, quantity } : null;
        })
        .filter(Boolean) as CartState["items"];

      commit("setItems", fullItems);
    },
  },

  getters: {
    // getter for cart count
    cartCount(state: CartState): number {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    // getter for cart total
    cartTotal(state: CartState): number {
      return state.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );
    },
    // getter for checking if item is in cart
    itemInCart:
      (state: CartState) =>
      (product: Product): boolean => {
        return state.items.some((i) => i.product.id === product.id);
      },
  },
};

export default cart;
