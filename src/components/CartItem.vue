<!-- CartItem.vue is a reusable component for displaying a cart item. It includes an image, title, quantity, and remove button. It also includes methods for incrementing, decrementing, and removing the item from the cart. -->
<template>
  <div class="cart-item">
    <!-- Cart item image -->
    <img
      :src="item.product.image"
      :alt="item.product.title"
      class="cart-item__image"
    />
    <!-- Cart item details -->
    <div class="cart-item__info">
      <h3 class="cart-item__title">{{ item.product.title }}</h3>

      <div class="cart-item__controls">
        <button
          @click="decrement"
          class="cart-item__controllers--quantity"
          :disabled="item.quantity === 1"
        >
          –
        </button>
        <span class="cart-item__quantity">{{ item.quantity }}</span>
        <button @click="increment" class="cart-item__controllers--quantity">
          +
        </button>
        <button @click="remove" class="cart-item__controller--remove">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Product } from "../types/product";
import { mapActions } from "vuex";

// CartItem component for displaying a cart item
export default defineComponent({
  name: "CartItem",
  props: {
    item: {
      type: Object as PropType<{
        // PropType for item data
        product: Product;
        quantity: number;
      }>,
      required: true,
    },
  },
  // Methods for incrementing, decrementing, and removing the item from the cart slice of the vuex store
  methods: {
    ...mapActions("cart", [
      "incrementQuantity",
      "decrementQuantity",
      "removeItem",
    ]),
    increment() {
      this.incrementQuantity(this.item.product);
    },
    decrement() {
      this.decrementQuantity(this.item.product);
    },
    remove() {
      this.removeItem(this.item.product);
    },
  },
});
</script>

<!-- Style for the page -->
<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.cart-item__image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 1rem;
}

.cart-item__info {
  flex: 1;
}

.cart-item__title {
  font-size: 1rem;
  margin: 0 0 0.5rem;
  font-weight: 500;
}

.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-item__controllers--quantity {
  width: 30px;
  height: 30px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-item__controllers--quantity:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-item__controller--remove {
  background-color: #a1a1a1;
  color: white;
}

.cart-item__controller--remove {
  text-align: center;
  border: none;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
