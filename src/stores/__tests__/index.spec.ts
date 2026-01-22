import { describe, it, expect } from '@jest/globals';

describe('Stores Index', () => {
  it('should be importable', () => {
    expect(() => import('../index')).not.toThrow();
  });
});
