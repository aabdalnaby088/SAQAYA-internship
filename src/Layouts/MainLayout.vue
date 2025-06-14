<template>
  <div>
    <Navbar />

    <main class="main-content">
      <slot />
    </main>

    <Footage />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footage from "@/components/Footage.vue";
</script>

<style scoped>
.main-content {
  margin-top: 80px;
  padding: 1rem;
}
</style>
