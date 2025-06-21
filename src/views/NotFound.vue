<!-- NotFound.vue displays a 404 page when the user visits a non-existent page. -->
<template>
  <!-- Page content -->
  <div class="notFound">
    <!-- Page title and description -->
    <img :src="Notfound" alt="Page not found" class="notFound__svg" />
    <h1 class="notFound__title">Oops! Page Not Found</h1>
    <p class="notFound__description">
      Sorry, the page you're looking for doesn't exist.
    </p>
    <!-- Back to home button -->
    <RouterLink to="/" class="notFound__btn">Back to Home</RouterLink>
  </div>
</template>

<script lang="ts">
import Notfound from "../assets/Notfound.svg";

export default {
  name: "NotFound",
  data() {
    return {
      Notfound, // Import the Notfound image
    };
  },
};
</script>

<!-- Style for the page -->
<style scoped>
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  text-align: center;
  padding: 2rem;
}

.notFound__svg {
  width: 55%;
  margin-bottom: 1.5rem;
}

.notFound__title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.notFound__description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.notFound__btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.notFound__btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .notFound {
    padding: 1rem;
  }

  .notFound__title {
    font-size: 1.5rem;
  }

  .notFound__description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .notFound__btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
