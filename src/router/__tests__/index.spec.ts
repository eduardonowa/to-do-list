import { describe, it, expect } from '@jest/globals';

describe('Router', () => {
  it('should be importable', () => {
    expect(() => import('../index')).not.toThrow();
  });
});
