<script lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartDrawer",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    XMarkIcon,
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
});
</script>

<template>
  <div class="cart-drawer">
    <div
      :class="[
        'cart-drawer__backdrop',
        { 'cart-drawer__backdrop--show': isOpen },
      ]"
      @click.self="handleClose"
    >
      <div
        :class="['cart-drawer__panel', { 'cart-drawer__panel--open': isOpen }]"
      >
        <button class="cart-drawer__close-btn" @click="handleClose">
          <XMarkIcon />
        </button>
        <h2>Your Cart</h2>
        <hr />
        <p>Your cart is empty</p>
      </div>
    </div>
  </div>
</template>

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
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
}
</style>
