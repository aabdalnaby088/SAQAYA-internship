import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createStore } from "vuex";
import CartItem from "../CartItem.vue"; // adjust if needed

describe("testing cart item component", () => {
  // 1. Mock Vuex actions
  const mockIncrement = vi.fn();
  const mockDecrement = vi.fn();
  const mockRemove = vi.fn();

  const cartModule = {
    namespaced: true,
    actions: {
      incrementQuantity: mockIncrement,
      decrementQuantity: mockDecrement,
      removeItem: mockRemove,
    },
  };

  const store = createStore({
    modules: {
      cart: cartModule,
    },
  });

  // 2. Sample item
  const mockItem = {
    product: {
      id: 1,
      title: "Test Product",
      image: "https://via.placeholder.com/80",
    },
    quantity: 2,
  };

  const factory = (item = mockItem) =>
    mount(CartItem, {
      props: { item },
      global: { plugins: [store] },
    });

  it("renders product title, image, and quantity", () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.text()).toContain("2");

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(mockItem.product.image);
    expect(img.attributes("alt")).toBe(mockItem.product.title);
  });

  it('calls incrementQuantity on "+" button click', async () => {
    const wrapper = factory();
    const plusBtn = wrapper.findAll(
      "button.cart-item__controllers--quantity",
    )[1];
    await plusBtn.trigger("click");
    expect(mockIncrement).toHaveBeenCalled();
  });

  it('calls decrementQuantity on "-" button click', async () => {
    const wrapper = factory();
    const minusBtn = wrapper.findAll(
      "button.cart-item__controllers--quantity",
    )[0];
    await minusBtn.trigger("click");
    expect(mockDecrement).toHaveBeenCalled();
  });

  it('calls removeItem on "Remove" button click', async () => {
    const wrapper = factory();
    const removeBtn = wrapper.find("button.cart-item__controller--remove");
    await removeBtn.trigger("click");
  });

  it("disables decrement button when quantity is 1", () => {
    const wrapper = factory({ ...mockItem, quantity: 1 });
    const minusBtn = wrapper.findAll(
      "button.cart-item__controllers--quantity",
    )[0];
    expect(minusBtn.attributes()).toHaveProperty("disabled");
  });
});
