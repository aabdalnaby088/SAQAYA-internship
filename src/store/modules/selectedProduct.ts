import type { ActionContext } from "vuex/types/index.js";
import type { Product } from "../../types/product";
import type { RootState } from "../index";
import { getProduct } from "../../services/productsService";

interface productDetails {
  selectedProduct: Product | null;
  isLoading: boolean;
}

//  type productContext for selectedProduct data to use it with commit
type productContext = ActionContext<productDetails, RootState>;

//  selectedProduct module for selectedProduct data
const selectedProduct = {
  namespaced: true,
  //  initial state for selectedProduct data
  state: () => ({
    selectedProduct: null,
    isLoading: false,
  }),
  //  mutations for set selectedProduct data
  mutations: {
    setSelectedProduct(state: productDetails, product: Product) {
      state.selectedProduct = product;
    },
    //  setLoading mutation for loading state
    setLoading(state: productDetails, status: boolean) {
      state.isLoading = status;
    },
  },
  //  actions for selectedProduct data
  actions: {
    //  getSelectedProduct action for fetching selectedProduct
    async getSelectedProduct({ commit }: productContext, id: string) {

      commit("setLoading", true);
      const product = await getProduct(parseInt(id));
      commit("setSelectedProduct", product);
      commit("setLoading", false);
    },
  },
};

export default selectedProduct;
