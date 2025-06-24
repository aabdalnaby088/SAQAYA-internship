import { createStore } from "vuex";
import products, { type ProductsState } from "./modules/products";
import cart, { type CartState } from "./modules/cart";
import type { Product } from "../types/product";
import selectedProduct from "./modules/selectedProduct";

//  RootState for vuex store state
export interface RootState {
  products: ProductsState ;
  cart: CartState;
  selectedProduct: Product;
}

//  create vuex store
export default createStore({
  modules: {
    products , // products module
    cart, // cart module
    selectedProduct, // selectedProduct module
  },
});
