import { mount } from '@vue/test-utils';
import MenuComponent from '@/components/MenuComponent.vue';
import { MenuComponent as MenuComponentJs } from '@/assets/ts/components';

jest.mock('@/assets/ts/components', () => ({
  MenuComponent: {
    createInsance: jest.fn(),
  },
}));

describe('MenuComponent.vue', () => {
  it('should create a menu instance on mount', async () => {
    const menuSelector = '#menu';
    const wrapper = mount(MenuComponent, {
      props: { menuSelector },
      slots: {
        toggle: '<div>Toggle Slot</div>',
        content: '<div>Content Slot</div>',
      },
    });

    await wrapper.vm.$nextTick();

    expect(MenuComponentJs.createInsance).toHaveBeenCalledWith(menuSelector);
  });
});