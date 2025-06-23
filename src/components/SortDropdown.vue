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

<script>
import { mapMutations } from "vuex";

export default {
  name: "SortDropdown",
  data() {
    return {
      sort: "all",
    };
  },
  methods: {
    ...mapMutations("products", ["setSort"]),
    handleSort() {
      this.setSort(this.sort);
    },
  },
};
</script>

<style scoped>
.dropdown__sort {
  border: none;
  padding: 0.65rem;
  border-radius: 5px;
}
</style>
