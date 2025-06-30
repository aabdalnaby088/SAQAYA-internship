import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { Product } from "../../types/product";
import { useCartStore } from "../../store";
import ProductCard from "../ProductCard.vue";

const dummyProduct: Product = {
  id: 1,
  title: "Test Product",
  image: "test.jpg",
  price: 20,
  description: "test description",
  rating: { rate: 4.5, count: 100 },
};

const RouterLinkStub = {
  name: "RouterLink",
  props: ["to"],
  template: `<a :href="to"><slot /></a>`,
};

let cartStore: ReturnType<typeof useCartStore>;

beforeEach(() => {
  const pinia = createTestingPinia({ createSpy: vi.fn });
  cartStore = useCartStore(pinia);

  // Mock actions
  cartStore.addItem = vi.fn();
  cartStore.removeItem = vi.fn();

  // Mock getter
  Object.defineProperty(cartStore, "itemInCart", {
    get: () => vi.fn(() => false),
    configurable: true,
  });
});

const mountComponent = (customProduct = dummyProduct) =>
  shallowMount(ProductCard, {
    props: {
      product: customProduct,
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

describe("testing product card component", () => {

  // test for mounting the component
  it("renders product card elements", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".card").exists()).toBe(true);
    expect(wrapper.find(".card__Content").exists()).toBe(true);
    expect(wrapper.find(".card__image").exists()).toBe(true);
    expect(wrapper.find(".card__description").exists()).toBe(true);
    expect(wrapper.find(".card__title").exists()).toBe(true);
    expect(wrapper.find(".card__details--price").exists()).toBe(true);
    expect(wrapper.find(".card__details--rating").exists()).toBe(true);
  });
  // test for component render with mocked product
  it("renders product title, image, price, and rating", () => {
    const wrapper = mountComponent();
    const title = wrapper.find(".card__title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Test Product");
    expect(wrapper.find("img").attributes("src")).toBe("test.jpg");
    expect(wrapper.find(".card__details--price").text()).toBe("$20.00");
    expect(wrapper.find(".card__details--rating").text()).toBe("⭐ 4.5");
  });

  // test for adding item to cart
  it("calls addItem when Add to Cart is clicked", () => {
    const wrapper = mountComponent();
    wrapper.find(".card__addToCart").trigger("click");
    expect(cartStore.addItem).toHaveBeenCalledWith(dummyProduct);
  });

  // test for removing item from cart
  it("calls removeItem when Remove from Cart is clicked", () => {
    const wrapper = mountComponent();
    wrapper.find(".card__RemoveFromCart").trigger("click");
    expect(cartStore.removeItem).toHaveBeenCalledWith(dummyProduct);
  });

  // test for showing Add to Cart button if product is not in cart
  it("shows Add to Cart button if product is not in cart", () => {
    const wrapper = mountComponent();
    expect(wrapper.find(".card__addToCart").exists()).toBe(true);
  });

  // test for showing Remove from Cart button if product is in cart
  it("shows Remove from Cart button if product is in cart", () => {
    Object.defineProperty(cartStore, "itemInCart", {
      get: () => () => true,
      configurable: true,
    });
    const wrapper = mountComponent();
    expect(wrapper.find(".card__RemoveFromCart").exists()).toBe(true);
  });
});
