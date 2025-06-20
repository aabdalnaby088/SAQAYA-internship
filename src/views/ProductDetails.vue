<template>
  <div class="productDetails" v-show="!isLoading">
    <img
      :src="product?.image"
      :alt="product?.title"
      class="productDetails__image"
    />

    <div class="productDetails__info">
      <h1>{{ product?.title }}</h1>
      <p class="productDetails__rating">⭐ {{ product?.rating.rate }}</p>
      <p class="productDetails__price">$ {{ product?.price.toFixed(2) }}</p>
      <p class="productDetails__description">{{ product?.description }}</p>
    </div>
  </div>

  <LoadingSpinner v-show="isLoading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type Product } from "../types/product";
import { getProduct } from "../services/productsService";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
export default defineComponent({
  name: "ProductDetails",
  components: {
    LoadingSpinner,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: undefined as Product | undefined,
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    const product = await getProduct(parseInt(this.id));
    this.isLoading = false;
    if (!product) {
      this.$router.push({ name: "NotFound" });
    } else {
      this.product = product;
    }
  },
});
</script>

<style scoped>
.productDetails {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.productDetails__image {
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
}

.productDetails__info {
  max-width: 500px;
}

.productDetails__price {
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0.5rem 0;
}

.productDetails__rating {
  color: #ffa500;
  margin-bottom: 1rem;
}

.productDetails__description {
  color: #555;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .productDetails {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
