<template>
  <div class="products-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dummyData, type Product } from "../Types/Product";
import ProductCard from "../components/ProductCard.vue";
export default defineComponent({
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: dummyData,
    };
  },
});
</script>

<style scoped>
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
}
</style>
