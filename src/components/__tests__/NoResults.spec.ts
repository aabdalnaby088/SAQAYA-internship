import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import NoResults from "../NoResults.vue";

describe("testing no results component", () => {
  // test for mounting the component
  it("renders the no results message, try searching for something else, and no results image", () => {
    const wrapper = shallowMount(NoResults);
    expect(wrapper.find(".noResults").exists()).toBe(true);
    expect(wrapper.text()).toContain("No results found");
    expect(wrapper.text()).toContain("Try searching for something else");
    expect(wrapper.find("img").attributes("src")).toBe("/noResults.png");
  });
});
