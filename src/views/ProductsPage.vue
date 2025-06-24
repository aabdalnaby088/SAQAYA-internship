<!-- ProductsPage.vue displays a list of products when the user visits the products page. -->

<template>
  <!-- Main content of the page -->
  <div class="productsPage">
    <div class="productsPage__header">
      <h1>Products</h1>
      <SortDropdown />
    </div>
    <div class="productsPage__productsContainer" v-show="!loading">
      <!-- Product card component rendered for each product -->
      <ProductCard
        v-for="product in items as Product[]"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>

  <!-- Loading spinner component -->

  <LoadingSpinner v-show="loading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
import { mapState } from "vuex";
import SortDropdown from "../components/SortDropdown.vue";
import type { ProductsState } from "../store/modules/products";
import type { Product } from "../types/product";

export default defineComponent({
  name: "ProductList",
  // Import the ProductCard and LoadingSpinner components
  components: {
    ProductCard,
    LoadingSpinner,
    SortDropdown,
  },
  // Computed properties for the products state from vuex
  computed: {
    ...mapState("products", ["items", "loading", "error"]),
  },
  // Fetch the products when the component is created
});
</script>

<!-- Style for the page -->

<style scoped>
.productsPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.productsPage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #a1a1a1;
  border-radius: 5px;
}

.productsPage__productsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .productsPage__header {
    flex-direction: column;
  }
}
</style>
