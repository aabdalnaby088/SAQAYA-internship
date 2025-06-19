import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ContactUsVue from "../views/ContactUs.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/products",
      name: "products",

      component: () => import("../views/ProductsPage.vue"),
    },
    {
      path: "/products/:id",
      name: "product-details",
      component: () => import("../views/ProductDetails.vue"),
      props: true,
    },
    {
      path: "/contact-us",
      name: "contact-us",
      component: ContactUsVue,
    },
    { path: "/:catchAll(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
