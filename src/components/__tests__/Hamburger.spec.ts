import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HamburgerMenu from "../navbar/HamburgerMenu.vue";

describe("testing hamburger menu component", () => {
  // test for mounting the component with isMenuOpen false
  it("renders all 3 bars", () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: false },
    });

    const bars = wrapper.findAll(".hamburger__bar");
    expect(bars.length).toBe(3);
  });

  // test for mounting the component with isMenuOpen true
  it('emits "closeHamburger" when clicked', async () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: false },
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("closeHamburger")).toBeTruthy();
  });

  // test for mounting the component with isMenuOpen true
  it("sets menuOpened attribute to true", () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: true },
    });

    const button = wrapper.find("button");
    expect(button.attributes("menuopened")).toBe("true");
  });
});
