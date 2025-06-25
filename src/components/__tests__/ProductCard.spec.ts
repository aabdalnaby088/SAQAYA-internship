import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "../ProductCard.vue";
import type { Product } from "../../types/product";
import { createStore } from "vuex";

// Mock product data
const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A mock product description",
  image: "https://example.com/image.jpg",
  rating: { rate: 4.5, count: 100 },
};

// Create reusable mock functions
const addItem = vi.fn();
const removeItem = vi.fn();
const itemInCartMock = vi.fn();

// Reusable store
const store = createStore({
  modules: {
    cart: {
      namespaced: true,
      actions: {
        addItem,
        removeItem,
      },
      getters: {
        itemInCart: () => itemInCartMock, // <-- this getter returns a function
      },
    },
  },
});

describe("ProductCard.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    itemInCartMock.mockReturnValue(false); // default
  });

  it("renders product details correctly", () => {
    const wrapper = mount(ProductCard, {
      global: {
        plugins: [store],
      },
      props: {
        product: mockProduct,
      },
    });

    expect(wrapper.find(".card__title").text()).toBe(mockProduct.title);
    expect(wrapper.find(".card__details--price").text()).toBe(
      `$${mockProduct.price.toFixed(2)}`,
    );
    expect(wrapper.find(".card__details--rating").text()).toContain(
      `${mockProduct.rating.rate}`,
    );
    expect(wrapper.find("img").attributes("src")).toBe(mockProduct.image);
  });

  it("calls addItem when 'Add to Cart' is clicked", async () => {
    itemInCartMock.mockReturnValue(false); // make sure item is not in cart

    const wrapper = mount(ProductCard, {
      global: { plugins: [store] },
      props: { product: mockProduct },
    });

    await wrapper.find(".card__addToCart").trigger("click");
    expect(addItem).toHaveBeenCalled;
  });

  it("calls removeItem when 'Remove from cart' is clicked", async () => {
    itemInCartMock.mockReturnValue(true); // simulate item is already in cart

    const wrapper = mount(ProductCard, {
      global: { plugins: [store] },
      props: { product: mockProduct },
    });

    await wrapper.find(".card__RemoveFromCart").trigger("click");
    expect(removeItem).toHaveBeenCalled();
  });
});
