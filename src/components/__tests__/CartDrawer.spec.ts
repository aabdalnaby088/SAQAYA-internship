import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CartDrawer from "../CartDrawer.vue";
import { useCartStore } from "../../store";
import type { Product } from "../../types/product";

const CartItemMock = {
  template: '<div class="mock-cart-item"></div>',
};

let cartStore: ReturnType<typeof useCartStore>;

const dummyProduct1: Product = {
  id: 1,
  title: "Product 1",
  image: "img.jpg",
  price: 10,
  description: "Product 1 description",
  rating: { rate: 4.5, count: 120 },
};

const dummyProduct2: Product = {
  id: 2,
  title: "Product 2",
  image: "img2.jpg",
  price: 5,
  description: "Product 2 description",
  rating: { rate: 4.0, count: 50 },
};

beforeEach(() => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  cartStore = useCartStore(pinia);

  cartStore.items = [
    { product: dummyProduct1, quantity: 2 },
    { product: dummyProduct2, quantity: 1 },
  ];

  cartStore.clearCart = vi.fn();
});

const mountComponent = (isOpen = true) =>
  shallowMount(CartDrawer, {
    props: { isOpen },
    global: {
      stubs: {
        CartItem: CartItemMock,
        XMarkIcon: true,
      },
    },
  });

describe("testing cart drawer component", () => {
  it("renders cart panel when open", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".cart-drawer__backdrop").exists()).toBe(true);
    expect(wrapper.find(".cart-drawer__backdrop--show").exists()).toBe(true); 
    expect(wrapper.find(".cart-drawer__panel").exists()).toBe(true); 
    expect(wrapper.find(".cart-drawer__panel--open").exists()).toBe(true);
  });

  it("shows cart summary", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Your cart contains 3 items");
    expect(wrapper.text()).toContain("25.00");
  });

  it("emits close when clicking close button", async () => {
    const wrapper = mountComponent();
    await wrapper.find(".cart-drawer__close-btn").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("calls clearCart when Clear Cart is clicked", async () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".cart-drawer__clear-btn").exists()).toBe(true);
    await wrapper.find(".cart-drawer__clear-btn").trigger("click");
    expect(cartStore.clearCart).toHaveBeenCalled();
  });

  it("renders mocked CartItem for each item", () => {
    const wrapper = mountComponent();
    const mockItems = wrapper.findAll(".mock-cart-item");
    expect(mockItems.length).toBe(2);
  });

  it("shows empty cart message if no items", () => {
    cartStore.items = [];
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Your cart is empty");
  });
});
