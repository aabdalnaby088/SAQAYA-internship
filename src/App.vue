<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    RouterView,
    MainLayout,
  },
});
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
