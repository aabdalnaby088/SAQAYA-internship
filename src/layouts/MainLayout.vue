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

export default defineComponent({
  name: "MainLayout",
  // Import the Navbar and Footage components
  components: {
    Navbar,
    Footage,
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
