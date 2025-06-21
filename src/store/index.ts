import { createStore } from "vuex";
import products, { type ProductsState } from "./modules/products";
import cart, { type CartState } from "./modules/cart";

//  RootState for vuex store state
export interface RootState {
  products: ProductsState;
  cart: CartState;
}

//  create vuex store
export default createStore({
  modules: {
    products,
    cart,
  },
});
