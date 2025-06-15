<template>
  <div class="not-found">
    <img :src="Notfound" alt="Page not found" class="not-found-svg" />
    <h1>Oops! Page Not Found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="home-btn">Back to Home</RouterLink>
  </div>
</template>

<script lang="ts">
import Notfound from "../assets/Notfound.svg";

export default {
  name: "NotFound",
  data() {
    return {
      Notfound,
    };
  },
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  text-align: center;
  padding: 2rem;
}

.not-found-svg {
  width: 55%;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.home-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.home-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .not-found {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .home-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
