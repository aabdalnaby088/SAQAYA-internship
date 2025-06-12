<template>
    <header>
        <div class="wrapper">
            <h3>Hello vue 🥰</h3>

            <nav :class="{ 'open': isMenuOpen }">
                <RouterLink to="/" @click="closeMenu">Home</RouterLink>
                <RouterLink to="/products" @click="closeMenu">Products</RouterLink>
            </nav>
            <button class="hamburger" @click="toggleMenu" :menuOpened="isMenuOpen">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        closeMenu() {
            this.isMenuOpen = false
        }
    }
}
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
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

@media (max-width: 768px) {
    .hamburger {
    display: flex;
   }
    nav {
        display: none;
        position: absolute;
        top: 1%;
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
        border-bottom: 1px solid grey;
        width: 100%;
        text-align: center;
    }

    nav a:last-of-type {
        border-bottom: none;
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