import { describe, it, expect } from '@jest/globals';
import { toasts } from '../state';

describe('Toast State', () => {
  it('should export toasts ref', () => {
    expect(toasts).toBeDefined();
  });
});
