import { defineStore } from "pinia";
import { getProducts } from "../../services/productsService";
import type { Product } from "../../types/product";

// interface for products state in pinia store
interface ProductsState {
  items: Product[];
  initialItems: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore("products", { // setting the store name "products"
  //  setting the initial state of the store
  state: (): ProductsState => ({
    items: [],
    initialItems: [],
    loading: false,
    error: null,
  }),


  actions: {
    // function for fetching products from server
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
    // function for setting sort in pinia store
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
    // function for setting search in pinia store
    setSearch(search: string) {
      this.items = this.initialItems.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    },
  },
});
