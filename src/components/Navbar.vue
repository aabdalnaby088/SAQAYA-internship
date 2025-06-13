<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import CartDrawer from './Cart.vue'
export default {
    data() {
        return {
            isMenuOpen: false,
            isCartOpen: false,
        }
    },
    components: {
        ShoppingCartIcon,
        CartDrawer,
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        closeMenu() {
            this.isMenuOpen = false
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
            console.log(this.isCartOpen)
            
        },
    },
}
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <h3>Vue Store</h3>
      </RouterLink>

      <nav :class="{ open: isMenuOpen }">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/products" @click="closeMenu">Products</RouterLink>
        <RouterLink to="/contact-us" @click="closeMenu">Contact Us</RouterLink>
      </nav>

      <button class="hamburger" @click="toggleMenu" :menu-opened="isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button class="cart" @click="toggleCart">
        <ShoppingCartIcon class="cart-icon" />
      </button>

      <teleport to='body'>
        <CartDrawer :is-open="isCartOpen" @close="toggleCart" />
      </teleport>

    </div>
  </header>
</template>




<style scoped>

header {
    position: fixed;
    top: 10px;
    left: 0;
    width: 100%;
    z-index: 800;
    display: flex;
    justify-content: center ;
}

h3{
    color: hsla(160, 100%, 37%, 1);
}

header .wrapper {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    border-radius: 5px;
    width: 80%;
}

nav {
    display: flex;
    align-items: center;
    justify-content: center;
}

nav a.router-link-exact-active {
    color: white;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid grey;
}

nav a:first-of-type {
    border: 0;
}

nav a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.hamburger span {
    width: 100%;
    height: 3px;
    background: white;
    transition: all 0.3s ease;
}

.hamburger[menuOpened="true"] span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger[menuOpened="true"] span:nth-child(2) {
    opacity: 0;
}

.hamburger[menuOpened="true"] span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

.cart {
    background-color: transparent;
    border:none;
}

.cart-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: white;
    transition: 0.4s;
}

.cart-icon:hover {
    color: hsla(160, 100%, 37%, 1);
}

@media (max-width: 768px) {
    .hamburger {
    display: flex;
   }
    nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #000;
        flex-direction: column;
        padding: 1rem;
    }

    nav.open {
        display: flex;
    }

    nav a {
        padding: 0.5rem 1rem;
        border-left: none;
        border-top: 1px solid grey;
        width: 100%;
        text-align: center;
    }

}

@media (max-width: 480px) {
    header .wrapper {
        padding: 0 0.5rem;
    }

    h3 {
        font-size: 1.2rem;
    }
}
</style>