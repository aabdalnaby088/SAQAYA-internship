<template>
  <div class="dropdown">
    <select
      name="sort"
      id="sort"
      class="dropdown__sort"
      v-model="sort"
      @change="handleSort"
    >
      <option value="all">All</option>
      <option value="asc">price (Low to High)</option>
      <option value="desc">price (High to Low)</option>
      <option value="rating">Rating</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "../store";

import { onMounted, ref } from "vue";

// define sort state for select
const sort = ref("all");

// access products store
const productsStore = useProductsStore();

//
const { setSort } = productsStore;

onMounted(() => {
  setSort("all");
});

function handleSort() {
  setSort(sort.value);
}
</script>

<style scoped>
.dropdown__sort {
  border: none;
  padding: 0.65rem;
  border-radius: 5px;
}
</style>
