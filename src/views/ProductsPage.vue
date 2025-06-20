<template>
  <div class="productsContainer" v-show="!isLoading">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-show="isLoading" class="loading">
    <img src="../assets/loading.png" alt="loading" />
  </div>
</template>

<script lang="ts">
import { getProducts } from "@/services/productsService";
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import { type Product } from "../types/product";
export default defineComponent({
  name: "ProductList",
  components: {
    ProductCard,
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
.loading {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
