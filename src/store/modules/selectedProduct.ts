import { defineStore } from "pinia";
import type { Product } from "../../types/product";
import { getProduct } from "../../services/productsService";

// interface for selected product state in pinia store
interface ProductDetailsState {
  selectedProduct: Product | null;
  isLoading: boolean;
}

export const useSelectedProductStore = defineStore("selectedProduct", { // setting the store name "selectedProduct"
  //  setting the initial state of the store
  state: (): ProductDetailsState => ({
    selectedProduct: null,
    isLoading: false,
  }),

  actions: {
    // function for fetching selected product from server
    async getSelectedProduct(id: string) {
      this.isLoading = true;
      try {
        const product = await getProduct(parseInt(id));
        this.selectedProduct = product;
      } catch (err) {
        // Optionally handle or log the error
        console.error("Failed to fetch product:", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
