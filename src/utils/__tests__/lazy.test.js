import lazyWithRetry from '../lazy';

describe('lazyWithRetry', () => {
  const reload = jest.fn();
  Object.defineProperty(window, 'location', reload);
  const localStorageMock = (() => {
    let store = {};

    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
  });
  it('should resolve with the component when import is successful', async () => {
    const componentImport = jest.fn().mockResolvedValue('Component');
    const result = await lazyWithRetry(componentImport);
    expect(result).toBe('Component');
    expect(componentImport).toHaveBeenCalled();
  });

  it('should resolve with the component when import is successful', async () => {
    const componentImport = jest.fn().mockResolvedValue('Component');
    const result = await lazyWithRetry(componentImport);
    expect(result).toBe('Component');
    expect(componentImport).toHaveBeenCalled();
  });

  it('should reject with an error if import fails after refreshing the page', async () => {
    const componentImport = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to import component'));
    window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
    await expect(lazyWithRetry(componentImport)).rejects.toThrow(
      'Failed to import component'
    );
    expect(componentImport).toHaveBeenCalled();
    expect(window.sessionStorage.getItem('retry-lazy-refreshed')).toBe('true');
  });
});
