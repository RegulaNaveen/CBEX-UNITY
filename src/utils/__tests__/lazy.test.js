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
});
