<template>
    <router-link :to="`/products/${product.id}`" class="product-card" >
    <img :src="product.image" :alt="product.title" class="product-image" />
    <div class="product-details">
      <h2 class="product-title">{{ product.title }}</h2>
      <div class="product-price-rating">
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
      <p class="product-rating">⭐ {{ product.rating.rate }}</p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type PropType } from "vue";
import { type Product } from "../Types/Product";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  background: white;
  transition: all 0.2s ease;
  color: #2d3748;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-bottom: #ddd 1px solid;
  padding: 10px;


}

.product-details {
  padding: 0.75rem 1rem;
}

.product-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  color: #2d3748;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.product-rating {
  color: #ffa500;
}
.product-price-rating{
  display: flex;
  justify-content: space-between;
}
</style>
