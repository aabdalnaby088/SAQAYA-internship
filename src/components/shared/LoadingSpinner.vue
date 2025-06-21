<!-- LoadingSpinner.vue is a reusable component for displaying a loading spinner. It includes an image of a loading spinner. -->
<template>
  <div class="loading">
    <!-- Loading spinner image -->
    <img src="../../assets/loading.png" alt="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingSpinner",
});
</script>

<!-- Style for the page -->
<style scoped>
.loading {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
