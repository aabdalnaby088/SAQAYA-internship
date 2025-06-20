import type { Product } from "../../types/product";
import { getProducts } from "../../services/productsService";
import type { ActionContext } from "vuex/types/index.js";
import type { RootState } from "../index";

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

type ProductsContext = ActionContext<ProductsState, RootState>;

const products = {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
  }),

  mutations: {
    setLoading(state: ProductsState, status: boolean) {
      state.loading = status;
    },
    setProducts(state: ProductsState, products: Product[]) {
      state.items = products;
    },
    setError(state: ProductsState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchProducts({ commit }: ProductsContext) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const products = await getProducts();
        commit("setProducts", products);
      } catch (error) {
        commit("setError", "Failed to fetch products");
      } finally {
        commit("setLoading", false);
      }
    },
  },
};

export default products;
