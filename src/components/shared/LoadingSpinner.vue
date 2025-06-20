<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingSpinner",
});
</script>

<template>
  <div class="loading">
    <img src="../../assets/loading.png" alt="loading" />
  </div>
</template>

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
