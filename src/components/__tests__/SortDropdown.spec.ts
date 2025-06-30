import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import SortDropdown from "../SortDropdown.vue";
import { useProductsStore } from "../../store";

let productsStore: ReturnType<typeof useProductsStore>;

beforeEach(() => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
  });

  productsStore = useProductsStore(pinia);

  // Mock actions
  productsStore.setSort = vi.fn();
});

const mountComponent = () =>
  shallowMount(SortDropdown, {
    global: {
      stubs: {
        XMarkIcon: true,
      },
    },
  });

describe("testing sort dropdown component", () => {
  // test for mounting the component
  it("renders sort dropdown", () => {
    const wrapper = mountComponent();
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.find(".dropdown").exists()).toBe(true);
  });

  // test for setting sort state
  it("calls setSort when sort value changes", async () => {
    const wrapper = mountComponent();
    const select = wrapper.find("select");

    await select.setValue("asc");
    expect(productsStore.setSort).toHaveBeenCalledWith("asc");
  });
});
