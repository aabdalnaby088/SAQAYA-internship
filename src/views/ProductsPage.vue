<!-- ProductsPage.vue displays a list of products when the user visits the products page. -->

<template>
  <!-- Main content of the page -->
  <div class="productsPage">
    <div class="productsPage__header">
      <h1>Products</h1>
      <!-- Search input component -->
      <SearchInput />
      <!-- Sort dropdown component -->
      <SortDropdown />
    </div>

    <div
      class="productsPage__productsContainer"
      v-show="!loading && items.length > 0"
    >
      <!-- Product card component rendered for each product -->
      <ProductCard
        v-for="product in items as Product[]"
        :key="product.id"
        :product="product"
      />
    </div>
    <!-- No results component if no products are found -->
    <div v-show="!loading && items.length === 0">
      <NoResults />
    </div>
  </div>

  <!-- Loading spinner component -->

  <LoadingSpinner v-show="loading" />
</template>

<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
import SortDropdown from "../components/SortDropdown.vue";
import type { Product } from "../types/product";
import { useProductsStore } from "../store";
import { storeToRefs } from "pinia";
import SearchInput from "../components/SearchInput.vue";
import NoResults from "../components/NoResults.vue";

const productsStore = useProductsStore();
const { items, loading } = storeToRefs(productsStore);
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
    gap: 1rem;
    padding-bottom: 12px;
  }
}
</style>
