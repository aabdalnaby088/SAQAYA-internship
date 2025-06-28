<script setup lang="ts">
const props = defineProps<{
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "closeHamburger"): void;
}>();

function handleClose() {
  // Method emit from the component to parent for close the hamburger menu
  emit("closeHamburger");
}
</script>

<template>
  <!-- Main content of the hamburger menu -->
  <button class="hamburger" @click="handleClose" :menuOpened="isMenuOpen">
    <span class="hamburger__bar"></span>
    <span class="hamburger__bar"></span>
    <span class="hamburger__bar"></span>
  </button>
</template>

<!-- Style for the page -->
<style scoped>
.hamburger {
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

.hamburger__bar {
  width: 100%;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger[menuOpened="true"] .hamburger__bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger[menuOpened="true"] .hamburger__bar:nth-child(2) {
  opacity: 0;
}

.hamburger[menuOpened="true"] .hamburger__bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
}
</style>
