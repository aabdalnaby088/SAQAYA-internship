🛍️ Project Overview: Vue Store
Project Name: Vue Store
Stack:
- Vue 3 (Options API) Then migrated to Composition API
- TypeScript
- Vuex Then migrated to Pinia
- Vite
- CSS with BEM convention 
Purpose:
A simple, performant, and responsive e-commerce frontend built with Vue 3, focused on clean UI, Clean architecture and state management.


✅ Key Features

🛒 Product Catalog:

- Products fetched via store actions.

- Displayed using reusable ProductCard components.

🛍️ Cart Functionality:

- Add/remove products to/from the cart.

- Persist cart items in localStorage (only IDs and quantity).

🧮 Cart Totals:

Cart count and total price computed using Vuex getters.

Real-time updates shown in the navbar.

⬆️ Sorting Dropdown:

Allows sorting products by price, rating 

🔍 Searching

Allows Searching specific Product

🧭 Routing:

Implemented with Vue Router.

Includes pages like: Home, Products, Product Details, Not Found and Contact.

🧱 Layout Components:

MainLayout.vue wraps all pages.

Contains Navbar and Footage (footer) components.

🧪 Testing 
  Using Vitest in unit Test
  Tests created for Vuex/Options API then migrated to Pinia/Composition API
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
