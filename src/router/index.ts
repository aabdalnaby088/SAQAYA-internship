import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ContactUsVue from '../views/Contact-us.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      
      component: () => import('../views/Products.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetails.vue'),
      props: true,
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUsVue,
    }
  ],
})

export default router
