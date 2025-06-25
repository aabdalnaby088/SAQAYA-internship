import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CartDrawer from "../CartDrawer.vue";
import { createStore } from "vuex";

const CartItemMock = {
  template: '<div class="mock-cart-item"></div>',
};

const cartModule = {
  namespaced: true,
  state: () => ({
    items: [
      {
        product: { id: 1, title: "Product 1", image: "img.jpg", price: 10 },
        quantity: 2,
      },
      {
        product: { id: 2, title: "Product 2", image: "img.jpg", price: 5 },
        quantity: 1,
      },
    ],
  }),
  getters: {
    cartCount: () => 3,
    cartTotal: () => 25,
  },
  actions: {
    clearCart: vi.fn(),
  },
};

const store = createStore({
  modules: {
    cart: cartModule,
  },
});

const mountComponent = (isOpen = true) =>
  shallowMount(CartDrawer, {
    props: {
      isOpen,
    },
    global: {
      plugins: [store],
      stubs: {
        CartItem: CartItemMock,
        XMarkIcon: true,
      },
    },
  });

describe("testing cart drawer component", () => {
  it("renders cart drawer when isOpen is true", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".cart-drawer__panel--open").exists()).toBe(true);
  });

  it("hides cart drawer when isOpen is false", () => {
    const wrapper = mountComponent(false);
    expect(wrapper.find(".cart-drawer__panel--open").exists()).toBe(false);
  });

  it("displays correct cart item count and total", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Your cart contains 3 items");
    expect(wrapper.text()).toContain("25.00");
  });

  it("emits close event when clicking close button", async () => {
    const wrapper = mountComponent();
    await wrapper.find(".cart-drawer__close-btn").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("dispatches clearCart when Clear Cart button is clicked", async () => {
    const wrapper = mountComponent();
    await wrapper.find(".cart-drawer__clear-btn").trigger("click");
    expect(cartModule.actions.clearCart).toHaveBeenCalled();
  });

  it("renders mocked CartItem for each item", () => {
    const wrapper = mountComponent();
    const mockItems = wrapper.findAll(".mock-cart-item");
    expect(mockItems.length).toBe(2);
  });
});
