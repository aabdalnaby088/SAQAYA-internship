<!-- MainLayout.vue is the main layout for the application. It includes the Navbar, main content, and Footage sections. -->
<template>
  <div>
    <!-- Navbar component -->
    <Navbar />

    <!-- Main content of the page -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footage component -->
    <Footage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Footage from "../components/FootageSection.vue";
import Navbar from "../components/navbar/Navbar.vue";

// Import Pinia stores
import { useProductsStore } from "../store";
import { useCartStore } from "../store";

// Access stores
const productsStore = useProductsStore();
const cartStore = useCartStore();

// Fetch products and initialize cart on mount
onMounted(async () => {
  await productsStore.fetchProducts();
  cartStore.initializeCart();
});
</script>

<style scoped>
.main-content {
  margin-top: 80px;
  padding: 1rem;
}
</style>
