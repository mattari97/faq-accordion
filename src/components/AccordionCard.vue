<script setup lang="ts">
import { ref, type Ref } from 'vue';
import accordionItems from '@/assets/json/accordionItems.json';
import StarIcon from '@/components/icons/StarIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import MinusIcon from './icons/MinusIcon.vue';

const activeItemIndex: Ref<number | null> = ref(accordionItems[0].id);
const setActiveIndex = (index: number) => {
  activeItemIndex.value = index === activeItemIndex.value ? null : index;
};
</script>

<template>
  <main class="accordion">
    <div class="accordion-header">
      <StarIcon class="accordion-header__icon" />
      <h1 class="accordion-header__title">FAQs</h1>
    </div>
    <div class="accordion-item" v-for="item in accordionItems" :key="item.id">
      <button class="accordion-item__button" @click="setActiveIndex(item.id)">
        <h2 class="accordion-item__title">{{ item.title }}</h2>
        <MinusIcon
          v-if="activeItemIndex === item.id"
          class="accordion-item__icon-minus"
        />
        <PlusIcon v-else class="accordion-item__icon-plus" />
      </button>
      <p
        :class="[
          'accordion-item__content',
          { show: activeItemIndex === item.id },
        ]"
      >
        <span>{{ item.content }}</span>
      </p>
    </div>
  </main>
</template>

<style scopes lang="scss">
.accordion {
  width: min(100%, 37.5rem);
  margin-inline: auto;
  padding: clamp(1.5rem, -2.5rem + 13.3333vw, 2.5rem);
  border-radius: 0.5rem;
  background-color: hsl(var(--clr-surface));
  box-shadow: var(--box-shadow);
}

.accordion-header {
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  margin-block-end: 1.5rem;

  &__icon {
    width: clamp(1.5rem, -1rem + 8.3333vw, 2.125rem);
    color: hsl(var(--clr-primary));
  }

  &__title {
    font-size: var(--fs-title);
    font-weight: var(--fw-bold);
    line-height: var(--lh-title);
    color: hsl(var(--clr-text-200));
  }
}

.accordion-item {
  display: flex;
  flex-direction: column;

  &:not(:last-child)::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: hsl(var(--clr-separator));
    margin-block: 1.25rem;
  }

  &__button {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;

    &:hover .accordion-item__title {
      color: hsl(var(--clr-primary));
    }

    &:focus-visible {
      outline: 2px dotted hsl(var(--clr-primary));
      outline-offset: 2px;
    }
  }

  &__title {
    text-align: start;
    font-size: var(--fs-item-title);
    font-weight: var(--fw-medium);
    line-height: var(--lh-title);
    color: hsl(var(--clr-text-200));
    transition: color 200ms ease-out;
  }

  &__icon-plus,
  &__icon-minus {
    flex-shrink: 0;
    width: 24px;
  }

  &__icon-plus {
    color: hsl(var(--clr-primary));
  }

  &__icon-minus {
    color: hsl(var(--clr-secondary));
  }

  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: 250ms ease-in-out;

    & > span {
      font-size: var(--fs-item-content);
      display: block;
      overflow: hidden;
    }

    &.show {
      padding-top: 1.5rem;
      grid-template-rows: 1fr;
    }
  }
}
</style>
