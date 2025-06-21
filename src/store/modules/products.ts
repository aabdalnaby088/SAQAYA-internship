import type { Product } from "../../types/product";
import { getProducts } from "../../services/productsService";
import type { ActionContext } from "vuex/types/index.js";
import type { RootState } from "../index";

//  type ProductsState for products data
export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

//  type ProductsContext for products data to use it with commit
type ProductsContext = ActionContext<ProductsState, RootState>;

//  products module for products data
const products = {
  namespaced: true, // namespaced to avoid conflicts with other modules

  //  initial state for products data
  state: () => ({
    items: [],
    loading: false,
  }),
  //  mutations for products data
  mutations: {
    //  setLoading mutation for loading state
    setLoading(state: ProductsState, status: boolean) {
      state.loading = status;
    },
    //  setProducts mutation for products state
    setProducts(state: ProductsState, products: Product[]) {
      state.items = products;
    },
    //  setError mutation for error state
    setError(state: ProductsState, error: string | null) {
      state.error = error;
    },
  },

  //  actions for products data
  actions: {
    //  fetchProducts action for fetching products
    async fetchProducts({ commit }: ProductsContext) {
      //  setLoading to true
      commit("setLoading", true);
      //  setError to null
      commit("setError", null);
      try {
        //  get products from server
        const products = await getProducts();
        //  set products to state
        commit("setProducts", products);
      } catch (error) {
        // if error  set error to state
        commit("setError", "Failed to fetch products");
      } finally {
        //  set loading to false
        commit("setLoading", false);
      }
    },
  },
};

export default products;
