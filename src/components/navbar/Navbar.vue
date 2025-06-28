<!-- Navbar.vue is a reusable component for displaying the navigation bar of the page. It includes a hamburger menu, navigation links, and cart drawer. -->

<script setup lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
import CartDrawer from "../CartDrawer.vue";
import Hamburger from "./HamburgerMenu.vue";
import NavLinks from "./NavLinks.vue";
import { ref } from "vue";
import { useCartStore } from "@/store";
import { storeToRefs } from "pinia";

const isMenuOpen = ref(false);
const isCartOpen = ref(false);

function toggleMenu() {
  // Method  for toggle the menu
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  // Method  for close the menu
  isMenuOpen.value = false;
}

function toggleCart() {
  // Method  for toggle the cart drawer
  isCartOpen.value = !isCartOpen.value;
}

const cartStore = useCartStore();

const { cartCount } = storeToRefs(cartStore);
</script>

<template>
  <!-- Main content of the navigation bar -->
  <header class="siteHeader">
    <div class="siteHeader__wrapper">
      <RouterLink to="/">
        <h3 class="siteHeader__title">Vue Store</h3>
      </RouterLink>
      <!-- Navigation links  component -->
      <NavLinks :isMenuOpen="isMenuOpen" @closeDropdown="closeMenu" />
      <!-- Hamburger menu component -->
      <Hamburger :isMenuOpen="isMenuOpen" @closeHamburger="toggleMenu" />
      <!-- Cart drawer button -->
      <button class="site-header__cartbtn" @click="toggleCart">
        <ShoppingCartIcon class="site-header__cartIcon" />
        <span class="site-header__cartCount">{{ cartCount }}</span>
      </button>
      <!-- Cart drawer component -->
      <!-- teleport to body to make it direct child for the body in dom tree -->
      <teleport to="body">
        <CartDrawer :is-open="isCartOpen" @close="toggleCart" />
      </teleport>
    </div>
  </header>
</template>

<!-- Style for the page -->
<style scoped>
.siteHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 800;
  display: flex;
  justify-content: center;
}

.siteHeader__title {
  color: #000;
}

.siteHeader__wrapper {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #a1a1a1;
  width: 100%;
}

.site-header__cartbtn {
  background-color: transparent;
  border: none;
  position: relative;
}

.site-header__cartIcon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #000;
  transition: 0.4s;
}

.site-header__cartCount {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
}

.site-header__cartCount:hover {
  color: #383333;
}

@media (max-width: 480px) {
  .siteHeader__wrapper {
    padding: 0 0.5rem;
  }

  .siteHeader__title {
    font-size: 1.2rem;
  }
}
</style>
