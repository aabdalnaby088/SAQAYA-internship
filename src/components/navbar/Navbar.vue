<script lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";
import CartDrawer from "../CartDrawer.vue";
import Footage from "../FootageSection.vue";
import Hamburger from "./HamburgerMenu.vue";
import NavLinks from "./NavLinks.vue";
export default defineComponent({
  name: "Navbar",
  components: {
    ShoppingCartIcon,
    CartDrawer,
    Footage,
    Hamburger,
    NavLinks,
  },
  data() {
    return {
      isMenuOpen: false as boolean,
      isCartOpen: false as boolean,
    };
  },
  computed: {
    cartCount() {
      return this.$store.state.count;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
  },
});
</script>

<template>
  <header class="siteHeader">
    <div class="siteHeader__wrapper">
      <RouterLink to="/">
        <h3 class="siteHeader__title">Vue Store</h3>
      </RouterLink>

      <NavLinks :isMenuOpen="isMenuOpen" @closeHDropdown="closeMenu" />

      <Hamburger :isMenuOpen="isMenuOpen" @closeHamburger="toggleMenu" />

      <button class="site-header__cartbtn" @click="toggleCart">
        <ShoppingCartIcon class="site-header__cartIcon" />
        <!-- <span class="site-header__cartCount">{{ cartCount }}</span> -->
      </button>

      <teleport to="body">
        <CartDrawer :is-open="isCartOpen" @close="toggleCart" />
      </teleport>
    </div>
  </header>
</template>

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
