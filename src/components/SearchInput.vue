<!-- Search input component for searching products -->
<template>
  <div class="searchInput">
    <input
      type="text"
      name="search"
      id="search"
      class="searchInput__input"
      placeholder="Search"
      v-model="search"
      @input="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "../store";
import { onMounted, ref } from "vue";

// define search state for input
const search = ref("");

// access products store
const productsStore = useProductsStore();

// access setSearch function from products store
const { setSearch } = productsStore;

// resset search state on mount to empty string
onMounted(() => {
  setSearch("");
});

// handle search input change event
function handleSearch(e: Event) {
  const target = e.target as HTMLInputElement;
  setSearch(target.value);
}
</script>

<style scoped>
.searchInput {
  display: flex;
  align-items: center;
}

.searchInput__input {
  border: none;
  padding: 0.65rem;
  border-radius: 5px;
  transition: all 0.2s ease;
}
</style>
