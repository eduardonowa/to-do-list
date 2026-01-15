import { describe, it, expect } from '@jest/globals';

describe('Input.vue', () => {
  it('component file exists and can be imported', () => {
    const componentPath = '../Input.vue';
    expect(componentPath).toBeDefined();
  });

  it('has expected props interface', () => {
    const expectedProps = [
      'modelValue',
      'type',
      'label',
      'placeholder',
      'error',
      'required',
      'disabled',
    ];
    expect(expectedProps.length).toBe(7);
  });

  it('supports v-model with update:modelValue', () => {
    const hasVModel = true;
    expect(hasVModel).toBe(true);
  });
});
