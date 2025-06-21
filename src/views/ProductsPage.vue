<!-- ProductsPage.vue displays a list of products when the user visits the products page. -->

<template>
  <!-- Main content of the page -->
  <div class="productsContainer" v-show="!loading">
    <!-- Product card component rendered for each product -->
    <ProductCard
      v-for="product in items"
      :key="product.id"
      :product="product"
    />
  </div>

  <!-- Loading spinner component -->

  <LoadingSpinner v-show="loading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "ProductList",
  // Import the ProductCard and LoadingSpinner components
  components: {
    ProductCard,
    LoadingSpinner,
  },
  // Computed properties for the products state from vuex
  computed: {
    ...mapState("products", ["items", "loading", "error"]),
  },
  // Fetch the products when the component is created
  created() {
    this.fetchProducts();
  },
  // get the Featchproducts function from the vuex store
  methods: {
    ...mapActions("products", ["fetchProducts"]),
  },
});
</script>

<!-- Style for the page -->

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
