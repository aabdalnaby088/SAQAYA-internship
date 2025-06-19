<script lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";
import CartDrawer from "./CartDrawer.vue";
import Footage from "./FootageSection.vue";
export default defineComponent({
  name: "Navbar",
  components: {
    ShoppingCartIcon,
    CartDrawer,
    Footage
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

      <nav  :class="[ 'siteHeader__nav', { 'siteHeader__nav--open': isMenuOpen }]">
        <RouterLink class="siteHeader__link" to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink class="siteHeader__link" to="/products" @click="closeMenu">Products</RouterLink>
        <RouterLink class="siteHeader__link" to="/contactUs" @click="closeMenu">Contact Us</RouterLink>
      </nav>

      <button class="sideHeader__hamburger" @click="toggleMenu" :menuOpened="isMenuOpen">
        <span class="sideHeader__bar"></span>
        <span class="sideHeader__bar"></span>
        <span class="sideHeader__bar"></span>
      </button>

      <button class="site-header__cartbtn" @click="toggleCart">
        <ShoppingCartIcon class="site-header__cartIcon" />
        <span class="site-header__cartCount">{{ cartCount }}</span>
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
  background: #A1A1A1;
  width: 100%;
}

.siteHeader__nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.siteHeader__link.router-link-exact-active {
  color: white;
}

.siteHeader__link {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid grey;
}

.siteHeader__link:first-of-type {
  border: 0;
}

.siteHeader__link:hover {
  background-color: #383333;
}

.sideHeader__hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.sideHeader__bar {
  width: 100%;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(2) {
  opacity: 0;
}

.sideHeader__hamburger[menuOpened="true"] .sideHeader__bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
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

@media (max-width: 768px) {
  .sideHeader__hamburger {
    display: flex;
  }
  .siteHeader__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #5e5a5a;
    flex-direction: column;
    padding: 1rem;
  }

  .siteHeader__nav--open {
    display: flex;
  }

  .siteHeader__link {
    padding: 0.5rem 1rem;
    border-left: none;
    border-top: 1px solid grey;
    width: 100%;
    text-align: center;
  }
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
