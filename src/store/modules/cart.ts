import { defineStore } from "pinia";
import { getCart, saveCart } from "../../services/cartService";
import type { Product } from "../../types/product";
import { useProductsStore } from "./products";

//  CartItem interface for cart items
export interface CartItem {
  product: Product;
  quantity: number;
}

//  CartState interface for cart state in pinia store
interface CartState {
  items: CartItem[];
  error: string | null;
}

export const useCartStore = defineStore("cart", { // setting the store name "cart"
  //  setting the initial state of the store
  state: (): CartState => ({
    items: [],
    error: null,
  }),

  getters: {
    // getter for cart items count in pinia store 
    cartCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    // getter for cart total price in pinia store
    cartTotal: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ),
      // function for checking if an item is in the cart
    itemInCart: (state) => (product: Product) =>
      state.items.some((i) => i.product.id === product.id),
  },

  actions: {
    // setting error if exists 
    setError(error: string | null) {
      this.error = error;
    },
    // add item to cart
    addItem(product: Product) {
      let items = this.items;
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) {
        items = this.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        items.push({ product, quantity: 1 });
      }
      this.setItems(items);
    },
    // remove item from cart
    removeItem(product: Product) {
      const items = this.items.filter((i) => i.product.id !== product.id);
      this.setItems(items);
    },
    // clearing cart
    clearCart() {
      this.setItems([]);
    },
    // increment quantity of an item in cart
    incrementQuantity(product: Product) {
      const items = this.items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      this.setItems(items);
    },
    // decrement quantity of an item in cart
    decrementQuantity(product: Product) {
      const items:CartItem[] = this.items.map((i) => {
        if (i.product.id === product.id && i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });
      this.setItems(items)
    },
    // itializing cart by the values in local storage
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
    
    //  function for saving cart items to local storage and update the pinia store
    setItems(items: CartItem[]) {
      this.items = items;
      this.save();
    },

    // saving cart items to local storage, but first it map to save only the product id and quantity
    save() {
      const toStore = this.items.map((i) => ({
        id: i.product.id,
        quantity: i.quantity,
      }));
      saveCart(toStore);
    },
  },
});
