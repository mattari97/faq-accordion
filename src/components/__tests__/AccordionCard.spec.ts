import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AccordionCard from '@/components/AccordionCard.vue';
import accordionItems from '@/assets/json/accordionItems.json';

describe('AccordionCard', () => {
  it('renders the component properly', () => {
    const wrapper = mount(AccordionCard);
    const title = wrapper.find('.accordion-header__title');
    const items = wrapper.findAll('.accordion-item');
    expect(title.text()).toBe('FAQs');
    expect(items).toHaveLength(accordionItems.length);
  });

  it('displays only one accordion item open on initial render', () => {
    const wrapper = mount(AccordionCard);
    const openElements = wrapper.findAll('.accordion-item__content.show');
    expect(openElements).toHaveLength(1);
  });

  it('displays the first accordion item open by default', () => {
    const wrapper = mount(AccordionCard);
    const elements = wrapper.findAll('.accordion-item__content');
    expect(elements[0].classes()).toContain('show');
  });

  it('allows only one accordion item to be open at a time', async () => {
    const wrapper = mount(AccordionCard);
    const buttons = wrapper.findAll('.accordion-item__button');
    const elements = wrapper.findAll('.accordion-item__content');
    buttons[1].trigger('click');
    await wrapper.vm.$nextTick();
    expect(elements[0].classes()).not.toContain('show');
    expect(elements[1].classes()).toContain('show');
  });

  it('closes an opened accordion item when clicked again', async () => {
    const wrapper = mount(AccordionCard);
    const firstItem = wrapper.findAll('.accordion-item')[0];
    const firstItemContent = firstItem.find('.accordion-item__content');
    firstItem.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(firstItemContent.classes()).not.toContain('show');
  });

  it('shows the MinusIcon for active (open) accordion items', async () => {
    const wrapper = mount(AccordionCard);
    const items = wrapper.findAll('.accordion-item');
    const activeItems = items.filter(item => {
      return item.find('.accordion-item__content.show').exists();
    });

    activeItems.forEach(item => {
      expect(item.find('.accordion-item__icon-minus').exists()).toBeTruthy();
      expect(item.find('.accordion-item__icon-plus').exists()).toBeFalsy();
    });
  });

  it('shows the PlusIcon for inactive (closed) accordion items', async () => {
    const wrapper = mount(AccordionCard);
    const items = wrapper.findAll('.accordion-item');
    const inactiveItems = items.filter(item => {
      return !item.find('.accordion-item__content.show').exists();
    });

    inactiveItems.forEach(item => {
      expect(item.find('.accordion-item__icon-plus').exists()).toBeTruthy();
      expect(item.find('.accordion-item__icon-minus').exists()).toBeFalsy();
    });
  });
});
