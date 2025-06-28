<!-- FootageSection.vue is a reusable component for displaying the footer section of the page. -->

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <!-- Main content of the footer -->
  <footer class="footer">
    <!-- Footer container -->
    <div class="footerContainer">
      <!-- Footer container content -->
      <div class="footerContainer__content">
        <!-- Footer links -->
        <div class="footer-links">
          <div class="column">
            <h4>Navigate</h4>
            <ul>
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/products">Products</RouterLink>
              </li>
              <li>
                <RouterLink to="/contactUs">Contact Us</RouterLink>
              </li>
              <li>
                <RouterLink to="/sitemap">Sitemap</RouterLink>
              </li>
            </ul>
          </div>

          <div class="column">
            <h4>Collection</h4>
            <ul>
              <li>New arrivals</li>
              <li>Featured</li>
              <li>Catalog</li>
              <li>Brands</li>
            </ul>
          </div>

          <div class="column">
            <h4>Categories</h4>
            <ul>
              <li>Tables</li>
              <li>Lamps</li>
              <li>Chairs</li>
              <li>Sofas</li>
            </ul>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="footer-contact">
          <h3>
            399 Crowfield Road,<br />
            Phoenix, Arizona 85012
          </h3>
          <div class="contact-info">
            <a href="mailto:asff@fdfsfdc.com">asff@fdfsfdc.com</a><br />
            <span>+602-926-5809</span>
          </div>
        </div>
      </div>
      <div class="footerContainer__content--copyright">
        <p>Copyright © All Rights Reserved 2020</p>
      </div>
    </div>
  </footer>
</template>

<!-- Style for the page -->

<style scoped>
.footer {
  background-color: #b2a7db;
  padding: 2rem;
  color: #222;
}

.footerContainer {
  width: 90%;
  margin: 0 auto;
}

.footerContainer__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer-links {
  display: flex;
  gap: 3rem;
  flex: 1;
  flex-wrap: wrap;
  width: 70%;
}

.footer-links .column h4 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.footer-links .column ul {
  list-style: none;
  padding: 0;
}

.footer-links .column ul li {
  margin-bottom: 0.4rem;
  cursor: pointer;
}

.footer-contact {
  display: flex;
  flex-direction: column;
}

.contact-info {
  text-align: right;
}

.footer-contact h3 {
  text-align: right;
  font-size: 2.4rem;
  font-weight: lighter;
}

.footer-contact a {
  color: #2c5ab4;
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .footer-links {
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .footer-contact h3 {
    text-align: center;
  }

  .footer-contact {
    max-width: 100%;
    align-items: center;
  }
}
</style>
