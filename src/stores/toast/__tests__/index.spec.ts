import { describe, it, expect } from '@jest/globals';
import { useToastStore } from '../index';

describe('Toast Store', () => {
  it('should export useToastStore function', () => {
    expect(typeof useToastStore).toBe('function');
  });
});
