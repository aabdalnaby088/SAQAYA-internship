import { describe, it, expect, vi } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import Navbar from "../navbar/Navbar.vue";
import { createStore } from "vuex";
import type { ComponentPublicInstance } from "vue";

// Define the type of the Navbar instance to access `isMenuOpen` and `isCartOpen`
type NavbarInstance = {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  toggleCart: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
};

// Mock Vuex cart module
const cartModule = {
  namespaced: true,
  getters: {
    cartCount: () => 3,
  },
};

const store = createStore({
  modules: {
    cart: cartModule,
  },
});

describe("test navbar component", () => {
  it("renders the title and cart count", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find(".siteHeader__title").text()).toBe("Vue Store");
    expect(wrapper.find(".site-header__cartCount").text()).toBe("3");
  });

  it("toggles the cart drawer when cart button is clicked", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    const vm = wrapper.vm as NavbarInstance;

    expect(vm.isCartOpen).toBe(false);

    await wrapper.find(".site-header__cartbtn").trigger("click");

    expect(vm.isCartOpen).toBe(true);
  });

  it("toggles the hamburger menu when method is called", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    const vm = wrapper.vm as NavbarInstance;

    expect(vm.isMenuOpen).toBe(false);

    vm.toggleMenu();
    await wrapper.vm.$nextTick();

    expect(vm.isMenuOpen).toBe(true);

    vm.closeMenu();
    await wrapper.vm.$nextTick();

    expect(vm.isMenuOpen).toBe(false);
  });
});
