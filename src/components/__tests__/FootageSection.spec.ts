import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import FootageSection from "../FootageSection.vue";

describe("testing footage section component", () => {
  // test for mounting the component
  it("renders the footer elements", () => {
    const wrapper = shallowMount(FootageSection);
    expect(wrapper.find(".footer").exists()).toBe(true);
    expect(wrapper.find(".footerContainer").exists()).toBe(true);
    expect(wrapper.find(".footerContainer__content").exists()).toBe(true);
    expect(wrapper.find(".footer-links").exists()).toBe(true);
    expect(wrapper.find(".footer-contact").exists()).toBe(true);
  });

  // test for mounting the footer sections
  it("renders the footer sections", () => {
    const wrapper = shallowMount(FootageSection);
    expect(wrapper.text()).toContain("Navigate");
    expect(wrapper.text()).toContain("Collection");
    expect(wrapper.text()).toContain("Categories");
  });

  // test for mounting the links
  it("renders the footer links", () => {
    const wrapper = shallowMount(FootageSection);
    expect(wrapper.findAll(".column").length).toBe(3);
  });
});
