<template>
  <div>
    <Navbar />

    <main class="main-content">
      <slot />
    </main>

    <Footage />
  </div>
</template>

<script lang="ts">
import Navbar from "../components/Navbar.vue";
import Footage from "../components/FootageSection.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Navbar,
    Footage,
  },
});
</script>

<style scoped>
.main-content {
  margin-top: 80px;
  padding: 1rem;
}
</style>
