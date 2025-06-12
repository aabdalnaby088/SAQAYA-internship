<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    Navbar
  },
  data() {
    return {
      msg: 'Hello Vue 3 + TypeScript + Vite',
    };
  },
});
</script>


<template>
  <Navbar />
  <RouterView />
</template>

