import { createStore } from "vuex";
import products, { type ProductsState } from "./modules/products";

//  RootState for vuex store state
export interface RootState {
  products: ProductsState;
}

//  create vuex store
export default createStore({
  modules: {
    products,
  },
});
