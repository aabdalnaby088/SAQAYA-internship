<template>
  <div class="productsContainer" v-show="!isLoading">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>

  <LoadingSpinner v-show="isLoading" />
</template>

<script lang="ts">
import { getProducts } from "@/services/productsService";
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { type Product } from "../types/product";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
export default defineComponent({
  name: "ProductList",
  components: {
    ProductCard,
    LoadingSpinner,
  },
  data() {
    return {
      products: [] as Product[],
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    this.products = await getProducts();
    this.isLoading = false;
  },
});
</script>

<style scoped>
.productsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
}
</style>
