<!-- NoResults component appears when there are no results -->
<template>
  <div class="noResults">
    <img src="/noResults.png" alt="no results found" />
    <h2>No results found</h2>
    <p>Try searching for something else</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.noResults {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

img {
  width: 200px;
  height: 200px;
}
</style>
