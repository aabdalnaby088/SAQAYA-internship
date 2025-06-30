import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import LoadingSpinner from "../shared/LoadingSpinner.vue";

describe("testing loading spinner component", () => {
  // test for mounting the component
  it("renders the loading spinner", () => {
    const wrapper = shallowMount(LoadingSpinner);
    expect(wrapper.find(".loading").exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
  });
});
