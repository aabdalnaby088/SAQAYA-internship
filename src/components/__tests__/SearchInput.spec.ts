import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import SearchInput from "../SearchInput.vue";
import { useProductsStore } from "../../store";

let productsStore: ReturnType<typeof useProductsStore>;

beforeEach(() => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  productsStore = useProductsStore(pinia);

  // Mock actions
  productsStore.setSearch = vi.fn();
});

const mountComponent = () =>
  shallowMount(SearchInput, {
    global: {
      stubs: {
        XMarkIcon: true,
      },
    },
  });

describe("testing search input component", () => {
  // test for mounting the component
  it("renders search input", () => {
    const wrapper = mountComponent();
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find(".searchInput").exists()).toBe(true);
    

  });

  // test for setting search state
  it("calls setSearch when input value changes", () => {
    const wrapper = mountComponent();
    wrapper.find("input").setValue("test");
    expect(productsStore.setSearch).toHaveBeenCalledWith("test");
  });
});
