import { describe, it, expect, vi, beforeEach } from "vitest";
import { DOMWrapper, shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CartItem from "../CartItem.vue";
import { useCartStore } from "../../store";
import type { Product } from "../../types/product";

const dummyProduct: Product = {
  id: 1,
  title: "Test Product",
  image: "test.jpg",
  price: 20,
  description: "test description",
  rating: { rate: 4.5, count: 100 },
};

const mockItem = {
  product: dummyProduct,
  quantity: 2,
};

let cartStore: ReturnType<typeof useCartStore>;
let quantityButtons: DOMWrapper<Element>[];

beforeEach(() => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  cartStore = useCartStore(pinia);
  // Mock actions
  cartStore.incrementQuantity = vi.fn();
  cartStore.decrementQuantity = vi.fn();
  cartStore.removeItem = vi.fn();

  const wrapper = mountComponent();
  quantityButtons = wrapper.findAll(".cart-item__controllers--quantity");
});

const mountComponent = (customItem = mockItem) =>
  shallowMount(CartItem, {
    props: {
      item: customItem,
    },
  });

describe("test cart item component", () => {
  // test for mounting the component

  it("renders cart elements", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".cart-item__image").exists()).toBe(true);
    expect(wrapper.find(".cart-item__info").exists()).toBe(true);
    expect(wrapper.find(".cart-item__title").exists()).toBe(true);
    expect(wrapper.find(".cart-item__controls").exists()).toBe(true);
    expect(wrapper.find(".cart-item__controllers--quantity").exists()).toBe(true);
    expect(wrapper.find(".cart-item__controller--remove").exists()).toBe(true);
  });

  // test for renders the mocked Item correctly 
  it("renders product title, image, and quantity", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".cart-item").exists()).toBe(true);
    expect(wrapper.text()).toContain("Test Product");
    expect(wrapper.find("img").attributes("src")).toBe("test.jpg");
    expect(wrapper.find(".cart-item__quantity").text()).toBe("2");
  });

  // test for disabling decrement button if quantity is 1
  it("disables decrement button if quantity is 1", () => {
    const wrapper = mountComponent({ ...mockItem, quantity: 1 });
    const button = wrapper.findAll(".cart-item__controllers--quantity")[0];
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
  });

  // test for calling incrementQuantity when + is clicked
  it("calls incrementQuantity when + is clicked", async () => {
    await quantityButtons[1].trigger("click");
    expect(cartStore.incrementQuantity).toHaveBeenCalledWith(dummyProduct);
  });

  // test for calling decrementQuantity when – is clicked
  it("calls decrementQuantity when – is clicked", async () => {
    await quantityButtons[0].trigger("click");
    expect(cartStore.decrementQuantity).toHaveBeenCalledWith(dummyProduct);
  });

  // test for calling removeItem when Remove is clicked
  it("calls removeItem when Remove is clicked", async () => {
    const wrapper = mountComponent();
    await wrapper.find(".cart-item__controller--remove").trigger("click");
    expect(cartStore.removeItem).toHaveBeenCalledWith(dummyProduct);
  });
});
