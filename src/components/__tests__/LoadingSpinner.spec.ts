import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingSpinner from '../shared/LoadingSpinner.vue';


describe('LoadingSpinner.vue', () => {
  it('mounts successfully', () => {
    const wrapper = mount(LoadingSpinner);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an image with correct src and alt', () => {
    const wrapper = mount(LoadingSpinner);
    const img = wrapper.find('img');

    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('loading');
    expect(img.attributes('src')).toContain('/src/assets/loading.png'); 
  });
});
