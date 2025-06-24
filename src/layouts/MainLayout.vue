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

<script lang="ts">
import { defineComponent } from "vue";
import Footage from "../components/FootageSection.vue";
import Navbar from "../components/navbar/Navbar.vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "MainLayout",
  // Import the Navbar and Footage components
  components: {
    Navbar,
    Footage,
  },
  computed: {
    // Computed property for products from vuex products slice
    ...mapState("products", ["items"]),
    
  },
  // Fetch the products when the component is created
    async created() {
    await this.fetchProducts();
    await this.initializeCart();
  },
  // get the Featchproducts function from the vuex store
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("cart", ["initializeCart"]),
  },
});
</script>

<!-- Style for the page -->
<style scoped>
.main-content {
  margin-top: 80px;
  padding: 1rem;
}
</style>
