<script lang="ts">
export default {
  name: "HomePage",
};
</script>

<template>
  <main class="homePage">
    This is the home page <span class="count">{{ $store.state.count }}</span>
    <br />
    our landing page goes here
    <br />
  </main>
</template>

<style scoped>
.homePage {
  text-align: center;
  padding: 20px;
  font-size: 20px;
}
</style>
