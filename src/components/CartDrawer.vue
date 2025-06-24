<!-- CartDrawer.vue is a reusable component for displaying a cart drawer. It includes a close button and a title. -->

<template>
  <!-- Main content of the cart drawer -->
  <div class="cart-drawer">
    <!-- Cart drawer backdrop -->
    <div
      :class="[
        'cart-drawer__backdrop',
        { 'cart-drawer__backdrop--show': isOpen },
      ]"
      @click.self="handleClose"
    >
      <!-- Cart drawer panel the content of the cart drawer -->
      <div
        :class="['cart-drawer__panel', { 'cart-drawer__panel--open': isOpen }]"
      >
        <!-- Cart drawer close button -->
        <button class="cart-drawer__close-btn" @click="handleClose">
          <XMarkIcon />
        </button>
        <h2>Your Cart</h2>
        <hr />
        <p v-if="cartCount === 0">Your cart is empty</p>
        <p v-else>
          Your cart contains {{ cartCount }} items for a total of ${{
            cartTotal.toFixed(2)
          }}
        </p>
        <div>
          <CartItem v-for="item in items" :item="item" />
        </div>
        <button
          v-show="cartCount > 0"
          class="cart-drawer__clear-btn"
          @click="clear"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";
import { mapGetters, mapState, mapActions } from "vuex";
import CartItem from "./CartItem.vue";

export default defineComponent({
  name: "CartDrawer",
  props: {
    isOpen: {
      // Prop for the cart drawer state
      type: Boolean,
      required: true,
    },
  },
  components: {
    XMarkIcon,
    CartItem,
  },
  methods: {
    // method cleare cart from vuex cart slice
    ...mapActions("cart", ["clearCart"]),
    clear() {
      this.clearCart();
    },
    // Methods emit from the component to parent for close the cart drawer
    handleClose() {
      this.$emit("close");
    },
  },

  computed: {
    ...mapGetters("cart", ["cartCount", "cartTotal"]),
    ...mapState("cart", ["items"]),
  },
});
</script>

<!-- Style for the page -->

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
