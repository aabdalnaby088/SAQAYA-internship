import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../navbar/Navbar.vue";
import { useCartStore } from "@/store";
import { createTestingPinia } from "@pinia/testing";
import { ref } from "vue";

const RouterLinkStub = {
  name: "RouterLink",
  props: ["to"],
  template: `<a :href="to"><slot /></a>`,
};

let cartStore: ReturnType<typeof useCartStore>;

const mountComponent = (isMenuOpen = false, isCartOpen = false) =>
  shallowMount(Navbar, {
    data() {
      return {
        isMenuOpen,
        isCartOpen,
      };
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        CartDrawer: true,
        NavLinks: true,
        HamburgerMenu: true,
      },
    },
  });

beforeEach(() => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  cartStore = useCartStore(pinia);

  Object.defineProperty(cartStore, "cartCount", {
    get: () => ref(5),
    configurable: true,
  });
});

describe("testing nav bar component", () => {
  
  it("renders the nav bar elements", () => {
    const wrapper = mountComponent(true);
    expect(wrapper.find(".siteHeader").exists()).toBe(true);
    expect(wrapper.find(".siteHeader__wrapper").exists()).toBe(true);
    expect(wrapper.find(".siteHeader__title").exists()).toBe(true);
    expect(wrapper.find(".site-header__cartbtn").exists()).toBe(true);
    expect(wrapper.find(".site-header__cartIcon").exists()).toBe(true);
    expect(wrapper.find(".site-header__cartCount").exists()).toBe(true);
  });

  
  it("renders site title", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".siteHeader__title").text()).toBe("Vue Store");
  });

  it("checking that the number of items in cart is displayed when isCartOpen is true", () => {
    const wrapper = mountComponent();
    const count = wrapper.find(".site-header__cartCount");
    expect(count.exists()).toBe(true);
    expect(count.text()).toBe("5");
  });
});
