<!-- NavLinks.vue is a reusable component for displaying a navigation links. It includes a home link, products link, and contact us link. -->

<template>
  <!-- Main content of the navigation links -->
  <nav :class="['navLinks', { 'navLinks--open': isMenuOpen }]">
    <RouterLink class="navLink__item" to="/" @click="handleClose"
      >Home</RouterLink
    >
    <RouterLink class="navLink__item" to="/products" @click="handleClose"
      >Products</RouterLink
    >
    <RouterLink class="navLink__item" to="/contactUs" @click="handleClose"
      >Contact Us</RouterLink
    >
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "closeDropdown"): void;
}>();

function handleClose() {
  // Method emit from the component to parent for close the navigation links dropdown
  emit("closeDropdown");
}

// props: {
//   isMenuOpen: {
//     type: Boolean,
//     required: true,
//   },
// },
// methods: {
//   closeMenu() {
//     // Method emit from the component to parent for close the navigation links dropdown
//     this.$emit("closeHDropdown");
//   },
// },
</script>

<!-- Style for the page -->
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
