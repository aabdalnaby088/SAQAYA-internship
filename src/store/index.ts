import { createStore } from "vuex";
import products, { type ProductsState } from "./modules/products";

export interface RootState {
  products: ProductsState;
}

export default createStore({
  modules: {
    products,
  },
});
