import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FootageSection from "@/components/FootageSection.vue";

describe("FootageSection.vue", () => {
  it("renders footer container", () => {
    const wrapper = mount(FootageSection);
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.find(".footerContainer").exists()).toBe(true);
  });

  it("renders navigation columns", () => {
    const wrapper = mount(FootageSection);
    const columns = wrapper.findAll(".footer-links .column");
    expect(columns.length).toBe(3);

    expect(columns[0].text()).toContain("Navigate");
    expect(columns[1].text()).toContain("Collection");
    expect(columns[2].text()).toContain("Categories");
  });

  it("renders contact section with correct info", () => {
    const wrapper = mount(FootageSection);
    const contact = wrapper.find(".footer-contact");

    expect(contact.exists()).toBe(true);
    expect(contact.text()).toContain("399 Crowfield Road");
    expect(contact.text()).toContain("+602-926-5809");
    expect(contact.find("a").attributes("href")).toContain("mailto:");
  });

  it("renders copyright", () => {
    const wrapper = mount(FootageSection);
    expect(wrapper.text()).toContain("Copyright");
  });
});
