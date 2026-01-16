import { describe, it, expect } from '@jest/globals';
import { showToast, removeToast, clearToasts } from '../actions';

describe('Toast Actions', () => {
  it('should export showToast function', () => {
    expect(typeof showToast).toBe('function');
  });

  it('should export removeToast function', () => {
    expect(typeof removeToast).toBe('function');
  });

  it('should export clearToasts function', () => {
    expect(typeof clearToasts).toBe('function');
  });
});
