import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SortDropdown from "../SortDropdown.vue";
import { createStore } from "vuex";

describe("SortDropdown.vue", () => {
  const mockSetSort = vi.fn();

  const productsModule = {
    namespaced: true,
    actions: {
      setSort: mockSetSort,
    },
  };

  const store = createStore({
    modules: {
      products: productsModule,
    },
  });

  it("renders a dropdown with options", () => {
    const wrapper = mount(SortDropdown, {
      global: {
        plugins: [store],
      },
    });

    const options = wrapper.findAll("option");
    expect(options.length).toBe(4);
    expect(options[0].text()).toBe("All");
    expect(options[1].text()).toBe("price (Low to High)");
    expect(options[2].text()).toBe("price (High to Low)");
    expect(options[3].text()).toBe("Rating");
  });

  it("dispatches 'setSort' when option is changed", async () => {
    const wrapper = mount(SortDropdown, {
      global: {
        plugins: [store],
      },
    });

    const select = wrapper.find("select");
    await select.setValue("asc");

    expect(mockSetSort).toHaveBeenCalled();
  });
});
