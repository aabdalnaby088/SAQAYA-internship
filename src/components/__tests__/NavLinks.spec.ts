import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NavLinks from "../navbar/NavLinks.vue";

const RouterLinkStub = {
  name: "RouterLink",
  props: ["to"],
  template: `<a :href="to"><slot /></a>`,
};

const mountComponent = (isMenuOpen = false) =>
  mount(NavLinks, {
    props: {
      isMenuOpen,
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

describe("testing nav links component", () => {



  it('emits "closeDropdown" when a RouterLink is clicked', async () => {
    const wrapper = mountComponent(true);

    const links = wrapper.findAllComponents({ name: "RouterLink" });
    expect(links).toHaveLength(3);

    await links[0].trigger("click");

    expect(wrapper.emitted("closeDropdown")).toBeTruthy();

  });

  it('renders correct "href" paths', () => {
    const wrapper = mountComponent(true);

    const links = wrapper.findAll("a");

    expect(links[0].attributes("href")).toBe("/");
    expect(links[1].attributes("href")).toBe("/products");
    expect(links[2].attributes("href")).toBe("/contactUs");
  });

  it("checking the class of the nav links not found when isMenuOpen is false", () => {
    const wrapper = mountComponent(false);

    expect(wrapper.classes()).not.toContain("navLinks--open");
  });
});
