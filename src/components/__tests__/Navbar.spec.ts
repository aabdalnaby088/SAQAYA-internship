import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../navbar/Navbar.vue";
import { createStore } from "vuex";

// Mock child components
vi.mock("../CartDrawer.vue", () => ({
  default: {
    name: "CartDrawer",
    template: "<div>Cart Drawer</div>",
    props: ["isOpen"],
  },
}));

vi.mock("../FootageSection.vue", () => ({
  default: {
    name: "FootageSection",
    template: "<div>Footage Section</div>",
  },
}));

vi.mock("../NavLinks.vue", () => ({
  default: {
    name: "NavLinks",
    template: "<div @click=\"$emit('closeHDropdown')\">Nav Links</div>",
    props: ["isMenuOpen"],
  },
}));

vi.mock("../HamburgerMenu.vue", () => ({
  default: {
    name: "HamburgerMenu",
    template: "<button @click=\"$emit('closeHamburger')\">Hamburger</button>",
    props: ["isMenuOpen"],
  },
}));

describe("Navbar.vue", () => {
  const store = createStore({
    modules: {
      cart: {
        namespaced: true,
        getters: {
          cartCount: () => 3,
        },
      },
    },
  });

  it("renders correctly", () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [store],
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.text()).toContain("3");
    expect(wrapper.findComponent({ name: "NavLinks" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "HamburgerMenu" }).exists()).toBe(
      true,
    );
    expect(wrapper.findComponent({ name: "CartDrawer" }).exists()).toBe(true);
  });

  it("toggles menu when hamburger emits closeHamburger", async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [store],
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.vm.isMenuOpen).toBe(false);
    await wrapper
      .findComponent({ name: "HamburgerMenu" })
      .vm.$emit("closeHamburger");
    expect(wrapper.vm.isMenuOpen).toBe(true);
  });

  it("toggles cart drawer on cart button click", async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [store],
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.vm.isCartOpen).toBe(false);
    await wrapper.find("button.site-header__cartbtn").trigger("click");
    expect(wrapper.vm.isCartOpen).toBe(true);
  });

  it("renders cart count from Vuex", () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [store],
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.find(".site-header__cartCount").text()).toBe("3");
  });

  it("closes menu when NavLinks emits closeHDropdown", async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [store],
        stubs: ["RouterLink"],
      },
    });

    wrapper.vm.isMenuOpen = true;
    await wrapper
      .findComponent({ name: "NavLinks" })
      .vm.$emit("closeHDropdown");
    expect(wrapper.vm.isMenuOpen).toBe(false);
  });
});
