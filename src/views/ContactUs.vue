<template>
  <!--
    ContactUs.vue displays a contact form for users to send messages.
  -->
  <div class="contact">
    <!-- Page title and form -->
    <h1 class="contact__title">Contact Us</h1>
    <!-- Contact form with fields for name, email, and message -->
    <form class="contact__form" @submit.prevent="submitForm">
      <!-- Name field and validation -->
      <div class="contact__field">
        <label for="name" class="contact__label">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="contact__input"
          required
          placeholder="Ex.Ahmed"
        />
      </div>
      <!-- Email field and validation -->
      <div class="contact__field">
        <label for="email" class="contact__label">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="contact__input"
          required
          placeholder="Ex.Ahmed@gmail.com"
        />
      </div>
      <!-- Message field and validation -->
      <div class="contact__field">
        <label for="message" class="contact__label">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="contact__textarea"
          required
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <!-- Submit button and success message -->
      <button class="contact__button" type="submit">Send Message</button>
      <!-- Success message and timer -->
      <p v-if="submitted" class="contact__success">
        Thank you! We'll get back to you soon.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define form data
const form = ref({
  name: "",
  email: "",
  message: "",
});

// Define submitted state
const submitted = ref(false);

function submitForm() {
  submitted.value = true;
  form.value = { name: "", email: "", message: "" };
  setTimeout(() => (submitted.value = false), 3000);
}
</script>

<style>
.contact {
  max-width: 800px;
  margin: 1rem auto;
}

.contact__title {
  margin-bottom: 2rem;
}

.contact__form {
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact__label {
  color: #000;
}

.contact__input,
.contact__textarea {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 15px;
}

.contact__input:focus,
.contact__textarea:focus {
  border-color: #000;
  outline: none;
}

.contact__textarea {
  min-height: 120px;
}

.contact__button {
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  align-self: flex-end;
  transition: background 0.2s;
}

.contact__button:hover {
  background: #a1a1a1;
  color: #000;
}

.contact__success {
  color: #04610f;
  margin-top: 1rem;
  text-align: right;
  font-size: 1rem;
}
</style>
```
