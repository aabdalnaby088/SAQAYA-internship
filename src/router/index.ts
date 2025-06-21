import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ContactUsVue from "../views/ContactUs.vue";
import NotFound from "../views/NotFound.vue";

//  create router
const router = createRouter({
  //  create router with history
  history: createWebHistory(import.meta.env.BASE_URL),
  //  scrollBehavior to always scroll to top when navigating
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
  //  routes for router
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/products",
      name: "products",

      component: () => import("../views/ProductsPage.vue"), //  import ProductsPage component for lazy loading
    },
    {
      path: "/products/:id",
      name: "productDetails",
      component: () => import("../views/ProductDetails.vue"), //  import ProductDetails component for lazy loading
      props: true,
    },
    {
      path: "/contactUs",
      name: "contactUs",
      component: ContactUsVue,
    },
    { path: "/:catchAll(.*)*", name: "NotFound", component: NotFound }, //  not found page for invalid routes
  ],
});

export default router;
