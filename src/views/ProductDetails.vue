<!-- ProductDetails.vue displays the details of a product when the user clicks on a product card. -->

<template>
  <!-- Main content of the page -->
  <div class="productDetails" v-show="!isLoading">
    <!-- Product image -->
    <img
      :src="selectedProduct?.image"
      :alt="selectedProduct?.title"
      class="productDetails__image"
    />
    <!-- Product details -->
    <div class="productDetails__info">
      <h1>{{ selectedProduct?.title }}</h1>
      <!-- Product rating, price, and description -->
      <p class="productDetails__rating">
        ⭐ {{ selectedProduct?.rating.rate }}
      </p>
      <p class="productDetails__price">
        $ {{ selectedProduct?.price.toFixed(2) }}
      </p>
      <p class="productDetails__description">
        {{ selectedProduct?.description }}
      </p>
      <!-- Add to cart button -->
      <button
        class="card__addToCart"
        @click="handleAddToCart"
        :inCart="isInCart"
        v-show="!isInCart"
      >
        {{ isInCart ? "Added to cart" : "Add to Cart" }}
      </button>
      <button
        class="card__RemoveFromCart"
        @click="handleRemoveFromCart"
        :inCart="isInCart"
        v-show="isInCart"
      >
        Remove from cart
      </button>
    </div>
  </div>

  <LoadingSpinner v-show="isLoading" />
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import LoadingSpinner from "../components/shared/LoadingSpinner.vue";
import { useCartStore, useSelectedProductStore } from "../store";

// Props
const props = defineProps<{
  id: string;
}>();

// Stores
const selectedProductStore = useSelectedProductStore();
const cartStore = useCartStore();

// Destructure refs from store
const { selectedProduct, isLoading } = storeToRefs(selectedProductStore);
const { getSelectedProduct } = selectedProductStore;
const { addItem, removeItem, itemInCart } = cartStore;

// Fetch product on mount
onMounted(() => {
  getSelectedProduct(props.id);
});

// Watch for title updates
watch(selectedProduct, (newProduct) => {
  if (newProduct?.title) {
    document.title = `${newProduct.title} | Vue Store`;
  }
});

// Add to cart
function handleAddToCart() {
  if (selectedProduct.value) {
    addItem(selectedProduct.value);
  }
}

// Remove from cart
function handleRemoveFromCart() {
  if (selectedProduct.value) {
    removeItem(selectedProduct.value);
  }
}

// Computed to check if the product is already in cart
const isInCart = computed(() =>
  selectedProduct.value ? itemInCart(selectedProduct.value) : false,
);
</script>

<!-- Style for the page -->
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

.card__addToCart {
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.card__RemoveFromCart {
  background-color: #a1a1a1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}

@media (max-width: 768px) {
  .productDetails {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
