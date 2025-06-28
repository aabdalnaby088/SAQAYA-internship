import { defineStore } from "pinia";
import { getProducts } from "../../services/productsService";
import type { Product } from "../../types/product";

interface ProductsState {
  items: Product[];
  initialItems: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    items: [],
    initialItems: [],
    loading: false,
    error: null,
  }),

  getters: {
    sortedItems(state): Product[] {
      return state.items;
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const products = await getProducts();
        this.items = products;
        this.initialItems = [...products];
      } catch (err) {
        this.error = "Failed to fetch products";
      } finally {
        this.loading = false;
      }
    },

    setSort(sort: string) {
      switch (sort) {
        case "asc":
          this.items.sort((a, b) => a.price - b.price);
          break;
        case "desc":
          this.items.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          this.items.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          this.items = [...this.initialItems];
          break;
      }
    },
    setSearch(search: string) {
      this.items = this.initialItems.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    },
  },
});
