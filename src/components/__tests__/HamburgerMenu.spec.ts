import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HamburgerMenu from '../navbar/HamburgerMenu.vue';

describe('HamburgerMenu.vue', () => {
  it('renders all 3 bars', () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: false },
    });

    const bars = wrapper.findAll('.hamburger__bar');
    expect(bars.length).toBe(3);
  });

  it('emits "closeHamburger" when clicked', async () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: false },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('closeHamburger')).toBeTruthy();
  });

  it('has animation classes when isMenuOpen is true', () => {
    const wrapper = mount(HamburgerMenu, {
      props: { isMenuOpen: true },
    });

    const button = wrapper.find('button');
    expect(button.attributes('menuopened')).toBe('true');
  });
});