import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NavLinks from "../navbar/NavLinks.vue";

const RouterLinkStub = {
  name: "RouterLink",
  props: ["to"],
  template: `<a :href="to"><slot /></a>`,
};

describe("NavLinks.vue", () => {
  it('emits "closeHDropdown" when a RouterLink is clicked', async () => {
    const wrapper = mount(NavLinks, {
      props: {
        isMenuOpen: true,
      },
      global: {
        stubs: ["RouterLink"],
      },
    });

    const links = wrapper.findAllComponents({ name: "RouterLink" });
    expect(links).toHaveLength(3);

    await links[0].trigger("click");

    expect(wrapper.emitted("closeHDropdown")).toBeTruthy();
  });

  it('renders correct "href" paths', () => {
    const wrapper = mount(NavLinks, {
      props: {
        isMenuOpen: true,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const links = wrapper.findAll("a");

    expect(links[0].attributes("href")).toBe("/");
    expect(links[1].attributes("href")).toBe("/products");
    expect(links[2].attributes("href")).toBe("/contactUs");
  });
});
