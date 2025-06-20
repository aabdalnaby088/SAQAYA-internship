<template>
  <div class="productsContainer" v-show="!loading">
    <ProductCard
      v-for="product in items"
      :key="product.id"
      :product="product"
    />
  </div>

  <LoadingSpinner v-show="loading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "ProductList",
  components: {
    ProductCard,
    LoadingSpinner,
  },

  computed: {
    ...mapState("products", ["items", "loading", "error"]),
  },
  created() {
    this.fetchProducts();
    console.log(this.error);
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
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
