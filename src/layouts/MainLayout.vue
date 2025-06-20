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
import { defineComponent } from "vue";
import Footage from "../components/FootageSection.vue";
import Navbar from "../components/navbar/Navbar.vue";

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
