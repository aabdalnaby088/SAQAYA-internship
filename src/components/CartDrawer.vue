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
  <div class="container">
    <!-- Backdrop -->
    <div :class="['backdrop', { show: isOpen }]" @click.self="handleClose">
      <!-- Sliding Drawer -->
      <div :class="['cart-drawer', { open: isOpen }]">
        <button class="close-btn" @click="handleClose">
          <XMarkIcon />
        </button>
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>counter: {{ $store.state.count }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 998;
}

.backdrop.show {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: auto;
}

/* Drawer */
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: white;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  z-index: 999;
  padding: 1rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}

/* Drawer visible */
.cart-drawer.open {
  transform: translateX(0);
}
.close-btn {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>
