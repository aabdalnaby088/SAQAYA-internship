<template>
  <div class="cart-drawer">
    <!-- Backdrop -->
    <div
      :class="[
        'cart-drawer__backdrop',
        { 'cart-drawer__backdrop--show': isOpen },
      ]"
      @click.self="handleClose"
    >
      <!-- Sliding panel -->
      <div
        :class="['cart-drawer__panel', { 'cart-drawer__panel--open': isOpen }]"
      >
        <!-- Close button -->
        <button class="cart-drawer__close-btn" @click="handleClose">
          <XMarkIcon />
        </button>

        <h2>Your Cart</h2>
        <hr />
        <!-- display cart count and is empty if no items -->
        <p v-if="cartCount === 0">Your cart is empty</p>
        <p v-else>
          <!-- display cart count -->
          Your cart contains {{ cartCount }} items for a total of ${{
            cartTotal > 0 ? cartTotal.toFixed(2) : 0
          }}
        </p>

        <div>
          <!-- display cart items -->
          <CartItem v-for="item in items" :key="item.product.id" :item="item" />
        </div>

        <!-- display clear cart button if cart count is greater than 0 -->
        <button
          v-show="cartCount > 0"
          class="cart-drawer__clear-btn"
          @click="clearCart"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import CartItem from "./CartItem.vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../store";

// define props
defineProps<{ isOpen: boolean }>();
// define emits
const emit = defineEmits<{
  (e: "close"): void;
}>();

// access cart store
const cartStore = useCartStore();
// access cart items, cart count, and cart total from store as refs
const { items, cartCount, cartTotal } = storeToRefs(cartStore);
// access clear cart function
const { clearCart } = cartStore;

// handle close button click
function handleClose() {
  emit("close");
}
</script>

<style scoped>
.cart-drawer {
  position: relative;
}
.cart-drawer__backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 998;
}
.cart-drawer__backdrop--show {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: auto;
}
.cart-drawer__panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: #1f2930;
  color: white;
  text-align: center;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  z-index: 999;
  padding: 1rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}
.cart-drawer__panel--open {
  transform: translateX(0);
}
.cart-drawer__close-btn {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
}
.cart-drawer__clear-btn {
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background-color: #a1a1a1;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin: 1rem 0;
}
</style>
