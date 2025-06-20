<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLinks",
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeMenu() {
      this.$emit("closeHDropdown");
    },
  },
});
</script>

<template>
  <nav :class="['navLinks', { 'navLinks--open': isMenuOpen }]">
    <RouterLink class="navLink__item" to="/" @click="closeMenu"
      >Home</RouterLink
    >
    <RouterLink class="navLink__item" to="/products" @click="closeMenu"
      >Products</RouterLink
    >
    <RouterLink class="navLink__item" to="/contactUs" @click="closeMenu"
      >Contact Us</RouterLink
    >
  </nav>
</template>

<style scoped>
.navLinks {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navLink__item.router-link-exact-active {
  color: white;
}

.navLink__item {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid grey;
}

.navLink__item:first-of-type {
  border: 0;
}

.navLink__item:hover {
  background-color: #383333;
}

@media (max-width: 768px) {
  .navLinks {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #5e5a5a;
    flex-direction: column;
    padding: 1rem;
  }

  .navLinks--open {
    display: flex;
  }

  .navLink__item {
    padding: 0.5rem 1rem;
    border-left: none;
    border-top: 1px solid grey;
    width: 100%;
    text-align: center;
  }
}
</style>
