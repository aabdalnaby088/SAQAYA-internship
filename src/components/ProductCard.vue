<!-- ProductCard.vue is a reusable component for displaying a product card. It includes the product image, title, price, and rating. -->

<template>
  <!-- Main content of the card -->
  <div class="card">
    <!-- Product image and link -->
    <router-link :to="`/products/${product.id}`" class="card__Content">
      <!-- Product image -->
      <img :src="product.image" :alt="product.title" class="card__image" />
      <!-- Product details -->
      <div class="card__description">
        <h2 class="card__title">{{ product.title }}</h2>
        <div class="card__details">
          <p class="card__details--price">${{ product.price.toFixed(2) }}</p>
          <p class="card__details--rating">⭐ {{ product.rating.rate }}</p>
        </div>
      </div>
    </router-link>
    <!-- Add to cart button -->
    <button class="card__addToCart">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type Product } from "../types/product";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      //  Product data prop
      type: Object as PropType<Product>, //  PropType for product data
      required: true,
    },
  },
});
</script>

<!-- Style for the page -->
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  background: white;
  transition: all 0.2s ease;
  color: #2d3748;
  padding: 10px;
}

.card:hover {
  transform: scale(1.05);
}

.card__image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-bottom: #ddd 1px solid;
  padding: 10px;
}

.card__description {
  padding: 0.75rem 1rem;
}

.card__title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.card__details--price {
  color: #2d3748;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.card__details--rating {
  color: #ffa500;
}
.card__details {
  display: flex;
  justify-content: space-between;
}

.card__addToCart {
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
</style>
